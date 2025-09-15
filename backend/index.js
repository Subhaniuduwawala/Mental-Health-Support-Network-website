const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');
const AppointmentModel = require('./models/Appointment'); // Appointment schema
const MessageModel = require("./models/Message"); 

const app = express();
app.use(cors());
app.use(express.json());

// ==================== DATABASE ====================
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await seedAdmin(); // 👈 seed default admin once DB is connected
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ==================== SEED ADMIN ====================
async function seedAdmin() {
  try {
    const adminEmail = "admin@mindwell.com"; // fixed admin email
    const existingAdmin = await EmployeeModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin123!", 10); // strong default password
      const adminUser = new EmployeeModel({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin", // 👈 role field must exist in your Employee schema
      });

      await adminUser.save();
      console.log("✅ Admin account created:", adminEmail, "password=Admin123!");
    } else {
      console.log("ℹ️ Admin account already exists:", adminEmail);
    }
  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
  }
}

// ==================== AUTH ====================

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ Status: "Failed", message: "No record existed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ Status: "Failed", message: "Incorrect Password" });
    }

    // send role + name + email back
    return res.status(200).json({ 
      Status: "Success", 
      role: user.role, 
      name: user.name, 
      email: user.email 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

// Register (always employee)
app.post('/register', async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await EmployeeModel.create({ ...rest, password: hashedPassword, role: "employee" });
    res.json("Employee Registered");
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ Status: "Error", message: "Error registering employee" });
  }
});

// ==================== APPOINTMENTS ====================

// Save Appointment
app.post('/appointments', async (req, res) => {
  try {
    console.log("📥 New Appointment:", req.body); // Debug log
    const appointment = new AppointmentModel(req.body);
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment });
  } catch (err) {
    console.error("Appointment save error:", err);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

// Get All Appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.json(appointments);
  } catch (err) {
    console.error("Fetch appointments error:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Update (edit) an appointment
app.put('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await AppointmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Appointment not found' });
    res.json(updated);
  } catch (err) {
    console.error('Appointment update error:', err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// ================= CONTACT FORM API ==================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new MessageModel({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Message save error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Save new message
app.post("/messages", async (req, res) => {
  try {
    const newMessage = new MessageModel(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (err) {
    console.error("Message save error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Get all messages (for Admin)
app.get("/messages", async (req, res) => {
  try {
    const messages = await MessageModel.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

const jwt = require("jsonwebtoken");
require("dotenv").config();
// ...
const counselorRoutes = require("./routes/counselors");
// ...
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ Status: "Failed", message: "No record existed" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ Status: "Failed", message: "Incorrect Password" });

    const token = jwt.sign(
      { sub: user._id, role: user.role, email: user.email, name: user.name },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1d" }
    );
    res.status(200).json({ Status: "Success", role: user.role, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

// mount counselors API
app.use("/counselors", counselorRoutes);


// ==================== SERVER ====================
app.listen(3001, () => {
  console.log("🚀 Server is running on http://localhost:3001");
});

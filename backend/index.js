import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import bcrypt from 'bcrypt';
import EmployeeModel from './models/Employee.js';
import AppointmentModel from './models/Appointment.js';
import MessageModel from "./models/Message.js";

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
    const adminEmail = "admin@mindwell.com";
    const existingAdmin = await EmployeeModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin123!", 10); 
      const adminUser = new EmployeeModel({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("✅ Admin account created:", adminEmail);
    } else {
      console.log("ℹ️ Admin account already exists:", adminEmail);
    }
  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
  }
}

// ==================== AUTH ====================

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await EmployeeModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ Status: "Failed", message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new EmployeeModel({
      name: name,
      email: email,
      password: hashedPassword,
      role: "employee"
    });

    await newUser.save();
    
    res.status(201).json({ 
      Status: "Success", 
      message: "User registered successfully!" 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

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

    const token = jwt.sign(
      { sub: user._id, role: user.role, email: user.email, name: user.name },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1d" }
    );
    
    res.status(200).json({ 
      Status: "Success", 
      userId: user._id,
      role: user.role, 
      username: user.name,
      name: user.name, 
      email: user.email, 
      token 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

// ==================== APPOINTMENTS ====================

app.post('/appointments', async (req, res) => {
  try {
    const appointment = new AppointmentModel(req.body);
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment });
  } catch (err) {
    console.error("Appointment save error:", err);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const { email } = req.query;
    
    // If email query param is provided, filter by email
    // Otherwise return all appointments (for admin)
    const query = email ? { email: email.toLowerCase() } : {};
    
    const appointments = await AppointmentModel.find(query).sort({ startAt: -1 });
    res.json(appointments);
  } catch (err) {
    console.error("Fetch appointments error:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

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

// ==================== MESSAGES ====================

app.delete("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await MessageModel.findByIdAndDelete(id);
    if (!deletedMessage) return res.status(404).json({ error: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully!" });
  } catch (err) {
    console.error("Message delete error:", err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

app.put("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMessage = await MessageModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMessage) return res.status(404).json({ error: "Message not found" });
    res.status(200).json(updatedMessage);
  } catch (err) {
    console.error("Message update error:", err);
    res.status(500).json({ error: "Failed to update message" });
  }
});

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

app.get("/messages", async (_, res) => {
  try {
    const messages = await MessageModel.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ==================== PROFILE ====================

// Get user profile by ID
app.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await EmployeeModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ Status: "Failed", message: "User not found" });
    }
    res.status(200).json({ Status: "Success", user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

// Update user profile
app.put("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, bio, specialization, experience, qualification, profileImage } = req.body;

    const updatedUser = await EmployeeModel.findByIdAndUpdate(
      id,
      { name, phone, bio, specialization, experience, qualification, profileImage },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ Status: "Failed", message: "User not found" });
    }

    res.status(200).json({ 
      Status: "Success", 
      message: "Profile updated successfully!",
      user: updatedUser 
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ Status: "Error", message: "Server error" });
  }
});

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ==================== SERVER ====================
app.listen(3001, () => {
  console.log("🚀 Server is running on http://localhost:3001");
});

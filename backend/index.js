import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import EmployeeModel from './models/Employee.js';
import AppointmentModel from './models/Appointment.js';
import MessageModel from "./models/Message.js";
import CounselorModel from "./models/Counselor.js";
import MusicModel from "./models/Music.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ==================== DATABASE ====================
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await seedAdmin(); // 👈 seed default admin once DB is connected
    await seedCounselors(); // 👈 seed counselors data
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ==================== SEED ADMIN ====================
async function seedAdmin() {
  try {
    const adminEmail = "admin@mindwell.com";
    const adminPassword = "Admin123!";
    
    // Check if admin exists
    const existingAdmin = await EmployeeModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10); 
      const adminUser = new EmployeeModel({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("✅ Admin account created:", adminEmail);
      console.log("📧 Email:", adminEmail);
      console.log("🔒 Password:", adminPassword);
    } else {
      console.log("ℹ️ Admin account already exists:", adminEmail);
      console.log("📧 Use email:", adminEmail);
      console.log("🔒 Use password: Admin123!");
    }
  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
  }
}

// ==================== SEED COUNSELORS ====================
async function seedCounselors() {
  try {
    const counselorsData = [
      { name: "Mr. Ravi Fernando", category: "Career & Life Coaching", experience: "10 years", languages: "English, Tamil", approach: "Solution-Focused Brief Therapy, Goal Setting", quote: "Guiding you to rediscover purpose and balance in both career and life.", rating: 3, image: "/assets/image25.jpg" },
      { name: "Ms. Tharushi Jayawardena", category: "Relationship & Family Therapy", experience: "5 years", languages: "Sinhala", approach: "Emotionally Focused Therapy (EFT)", quote: "Helping couples and families improve emotional connection and communication.", rating: 2, image: "/assets/image27.jpg" },
      { name: "Dr. Ashani Dias", category: "Grief & Loss", experience: "12 years", languages: "English, Sinhala", approach: "Narrative Therapy, Supportive Counseling", quote: "Supporting you through loss with empathy, patience, and presence.", rating: 3, image: "/assets/image28.jpg" },
      { name: "Mr. Samoneera Wijesinghe", category: "Self-Esteem & Confidence", experience: "6 years", languages: "Sinhala, Tamil", approach: "Positive Psychology, Strength-Based Therapy", quote: "Helping you discover your inner strengths and self-worth.", rating: 2, image: "/assets/image26.jpg" },
      { name: "Ms. Ishara Senanayake", category: "Student & Academic Stress Support", experience: "4+ years", languages: "Sinhala, English", approach: "Cognitive-Behavioral Techniques, Time Management Coaching", quote: "Helping students handle academic pressure while building resilience.", rating: 2, image: "/assets/image29.jpg" },
      { name: "Mr. Kaween de Silva", category: "LGBTQ+ Affirmative Support", experience: "6 years", languages: "English", approach: "Humanistic Therapy, Identity-affirming conversations", quote: "Providing a safe, inclusive space to talk openly and heal freely.", rating: 2, image: "/assets/image31.jpg" },
      { name: "Ms. Nadeesha Perera", category: "Anxiety & Stress", experience: "7 years", languages: "Sinhala, English", approach: "CBT, Mindfulness", quote: "Equipping you with practical tools to quiet the mind.", rating: 4, image: "/assets/image34.jpg" },
      { name: "Mr. Harith Senarath", category: "Depression & Mood Support", experience: "8 years", languages: "Sinhala", approach: "Behavioral Activation, Supportive Therapy", quote: "Small steps forward can change the direction of your life.", rating: 4, image: "/assets/image32.jpg" },
      { name: "Dr. Menaka Wijeratne", category: "Child & Adolescent Therapy", experience: "11 years", languages: "English, Sinhala", approach: "Play Therapy, Family Systems", quote: "Creating safe spaces where young minds feel seen and heard.", rating: 5, image: "/assets/image33.jpg" },
      { name: "Ms. Piumi Ranasinghe", category: "Mindfulness & Meditation", experience: "6 years", languages: "English", approach: "MBSR, Breathwork", quote: "Come back to the present—where calm and clarity live.", rating: 4, image: "/assets/image35.jpg" },
      { name: "Mr. Sanjaya Jayasuriya", category: "Addiction Recovery Support", experience: "9 years", languages: "Sinhala, English", approach: "Motivational Interviewing, Relapse Prevention", quote: "Recovery is possible—and you don't have to do it alone.", rating: 4, image: "/assets/image36.jpg" },
      { name: "Ms. Dinithi Abeysekara", category: "Trauma-Informed Care", experience: "10 years", languages: "Sinhala", approach: "EMDR-informed, Stabilization Skills", quote: "Gentle healing that respects your pace and your story.", rating: 5, image: "/assets/image30.jpg" },
    ];

    const existingCount = await CounselorModel.countDocuments();
    
    if (existingCount === 0) {
      await CounselorModel.insertMany(counselorsData);
      console.log(`✅ Seeded ${counselorsData.length} counselors to database`);
    } else {
      // Check which counselors are missing and add them
      let addedCount = 0;
      for (const counselor of counselorsData) {
        const exists = await CounselorModel.findOne({ name: counselor.name });
        if (!exists) {
          await CounselorModel.create(counselor);
          addedCount++;
        }
      }
      if (addedCount > 0) {
        console.log(`✅ Added ${addedCount} missing counselors to database`);
      } else {
        console.log(`ℹ️ All ${counselorsData.length} counselors already exist in database`);
      }
    }
  } catch (err) {
    console.error("❌ Failed to seed counselors:", err);
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

    console.log(`✅ User logged in: ${user.email} | Role: ${user.role}`);

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

// ==================== ADMIN RESET (FOR DEBUGGING) ====================
app.post('/reset-admin', async (req, res) => {
  try {
    const adminEmail = "admin@mindwell.com";
    const newPassword = "Admin123!";
    
    // Delete existing admin if exists
    await EmployeeModel.deleteOne({ email: adminEmail });
    
    // Create new admin
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const adminUser = new EmployeeModel({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    
    await adminUser.save();
    
    res.status(200).json({ 
      Status: "Success", 
      message: "Admin account reset successfully",
      email: adminEmail,
      password: newPassword
    });
  } catch (err) {
    console.error("Admin reset error:", err);
    res.status(500).json({ Status: "Error", message: "Failed to reset admin" });
  }
});

// ==================== SEED COUNSELORS ENDPOINT ====================
app.post('/seed-counselors', async (req, res) => {
  try {
    await seedCounselors();
    const count = await CounselorModel.countDocuments();
    res.status(200).json({ 
      Status: "Success", 
      message: "Counselors seeded successfully",
      count: count
    });
  } catch (err) {
    console.error("Seed counselors error:", err);
    res.status(500).json({ Status: "Error", message: "Failed to seed counselors" });
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

// ==================== COUNSELORS ====================

// Get all counselors
app.get("/counselors", async (_, res) => {
  try {
    const counselors = await CounselorModel.find().sort({ createdAt: -1 });
    res.json(counselors);
  } catch (err) {
    console.error("Counselor fetch error:", err);
    res.status(500).json({ error: "Failed to fetch counselors" });
  }
});

// Add new counselor
app.post("/counselors", async (req, res) => {
  try {
    const newCounselor = new CounselorModel(req.body);
    await newCounselor.save();
    res.status(201).json({ message: "Counselor added successfully!", counselor: newCounselor });
  } catch (err) {
    console.error("Counselor save error:", err);
    res.status(500).json({ error: "Failed to add counselor" });
  }
});

// Update counselor
app.put("/counselors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Updating counselor ${id}`);
    const updatedCounselor = await CounselorModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCounselor) {
      console.error("Counselor not found:", id);
      return res.status(404).json({ error: "Counselor not found" });
    }
    console.log("Counselor updated successfully:", updatedCounselor.name);
    res.status(200).json(updatedCounselor);
  } catch (err) {
    console.error("Counselor update error:", err.message);
    console.error("Error details:", err);
    res.status(500).json({ error: "Failed to update counselor", details: err.message });
  }
});

// Delete counselor
app.delete("/counselors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCounselor = await CounselorModel.findByIdAndDelete(id);
    if (!deletedCounselor) return res.status(404).json({ error: "Counselor not found" });
    res.status(200).json({ message: "Counselor deleted successfully!" });
  } catch (err) {
    console.error("Counselor delete error:", err);
    res.status(500).json({ error: "Failed to delete counselor" });
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

// ==================== MUSIC ====================

// Get all music
app.get("/music", async (req, res) => {
  try {
    const music = await MusicModel.find().sort({ uploadDate: -1 });
    res.json(music);
  } catch (err) {
    console.error("Music fetch error:", err);
    res.status(500).json({ error: "Failed to fetch music" });
  }
});

// Add new music
app.post("/music", async (req, res) => {
  try {
    const newMusic = new MusicModel(req.body);
    await newMusic.save();
    res.status(201).json({ message: "Music added successfully!", music: newMusic });
  } catch (err) {
    console.error("Music save error:", err);
    res.status(500).json({ error: "Failed to add music" });
  }
});

// Update music
app.put("/music/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMusic = await MusicModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMusic) {
      return res.status(404).json({ error: "Music not found" });
    }
    res.status(200).json(updatedMusic);
  } catch (err) {
    console.error("Music update error:", err);
    res.status(500).json({ error: "Failed to update music" });
  }
});

// Delete music
app.delete("/music/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMusic = await MusicModel.findByIdAndDelete(id);
    if (!deletedMusic) return res.status(404).json({ error: "Music not found" });
    res.status(200).json({ message: "Music deleted successfully!" });
  } catch (err) {
    console.error("Music delete error:", err);
    res.status(500).json({ error: "Failed to delete music" });
  }
});

// ==================== SERVER ====================
app.listen(3001, () => {
  console.log("🚀 Server is running on http://localhost:3001");
});

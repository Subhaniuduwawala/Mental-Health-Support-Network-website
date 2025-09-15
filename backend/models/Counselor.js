// backend/models/Counselor.js
import mongoose from "mongoose";

const counselorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    category: { type: String, required: true, trim: true }, // e.g., "Anxiety & Stress"
    experienceYears: { type: Number, default: 0, min: 0 },   // store numeric years
    languages: { type: [String], default: [] },              // ["English","Sinhala"]
    approach: { type: [String], default: [] },               // ["CBT","Mindfulness"]
    quote: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 4 },
    imageUrl: { type: String, default: "" },                 // serve from /uploads or Cloudinary
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

counselorSchema.index({ name: "text", category: "text" });

export default mongoose.model("Counselor", counselorSchema);

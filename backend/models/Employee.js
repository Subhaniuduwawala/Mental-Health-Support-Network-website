import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    specialization: { type: String, trim: true, default: "" },
    experience: { type: String, trim: true, default: "" },
    qualification: { type: String, trim: true, default: "" },
    profileImage: { type: String, default: "" },
    
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);



// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    
    // 👇 Add role (default is "employee")
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    }
  },
  { timestamps: true }
);

// unique email index
EmployeeSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Employee', EmployeeSchema);



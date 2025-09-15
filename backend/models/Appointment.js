// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true, lowercase: true },
    phone:     { type: String, required: true, trim: true },
    mode:      { type: String, enum: ['online', 'inperson'], required: true },
    counselor: { type: String, required: true, trim: true },
    notes:     { type: String, default: '' },

    // Store as a single Date so it’s easy to sort/query
    // The client will send a combined ISO datetime string.
    startAt:   { type: Date, required: true },
  },
  { timestamps: true }
);

// Optional helpful indexes
AppointmentSchema.index({ startAt: 1 });
AppointmentSchema.index({ counselor: 1, startAt: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);

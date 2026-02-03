import mongoose from 'mongoose';

const CounselorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    languages: { type: String, required: true, trim: true },
    approach: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Counselor', CounselorSchema);

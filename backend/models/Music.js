import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  audioData: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    default: "audio/mpeg"
  },
  fileSize: {
    type: String,
    default: "Unknown"
  },
  duration: {
    type: String,
    default: "Unknown"
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const MusicModel = mongoose.model("music", MusicSchema);
export default MusicModel;

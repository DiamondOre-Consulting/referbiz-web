import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalShared: {
    type: Number,
    default: 0,
  },
  totalShortlisted: {
    type: Number,
    default: 0,
  },
  totalJoined: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('User', userSchema);

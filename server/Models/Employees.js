import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  EmpName: {
    type: String,
    required: true,
  },
  EmpEmail: {
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
  document: {
    type: String,
  },
  allCvInfo: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CvSharing'
      }
    ],
    default: [],
  },
  myAsso: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssoUser'
      }
    ],
    default: [],
  },
  profileImage: {
    type: String,
    required: false,
  },
});

export default mongoose.model('EmployeeSchema', EmployeeSchema);

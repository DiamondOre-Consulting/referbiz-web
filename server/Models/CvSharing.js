import mongoose from "mongoose";

const CvSharingFormSchema = new mongoose.Schema({
  refName: {
    type: String,
    required: true,
  },
  refPhone: {
    type: String,
    required: true,
  },
  refUniqueEmailId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
});

export default mongoose.model('CvSharing', CvSharingFormSchema);


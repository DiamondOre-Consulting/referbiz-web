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
  uniqueCode: {
    type: String,
    default: function() {
      return this.userEmail + this.refName;
    },
  },
  isShortlisted: {
    type: Boolean,
    default: false,
  },
  isJoined: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CvSharing', CvSharingFormSchema);


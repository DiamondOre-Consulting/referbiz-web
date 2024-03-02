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
  isAppeared: {
    type: Boolean,
    default: null,
  },
  isShortlisted: {
    type: Boolean,
    default: null,
  },
  isOffered: {
    type: Boolean,
    default: null,
  },
  isJoined: {
    type: Boolean,
    default: null,
  },
  count: {
    type: Number,
    default: 0,
  },
  PDF: {
    type: String,
  },
  referredById: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CvSharing', CvSharingFormSchema);


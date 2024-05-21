import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  allSubmittedLeads: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leads",
      },
    ],
    default: [],
  },
  allProcessingLeads: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leads",
      },
    ],
    default: [],
  },
  allAcceptedLeads: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leads",
      },
    ],
    default: [],
  },
  allRejectedLeads: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leads",
      },
    ],
    default: [],
  },
  myAffiliates: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  myViews: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  myTrainedAffiliates: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  myTotalDistributedCash: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Vendors", vendorSchema);

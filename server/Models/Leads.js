import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema({
  leadName: {
    type: String,
    required: true,
  },
  leadEmail: {
    type: String,
    required: true,
  },
  leadPhone: {
    type: String,
    required: true,
  },
  leadDescription: {
    type: String,
    required: true,
  },
  leadFor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  leadBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  leadStatus: {
    submitted: {
        type: Boolean,
        default: null
    },
    currentStatus: {
        type: String,
    },
    closedStatus: {
        type: Boolean,
        default: null
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Leads", leadsSchema);

import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
import { Inquiry } from "../models/inquiry.model.js";

export const sendInquiry = async (req, res) => {
  try {
    const { jobId, message } = req.body;
    const senderId = req.id; 

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
        success: false
      });
    }

    await Inquiry.create({
      job: jobId,
      sender: senderId,
      message
    });

    return res.status(201).json({
      message: "Inquiry sent successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Inquiry.find().populate('sender').populate('job').sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      enquiries
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const enquiry = await Inquiry.findByIdAndUpdate(
      enquiryId, 
      { status: "Resolved" }, 
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry marked as resolved"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const enquiry = await Inquiry.findByIdAndDelete(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
import express from "express";
import { sendInquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry } from "../controllers/enquiry.controller.js";
import isAuthenticated from "../middlewares/authUser.js";

const router = express.Router();

router.route("/send").post(isAuthenticated, sendInquiry);
router.route("/get").get(isAuthenticated, getEnquiries);
router.route("/resolve/:id").put(isAuthenticated, updateEnquiryStatus);
router.route("/delete/:id").delete(isAuthenticated, deleteEnquiry);

export default router;
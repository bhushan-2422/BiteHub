import { Router } from "express";
import { registerUser, sayMyName, sendOtp } from "../controllers/user.controller.js";

const router = Router()

router.route("/sayMyName").get(sayMyName)
router.route("/registerUser").post(registerUser)
router.route("/send-otp").post(sendOtp)

export default router
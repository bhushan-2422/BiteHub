import { Router } from "express";
import { deleteUser, registerUser, sayMyName, sendOtp, userLogin } from "../controllers/user.controller.js";

const router = Router()

router.route("/sayMyName").get(sayMyName)
router.route("/registerUser").post(registerUser)
router.route("/send-otp").post(sendOtp)
router.route("/user-login").post(userLogin)
router.route("/delete-user").post(deleteUser)

export default router
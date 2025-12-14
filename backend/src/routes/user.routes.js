import { Router } from "express";
import { addToCart, deleteUser, getCurrentUser, registerUser, sayMyName, sendOtp, userLogin, viewMenu } from "../controllers/user.controller.js";
import { verifyJwtUser } from "../middleware/userAuth.middleware.js";

const router = Router()

router.route("/sayMyName").get(sayMyName)
router.route("/registerUser").post(registerUser)
router.route("/send-otp").post(sendOtp)
router.route("/user-login").post(userLogin)
router.route("/delete-user").post(deleteUser)

router.route("/view-menu").get(verifyJwtUser,viewMenu)
router.route("/add-to-cart").post(verifyJwtUser, addToCart)

router.route('/get-current-user').get(verifyJwtUser, getCurrentUser)
export default router
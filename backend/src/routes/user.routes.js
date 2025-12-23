import { Router } from "express";
import { addToCart, changeCity, deleteUser, getCurrentUser, logOutUser, registerUser, sayMyName, sendOtp, userLogin, viewHotels, viewMenu } from "../controllers/user.controller.js";
import { verifyJwtUser } from "../middleware/userAuth.middleware.js";

const router = Router()

router.route("/sayMyName").get(sayMyName)
router.route("/registerUser").post(registerUser)
router.route("/send-otp").post(sendOtp)
router.route("/user-login").post(userLogin)
router.route("/delete-user").post(deleteUser)

router.route("/view-hotels").get(verifyJwtUser, viewHotels)
router.route("/view-menu/:hotelId").get(verifyJwtUser, viewMenu)

router.route("/add-to-cart").post(verifyJwtUser, addToCart)

router.route('/get-current-user').get(verifyJwtUser, getCurrentUser)
router.route('/log-out-user').post(verifyJwtUser, logOutUser)
router.route('/change-city').post(verifyJwtUser, changeCity)
export default router
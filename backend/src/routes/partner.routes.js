import { Router } from "express";
import { acceptOrder, getCurrentPartner, partnerLogin, partnerRegister, sendOtp } from "../controllers/partner.controller.js";
import { verifyJwtPartner } from "../middleware/partnerAuth.middleware.js";

const router = Router()

router.route("/register-partner").post(partnerRegister)
router.route("/login-partner").post(partnerLogin)
router.route('/send-otp').post(sendOtp)

router.route('/accept-order').post(verifyJwtPartner, acceptOrder)
router.route('/get-current-user').get(verifyJwtPartner, getCurrentPartner)
export default router
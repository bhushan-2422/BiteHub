import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { loginHotel, logoutHotel, registerHotel } from "../controllers/hotel.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register-hotel").post(
    upload.fields([
        {
            name:"hotelAvatar",
            maxCount:1
        }
    ]),
    registerHotel
)

router.route("/login-hotel").post(loginHotel)
router.route("/logout-hotel").post(verifyJwt , logoutHotel)
export default router
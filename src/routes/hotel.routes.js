import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addMenuItems, loginHotel, logoutHotel, registerHotel } from "../controllers/hotel.controller.js";
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

router.route("/add-menu-items").post(
    upload.fields([
        {
            name:"itemAvatar",
            maxCount: 1
        }
    ]),
    verifyJwt,
    addMenuItems
)
export default router
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerHotel } from "../controllers/hotel.controller.js";

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

export default router
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addMenuItems, deleteHotel, getCurrentHotel, getMenuItems, loginHotel, logoutHotel, placedOrders, registerHotel } from "../controllers/hotel.controller.js";
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

router.route('/get-current-user').get(verifyJwt, getCurrentHotel)
router.route('/get-menu-items').get(verifyJwt, getMenuItems)
router.route('/orders-placed').get(verifyJwt, placedOrders)


router.route('/delete-all-hotel').post(deleteHotel)

export default router
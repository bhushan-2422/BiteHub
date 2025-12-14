import jwt from "jsonwebtoken";
import { Hotel } from "../models/hotel.model.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // 🔹 Not logged in → 401 (DO NOT THROW)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const hotel = await Hotel.findById(decoded._id);
    if (!hotel) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.hotel = hotel;
    next();
  } catch (err) {
    console.error("verifyJwtHotel error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

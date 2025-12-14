import jwt from "jsonwebtoken";
import { Partner } from "../models/partner.model.js";

export const verifyJwtPartner = async (req, res, next) => {
  try {
    // ✅ Correct token extraction
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // 🔹 Not logged in → 401 (DO NOT THROW)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const partner = await Partner.findById(decoded._id);
    if (!partner) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // attach partner to request
    req.partner = partner;
    next();
  } catch (err) {
    console.error("verifyJwtPartner error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

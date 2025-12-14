import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwtUser = async (req, res, next) => {
  try {
    // ✅ CORRECT cookie access
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // 🔹 NOT logged in → 401 (DO NOT THROW)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("verifyJwtUser error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};








// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"

// export const verifyJwtUser = asyncHandler(async (req,res,next)=>{
//     try{
//         const token = req.cookie || req.header("Authorization")?.replace("Bearer ","")
//         if(!token){
//             throw new ApiError(401,"unothorized request..")
//         }

//         const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         const user = await User.findById(decodedToken?._id)
//         if(!user){
//             throw new ApiError(400,"invalid access token")
//         }

//         req.user = user
//         next()
//     }catch(e){
//         throw new ApiError(400,e?.message || "invalid access token...")
//     }
// })
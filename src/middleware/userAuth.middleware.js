import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJwtUser = asyncHandler(async (req,res,next)=>{
    try{
        const token = req.cookie || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"unothorized request..")
        }

        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(400,"invalid access token")
        }

        req.user = user
        next()
    }catch(e){
        throw new ApiError(400,e?.message || "invalid access token...")
    }
})
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Hotel } from "../models/hotel.model.js";

export const verifyJwt = asyncHandler(async(req,res,next)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log("TOKEN VALUE:", token);
console.log("TYPE:", typeof token);
        if(!token){
            throw new ApiError(401,"unauthorized request..")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const hotel = await Hotel.findById(decodedToken?._id)
        if(!hotel){
            throw new ApiError(400,"invalid access token..")

        }
        req.hotel = hotel
        next()
        
    }catch(e){
        throw new ApiError(401,e?.message || "invalid access token")
    }
})
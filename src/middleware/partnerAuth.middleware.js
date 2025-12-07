import { Partner } from "../models/partner.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJwtPartner = asyncHandler(async(req,res,next)=>{
    try{
        const {token} = req.cookie || res.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(400,"unauthorized req..")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const partner = await Partner.findById(decodedToken?._id)
        if(!partner){
            throw new ApiError(400,"invalid access token..")
        }
        req.partner = partner
        next()

    }catch(e){
        throw new ApiError(400,"invalid access token ",e)
    }
})
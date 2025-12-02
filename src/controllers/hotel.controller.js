import { Hotel } from "../models/hotel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerHotel = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name, latitude,longitude, phone, email, password} = req.body
    if(!(name && latitude && longitude && phone && email && password)){
        throw new ApiError(400,"all details are required..")
    }

    const avatarLocalPath = req.files?.hotelAvatar[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }

    const hotelAvatar = await uploadOnCloudinary(avatarLocalPath)
    if(!hotelAvatar){
        throw new ApiError(400,"failed to upload on cloudinary..")
    }

    const hotel = await Hotel.create(
        {
            name,
            email,
            password: password,
            hotelAvatar: hotelAvatar.url,
            location:{
                type:"Point",
                coordinates:[longitude,latitude]
            },
            phone

        }
    )
    const createdHotel = await Hotel.findById(hotel._id).select("-password")
    if(!createdHotel){
        throw new ApiError(400,"failed to create a new hotel")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,createdHotel,"new hotel is registered succesfully..."))
})

export {registerHotel}
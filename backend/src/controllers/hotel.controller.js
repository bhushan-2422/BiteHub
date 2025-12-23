import { Hotel } from "../models/hotel.model.js";
import { Item } from "../models/items.model.js";
import { Order } from "../models/orders.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async(hotelId)=>{
    try{
        const hotel = await Hotel.findById(hotelId)
        const accessToken = hotel.generateAccessToken()
        const refreshToken = hotel.generateRefreshToken()
        hotel.refreshToken = refreshToken

        await hotel.save({validateBeforeSave:false})
        return {refreshToken, accessToken}
    }catch(e){
        throw new ApiError(400,`failed to generate access and refresh token.. ${e}`)
    }
}

const registerHotel = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name, latitude,longitude, phone, email, password, city} = req.body
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
            phone,
            city

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
const loginHotel = asyncHandler(async(req,res)=>{
    const {email,phone, password} = req.body
    if ((!email && !phone) || !password) {
        throw new ApiError(400, "Email or phone is required. Password is required.")
    }

    const hotel = await Hotel.findOne(
        {
            $or:[{email},{phone}]
        }
    )
    if(!hotel){
        throw new ApiError(400,"hotel does not exist")
    }
    console.log(hotel)
    const {refreshToken, accessToken} = await generateAccessAndRefreshToken(hotel._id)

    const loggedInHotel = await Hotel.findById(hotel._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(
        200,
        {
            hotel: loggedInHotel,
            accessToken,
            refreshToken
        },
        "hotel logged in succesfully.."))
})

const getCurrentHotel = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.hotel, "user fetched succesfully.."));
});

const logoutHotel = asyncHandler(async(req,res)=>{
    await Hotel.findByIdAndUpdate(
        req.hotel._id,
        {
            $set: {refreshToken: undefined}
        },
        {new: true}
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken",options)
    .cookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out succesfully..."))
})



const addMenuItems = asyncHandler(async(req,res)=>{
    const {title,price, category} = req.body
    const ownerId = req.hotel._id

    if(!(title && price && category && ownerId)){
        throw new ApiError(400,"all fields are required...")
    }

    const avatarLocalPath = req.files?.itemAvatar[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"itemAvatar file is required")
    }
    const itemAvatar = await uploadOnCloudinary(avatarLocalPath)
    if(!itemAvatar){
        throw new ApiError(400,"failed to upload on cloudinary..")
    }

    const item = await Item.create(
        {
            title,
            price,
            category,
            owner:ownerId,
            itemAvatar: itemAvatar.url
        }
    )
    
    return res
    .status(200)
    .json(new ApiResponse(200,item,"item is created"))
})

const getMenuItems = asyncHandler(async(req,res)=>{
    const hotel = req.hotel;
    if(!hotel){
        throw new ApiError(400,"invalid hotel...")
    }
    const items = await Item.find({owner: hotel?._id})

    return res
    .status(200)
    .json(new ApiResponse(200,items,"items fetched succesfully.."))
})

const placedOrders = asyncHandler(async(req,res)=>{
    const hotel = req.hotel
    if(!hotel){
        throw new ApiError(400,"invalid hotel..")
    }

    const orders = await Order.find({
        hotel: hotel._id,
        status: 'placed'
    })

    return res
    .status(200)
    .json(new ApiResponse(200,orders,"orders fetched succesfully.."))

})

const deleteHotel = asyncHandler(async (req, res) => {
  
    const deletedHotel = await Hotel.deleteMany({});
  return res
    .status(200)
    .json(new ApiResponse(200, deletedHotel, "hotel deleted succesfully.."));
});
 
export {registerHotel, loginHotel,logoutHotel, addMenuItems, getCurrentHotel, getMenuItems, placedOrders, deleteHotel}
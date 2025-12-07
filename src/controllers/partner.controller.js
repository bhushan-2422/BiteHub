import { Order } from "../models/orders.model.js";
import { Otp } from "../models/otp.model.js";
import { Partner } from "../models/partner.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import twilio from "twilio"

const generateAccessAndRefreshToken = async(userId) =>{
    try{
        const  user = await Partner.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}

    }catch(e){
        throw new ApiError(500,"something went wrong while generating tokens...")
    }
}

const partnerRegister = asyncHandler(async(req,res)=>{
    const {fullname, phone, email, otp,longitude,latitude} = req.body
    if(!(fullname && phone && email)){
        throw new ApiError(400,"all fields are required..")
    }

    const savedOtp = await Otp.find({phone, OTP:otp})
    if(!savedOtp){
        throw new ApiError(400,"incorrect otp")
    }
    const user = await Partner.create({
        phone,
        email,
        fullname,
        location:{
            type:"Point",
            coordinates: [longitude, latitude]
        }
    })

    const createdUser = await Partner.findById(user._id)
    if(!createdUser){
        throw new ApiError(400, "failed to create a new User")
    }
    console.log(createdUser)

    return res
    .status(200)
    .json(new ApiResponse(200,createdUser,"user created succesfully.."))
})

const partnerLogin = asyncHandler(async(req,res)=>{
    const {phone, otp} = req.body
    if(!phone || !otp){
        throw new ApiError(400,"phone and otp is required..")
    }
    const storedOtp = await Otp.findOne({phone,OTP: otp})

    if(!storedOtp){
        throw new ApiError(400,"failed to validate otp..")
    }

    const user = await Partner.findOne({phone})
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await Partner.findById(user._id).select("-refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {user: loggedInUser, accessToken,refreshToken}, 
            "user logged in succesfully.."
        )
    )
})

const sendOtp = asyncHandler(async(req,res)=>{
    const {phone} = req.body
    if(!phone){
        throw new ApiError(400,"phone number is required..")
    }
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);
    let digits = '0123456789';
    let OTP = '';
    let len = digits.length
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
    }

    const data = await client.messages
        .create({
            body: `your requested OTP is ${OTP}`,
            messagingServiceSid: 'MG73b960a7d591760eeaf4365d35eae47f',
            to: `+91${phone}`
        })
    
    console.log(data)
    const storeOtp = await Otp.create({phone,OTP})
    const isOtpSaved = await Otp.findById(storeOtp._id).select("-OTP")

    return res
    .status(200)
    .json(new ApiResponse(200,isOtpSaved,"otp send and saved succesfully.."))  
})

const acceptOrder = asyncHandler(async(req,res)=>{
    const {orderId} = req.body
    if(!orderId){
        throw new ApiError(400,"order id is required..")
    }
    const order = await Order.findOne({
        _id: orderId,
        status: 'accepted',
        partner: { $exists: false } // not already assigned

    }) 

    if(!order){
        throw new ApiError(400,"either order is already assigned or not exist..")
    }
    order.partner = req.partner?._id
    order.status = 'picked_up'
    order.save()

    return res
    .status(200)
    .json(new ApiResponse(200,order,"your order is picked up"))
})

const deliverOrder = asyncHandler(async(req,res)=>{
    const {orderId, paymentMtd} = req.body
    if(!orderId || !paymentMtd ){
        throw new ApiError(400,"order is is required..")
    }
    const order = await Order.findById(orderId)
    if(order.paymentStatus == 'pending' && paymentMtd == 'upi'){
        // payment gateway for online paymnet
        //at the time of delivery
    }
    if(order.paymentStatus == 'pending' && paymentMtd == 'cash'){
        // payment gateway for online paymnet
        //at the time of delivery
        //deduct money from the partner account
        //order_amount - partner charges = partner profit
    }

    const updatedOrder = await Order.findById(orderId) 
    if(order.paymentStatus == 'failed'){
        throw new ApiError(400,"payment failed..")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedOrder,"order is delivered succesfully"))

})

export {partnerRegister, partnerLogin, sendOtp, acceptOrder}
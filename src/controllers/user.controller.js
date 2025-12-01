import { Otp } from "../models/otp.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import twilio from "twilio"

const sayMyName = async(req,res)=>{
    return res.status(200).json({
        name: "bhushan",
        age:20
    })
}

const registerUser = asyncHandler(async(req,res)=>{

    //req -> body
    //username, fullname, email, password
    //check everything
    //check if user is present already
    //create if not present 
    //return the response

    const {phone, email, fullname, latitude, longitude} = req.body
    console.log("email is --> ",email)

    if(!(phone && email && fullname)){
        throw new ApiError(400,"all fields are required")
    }

    const user = await User.create({
        phone,
        email,
        fullname,
        location:{
            type:"Point",
            coordinates: [longitude, latitude]
        }
    })

    const createdUser = await User.findById(user._id)
    if(!createdUser){
        throw new ApiError(400, "failed to create a new User")
    }
    console.log(createdUser)

    return res
    .status(200)
    .json(new ApiResponse(200,createdUser,"user created succesfully.."))

})

const userLogin = asyncHandler(async(req,res)=>{
    
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

export {sayMyName, registerUser,sendOtp}
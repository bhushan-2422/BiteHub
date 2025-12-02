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

const generateAccessAndRefreshToken = async(userId) =>{
    try{
        const  user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    }catch(e){
        throw new ApiError(500,"something went wrong while generating tokens...")
    }
}

const registerUser = asyncHandler(async(req,res)=>{

    //req -> body
    //username, fullname, email, password
    //check everything
    //check if user is present already
    //create if not present 
    //return the response

    const {phone, email, fullname, latitude, longitude, otp} = req.body
    console.log("email is --> ",email)

    if(!(phone && email && fullname && otp)){
        throw new ApiError(400,"all fields are required")
    }
    const storedOtp = await Otp.findOne({phone,OTP: otp})
    if(!storedOtp){
        throw new ApiError(400,"failed to validate otp..")
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
    const {phone, otp} = req.body
    if(!phone || !otp){
        throw new ApiError(400,"phone and otp is required..")
    }
    const storedOtp = await Otp.findOne({phone,OTP: otp})

    if(!storedOtp){
        throw new ApiError(400,"failed to validate otp..")
    }

    const user = await User.findOne({phone})
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-refreshToken")
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

const deleteUser = asyncHandler(async(req,res)=>{
    const {email} = req.body

    const deletedUser = await User.deleteMany({email})
    return res
    .status(200)
    .json(new ApiResponse(200,deletedUser,"user deleted succesfully.."))
})



export {sayMyName, registerUser,sendOtp,userLogin, deleteUser}
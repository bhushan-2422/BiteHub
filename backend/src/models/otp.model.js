import mongoose,{Schema} from "mongoose";

const otpSchema = new Schema(
    {
        phone:{
            type:Number,
        },
        OTP:{
            type:String,
        },
        createdAt:{
            type: Date,
            expires: '5m',
            default: Date.now
        }
    }
)

export const Otp = mongoose.model('Otp',otpSchema)
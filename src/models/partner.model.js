import mongoose,{Schema} from "mongoose";

const partnerSchema = new Schema(
    {
        name:{
            type:String,
            required: true
        },
        phone:{
            type:Number,
            required: true
        },
        earning:{
            type:Number
        },
        email:{
            type:String,
            required: true
        },
        location:{
            type:String
        }
    },{
        timestamps: true
    }
)
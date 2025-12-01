import mongoose,{Schema} from "mongoose";

const hotelSchema = new Schema(
    {
        name:{
            type:String,
            required: true
        },
        location:{
            type:{
                type:String,
                enum:['Point'],
                required: true
            },
            coordinates:{
                type:[Number],
                required: true
            }
        },
        hotelAvatar:{
            type:String,
            required:true
        },
        phone:{
            type: Number,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true
        },
        rating:{
            type: Number,
            min: 0,
            max: 5,
            required:true
        },
        menu:[
            {
                type: Schema.Types.ObjectId,
                ref: "Item"
            }
        ]

    },
    {
        timestamps:true
    }
)

export const Hotel = mongoose.model("Hotel",hotelSchema)
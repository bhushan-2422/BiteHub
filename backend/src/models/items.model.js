import mongoose,{Schema} from "mongoose";

const itemSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        rating:{
            type:Number,
            min:0,
            max:5
        },
        itemAvatar:{
            type:String
        },
        category:{
            type:String,
            enum:['rice','breakfast','soups','south indian','beverages','breads','other'],
            default:'other'
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:'Hotel'
        }
    },
    {
        timestamps: true
    }
)

export const Item = mongoose.model("Item",itemSchema)
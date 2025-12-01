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
            required:true,
            min:0,
            max:5
        },
        itemAvatar:{
            type:String
        },
        type:{
            type:String,
            enum:['veg','non-veg','egg']
        },
        category:{
            type:String,
            enum:['rice','breakfast','soups','south indian','beverages','breads']
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
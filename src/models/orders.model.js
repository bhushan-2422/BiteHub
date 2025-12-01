import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        hotel:{
            type: Schema.Types.ObjectId,
            ref: "Hotel"
        },
        items:[
            {
                type:Schema.Types.ObjectId,
                ref:'Item'
            }
        ],
        status:{
            type:String,
            enum:['Delivered','not delivered']
        },
        total:{
            type: Number,
            required: true
        }
    },{
        timestamps: true
    }
)

export const Order = mongoose.model("Order",orderSchema)
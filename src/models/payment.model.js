import mongoose,{Schema} from "mongoose";

const paymentSchema = new Schema(
    {
        orderId:{
            type: Schema.Types.ObjectId,
            ref:'Order'
        },
        paymentMethod:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required:true
        },
        status:{
            type:String,
        }
    },{
        timestamps: true
    }
)

export const Payment = mongoose.model('Payment',paymentSchema)
import mongoose,{Schema} from "mongoose";

const orderItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    priceAtPurchase: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        hotel:{
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: true
        },
        partner:{
            type: Schema.Types.ObjectId,
            ref:'Partner'
        },
        items:{
            type:[orderItemSchema],
            default:[]
        },
        status:{
            type:String,
            enum:['cart', 'placed', 'accepted','declined','picked_up', 'delivered'],
            default:'cart'
        },
        total:{
            type: Number,
        },
        paymentStatus:{
            type: String,
            enum:['pending', 'paid', 'failed', 'refunded']
        },
        paymentMethod:{
            type:String,
            enum:['upi','cash']
        }
    },{
        timestamps: true
    }
)

export const Order = mongoose.model("Order",orderSchema)
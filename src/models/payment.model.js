import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    method: {
      type: String, // 'upi', 'card', 'netbanking', etc.
    },
    gateway: {
      type: String, // 'razorpay', 'cashfree', etc.
    },
    paymentOrderId: {
      type: String, // gateway order id
    },
    paymentId: {
      type: String, // gateway payment id / txn id
    },
    paymentSignature: {
      type: String, // for verification
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    rawResponse: {
      type: Schema.Types.Mixed, // optional, store gateway payload
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);

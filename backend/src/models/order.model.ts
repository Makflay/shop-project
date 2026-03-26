import { Schema, model } from "mongoose";
import * as ordertTypes from "../types/orders.type";

const orderItemSchema = new Schema<ordertTypes.IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema<ordertTypes.IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["progress", "pending"],
      default: "progress",
    },
  },
  { timestamps: true },
);

const Order = model<ordertTypes.IOrder>("Order", orderSchema);
export default Order;

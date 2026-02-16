import mongoose, { Schema } from "mongoose";
import { IProduct } from "./IProduct";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Product", productSchema);

import mongoose, { Schema } from "mongoose";
import * as productTypes from "../types/products.type";

const productSchema = new Schema<productTypes.IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothes", "Books", "Home", "Sports"],
    },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

const Product = mongoose.model<productTypes.IProduct>("Product", productSchema);
export default Product;

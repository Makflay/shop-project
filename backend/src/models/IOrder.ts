import { Document, Types } from "mongoose";
import { IOrderItem } from "./IOrderItem";

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

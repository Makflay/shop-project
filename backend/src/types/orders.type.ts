import { Document, Types } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICreateOrderDto {
  userId: string;
  items: IOrderItem[];
}

export interface IUpdateOrderDto {
  items: IOrderItem[];
}

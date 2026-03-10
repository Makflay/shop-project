import { Document, Types } from "mongoose";

export type OrderStatus = "progress" | "pending";

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
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

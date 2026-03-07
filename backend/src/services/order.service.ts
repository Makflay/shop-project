import { Types } from "mongoose";
import Order from "../models/order.model";
import Product from "../models/product.model";
import * as orderTypes from "../types/orders.type";

export const createOrder = async (
  dto: orderTypes.ICreateOrderDto,
): Promise<orderTypes.IOrder> => {
  const productIds = dto.items.map((i) => new Types.ObjectId(i.productId));

  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== dto.items.length) {
    throw new Error("One or more products not found");
  }

  const orderItems = dto.items.map((i) => {
    const product = products.find((p) => p._id.equals(i.productId))!;

    return {
      product: product._id,
      quantity: i.quantity,
      price: product.price,
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0,
  );

  const order = new Order({
    user: new Types.ObjectId(dto.userId),
    items: orderItems,
    totalAmount,
  });

  await order.save();

  return order;
};

export const getUserOrders = async (userId: string) => {
  return Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });
};

// export const getOrderById = async (orderId: string) => {
//   const order = await Order.findById(orderId)
//     .populate("items.product")
//     .populate("user");

//   if (!order) throw new Error("Order not found");

//   return order;
// };

export const updateOrder = async (
  orderId: string,
  userId: string,
  dto: orderTypes.IUpdateOrderDto,
) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const productsIds = dto.items.map((i) => new Types.ObjectId(i.productId));

  const products = await Product.find({
    _id: { $in: productsIds },
  });

  if (products.length !== dto.items.length) {
    throw new Error("Products not found");
  }

  const orderItems = dto.items.map((i) => {
    const product = products.find((p) => p._id.equals(i.productId))!; //!
    return {
      productId: product._id,
      quantity: i.quantity,
      price: product.price,
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0,
  );

  order.items = orderItems;
  order.totalAmount = totalAmount;

  await order.save();

  return order;
};

export const deleteOrder = async (orderId: string, userId: string) => {
  const order = await Order.findOneAndDelete({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

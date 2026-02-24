import { Types } from "mongoose";
import { Order } from "../models/order.model";
import { IOrder } from "../models/IOrder";
import { Product } from "../models/product.model";
import { ICreateOrderDto } from "./ICreateOrderDto";

class OrderService {
  async createOrder(dto: ICreateOrderDto): Promise<IOrder> {
    const productIds = dto.items.map((i) => new Types.ObjectId(i.productId));

    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== dto.items.length) {
      throw new Error("One or more products not found");
    }

    const orderItems = dto.items.map((i) => {
      const product = products.find((p) => p._id.toString() === i.productId)!;

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

    return order;
  }

  async getUserOrders(userId: string) {
    return Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
  }

  async getOrderById(orderId: string) {
    const order = await Order.findById(orderId)
      .populate("items.product")
      .populate("user");

    if (!order) throw new Error("Order not found");

    return order;
  }
}

export const orderService = new OrderService();

import { Request, Response, NextFunction } from "express";
import { orderService } from "../services/order.service";

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const order = await orderService.createOrder({
        userId,
        items: req.body.items,
      });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const orders = await orderService.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    try {
      const order = await orderService.getOrderById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();

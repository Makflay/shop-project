import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { successResponse, errorResponse } from "../utils/api.response";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const order = await orderService.createOrder({
      userId,
      items: req.body.items,
    });
    return successResponse(res, order, 201, "Order created");
  } catch (error: any) {
    return errorResponse(res, error.massage);
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }
    const orders = await orderService.getUserOrders(userId);
    return successResponse(res, orders);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

// export const getOrderById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if (!id || Array.isArray(id)) {
//     //return res.status(400).json({ message: "Order ID is required" });
//     return errorResponse(res, "Order ID is required", 400);
//   }

//   try {
//     const order = await orderService.getOrderById(id);
//     //res.json(order);
//     return successResponse(res, order);
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    if (Array.isArray(id)) {
      return errorResponse(res, "Invalid order ID", 400);
    }

    if (!id) {
      return errorResponse(res, "Order ID is required", 400);
    }

    const order = await orderService.updateOrder(id, userId, req.body);

    return successResponse(res, order, 200, "Order updated");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    if (Array.isArray(id)) {
      return errorResponse(res, "Invalid order ID", 400);
    }

    if (!id) {
      return errorResponse(res, "Order ID is required", 400);
    }

    await orderService.deleteOrder(id, userId);

    return successResponse(res, null, 200, "Order deleted");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

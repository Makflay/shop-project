import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { successResponse, errorResponse } from "../utils/api.response";

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

export const getProgressOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }
    const order = await orderService.getOrCreateProgressOrder(userId);
    return successResponse(res, order);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    console.log(productId, quantity);

    if (!userId) {
      return errorResponse(res, "Unathorized", 401);
    }

    if (!productId || !quantity) {
      return errorResponse(res, "ProductId and quantity are required", 400);
    }

    const order = await orderService.addProductToOrder(
      userId,
      productId,
      quantity,
    );
    return successResponse(res, order, 200, "Product added to cart");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const removeProductFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id: productId } = req.params;

    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    if (Array.isArray(productId)) {
      return errorResponse(res, "Invalid order ID", 400);
    }

    if (!productId) {
      return errorResponse(res, "Order ID is required", 400);
    }

    const order = await orderService.removeProductFromOrder(userId, productId);

    return successResponse(res, order, 200, "Order deleted");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id: productId } = req.params;
    const { quantity } = req.body;
    console.log("req.params", req.params);
    console.log("productId", productId);
    console.log("quantity", quantity);

    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    if (Array.isArray(productId)) {
      return errorResponse(res, "Invalid order ID", 400);
    }

    if (!productId) {
      return errorResponse(res, "Order ID is required", 400);
    }

    if (!quantity) {
      return errorResponse(res, "Quantity is required", 400);
    }

    const order = await orderService.updateProductQuantity(
      userId,
      productId,
      quantity,
    );

    return successResponse(res, order, 200, "Order updated");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const order = await orderService.confirmOrder(userId);

    return successResponse(res, order, 201, "Order created");
  } catch (error: any) {
    return errorResponse(res, error.massage);
  }
};

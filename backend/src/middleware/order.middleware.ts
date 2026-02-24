import { Request, Response, NextFunction } from "express";

export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Items are required and must be a non-empty array" });
  }

  for (const item of items) {
    if (!item.productId || typeof item.productId !== "string") {
      return res
        .status(400)
        .json({ message: "Each item must have a valid productId" });
    }

    if (
      !item.quantity ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0
    ) {
      return res
        .status(400)
        .json({
          message: "Each item must have a valid quantity (positive number)",
        });
    }
  }
  next();
};

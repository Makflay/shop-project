import { Request, Response, NextFunction } from "express";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  next();
};

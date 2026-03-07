import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { successResponse, errorResponse } from "../utils/api.response";

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (
      !["Electronics", "Clothes", "Books", "Home", "Sports"].includes(
        req.body.category,
      )
    ) {
      return errorResponse(
        res,
        "Category must be one of Electronics, Clothes, Books, Home, Sports",
        400,
      );
    }

    const product = await ProductService.createProduct(req.body);
    return successResponse(res, product, 201, "Product created");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    return successResponse(res, products);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return errorResponse(res, "Product ID is required", 400);
  }

  try {
    const product = await ProductService.getProductById(id);
    return successResponse(res, product);
  } catch (error: any) {
    return errorResponse(res, error.message, 404);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return errorResponse(res, "Product ID is required", 400);
  }

  if (
    !["Electronics", "Clothes", "Books", "Home", "Sports"].includes(
      req.body.category,
    )
  ) {
    return errorResponse(
      res,
      "Category must be one of Electronics, Clothes, Books, Home, Sports",
      400,
    );
  }

  try {
    const updatedProduct = await ProductService.updateProduct(id, req.body);
    return successResponse(res, updatedProduct, 200, "Product updated");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return errorResponse(res, "Product ID is required", 400);
  }

  try {
    await ProductService.deleteProduct(id);
    return successResponse(res, null, 200, "Product deleted");
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

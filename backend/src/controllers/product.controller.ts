import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    try {
      const product = await ProductService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    try {
      const updatedProduct = await ProductService.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    try {
      await ProductService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

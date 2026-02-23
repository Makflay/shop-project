import { Product } from "../models/product.model";
import { IProduct } from "../models/IProduct";

export class ProductService {
  static async createProduct(data: Partial<IProduct>) {
    return Product.create(data);
  }

  static getAllProducts() {
    return Product.find();
  }

  static getProductById(id: string) {
    return Product.findById(id);
  }

  static updateProduct(id: string, data: Partial<IProduct>) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  static deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
  }
}

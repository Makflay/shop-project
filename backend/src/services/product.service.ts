import Product from "../models/product.model";
import * as productTypes from "../types/products.type";

export class ProductService {
  static async createProduct(data: Partial<productTypes.IProduct>) {
    return Product.create(data);
  }

  static getAllProducts() {
    return Product.find();
  }

  static getProductById(id: string) {
    return Product.findById(id);
  }

  static updateProduct(id: string, data: Partial<productTypes.IProduct>) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  static deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
  }
}

import type { IProduct } from "./product";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  totalAmount: number;
}

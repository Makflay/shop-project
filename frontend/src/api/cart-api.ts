import apiClient from "./api-client";
import type { ICart } from "../types/cart";

export const getCart = async (): Promise<ICart> => {
  const res = await apiClient("/orders/cart", {
    method: "GET",
  });

  return res.data;
};

export const addToCart = async (
  productId: string,
  quantity: number,
): Promise<ICart> => {
  const res = await apiClient("/orders/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

  return res.data;
};

export const updateCartItem = async (
  productId: string,
  quantity: number,
): Promise<ICart> => {
  const res = await apiClient(`/orders/cart/update/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

  return res.data;
};

export const removeCartItem = async (productId: string): Promise<ICart> => {
  const res = await apiClient(`/orders/cart/remove/${productId}`, {
    method: "DELETE",
  });

  return res.data;
};

export const confirmOrder = async (): Promise<ICart> => {
  const res = await apiClient("/orders/confirm", {
    method: "POSt",
  });

  return res.data;
};

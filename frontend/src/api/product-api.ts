import apiClient from "./api-client";
import type { IProduct, ICreateProductDto } from "../types/product";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const res = await apiClient("/products", {
    method: "GET",
  });
  return res.data;
};

export const createProduct = async (data: ICreateProductDto) => {
  const res = await apiClient("/products/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
};

export const updateProduct = async (id: string, data: ICreateProductDto) => {
  const res = await apiClient(`/products/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return res.data;
};

export const deleteProduct = async (id: string) => {
  await apiClient(`/products/${id}`, {
    method: "DELETE",
  });
};

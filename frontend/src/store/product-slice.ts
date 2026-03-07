import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../api/product-api";
import type { IProduct, ICreateProductDto } from "../types/product";

interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: IProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await productApi.getAllProducts();
});

export const createProductThunk = createAsyncThunk(
  "products/create",
  async (product: ICreateProductDto) => {
    return await productApi.createProduct(product);
  },
);

export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, product }: { id: string; product: ICreateProductDto }) => {
    return await productApi.updateProduct(id, product);
  },
);

export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id: string) => {
    await productApi.deleteProduct(id);
    return id;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;

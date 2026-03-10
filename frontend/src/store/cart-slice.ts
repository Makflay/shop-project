import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartApi from "../api/cart-api";
import type { ICart } from "../types/cart";

interface ICartState {
  cart: ICart | null;
  loading: boolean;
  error: string | null;
}

const initialState: ICartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  return await cartApi.getCart();
});

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    return await cartApi.addToCart(productId, quantity);
  },
);

export const updateCartItemThunk = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    return await cartApi.updateCartItem(productId, quantity);
  },
);

export const removeCartItemThunk = createAsyncThunk(
  "cart/remove",
  async (productId: string) => {
    return await cartApi.removeCartItem(productId);
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItemThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;

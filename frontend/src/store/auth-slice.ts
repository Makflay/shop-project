import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../api/auth-api";
import type { IAuthState, ILoginData } from "../types/auth";

const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await loginApi(email, password);
    console.log("Login response:", data);
    localStorage.setItem("token", data.token);
    return data;
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    const data = await registerApi(email, name, password);
    console.log("Register response:", data);
    localStorage.setItem("token", data.token);
    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    const setAuth = (state: IAuthState, action: PayloadAction<ILoginData>) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token;
    };
    builder.addCase(login.fulfilled, setAuth);
    builder.addCase(register.fulfilled, setAuth);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

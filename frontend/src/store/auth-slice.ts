import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginApi, registerApi, getCurrentUser } from "../api/auth-api";
import type { IAuthState, ILoginData } from "../types/auth";

const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await loginApi(email, password);
    console.log("Login response:", res);
    localStorage.setItem("token", res.data.token);
    return res.data;
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
    const res = await registerApi(email, name, password);
    console.log("Register response:", res);
    localStorage.setItem("token", res.data.token);
    return res.data;
  },
);

export const fetchCurrentUser = createAsyncThunk("auth/me", async () => {
  const res = await getCurrentUser();
  console.log("Current user response:", res);
  return res.data;
});

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
      console.log("user object:", user);
      state.user = user;
      state.token = token;
    };

    // login / register
    builder.addCase(login.fulfilled, setAuth);
    builder.addCase(register.fulfilled, setAuth);

    // fetchCurrentUser
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

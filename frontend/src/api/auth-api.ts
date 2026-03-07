import apiClient from "./api-client";
import type { ILoginResponse } from "../types/auth";

export const loginApi = (
  email: string,
  password: string,
): Promise<ILoginResponse> => {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerApi = (
  email: string,
  name: string,
  password: string,
): Promise<ILoginResponse> => {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, name, password }),
  });
};

export const getCurrentUser = (): Promise<ILoginResponse> => {
  return apiClient("/auth/me", {
    method: "GET",
  });
};

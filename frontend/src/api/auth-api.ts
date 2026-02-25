import apiClient from "./api-client";
import type { ILoginData } from "../types/auth";

export const loginApi = (
  email: string,
  password: string,
): Promise<{ data: ILoginData }> => {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerApi = (
  email: string,
  password: string,
): Promise<{ data: ILoginData }> => {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

import apiClient from "./api-client";

export const loginApi = (email: string, password: string) => {
  apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerApi = (email: string, password: string) => {
  apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

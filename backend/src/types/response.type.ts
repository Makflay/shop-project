export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IAuthResponse {
  email: string;
  name: string;
  password: string;
}

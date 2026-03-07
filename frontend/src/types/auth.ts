export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginData extends IUser {
  token: string;
}

export interface ILoginResponse {
  success: boolean;
  data: ILoginData;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
}

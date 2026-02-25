export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
}

export interface ILoginData {
  user: IUser;
  token: string;
}

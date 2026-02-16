import { IUser } from "../models/IUser";

declare global {
  namespace Express {
    export interface Request {
      user?: { id: string; role: "user" | "admin" };
    }
  }
}

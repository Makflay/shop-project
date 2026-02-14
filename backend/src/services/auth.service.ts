import User from "../models/UserShema";
import { IUser } from "../models/IUser";
import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
import { ILoginData } from "./ILoginData";
import { IRegisterData } from "./IRegisterData";

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (data: IRegisterData): Promise<IUser> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = new User(data);
  await user.save();
  return user;
};

export const loginUser = async (
  data: ILoginData,
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  return { user, token };
};

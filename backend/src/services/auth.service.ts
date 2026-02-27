import User from "../models/UserShema";
import { IUser } from "../models/IUser";
import jwt from "jsonwebtoken";
import { IAuthResponse } from "./IAuthResponse";

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (
  data: IAuthResponse,
): Promise<{ user: IUser; token: string }> => {
  console.log("Registering user with data:", data);
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = new User(data);
  await user.save();

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};

export const loginUser = async (
  data: IAuthResponse,
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid email");
  }
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};

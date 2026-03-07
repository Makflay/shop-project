import jwt from "jsonwebtoken";
import User from "../models/user.model";
import * as userTypes from "../types/user.type";
import * as responseTypes from "../types/response.type";

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (
  data: responseTypes.IAuthResponse,
): Promise<{ user: userTypes.IUser; token: string }> => {
  console.log("Registering user with data:", data);
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = new User(data);
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};

export const loginUser = async (
  data: responseTypes.IAuthResponse,
): Promise<{ user: userTypes.IUser; token: string }> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid email");
  }
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};

export const getCurrentUserService = async (
  userId: string,
): Promise<userTypes.IUser | null> => {
  console.log("Fetching current user with ID:", userId);
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

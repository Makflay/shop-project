import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/api.response";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    return successResponse(res, data, 201, "User created");
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    return successResponse(res, data);
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await authService.getCurrentUserService(userId);
    return successResponse(res, user);
  } catch (error: any) {
    return errorResponse(res, "User not found", 404);
  }
};

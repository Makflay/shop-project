import { Request, Response } from "express";
import { getAdminStats } from "../services/admin.service";

export const getAdminStatsController = async (req: Request, res: Response) => {
  try {
    const stats = await getAdminStats();
    res.json(stats);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

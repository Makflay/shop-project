import apiClient from "./api-client";
import type { IAdminStats } from "../types/admin-stats";

export const getAdminStats = async (): Promise<IAdminStats> => {
  const data = await apiClient("/admin/stats");
  return data;
};

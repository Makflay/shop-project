import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";

const router = Router();
router.get(
  "/stats",
  protect,
  adminOnly,
  adminController.getAdminStatsController,
);

export default router;

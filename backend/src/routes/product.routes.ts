import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, async (req, res) => {
  res.json({ message: "List of products (user protected)" });
});

router.post("/", protect, adminOnly, async (req, res) => {
  res.json({ message: "Product created (admin only)" });
});

export default router;

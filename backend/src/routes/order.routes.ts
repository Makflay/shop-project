import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { protect } from "../middleware/auth.middleware";
import { validateCreateOrder } from "../middleware/order.middleware";

const router = Router();
router.post("/", protect, validateCreateOrder, orderController.createOrder);
router.get("/my-orders", protect, orderController.getMyOrders);
router.get("/:id", protect, orderController.getOrderById);

export default router;

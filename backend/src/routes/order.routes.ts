import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";
import { validateCreateOrder } from "../middleware/order.middleware";

const router = Router();
router.get("/", protect, orderController.getMyOrders);
router.post(
  "/create",
  protect,
  validateCreateOrder,
  orderController.createOrder,
);
router.patch("/update/:id", protect, orderController.updateOrder);
router.delete("/:id", protect, orderController.deleteOrder);

//router.get("/:id", protect, orderController.getOrderById);

export default router;

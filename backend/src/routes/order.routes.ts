import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";
import { validateCreateOrder } from "../middleware/order.middleware";

const router = Router();
router.get("/", protect, orderController.getMyOrders);
router.post("/confirm", protect, orderController.confirmOrder);
router.get("/cart", protect, orderController.getProgressOrder);
router.post(
  "/cart/items",
  protect,
  validateCreateOrder,
  orderController.addProductToCart,
);
router.patch("/cart/items/:id", protect, orderController.updateOrder);
router.delete(
  "/cart/items/:id",
  protect,
  orderController.removeProductFromCart,
);

export default router;

// POST /orders/cart/items
// DELETE /orders/cart/items/:productId
// PATCH /orders/cart/items/:productId

// POST /orders/confirm

import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.middleware";
import * as productController from "../controllers/product.controller";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/create", protect, adminOnly, productController.createProduct);
router.patch(
  "/update/:id",
  protect,
  adminOnly,
  productController.updateProduct,
);
router.delete("/:id", protect, adminOnly, productController.deleteProduct);

export default router;

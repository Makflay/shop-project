import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.middleware";
import { ProductController } from "../controllers/product.controller";

const router = Router();

router.get("/", protect, ProductController.getAllProducts);
router.get("/:id", protect, ProductController.getProductById);

router.post("/", protect, adminOnly, ProductController.createProduct);
router.put("/:id", protect, adminOnly, ProductController.updateProduct);
router.delete("/:id", protect, adminOnly, ProductController.deleteProduct);

export default router;

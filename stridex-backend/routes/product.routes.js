import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { productValidationSchema } from "../validators/product.validator.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { getLowStockProducts } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/low-stock", protect, adminOnly, getLowStockProducts);
router.get("/:id", getSingleProduct);

router.post("/", protect, adminOnly,validate(productValidationSchema), createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCheckoutSession } from "../controllers/order.controller.js";
import { getMyOrders } from "../controllers/order.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { checkoutValidationSchema } from "../validators/order.validator.js";
const router = express.Router();

router.post(
  "/checkout",
  protect,
  validate(checkoutValidationSchema),
  createCheckoutSession,
);
router.get("/my-orders", protect, getMyOrders);
export default router;

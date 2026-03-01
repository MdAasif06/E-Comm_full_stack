import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCheckoutSession } from "../controllers/order.controller.js";
import { getMyOrders } from "../controllers/order.controller.js";
const router = express.Router();

router.post("/checkout", protect, createCheckoutSession);
router.get("/my-orders", protect, getMyOrders);
export default router;
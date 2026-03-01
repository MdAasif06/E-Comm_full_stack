import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { getSalesAnalytics } from "../controllers/admin.controller.js";
import { getAllOrders } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/analytics", protect, adminOnly, getSalesAnalytics);
router.get("/orders", protect, adminOnly, getAllOrders);
export default router;
import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { getSalesAnalytics } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/analytics", protect, adminOnly, getSalesAnalytics);

export default router;
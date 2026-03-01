import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCheckoutSession } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/checkout", protect, createCheckoutSession);

export default router;
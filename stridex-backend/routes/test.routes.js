import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/user", protect, (req, res) => {
  res.json({ message: "User route accessed", user: req.user });
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin route accessed" });
});

export default router;
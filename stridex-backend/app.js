import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js"
// import testRoutes from "./routes/test.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";

import adminRoutes from "./routes/admin.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Security Middlewares
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-comm-full-stack-two.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use("/api/webhook", webhookRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StrideX API Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/test", testRoutes);
export default app;
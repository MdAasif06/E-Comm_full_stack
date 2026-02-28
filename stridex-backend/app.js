import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js"
const app = express();

// Security Middlewares
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StrideX API Running 🚀");
});
app.use("/api/auth", authRoutes);

export default app;
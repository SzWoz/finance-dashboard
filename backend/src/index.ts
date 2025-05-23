import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import webpush from "web-push";
import authRoutes from "./routes/auth";
import { connectDB } from "./db";
import transactionRoutes from "./routes/transactions";
import budgetRoutes from "./routes/budgets";
import notificationRoutes from "./routes/notifications";

dotenv.config();
connectDB().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

  webpush.setVapidDetails(
    "mailto:admin@example.com",
    VAPID_PUBLIC_KEY!,
    VAPID_PRIVATE_KEY!
  );

  app.get("/api/vapid-public-key", (_req, res) => {
    res.json({ publicKey: VAPID_PUBLIC_KEY });
  });

  app.use("/api/transactions", transactionRoutes);
  app.use("/api/budgets", budgetRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/auth", authRoutes);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

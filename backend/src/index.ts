import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import webpush from "web-push";
import { connectDB } from "./db.js";
import transactionRoutes from "./routes/transactions.js";
import budgetRoutes from "./routes/budgets.js";
import notificationRoutes from "./routes/notifications.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;

webpush.setVapidDetails(
  "mailto:admin@example.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.get("/api/vapid-public-key", (_req, res) =>
  res.json({ publicKey: VAPID_PUBLIC_KEY })
);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api", notificationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import { Transaction } from "../models/Transaction";
import { auth, AuthRequest } from "../middleware/auth";

const router = express.Router();
router.use(auth);

// GET /api/transactions
router.get("/", async (req: AuthRequest, res) => {
  const transactions = await Transaction.find({ user: req.userId }).sort({
    createdAt: -1,
  });
  res.json(transactions);
});

// POST /api/transactions
router.post("/", async (req: AuthRequest, res) => {
  const { amount, description, type, date, category } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    type,
    date,
    category,
    user: req.userId,
  });
  await transaction.save();
  res.status(201).json(transaction);
});

export default router;

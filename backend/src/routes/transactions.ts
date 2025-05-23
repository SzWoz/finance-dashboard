import express from "express";
import { Transaction } from "../models/Transaction";

const router = express.Router();

// GET /api/transactions
router.get("/", async (_req, res) => {
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  res.json(transactions);
});

// POST /api/transactions
router.post("/", async (req, res) => {
  const { amount, description, type, date } = req.body;
  const transaction = new Transaction({ amount, description, type, date });
  await transaction.save();
  res.status(201).json(transaction);
});

export default router;

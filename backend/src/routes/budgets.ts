import express from "express";
import { Budget } from "../models/Budget";

const router = express.Router();

router.get("/", async (_req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
});

// GET /api/budgets/:month
router.get("/:month", async (req, res) => {
  const budget = await Budget.findOne({ month: req.params.month });
  res.json(budget);
});

// POST /api/budgets
router.post("/", async (req, res) => {
  const { month, amount } = req.body;
  const budget = await Budget.findOneAndUpdate(
    { month },
    { amount },
    { upsert: true, new: true }
  );
  res.status(201).json(budget);
});

export default router;

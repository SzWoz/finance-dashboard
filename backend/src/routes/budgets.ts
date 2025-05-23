import express from "express";
import { Budget } from "../models/Budget";
import { auth, AuthRequest } from "../middleware/auth";

const router = express.Router();
router.use(auth);

// GET /api/budgets
router.get("/", async (req: AuthRequest, res) => {
  const budgets = await Budget.find({ user: req.userId }).sort({
    year: -1,
    month: -1,
  });
  res.json(budgets);
});

// POST /api/budgets           { month, year, total }
router.post("/", async (req: AuthRequest, res) => {
  const { month, year, total } = req.body;
  const budget = await Budget.findOneAndUpdate(
    { user: req.userId, month, year },
    { total },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(budget);
});

export default router;

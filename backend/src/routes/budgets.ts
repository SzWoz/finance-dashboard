import { Router } from "express";
import Budget from "../models/Budget.js";

const router = Router();

router.get("/", async (_req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
});

router.post("/", async (req, res) => {
  const budget = new Budget(req.body);
  await budget.save();
  res.status(201).json(budget);
});

router.put("/:id", async (req, res) => {
  const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;

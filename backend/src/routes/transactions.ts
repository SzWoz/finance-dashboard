import { Router } from "express";
import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import { sendNotification } from "./notifications.js";

const router = Router();

router.get("/", async (_req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

router.post("/", async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();

  if (transaction.type === "expense") {
    const now = new Date(transaction.date);
    const monthlyBudget = await Budget.findOne({
      month: now.getMonth(),
      year: now.getFullYear(),
    });

    if (monthlyBudget) {
      const expensesSum = await Transaction.aggregate([
        {
          $match: {
            type: "expense",
            date: { $gte: new Date(now.getFullYear(), now.getMonth(), 1) },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      const spent = expensesSum[0]?.total ?? 0;
      if (spent > monthlyBudget.total) {
        await sendNotification(
          "Budżet przekroczony",
          `Twoje wydatki przekroczyły budżet ${monthlyBudget.total} zł`
        );
      }
    }
  }

  res.status(201).json(transaction);
});

router.put("/:id", async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;

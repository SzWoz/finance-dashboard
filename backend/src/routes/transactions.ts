import express from "express";
import { Transaction } from "../models/Transaction";
import { Budget } from "../models/Budget";
import { auth, AuthRequest } from "../middleware/auth";
import { sendNotification } from "./notifications";

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
    user: req.userId,
    amount,
    description,
    type,
    category,
    date,
  });
  await transaction.save();

  /* ---------- LOGIKA BUDŻETU ---------- */
  if (type === "expense") {
    const d = new Date(date);
    const month = d.getMonth();
    const year = d.getFullYear();

    const budget = await Budget.findOne({
      user: req.userId,
      month,
      year,
    });

    if (budget) {
      const [{ total: spent = 0 } = {}] = await Transaction.aggregate([
        {
          $match: {
            user: transaction.user,
            type: "expense",
            date: {
              $gte: new Date(year, month, 1),
              $lt: new Date(year, month + 1, 1),
            },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      if (spent > budget.total) {
        await sendNotification(
          "Budżet przekroczony!",
          `Twoje wydatki w ${month + 1}/${year} przekroczyły limit ${
            budget.total
          } zł`
        );
      }
    }
  }

  res.status(201).json(transaction);
});

export default router;

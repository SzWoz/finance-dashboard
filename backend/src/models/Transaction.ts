import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  type: { type: String, enum: ["income", "expense"], required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);

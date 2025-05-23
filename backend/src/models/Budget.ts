import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  month: String,
  amount: Number,
});

export const Budget = mongoose.model("Budget", budgetSchema);

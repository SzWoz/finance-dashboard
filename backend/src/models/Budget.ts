import { Schema, model } from "mongoose";

export interface IBudget {
  month: number; // 0-11
  year: number;
  total: number;
  categories: { name: string; limit: number }[];
}

const BudgetSchema = new Schema<IBudget>({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  total: { type: Number, required: true },
  categories: [
    {
      name: String,
      limit: Number,
    },
  ],
});

export default model<IBudget>("Budget", BudgetSchema);

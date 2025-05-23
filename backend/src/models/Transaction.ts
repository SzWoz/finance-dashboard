import { Schema, model } from "mongoose";

export interface ITransaction {
  description: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: String,
  date: { type: Date, default: Date.now },
});

export default model<ITransaction>("Transaction", TransactionSchema);

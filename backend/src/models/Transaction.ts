import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);

import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: Number, min: 0, max: 11, required: true },
    year: { type: Number, required: true },
    total: { type: Number, required: true },
    categories: [
      {
        name: { type: String },
        limit: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

budgetSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

export const Budget = mongoose.model("Budget", budgetSchema);

import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

export const BudgetOverview: React.FC = () => {
  const { state } = useContext(FinanceContext);
  const now = new Date();
  const budget = state.budgets.find(
    (b) => b.month === now.getMonth() && b.year === now.getFullYear()
  );
  const spent = state.transactions
    .filter(
      (t) =>
        new Date(t.date).getMonth() === now.getMonth() && t.type === "expense"
    )
    .reduce((sum, t) => sum + t.amount, 0);

  if (!budget)
    return <div className="card p-4">Brak budżetu na ten miesiąc.</div>;

  const percentage = Math.min((spent / budget.total) * 100, 100);
  const remaining = budget.total - spent;

  return (
    <div className="card p-4 space-y-2">
      <h2 className="text-xl font-bold">Budżet: {budget.total} zł</h2>
      <div className="w-full h-3 bg-gray-200 rounded">
        <div
          className="h-3 bg-green-500 rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p>Pozostało: {remaining} zł</p>
    </div>
  );
};

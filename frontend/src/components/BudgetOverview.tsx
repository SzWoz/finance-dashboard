import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BudgetForm } from "./BudgetForm";

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
    return (
      <Card>
        <CardContent className="p-4 text-center text-sm text-muted-foreground">
          Brak budżetu na bieżący miesiąc.
          <div className="mt-4">
            <BudgetForm />
          </div>
        </CardContent>
      </Card>
    );

  const percentage = Math.min((spent / budget.total) * 100, 100);
  const remaining = budget.total - spent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budżet miesięczny</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-2xl font-semibold">
          {spent.toFixed(2)} / {budget.total.toFixed(2)} zł
        </CardDescription>

        <Progress value={percentage} />

        <p className="text-sm text-muted-foreground">
          Pozostało: {remaining.toFixed(2)} zł
        </p>
      </CardContent>
      <div className="p-4">
        <BudgetForm />
      </div>
    </Card>
  );
};

import React from "react";
import { BudgetForm } from "./BudgetForm";
import { BudgetTable } from "./BudgetTable";

export const BudgetsPage: React.FC = () => (
  <div className="grid gap-6 lg:grid-cols-2">
    <BudgetForm />
    <BudgetTable />
  </div>
);

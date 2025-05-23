import React, { useContext } from "react";
import { FinanceContext } from "@/context/FinanceContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const BudgetTable: React.FC = () => {
  const { state } = useContext(FinanceContext);

  if (state.budgets.length === 0)
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          Brak zapisanych budżetów.
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budżety</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Miesiąc</th>
              <th className="py-2 text-right">Kwota</th>
            </tr>
          </thead>
          <tbody>
            {state.budgets.map((b) => (
              <tr key={b._id}>
                <td className="py-1">
                  {String(b.month + 1).padStart(2, "0")}/{b.year}
                </td>
                <td className="py-1 text-right">{b.total.toFixed(2)} zł</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

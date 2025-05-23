import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = [
  "#6EE7B7",
  "#818CF8",
  "#F472B6",
  "#FBBF24",
  "#60A5FA",
  "#F87171",
];

export const Reports: React.FC = () => {
  const { state } = useContext(FinanceContext);

  const byCat = state.transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      const key = t.category || "Inne";
      acc[key] = (acc[key] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(byCat).map(([name, value]) => ({ name, value }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raport wydatków wg kategorii</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Brak danych do raportu.
          </p>
        ) : (
          <PieChart width={360} height={360}>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={140}
              label
            >
              {data.map((_, idx) => (
                <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        )}
      </CardContent>
    </Card>
  );
};

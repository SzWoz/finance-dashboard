import React, { useContext } from "react";
import { FinanceContext } from "@/context/FinanceContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { subMonths, format } from "date-fns";

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

  /* --- 1. wydatki wg kategorii --- */
  const byCat = state.transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      const key = t.category || "Inne";
      acc[key] = (acc[key] || 0) + t.amount;
      return acc;
    }, {});
  const pieData = Object.entries(byCat).map(([name, value]) => ({
    name,
    value,
  }));

  /* --- 2. ostatnie 6 mies. balans --- */
  const today = new Date();
  const months = Array.from({ length: 6 }).map((_, i) =>
    subMonths(today, 5 - i)
  );
  const barData = months.map((d) => {
    const m = d.getMonth();
    const y = d.getFullYear();
    const group = state.transactions.filter(
      (t) =>
        new Date(t.date).getMonth() === m &&
        new Date(t.date).getFullYear() === y
    );
    const income = group
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = group
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return {
      name: format(d, "MM/yy"),
      Przychody: income,
      Wydatki: expense,
    };
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Wydatki wg kategorii</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          {pieData.length === 0 ? (
            <p className="text-muted-foreground">Brak danych.</p>
          ) : (
            <PieChart width={360} height={360}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bilans 6&nbsp;miesięcy</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <BarChart width={420} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Przychody" stackId="a" />
            <Bar dataKey="Wydatki" stackId="a" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

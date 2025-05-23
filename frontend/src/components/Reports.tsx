import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

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
  if (!data.length) return <div>Brak danych do raportu.</div>;

  return (
    <div className="flex justify-center">
      <PieChart width={320} height={320}>
        <Pie
          dataKey="value"
          data={data}
          outerRadius={120}
          fill="#8884d8"
          label
        />
        <Tooltip />
        {data.map((_, idx) => (
          <Cell key={idx} />
        ))}
      </PieChart>
    </div>
  );
};

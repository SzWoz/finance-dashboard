import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { format } from "date-fns";

export const TransactionList: React.FC = () => {
  const { state } = useContext(FinanceContext);

  return (
    <div className="space-y-2">
      {state.transactions.map((t) => (
        <div key={t._id || t.date} className="card flex justify-between p-2">
          <div>
            <div>{t.description}</div>
            <small className="text-gray-500">
              {format(new Date(t.date), "dd.MM.yyyy")}
            </small>
          </div>
          <div
            className={t.type === "expense" ? "text-red-600" : "text-green-600"}
          >
            {t.type === "expense" ? "-" : "+"}
            {t.amount} zł
          </div>
        </div>
      ))}
    </div>
  );
};

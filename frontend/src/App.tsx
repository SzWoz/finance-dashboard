import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { BudgetOverview } from "./components/BudgetOverview";
import { Reports } from "./components/Reports";
import { subscribeUser } from "./utils/push";

export const App: React.FC = () => {
  useEffect(() => {
    subscribeUser();
  }, []);

  return (
    <FinanceProvider>
      <BrowserRouter>
        <nav className="flex gap-4 p-4 bg-gray-100">
          <Link to="/">Dashboard</Link>
          <Link to="/reports">Raporty</Link>
        </nav>
        <main className="p-4 space-y-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TransactionForm />
                  <BudgetOverview />
                  <TransactionList />
                </>
              }
            />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FinanceProvider>
  );
};

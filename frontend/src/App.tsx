import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { BudgetOverview } from "./components/BudgetOverview";
import { Reports } from "./components/Reports";
import { Layout } from "./components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { subscribeUser } from "./utils/push";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { BudgetsPage } from "./components/BudgetsPage";

export const App: React.FC = () => {
  useEffect(() => {
    subscribeUser();
  }, []);

  return (
    <AuthProvider>
      <FinanceProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                      <TransactionForm />
                      <BudgetOverview />
                    </div>
                    <TransactionList />
                  </div>
                }
              />
              <Route path="/reports" element={<Reports />} />
              <Route path="/budget" element={<BudgetsPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster richColors closeButton position="bottom-center" />
      </FinanceProvider>
    </AuthProvider>
  );
};

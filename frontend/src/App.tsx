import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { RedirectIfAuth, RequireAuth } from "./routes/RequireAuth";

export const App: React.FC = () => {
  useEffect(() => {
    subscribeUser();
  }, []);

  const Dashboard = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1 w-full px-6">
      <div className="space-y-6 w-full flex flex-col justify-around">
        <TransactionForm />
        <BudgetOverview />
      </div>
      <TransactionList />
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden  ">
      <AuthProvider>
        <FinanceProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/budget" element={<BudgetsPage />} />
                </Route>

                <Route element={<RedirectIfAuth />}>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </BrowserRouter>

          <Toaster richColors closeButton position="bottom-center" />
        </FinanceProvider>
      </AuthProvider>
    </div>
  );
};

import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./views/dashboard";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

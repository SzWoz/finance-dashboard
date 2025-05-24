import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export const RequireAuth: React.FC = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export const RedirectIfAuth: React.FC = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (token) {
    const from = (location.state as any)?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
};

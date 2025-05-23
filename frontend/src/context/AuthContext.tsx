import React, { createContext, useEffect, useState } from "react";
import { apiPost } from "@/lib/api";

interface AuthState {
  token: string | null;
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await apiPost("/api/auth/login", { email, password });
    if (!res.ok) return false;
    const { token } = await res.json();
    setToken(token);
    return true;
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

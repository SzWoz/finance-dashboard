import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

interface AuthCtx {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthCtx>({
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const authFetch = async (
    path: string,
    body: unknown
  ): Promise<string | null> => {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    const { token: t } = await res.json();
    return t;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login: async (e, p) =>
          setToken(
            await authFetch("/api/auth/login", { email: e, password: p })
          ),
        register: async (e, p) =>
          setToken(
            await authFetch("/api/auth/register", { email: e, password: p })
          ),
        logout: () => setToken(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

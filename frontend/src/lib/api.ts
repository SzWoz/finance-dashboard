import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const API_URL = import.meta.env.VITE_API_URL;

export const useApi = () => {
  const { token } = useContext(AuthContext);

  const base = (path: string, init?: RequestInit) =>
    fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
    });

  return {
    apiGet: (p: string, i?: RequestInit) => base(p, i),
    apiPost: (p: string, body: unknown, i?: RequestInit) =>
      base(p, { ...i, method: "POST", body: JSON.stringify(body) }),
  };
};

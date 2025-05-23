import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const API_URL = import.meta.env.VITE_API_URL;

export const useApi = () => {
  const { token } = useContext(AuthContext);

  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const apiGet = (path: string, init?: RequestInit) =>
    fetch(`${API_URL}${path}`, { ...init, headers });

  const apiPost = (path: string, body: unknown, init?: RequestInit) =>
    fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      ...init,
    });

  return { apiGet, apiPost };
};

export const API_URL = import.meta.env.VITE_API_URL;

export const apiGet = (path: string, init?: RequestInit) =>
  fetch(`${API_URL}${path}`, init);

export const apiPost = (path: string, body: unknown, init?: RequestInit) =>
  fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...init,
  });

import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .catch((err) => console.error("SW error", err));
    });
  }
}

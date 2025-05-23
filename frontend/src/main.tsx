import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

registerSW(); // <- automatyczna rejestracja service workera od VitePWA

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

import "./App.css";
import { AppRouter } from "./router";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;

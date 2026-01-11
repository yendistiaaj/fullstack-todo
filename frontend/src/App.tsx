import "./App.css";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

type Page = "login" | "register" | "todo";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("todo");

  return (
    <div className="App">
      {currentPage === "login" ? (
        <LoginPage onLoginSuccess={() => setCurrentPage("todo")} />
      ) : (
        <TodoPage onLogoutSuccess={() => setCurrentPage("login")} />
      )}
    </div>
  );
}

export default App;

import "./App.css";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";

type Page = "login" | "register" | "todo";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  return (
    <div className="App">
      {currentPage === "login" && (
        <LoginPage
          onLoginSuccess={() => setCurrentPage("todo")}
          onGoToRegister={() => setCurrentPage("register")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          onRegisterSuccess={() => {}}
          onGoToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "todo" && (
        <TodoPage onLogoutSuccess={() => setCurrentPage("login")} />
      )}
    </div>
  );
}

export default App;

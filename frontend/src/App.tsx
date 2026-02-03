import "./App.css";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import { getIsTokenValid } from "./features/auth/utils/AuthUtils";
import Modal from "./features/modals/components/Modal";
import { ModalTypeEnum, type ModalType } from "./features/modals/ModalTypeEnum";

type AuthMode = "login" | "register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const [modalType, setModalType] = useState<ModalType>(ModalTypeEnum.SUCCESS);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (type: ModalType, title: string, message: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(getIsTokenValid(token));
  }, []);

  const handleAuthSuccess = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsLoggedIn(true);
    openModal(ModalTypeEnum.SUCCESS, "Success", "You are now logged in.");
  };

  const handleAuthError = (msg: string) => {
    openModal(ModalTypeEnum.ERROR, "Error", msg);
  };

  const authContent =
    authMode === "login" ? (
      <LoginPage
        onLoginSuccess={handleAuthSuccess}
        onGoToRegister={() => setAuthMode("register")}
        onError={handleAuthError}
      />
    ) : (
      <RegisterPage
        onRegisterSuccess={(msg) =>
          openModal(ModalTypeEnum.SUCCESS, "Success", msg)
        }
        onGoToLogin={() => setAuthMode("login")}
        onError={handleAuthError}
      />
    );

  return (
    <>
      {isLoggedIn ? (
        <TodoPage
          onLogoutSuccess={() => {
            localStorage.removeItem("access_token");
            setIsLoggedIn(false);
            setAuthMode("login");
            openModal(
              ModalTypeEnum.INFO,
              "Logged Out",
              "You have logged out from your account.",
            );
          }}
        />
      ) : (
        authContent
      )}

      <Modal
        type={modalType}
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
      />
    </>
  );
}

export default App;

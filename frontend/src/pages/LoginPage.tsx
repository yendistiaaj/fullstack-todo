import axios from "axios";
import api from "../api";

import AuthLayout from "../features/auth/components/AuthLayout";

type Props = {
  onLoginSuccess: (token: string) => void;
  onGoToRegister: () => void;
  onError: (msg: string) => void;
};

function LoginPage({ onLoginSuccess, onGoToRegister, onError }: Props) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email-field") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("password-field") as HTMLInputElement
    ).value;

    try {
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const res = await api.post("/auth/login", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (res.status !== 200) {
        throw new Error("Unexpected response status");
      }

      const { access_token } = res.data || {};

      if (!access_token) {
        onError("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("access_token", access_token);
      onLoginSuccess(access_token);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        onError("Incorrect email or password.");
      } else {
        onError("Login failed. Please try again.");
      }
    }
  }
  return (
    <AuthLayout
      title="Log In"
      subtitle="Sign in to manage your tasks and stay productive."
      footer={
        <>
          Don’t have an account?{" "}
          <span onClick={onGoToRegister}>Register here!</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="vertical-form">
        <label htmlFor="email-field">Email</label>
        <input id="email-field" type="email" name="email-field" />

        <label htmlFor="password-field">Password</label>
        <input id="password-field" type="password" name="password-field" />

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;

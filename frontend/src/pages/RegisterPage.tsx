import axios from "axios";
import api from "../api";

import AuthLayout from "../features/auth/components/AuthLayout";

type Props = {
  onRegisterSuccess: (msg: string) => void;
  onGoToLogin: () => void;
  onError: (msg: string) => void;
};

function RegisterPage({ onRegisterSuccess, onGoToLogin, onError }: Props) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email-field") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("password-field") as HTMLInputElement
    ).value;

    try {
      const res = await api.post("/auth/register", { email, password });
      const user = res.data;
      if (import.meta.env.DEV) {
        console.log("Registered user:", user.email);
      }
      onRegisterSuccess("Register success. You can log in now.");
    } catch (err) {
      if (import.meta.env.DEV) {
        if (axios.isAxiosError(err) && err.response?.status === 400) {
          onError("Email already registered.");
        } else {
          onError("Register failed. Please try again.");
        }
      }
    }
  }

  return (
    <AuthLayout
      title="Register"
      subtitle="Create an account to start managing your tasks."
      footer={
        <>
          Already have an account?{" "}
          <span onClick={onGoToLogin}>Login here!</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="vertical-form">
        <label htmlFor="email-field">Email</label>
        <input id="email-field" type="email" name="email-field" />

        <label htmlFor="password-field">Password</label>
        <input id="password-field" type="password" name="password-field" />

        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;

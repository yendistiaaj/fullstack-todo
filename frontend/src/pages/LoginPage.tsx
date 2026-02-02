import api from "../api";

import AuthLayout from "../features/auth/components/AuthLayout";

type Props = {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
};

function LoginPage({ onLoginSuccess, onGoToRegister }: Props) {
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
      const { access_token } = res.data;
      localStorage.setItem("access_token", access_token);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
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

type Props = {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
};

function LoginPage({ onLoginSuccess, onGoToRegister }: Props) {
  return (
    <>
      <div className="auth-main">
        <div className="auth-card">
          <h2 className="auth-title">Log In</h2>
          <p className="auth-subtitle">
            Sign in to manage your tasks and stay productive.
          </p>

          <form onSubmit={onLoginSuccess} className="vertical-form">
            <label htmlFor="email-field">Email</label>
            <input id="email-field" type="email" name="email-field" />

            <label htmlFor="password-field">Password</label>
            <input id="password-field" type="password" name="password-field" />

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <p className="auth-footer-text">
            Don’t have an account?{" "}
            <span onClick={onGoToRegister}>Register here!</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

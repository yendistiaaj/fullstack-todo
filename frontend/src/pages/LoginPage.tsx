type Props = {
  onLoginSuccess: () => void;
};

function LoginPage({ onLoginSuccess }: Props) {
  return (
    <>
      <div className="login-main">
        <div className="login-card">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">
            Sign in to manage your tasks and stay productive.
          </p>

          <form onSubmit={onLoginSuccess} className="vertical-form">
            <label htmlFor="email-field">Email</label>
            <input id="email-field" type="email" name="email-field" />

            <label htmlFor="password-field">Password</label>
            <input id="password-field" type="password" name="password-field" />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="login-footer-text">
            Don’t have an account? <a href="#">Register here!</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

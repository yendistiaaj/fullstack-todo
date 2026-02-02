type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="auth-main">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        <p className="auth-subtitle">{subtitle}</p>

        {children}

        <p className="auth-footer-text">{footer}</p>
      </div>
    </div>
  );
}

export default AuthLayout;

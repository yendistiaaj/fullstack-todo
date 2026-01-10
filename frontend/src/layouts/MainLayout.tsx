import Header from "../features/todos/components/Header";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main className="content">
          {children}
        </main>
      </div>
    </>
  );
}
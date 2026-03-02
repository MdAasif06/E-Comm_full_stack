import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20 px-6">{children}</main>
    </div>
  );
};

export default MainLayout;
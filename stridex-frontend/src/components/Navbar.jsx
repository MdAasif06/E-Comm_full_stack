import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          StrideX
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/login" className="hover:text-red-500 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-red-500 transition">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
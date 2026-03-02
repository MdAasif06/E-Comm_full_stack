import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          StrideX
        </Link>

        <div className="space-x-6 flex items-center">

          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/cart">Cart ({cartItems.length})</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-red-500 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-red-500 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-300">
                Hello, {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
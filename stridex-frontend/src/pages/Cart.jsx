import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded">
          Shop Now
        </Link>
      </div>
    );
  }
  const handleCheckout = async () => {
    try {
      const response = await API.post("/orders/checkout", {
        items: cartItems,
      });

      window.location.href = response.data.url; // Stripe page redirect
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={`${item._id}-${item.size}`}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-red-600 font-bold">₹ {item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item._id, item.size)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQuantity(item._id, item.size)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id, item.size)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <h2 className="text-xl font-bold mb-4">Total: ₹ {total}</h2>

        <button
          onClick={handleCheckout}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

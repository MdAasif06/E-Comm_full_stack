import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, quantity) => {
    const existingItem = cartItems.find(
      (item) => item._id === product._id && item.size === size,
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, size, quantity }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(
      cartItems.filter((item) => !(item._id === id && item.size === size)),
    );
  };
  const increaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

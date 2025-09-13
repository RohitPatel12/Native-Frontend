// src/context/UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);

  // ✅ Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Remove product (one instance) from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // remove if quantity = 0
    });
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

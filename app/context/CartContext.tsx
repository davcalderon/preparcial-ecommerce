"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, CartItem } from "../types";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      const updated = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setItems(updated);
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  }

  function increaseQuantity(id: number) {
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setItems(updated);
  }

  function decreaseQuantity(id: number) {
    const updated = items
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);
    setItems(updated);
  }

  function removeFromCart(id: number) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  }

  function clearCart() {
    setItems([]);
  }

  let totalItems = 0;
  let totalPrice = 0;

  for (const item of items) {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}

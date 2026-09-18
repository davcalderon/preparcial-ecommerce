"use client";

import { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return <button onClick={() => addToCart(product)}>Agregar al carrito</button>;
}

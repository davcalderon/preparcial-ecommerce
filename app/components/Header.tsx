"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header>
      <Link href="/">
        <strong>ShopHub</strong>
      </Link>
      <nav>
        <Link href="/checkout">Carrito: {totalItems}</Link>
      </nav>
    </header>
  );
}

import type { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "Catalogo de productos ShopHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main className="container">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div>
      <h2>Producto no encontrado</h2>
      <Link href="/">Volver al catalogo</Link>
    </div>
  );
}

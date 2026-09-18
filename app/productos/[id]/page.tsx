import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "../../types";
import AddToCartButton from "../../components/AddToCartButton";

async function getProduct(id: string): Promise<ProductDetail | null> {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Link className="back-link" href="/">
        Volver al catalogo
      </Link>
      <div className="product-card">
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.category}</p>
        <p>${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>{product.description}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

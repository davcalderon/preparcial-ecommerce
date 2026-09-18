import ProductCard from "./components/ProductCard";
import { Product } from "./types";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock",
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el catalogo de productos");
  }

  const data = await response.json();
  return data.products as Product[];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1>ShopHub</h1>
      <p>Catalogo de productos</p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

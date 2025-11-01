import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category?: string;
  inventory?: number;
}

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-600">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}


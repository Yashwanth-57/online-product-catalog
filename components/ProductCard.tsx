"use client";
import Link from "next/link";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    category?: string;
    inventory?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h2>

          {product.category && (
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
          )}

          <p className="text-xl font-bold text-green-600">₹{product.price}</p>

          {product.inventory !== undefined && (
            <p
              className={`text-sm font-medium ${
                product.inventory > 0 ? "text-gray-500" : "text-red-500"
              }`}
            >
              {product.inventory > 0
                ? `In stock (${product.inventory})`
                : "Out of stock"}
            </p>
          )}

          <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}




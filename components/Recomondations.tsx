"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RecommendationList({ products }: { products: any[] }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (name: string) => {
    setWishlist((prev) => {
      if (prev.includes(name)) {
        toast.error(`${name} removed from wishlist ❌`);
        return prev.filter((item) => item !== name);
      } else {
        toast.success(`${name} added to wishlist ❤️`);
        return [...prev, name];
      }
    });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            {item.category && (
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">
                {item.category}
              </p>
            )}
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
              {item.description || "No description available."}
            </p>
            <p className="text-green-600 font-medium mt-2">₹{item.price}</p>

            <button
              onClick={() => toggleWishlist(item.name)}
              className={`mt-4 w-full py-2 rounded-xl font-semibold text-sm transition ${
                wishlist.includes(item.name)
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {wishlist.includes(item.name)
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


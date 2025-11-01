"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  
}

export default function RecommendationsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  //  Fetch products (server-side prefetch simulated)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)

        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchProducts();
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  //  Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  //  Handle wishlist toggle
  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
      toast.error("Removed from wishlist");
    } else {
      setWishlist([...wishlist, id]);
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <Toaster />

      <h1 className="text-3xl font-bold mb-4">🪄 Recommended Products (Server + Client Hybrid)</h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-1">₹{product.price}</p>

            <button
              onClick={() => toggleWishlist(product._id)}
              className={`mt-3 w-full py-2 rounded-md text-white ${
                wishlist.includes(product._id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {wishlist.includes(product._id)
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>
          </div>
        ))}
      </div>

    
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">No items in wishlist yet.</p>
        ) : (
          <ul className="space-y-2">
            {products
              .filter((p) => wishlist.includes(p._id))
              .map((p) => (
                <li
                  key={p._id}
                  className="flex justify-between p-3 border rounded-md"
                >
                  <span>{p.name}</span>
                  <button
                    onClick={() => toggleWishlist(p._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

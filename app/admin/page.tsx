"use client";

import AuthGate from "@/components/AuthGate";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setFiltered(data);
  };

  // ✅ Add or Update product
  const addOrUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      inventory: Number(form.inventory),
    };

    try {
      let res;
      if (editId) {
        res = await fetch(`/api/products/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        toast.success(editId ? "✅ Product updated successfully!" : "✅ Product added successfully!");
        setForm({ name: "", description: "", price: "", category: "", inventory: "" });
        setEditId(null);
        fetchProducts();
      } else {
        const err = await res.json();
        toast.error(`❌ ${err.message || "Failed to save product"}`);
      }
    } catch (error) {
      toast.error("❌ Internal Server Error");
    }
  };

  // ✅ Delete product
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("🗑️ Product deleted successfully!");
      fetchProducts();
    } else {
      toast.error("❌ Failed to delete product");
    }
  };

  // ✅ Edit
  const handleEdit = (product: any) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      inventory: product.inventory || "",
    });
  };

  // ✅ Search filter
  useEffect(() => {
    const query = search.toLowerCase();
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query))
    );
    setFiltered(results);
  }, [search, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">🔑 Admin Dashboard (CSR)</h1>

      {/* 🧾 Product Form */}
      <form onSubmit={addOrUpdateProduct} className="grid grid-cols-2 gap-3 mb-6">
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Inventory"
          value={form.inventory}
          onChange={(e) => setForm({ ...form, inventory: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded col-span-2"
          rows={3}
        />
        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 col-span-2"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* 🔍 Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 📦 Product List */}
      <ul className="space-y-2">
        {filtered.map((p) => (
          <li
            key={p._id}
            className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center"
          >
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-gray-600 text-sm">{p.description}</p>
              <p className="text-sm">
                <span className="font-medium">Category:</span> {p.category || "—"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Inventory:</span> {p.inventory || 0}
              </p>
              <p className="text-sm">
                <span className="font-medium">Price:</span> ₹{p.price}
              </p>
              <p className="text-xs text-gray-500">
                Last Updated: {new Date(p.lastUpdated).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Protect admin
export default function AdminPage() {
  return (
     <>
    <h3> username : admin  &  passowrd: 1234</h3>
    <AuthGate>
      <AdminDashboard />
    </AuthGate>
     </>
  );
}


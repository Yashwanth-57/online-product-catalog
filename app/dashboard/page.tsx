// app/dashboard/page.tsx
import { getInventoryStats } from "@/lib/inventory";

export default async function DashboardPage() {
  const stats = await getInventoryStats(); // Runs on the server!

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard (SSR)</h1>
      <div className="grid gap-4 grid-cols-3">
        <div className="p-4 bg-white rounded shadow">
          <h2>Total Products</h2>
          <p className="text-xl font-semibold">{stats.total}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2>Low Stock</h2>
          <p className="text-xl font-semibold">{stats.lowStock}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h2>Out of Stock</h2>
          <p className="text-xl font-semibold">{stats.outOfStock}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-500 text-sm">
        Last updated at {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}


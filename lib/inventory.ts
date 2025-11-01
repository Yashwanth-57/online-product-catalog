// lib/inventory.ts
import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";

export async function getInventoryStats() {
  await connectToDB();

  const products = await Product.find().lean();

  const total = products.length;
  const lowStock = products.filter(p => p.inventory < 5).length;
  const outOfStock = products.filter(p => p.inventory === 0).length;

  return { total, lowStock, outOfStock };
}

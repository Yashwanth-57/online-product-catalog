import ProductList from "@/components/ProductList";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

//  Pre-render this page at build time (SSG)
export const revalidate = false; // never revalidate — static once built

export default async function HomePage() {
  //  Fetch all products at build time
 const res = await fetch(`${baseUrl}/api/products`, {
  cache: "no-store",
});
  const products = await res.json();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        🛍️ Welcome to Product Store (SSG)
      </h1>

      {/* ✅ Client-side Search + Filtering handled inside ProductList */}
      <ProductList products={products} />

      <p className="text-sm text-gray-500 text-center mt-8">
        ⚡ This page is statically generated at build time (SSG)
      </p>
    </main>
  );
}


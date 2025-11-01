import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";

//  Revalidate every 60s
export const revalidate = 60;

//  Static params generation
export async function generateStaticParams() {
  await connectToDB();
  const products = await Product.find({}, "slug").lean();

  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; // ✅ fixed

  await connectToDB();
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return (
      <div className="text-center text-red-600 py-20 text-xl">
        ❌ No product found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Product Detail (ISR)</h1>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          {product.name}
        </h1>

        {product.category && (
          <p className="text-sm text-gray-500 text-center mb-4 uppercase tracking-wide">
            {product.category}
          </p>
        )}

        <div className="flex flex-col items-center space-y-2 mb-6">
          <p className="text-2xl font-semibold text-green-600">
            ₹{product.price}
          </p>

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
        </div>

        {product.description ? (
          <p className="text-gray-700 leading-relaxed text-justify">
            {product.description}
          </p>
        ) : (
          <p className="text-gray-400 italic text-center">
            No description available.
          </p>
        )}

        <p className="text-xs text-gray-400 text-right mt-6">
          Last updated:{" "}
          {new Date(product.lastUpdated || product.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

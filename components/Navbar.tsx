"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `hover:text-yellow-300 font-medium transition duration-200 ${
      pathname === path ? "border-b-2 border-yellow-300 pb-1 text-yellow-300" : ""
    }`;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-center space-x-6 rounded-b-xl shadow-md">
      <Link href="/" className={linkClass("/")}>
        🏠 Home
      </Link>

      <Link href="/products" className={linkClass("/products")}>
        🛒 Products
      </Link>

      <Link href="/recommendations" className={linkClass("/recommendations")}>
        🌟 Recommendations
      </Link>

      <Link href="/dashboard" className={linkClass("/dashboard")}>
        📊 Dashboard
      </Link>

      <Link href="/admin" className={linkClass("/admin")}>
        ⚙️ Admin
      </Link>
    </nav>
  );
}



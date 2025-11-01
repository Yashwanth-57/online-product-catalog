import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Product Store",
  description: "A modern product listing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* ✅ Navbar should always be inside <body> and above children */}
        <Navbar />

        {/* ✅ Page content */}
        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}


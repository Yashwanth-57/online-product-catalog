
"use client";

export default function WishlistButton({
  name,
  added,
  onToggle,
}: {
  name: string;
  added: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg text-white ${
        added ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {added ? "❤️ Added" : "🤍 Add to Wishlist"}
    </button>
  );
}

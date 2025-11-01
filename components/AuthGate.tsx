"use client";

import { useState, useEffect } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    // Check if token exists and not expired
    if (token === "admin-token" && expiry && Date.now() < Number(expiry)) {
      setAuthenticated(true);
    } else {
      // Clear invalid/expired token
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    }

    setLoading(false);
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Checking authentication...</p>;

  if (!authenticated) {
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token with 1-hour expiry
        const expiry = Date.now() + 60 * 60 * 1000; // 1 hour = 3600000 ms
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiry", expiry.toString());
        setAuthenticated(true);
      } else {
        alert(data.error || "Invalid credentials");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
        >
          <h2 className="text-xl font-bold mb-4 text-blue-600">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // If authenticated, render the admin children (dashboard, etc.)
  return <>{children}</>;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Login failed");
        return;
      }

      router.push("/admin/live");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white rounded-xl shadow-md p-8 transition-all">
        <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
        <p className="text-gray-600 mb-6">Start/stop the live audio stream.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Admin password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full p-4 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B]"
              placeholder="Enter password"
              required
            />
          </div>

          {error ? <p className="text-red-600 text-sm">{error}</p> : null}

          <button
            disabled={loading}
            className="w-full bg-[#F2C79B] text-black font-semibold px-6 py-3 rounded-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        Set <span className="font-mono">ADMIN_PASSWORD</span> in your environment variables.
      </div>
    </main>
  );
}


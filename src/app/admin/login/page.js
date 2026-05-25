"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Login failed");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Beautiful Hero/Branding Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#F2C79B]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#d4a574]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F2C79B]/5 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F2C79B] to-[#d4a574] flex items-center justify-center font-bold text-black text-2xl mb-6">
              H
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              House of His Grace
            </h1>
            <p className="text-lg text-white/60 max-w-md">
              Admin dashboard for managing your church website content, events, sermons, and live streams.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "📅", text: "Manage Events & Programs" },
              { icon: "📖", text: "Publish Sermons & Teachings" },
              { icon: "💬", text: "Share Testimonies & Stories" },
              { icon: "📡", text: "Start Live Broadcasts" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-white/70 opacity-0 animate-[fadeSlideIn_0.5s_ease_forwards]"
                style={{ animationDelay: `${0.5 + i * 0.15}s` }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F2C79B] to-[#d4a574] flex items-center justify-center font-bold text-black text-xl">
              H
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">HHGC Admin</h1>
              <p className="text-xs text-gray-500">Dashboard Login</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to your admin account</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#F2C79B] focus:border-transparent transition text-gray-900"
                placeholder="admin@hhgc.org"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#F2C79B] focus:border-transparent transition pr-12 text-gray-900"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#F2C79B]/25 transition-all duration-300 disabled:opacity-60 disabled:hover:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-8 text-center">
            Secured with JWT authentication & bcrypt encryption
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

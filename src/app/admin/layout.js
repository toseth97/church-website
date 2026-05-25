"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/sermons", label: "Sermons", icon: "📖" },
  { href: "/admin/testimonies", label: "Testimonies", icon: "💬" },
  { href: "/admin/live", label: "Live Stream", icon: "🔴" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white transform transition-transform duration-300 ease-in-out " +
          (sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
        }
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F2C79B] to-[#d4a574] flex items-center justify-center font-bold text-black text-lg">
              H
            </div>
            <div>
              <h1 className="font-bold text-lg">HHGC Admin</h1>
              <p className="text-xs text-white/50">Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 " +
                  (isActive
                    ? "bg-[#F2C79B]/20 text-[#F2C79B] shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white")
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition mb-2"
          >
            <span className="text-lg">🌐</span>
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition w-full text-left"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2C79B] to-[#d4a574] flex items-center justify-center text-black text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

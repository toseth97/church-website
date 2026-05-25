"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ events: 0, sermons: 0, testimonies: 0, isLive: false });
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Check auth
        const statusRes = await fetch("/api/admin/status");
        const statusData = await statusRes.json();
        if (!statusData.ok) {
          router.push("/admin/login");
          return;
        }
        setAdmin(statusData.admin);

        // Load stats
        const [eventsRes, sermonsRes, testimoniesRes, liveRes] = await Promise.all([
          fetch("/api/events?limit=1000").catch(() => ({ json: () => ({ events: [] }) })),
          fetch("/api/sermons?limit=1000").catch(() => ({ json: () => ({ sermons: [] }) })),
          fetch("/api/testimonies?limit=1000").catch(() => ({ json: () => ({ testimonies: [] }) })),
          fetch("/api/live-stream/status").catch(() => ({ json: () => ({ current: { isLive: false } }) })),
        ]);

        const [eventsData, sermonsData, testimoniesData, liveData] = await Promise.all([
          eventsRes.json(),
          sermonsRes.json(),
          testimoniesRes.json(),
          liveRes.json(),
        ]);

        setStats({
          events: eventsData.events?.length || 0,
          sermons: sermonsData.sermons?.length || 0,
          testimonies: testimoniesData.testimonies?.length || 0,
          isLive: liveData.current?.isLive || false,
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2C79B]"></div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Events", value: stats.events, icon: "📅", color: "from-blue-500 to-blue-600", href: "/admin/events" },
    { label: "Total Sermons", value: stats.sermons, icon: "📖", color: "from-purple-500 to-purple-600", href: "/admin/sermons" },
    { label: "Testimonies", value: stats.testimonies, icon: "💬", color: "from-green-500 to-green-600", href: "/admin/testimonies" },
    { label: "Live Status", value: stats.isLive ? "ON AIR" : "Offline", icon: "🔴", color: stats.isLive ? "from-red-500 to-red-600" : "from-gray-400 to-gray-500", href: "/admin/live" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {admin?.name || "Admin"} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s an overview of your church website</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, i) => (
          <a
            key={i}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/admin/events" className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-blue-700">
            <span className="text-xl">➕</span>
            <span className="text-sm font-medium">Add Event</span>
          </a>
          <a href="/admin/sermons" className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition text-purple-700">
            <span className="text-xl">➕</span>
            <span className="text-sm font-medium">Add Sermon</span>
          </a>
          <a href="/admin/testimonies" className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition text-green-700">
            <span className="text-xl">➕</span>
            <span className="text-sm font-medium">Add Testimony</span>
          </a>
          <a href="/admin/live" className="flex items-center gap-3 p-4 rounded-lg bg-red-50 hover:bg-red-100 transition text-red-700">
            <span className="text-xl">📡</span>
            <span className="text-sm font-medium">Start Stream</span>
          </a>
        </div>
      </div>
    </div>
  );
}

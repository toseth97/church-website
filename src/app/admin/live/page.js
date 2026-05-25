"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function StatusPill({ live }) {
  return (
    <span
      className={
        "inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full " +
        (live ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600")
      }
    >
      <span
        className={
          "h-2.5 w-2.5 rounded-full " +
          (live ? "bg-red-500 animate-ping" : "bg-gray-400")
        }
      />
      {live ? "LIVE" : "OFFLINE"}
    </span>
  );
}

export default function AdminLivePage() {
  const router = useRouter();
  const [audioUrl, setAudioUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ isLive: false, audioUrl: null, videoUrl: null, title: null, startedAt: null });
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  async function refresh() {
    const res = await fetch("/api/live-stream/status");
    const data = await res.json().catch(() => ({}));
    if (data?.current) setStatus(data.current);
  }

  async function loadHistory() {
    const res = await fetch("/api/live-stream/history?limit=10");
    const data = await res.json().catch(() => ({}));
    if (data?.history) setHistory(data.history);
  }

  useEffect(() => {
    refresh();
    loadHistory();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, []);

  async function startStream() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/live-stream/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ audioUrl, videoUrl, title: title || "Live Worship Service" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to start");
        return;
      }
      await refresh();
      await loadHistory();
    } finally {
      setLoading(false);
    }
  }

  async function stopStream() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/live-stream/stop", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to stop");
        return;
      }
      setAudioUrl("");
      setVideoUrl("");
      setTitle("");
      await refresh();
      await loadHistory();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Stream</h1>
        <p className="text-gray-500 mt-1">Start and stop church live broadcasts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Control */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Stream Control</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your live broadcast</p>
              </div>
              <StatusPill live={status?.isLive} />
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stream Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  placeholder="e.g. Sunday Worship Service"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Audio URL</label>
                <input
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  placeholder="https://.../audio.mp3 or https://.../stream.m3u8"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Video URL (YouTube embed)</label>
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  disabled={loading || status.isLive}
                  onClick={startStream}
                  className="flex-1 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
                >
                  {loading ? "Starting..." : "▶ Start Stream"}
                </button>
                <button
                  disabled={loading || !status.isLive}
                  onClick={stopStream}
                  className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
                >
                  {loading ? "Stopping..." : "⏹ Stop Stream"}
                </button>
              </div>
            </div>

            {/* Current Status Info */}
            {status?.isLive && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm font-semibold text-red-800 mb-1">🔴 Currently Streaming</p>
                {status.title && <p className="text-sm text-red-600">{status.title}</p>}
                {status.startedAt && (
                  <p className="text-xs text-red-500 mt-1">
                    Started: {new Date(status.startedAt).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Stream Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={status?.isLive ? "text-red-600 font-semibold" : "text-gray-600"}>
                  {status?.isLive ? "Live" : "Offline"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Audio</span>
                <span className="text-gray-600">{status?.audioUrl ? "✓" : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Video</span>
                <span className="text-gray-600">{status?.videoUrl ? "✓" : "—"}</span>
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Streams</h3>
            {history.length === 0 ? (
              <p className="text-sm text-gray-400">No stream history</p>
            ) : (
              <div className="space-y-3">
                {history.slice(0, 5).map((h, i) => (
                  <div key={i} className="text-sm border-b border-gray-50 pb-2">
                    <p className="text-gray-700 font-medium truncate">{h.title || "Live Stream"}</p>
                    <p className="text-gray-400 text-xs">
                      {h.startedAt ? new Date(h.startedAt).toLocaleDateString() : "—"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

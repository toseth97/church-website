"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function StatusPill({ live }) {
  return (
    <span
      className={
        "inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full " +
        (live ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600")
      }
    >
      <span
        className={
          "h-2 w-2 rounded-full " +
          (live
            ? "bg-red-500 animate-ping"
            : "bg-gray-400")
        }
      />
      {live ? "LIVE" : "OFFLINE"}
    </span>
  );
}

export default function AdminLivePage() {
  const router = useRouter();
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ isLive: false, audioUrl: null, startedAt: null });
  const [error, setError] = useState("");

  async function refresh() {
    const res = await fetch("/api/live-stream/status");
    const data = await res.json().catch(() => ({}));
    if (data?.current) setStatus(data.current);
  }

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 2500);
    return () => clearInterval(t);
  }, []);

  async function startStream() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/live-stream/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ audioUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to start");
        return;
      }
      await refresh();
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
        body: JSON.stringify({ savedAudioUrl: audioUrl || status.audioUrl }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to stop");
        return;
      }

      setAudioUrl("");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Stream Control</h1>
            <p className="text-gray-600 mb-4">Start/stop the church audio stream.</p>
          </div>
          <StatusPill live={status?.isLive} />
        </div>

        {error ? <p className="text-red-600 text-sm mb-4">{error}</p> : null}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Audio URL</label>
            <input
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className="mt-2 w-full p-4 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B]"
              placeholder="https://.../audio.mp3 or https://.../stream.m3u8"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled={loading || status.isLive}
              onClick={startStream}
              className="flex-1 bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? "Starting..." : "Start Stream"}
            </button>
            <button
              disabled={loading || !status.isLive}
              onClick={stopStream}
              className="flex-1 bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition disabled:opacity-60"
            >
              {loading ? "Stopping..." : "Stop Stream"}
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              Current: <span className="font-semibold">{status?.audioUrl ? "Yes" : "No"}</span>
            </p>
            {status?.startedAt ? (
              <p className="mt-1">Started at: {new Date(status.startedAt).toLocaleString()}</p>
            ) : null}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="text-sm font-semibold text-gray-700 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


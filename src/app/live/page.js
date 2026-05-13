"use client";

import { useEffect, useState } from "react";
import Reveal from "../components/reveal/Reveal.jsx";

export default function LivePage() {
  const [current, setCurrent] = useState({ isLive: false, audioUrl: null, startedAt: null });
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const res = await fetch("/api/live-stream/status");
    const data = await res.json().catch(() => ({}));
    if (data?.current) setCurrent(data.current);
    setLoading(false);
  }

  useEffect(() => {
    const t = setInterval(refresh, 2500);

    // Avoid calling setState from inside the effect body (eslint rule).
    // We schedule the first refresh in the next tick.
    const initial = setTimeout(() => {
      refresh();
    }, 0);

    return () => {
      clearInterval(t);
      clearTimeout(initial);
    };
  }, []);



  return (
    <main className="w-full overflow-x-hidden">
      <section className="py-16 bg-[#FAF7F3]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal delayMs={80}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-2">Live</p>
                <h1 className="text-4xl font-bold">Church Audio Stream</h1>
                <p className="text-sm text-gray-600 mt-2">
                  {current?.isLive ? "You can join now." : "No live stream currently."}
                </p>
              </div>

              <div
                className={
                  "inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-sm " +
                  (current?.isLive
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800")
                }
              >
                {loading ? "Checking..." : current?.isLive ? "LIVE" : "OFFLINE"}
              </div>
            </div>

            <div className="mt-10 bg-white rounded-xl shadow-md p-6">
              {current?.isLive && current?.audioUrl ? (
                <div>
                  <div className="mb-4 text-sm text-gray-600">
                    Started: {current.startedAt ? new Date(current.startedAt).toLocaleString() : "—"}
                  </div>

                  <audio
                    controls
                    autoPlay
                    src={current.audioUrl}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-4">
                    Tip: if audio doesn’t start, ensure your browser supports the audio URL format.
                  </p>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-6xl mb-3">🔴</div>
                  <p className="font-semibold">No live stream</p>
                  <p className="text-sm text-gray-600 mt-1">Check back shortly.</p>
                </div>
              )}
            </div>

            <style jsx>{`
              @keyframes fadein {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


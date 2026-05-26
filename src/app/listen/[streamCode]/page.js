"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HeroSection from "@/app/components/HeroSection.jsx";

export default function ListenerPage() {
    const params = useParams();
    const router = useRouter();
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function findStream() {
            try {
                // Get all streams and look for one with matching streamCode
                const res = await fetch("/api/live-stream/status");
                const data = await res.json();

                if (
                    data?.current?.streamCode === params.streamCode &&
                    data.current.isLive
                ) {
                    setStream(data.current);
                } else {
                    setError("Stream not found or not currently live");
                }
            } catch (err) {
                setError("Failed to load stream");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (params.streamCode) {
            findStream();
            // Refresh every 5 seconds
            const interval = setInterval(findStream, 5000);
            return () => clearInterval(interval);
        }
    }, [params.streamCode]);

    if (loading) {
        return (
            <main className="w-full overflow-x-hidden">
                <HeroSection
                    imageSrc="/images/sermon-hero.avif"
                    title="LOADING STREAM"
                    subtitle="Please wait..."
                    badge="Live Stream"
                    height="60vh"
                />
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <p className="text-gray-500">Loading stream...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (error || !stream) {
        return (
            <main className="w-full overflow-x-hidden">
                <HeroSection
                    imageSrc="/images/sermon-hero.avif"
                    title="STREAM UNAVAILABLE"
                    subtitle={error || "This stream is not currently available"}
                    badge="Not Available"
                    height="60vh"
                />
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <p className="text-gray-500 mb-6">
                            {error ||
                                "The stream you're looking for is not currently available."}
                        </p>
                        <button
                            onClick={() => router.push("/live")}
                            className="px-6 py-3 rounded-lg bg-[#F2C79B] text-gray-900 font-semibold hover:bg-[#FFE8D1] transition"
                        >
                            ← Back to Live Stream
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="w-full overflow-x-hidden">
            {/* HERO */}
            <HeroSection
                imageSrc="/images/sermon-hero.avif"
                title="LIVE STREAM"
                subtitle="You're listening to a live broadcast"
                badge="🔴 Live Now"
                height="60vh"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold text-sm animate-pulse-glow">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    LIVE NOW
                </div>
            </HeroSection>

            {/* STREAM PLAYER */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    {stream?.isLive ? (
                        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-2xl overflow-hidden">
                            {/* Stream Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {stream?.title ||
                                            "Live Worship Service"}
                                    </h2>
                                    <p className="text-sm text-white/50 mt-1">
                                        Started:{" "}
                                        {stream?.startedAt
                                            ? new Date(
                                                  stream.startedAt,
                                              ).toLocaleString()
                                            : "—"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                                    <span className="text-red-400 text-sm font-bold">
                                        LIVE
                                    </span>
                                </div>
                            </div>

                            {/* Audio Player */}
                            <div className="p-8">
                                <audio
                                    controls
                                    autoPlay
                                    src={`/api/live-stream/listen/${stream.streamCode}`}
                                    className="w-full"
                                />
                                <p className="text-xs text-white/40 mt-4 text-center">
                                    If audio doesn't start automatically, press
                                    the play button above.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#FAF7F3] rounded-2xl">
                            <div className="text-5xl mb-4">📡</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Stream Offline
                            </h2>
                            <p className="text-gray-600">
                                The live stream has ended or is not available
                                right now.
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                Check back soon for our next broadcast!
                            </p>
                        </div>
                    )}

                    {/* Info Section */}
                    {stream?.isLive && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            <div className="bg-[#FAF7F3] p-6 rounded-xl">
                                <div className="text-3xl mb-2">🎵</div>
                                <p className="font-semibold text-gray-900">
                                    High Quality Audio
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Enjoy crystal clear sound
                                </p>
                            </div>
                            <div className="bg-[#FAF7F3] p-6 rounded-xl">
                                <div className="text-3xl mb-2">🔴</div>
                                <p className="font-semibold text-gray-900">
                                    Live Broadcast
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Real-time church service
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

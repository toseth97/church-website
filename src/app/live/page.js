"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection.jsx";

export default function LivePage() {
    const [current, setCurrent] = useState({
        isLive: false,
        audioUrl: null,
        videoUrl: null,
        title: null,
        startedAt: null,
        shareableUrl: null,
    });
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    async function refresh() {
        const res = await fetch("/api/live-stream/status");
        const data = await res.json().catch(() => ({}));
        if (data?.current) setCurrent(data.current);
        setLoading(false);
    }

    useEffect(() => {
        const initial = setTimeout(() => refresh(), 0);
        const t = setInterval(refresh, 5000);
        return () => {
            clearInterval(t);
            clearTimeout(initial);
        };
    }, []);

    function copyShareLink() {
        if (current?.shareableUrl) {
            navigator.clipboard.writeText(current.shareableUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <main className="w-full overflow-x-hidden">
            {/* HERO */}
            <HeroSection
                imageSrc="/images/sermon-hero.avif"
                title="LIVE STREAM"
                subtitle={
                    current?.isLive
                        ? "We are live right now! Join us in worship."
                        : "No live stream currently. Check back soon!"
                }
                badge={current?.isLive ? "🔴 Live Now" : "Live Stream"}
                height="60vh"
            >
                {current?.isLive && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold text-sm animate-pulse-glow">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        LIVE NOW
                    </div>
                )}
            </HeroSection>

            {/* STREAM PLAYER */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    {current?.isLive ? (
                        <>
                            {/* Audio Player Card */}
                            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-2xl overflow-hidden mb-8">
                                {/* Stream Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            {current.title ||
                                                "Live Worship Service"}
                                        </h2>
                                        <p className="text-sm text-white/50 mt-1">
                                            Started:{" "}
                                            {current.startedAt
                                                ? new Date(
                                                      current.startedAt,
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

                                {/* Video Player (if available) */}
                                {current.videoUrl && (
                                    <div className="aspect-video bg-black">
                                        <iframe
                                            src={current.videoUrl}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}

                                {/* Audio Player */}
                                {current.audioUrl && (
                                    <div
                                        className={`p-8 ${current.videoUrl ? "border-t border-white/10" : ""}`}
                                    >
                                        <audio
                                            controls
                                            autoPlay
                                            src={current.audioUrl}
                                            className="w-full"
                                        />
                                        <p className="text-xs text-white/40 mt-4 text-center">
                                            {current.videoUrl
                                                ? "Press play to listen to the audio stream"
                                                : "If audio doesn't start automatically, press the play button above."}
                                        </p>
                                    </div>
                                )}

                                {/* Share Link Section */}
                                {current.shareableUrl && (
                                    <div className="p-6 border-t border-white/10">
                                        <p className="text-sm text-white/70 mb-3">
                                            📱 Share this stream with others:
                                        </p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={current.shareableUrl}
                                                readOnly
                                                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white text-sm border border-white/20 font-mono text-xs"
                                            />
                                            <button
                                                onClick={copyShareLink}
                                                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition"
                                            >
                                                {copied ? "✓ Copied!" : "Copy"}
                                            </button>
                                        </div>
                                        <p className="text-xs text-white/40 mt-2">
                                            Share on WhatsApp, email, or SMS for
                                            others to join
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Info Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-[#FAF7F3] p-6 rounded-xl">
                                    <div className="text-3xl mb-2">🎵</div>
                                    <p className="font-semibold text-gray-900">
                                        Audio Stream
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Listen to live worship
                                    </p>
                                </div>
                                <div className="bg-[#FAF7F3] p-6 rounded-xl">
                                    <div className="text-3xl mb-2">🔴</div>
                                    <p className="font-semibold text-gray-900">
                                        Broadcasting Live
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Join us now
                                    </p>
                                </div>
                                <div className="bg-[#FAF7F3] p-6 rounded-xl">
                                    <div className="text-3xl mb-2">📲</div>
                                    <p className="font-semibold text-gray-900">
                                        Easy to Share
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Send link to friends
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-32 h-32 rounded-full bg-[#FAF7F3] flex items-center justify-center mx-auto mb-6">
                                <span className="text-5xl">📺</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                No Live Stream
                            </h2>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                We&apos;re not streaming right now. Check back
                                during our service times or follow us on social
                                media for updates.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="bg-[#FAF7F3] px-6 py-4 rounded-xl text-center">
                                    <p className="font-bold text-sm text-gray-900">
                                        Sunday Service
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        9:00 AM - 12:00 PM
                                    </p>
                                </div>
                                <div className="bg-[#FAF7F3] px-6 py-4 rounded-xl text-center">
                                    <p className="font-bold text-sm text-gray-900">
                                        Wednesday Bible Study
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        6:00 PM - 8:00 PM
                                    </p>
                                </div>
                                <div className="bg-[#FAF7F3] px-6 py-4 rounded-xl text-center">
                                    <p className="font-bold text-sm text-gray-900">
                                        Friday Prayer
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        7:00 PM - 9:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

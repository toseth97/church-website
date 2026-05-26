"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/app/components/HeroSection.jsx";

function formatDuration(seconds) {
    if (!seconds) return "0:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function RecordingsPage() {
    const [recordings, setRecordings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playingId, setPlayingId] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const itemsPerPage = 12;

    async function loadRecordings(pageNum = 0) {
        try {
            const skip = pageNum * itemsPerPage;
            const res = await fetch(
                `/api/recordings?limit=${itemsPerPage}&skip=${skip}`,
            );
            const data = await res.json();
            if (data?.ok) {
                if (pageNum === 0) {
                    setRecordings(data.recordings || []);
                } else {
                    setRecordings((prev) => [
                        ...prev,
                        ...(data.recordings || []),
                    ]);
                }
                setHasMore(data.pagination?.hasMore || false);
            }
        } catch (err) {
            console.error("Failed to load recordings", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRecordings(0);
    }, []);

    function loadMore() {
        const nextPage = page + 1;
        setPage(nextPage);
        loadRecordings(nextPage);
    }

    return (
        <main className="w-full overflow-x-hidden">
            {/* HERO */}
            <HeroSection
                imageSrc="/images/sermon-hero.avif"
                title="RECORDINGS"
                subtitle="Listen to past broadcasts anytime"
                badge="📚 Archive"
                height="60vh"
            />

            {/* RECORDINGS GRID */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                Loading recordings...
                            </p>
                        </div>
                    ) : recordings.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">🎙️</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                No Recordings Yet
                            </h2>
                            <p className="text-gray-600">
                                Check back soon for past broadcasts
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recordings.map((recording) => (
                                    <div
                                        key={recording._id}
                                        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
                                    >
                                        {/* Card Header with Play Button */}
                                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                                            <button
                                                onClick={() =>
                                                    setPlayingId(
                                                        playingId ===
                                                            recording._id
                                                            ? null
                                                            : recording._id,
                                                    )
                                                }
                                                className="w-full h-32 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white text-4xl mb-4"
                                            >
                                                {playingId === recording._id
                                                    ? "⏸"
                                                    : "▶"}
                                            </button>
                                            <div className="space-y-2 text-white">
                                                <p className="font-semibold text-sm">
                                                    {formatDuration(
                                                        recording.duration,
                                                    )}
                                                </p>
                                                <p className="text-xs text-white/60">
                                                    {formatDate(
                                                        recording.startedAt,
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6">
                                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                {recording.title}
                                            </h3>
                                            {recording.description && (
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                    {recording.description}
                                                </p>
                                            )}

                                            {/* Audio Player - Show only when playing */}
                                            {playingId === recording._id && (
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <audio
                                                        controls
                                                        autoPlay
                                                        src={recording.audioUrl}
                                                        className="w-full"
                                                    />
                                                </div>
                                            )}

                                            {/* Download Button */}
                                            <a
                                                href={recording.audioUrl}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block mt-4 text-center px-4 py-2 rounded-lg bg-[#F2C79B] text-gray-900 font-semibold text-sm hover:bg-[#FFE8D1] transition"
                                            >
                                                ⬇ Download
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {hasMore && (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={loadMore}
                                        className="px-8 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
                                    >
                                        Load More Recordings
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

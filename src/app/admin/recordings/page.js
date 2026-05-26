"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function AdminRecordingsPage() {
    const [recordings, setRecordings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(null);
    const [playingId, setPlayingId] = useState(null);

    async function loadRecordings() {
        try {
            const res = await fetch("/api/recordings?limit=50");
            const data = await res.json();
            if (data?.ok) {
                setRecordings(data.recordings || []);
            }
        } catch (err) {
            setError("Failed to load recordings");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRecordings();
    }, []);

    async function deleteRecording(id) {
        if (!confirm("Are you sure you want to delete this recording?")) return;

        setDeleting(id);
        try {
            const res = await fetch(`/api/recordings/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data?.ok) {
                setRecordings(recordings.filter((r) => r._id !== id));
            } else {
                alert("Failed to delete recording");
            }
        } catch (err) {
            alert("Error deleting recording");
            console.error(err);
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Recordings
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage saved audio broadcasts
                    </p>
                </div>
                <Link
                    href="/admin/live"
                    className="px-4 py-2 rounded-lg bg-[#F2C79B] text-gray-900 font-semibold hover:bg-[#FFE8D1] transition"
                >
                    ← Back to Live Stream
                </Link>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">
                        Loading recordings...
                    </div>
                ) : recordings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p className="text-lg">No recordings yet</p>
                        <p className="text-sm mt-2">
                            Start a live stream and it will be automatically
                            saved here
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                                        Duration
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                                        Downloads
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recordings.map((recording) => (
                                    <tr
                                        key={recording._id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {recording.title}
                                                </p>
                                                {recording.description && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {recording.description}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDuration(recording.duration)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDate(recording.startedAt)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {recording.downloadCount || 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        setPlayingId(
                                                            playingId ===
                                                                recording._id
                                                                ? null
                                                                : recording._id,
                                                        )
                                                    }
                                                    className="px-3 py-1.5 rounded bg-[#F2C79B] text-gray-900 font-semibold text-sm hover:bg-[#FFE8D1] transition"
                                                >
                                                    {playingId === recording._id
                                                        ? "⏸"
                                                        : "▶"}
                                                </button>
                                                <a
                                                    href={recording.audioUrl}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 rounded bg-blue-100 text-blue-700 font-semibold text-sm hover:bg-blue-200 transition"
                                                >
                                                    ⬇
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        deleteRecording(
                                                            recording._id,
                                                        )
                                                    }
                                                    disabled={
                                                        deleting ===
                                                        recording._id
                                                    }
                                                    className="px-3 py-1.5 rounded bg-red-100 text-red-700 font-semibold text-sm hover:bg-red-200 transition disabled:opacity-60"
                                                >
                                                    {deleting === recording._id
                                                        ? "..."
                                                        : "✕"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Audio Player - only show when playing */}
            {playingId && recordings.find((r) => r._id === playingId) && (
                <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">
                        Now Playing
                    </h3>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            {recordings.find((r) => r._id === playingId)?.title}
                        </p>
                        <audio
                            controls
                            className="w-full"
                            src={
                                recordings.find((r) => r._id === playingId)
                                    ?.audioUrl
                            }
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

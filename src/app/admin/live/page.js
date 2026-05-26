"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

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
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        isLive: false,
        streamCode: null,
        shareableUrl: null,
        title: null,
        startedAt: null,
    });
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    
    // Audio recording references
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const audioContextRef = useRef(null);
    const processorRef = useRef(null);

    async function refresh() {
        const res = await fetch("/api/live-stream/status");
        const data = await res.json().catch(() => ({}));
        if (data?.current) setStatus(data.current);
    }

    useEffect(() => {
        refresh();
        const t = setInterval(refresh, 5000);
        return () => clearInterval(t);
    }, []);

    async function startStream() {
        if (!title.trim()) {
            setError("Please enter a stream title");
            return;
        }

        setLoading(true);
        setError("");
        try {
            // Start recording on server
            const res = await fetch("/api/live-stream/start", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data?.ok) {
                setError(data?.error || "Failed to start");
                setLoading(false);
                return;
            }

            // Store stream code for audio upload
            const streamCode = data.current.streamCode;

            // Request microphone access
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia(
                    {
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: false,
                        },
                    },
                );

                streamRef.current = mediaStream;

                // Create audio context for recording
                const audioContext = new (window.AudioContext ||
                    window.webkitAudioContext)();
                audioContextRef.current = audioContext;

                const mediaRecorder = new MediaRecorder(mediaStream, {
                    mimeType: "audio/webm",
                });

                mediaRecorderRef.current = mediaRecorder;

                // Handle audio data
                mediaRecorder.ondataavailable = async (event) => {
                    if (event.data.size > 0) {
                        // Send audio chunk to server
                        try {
                            await fetch(
                                `/api/live-stream/upload-chunk?streamCode=${streamCode}`,
                                {
                                    method: "POST",
                                    body: event.data,
                                },
                            );
                        } catch (err) {
                            console.error("Failed to upload audio chunk:", err);
                        }
                    }
                };

                // Start recording with timeslice to send chunks regularly
                mediaRecorder.start(1000); // Send chunks every 1 second

                setTitle("");
                await refresh();
            } catch (micErr) {
                setError(
                    "Could not access microphone. Please check permissions.",
                );
                console.error("Microphone error:", micErr);
                // Stop the server-side recording if mic access failed
                await fetch("/api/live-stream/stop", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                });
            }
        } catch (err) {
            setError(err.message || "Failed to start stream");
        } finally {
            setLoading(false);
        }
    }

    async function stopStream() {
        setLoading(true);
        setError("");
        try {
            // Stop microphone recording
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current = null;
            }

            // Stop audio context
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }

            // Stop media stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => {
                    track.stop();
                });
                streamRef.current = null;
            }

            // Stop the live stream on server
            const res = await fetch("/api/live-stream/stop", {
                method: "POST",
                headers: { "content-type": "application/json" },
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data?.ok) {
                setError(data?.error || "Failed to stop");
                return;
            }
            setTitle("");
            await refresh();
        } finally {
            setLoading(false);
        }
    }

    function copyShareLink() {
        if (status?.shareableUrl) {
            navigator.clipboard.writeText(status.shareableUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Live Stream
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your church audio broadcasts
                    </p>
                </div>
                <Link
                    href="/admin/recordings"
                    className="px-4 py-2 rounded-lg bg-[#F2C79B] text-gray-900 font-semibold hover:bg-[#FFE8D1] transition"
                >
                    📦 View Recordings
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Control */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Stream Control
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Start or stop your live broadcast
                                </p>
                            </div>
                            <StatusPill live={status?.isLive} />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        {!status.isLive ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Stream Title
                                    </label>
                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                                        placeholder="e.g. Sunday Worship Service"
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    onClick={startStream}
                                    className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
                                >
                                    {loading
                                        ? "Starting... (Allow microphone access)"
                                        : "🎙️ Start Stream & Record"}
                                </button>
                                <p className="text-xs text-gray-500 text-center">
                                    You'll be asked to allow microphone access
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                                    <p className="text-sm font-semibold text-red-800 mb-2">
                                        🔴 Currently Streaming
                                    </p>
                                    {status.title && (
                                        <p className="text-sm text-red-600 font-medium">
                                            {status.title}
                                        </p>
                                    )}
                                    {status.startedAt && (
                                        <p className="text-xs text-red-500 mt-2">
                                            Started:{" "}
                                            {new Date(
                                                status.startedAt,
                                            ).toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                {/* Shareable Link */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        📱 Share Link with Listeners
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={status?.shareableUrl || ""}
                                            readOnly
                                            className="flex-1 p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                                        />
                                        <button
                                            onClick={copyShareLink}
                                            className="px-4 py-3 rounded-lg bg-[#F2C79B] text-gray-900 font-semibold hover:bg-[#FFE8D1] transition"
                                        >
                                            {copied ? "✓ Copied!" : "Copy"}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Share this link on WhatsApp, email, or
                                        SMS for listeners to join the audio
                                        stream
                                    </p>
                                </div>

                                <button
                                    disabled={loading}
                                    onClick={stopStream}
                                    className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
                                >
                                    {loading
                                        ? "Stopping..."
                                        : "⏹ Stop Stream & Save Recording"}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Instructions */}
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                        <h3 className="font-bold text-blue-900 mb-3">
                            ℹ️ How It Works
                        </h3>
                        <div className="text-sm text-blue-800 space-y-2">
                            <p>1. Enter a stream title</p>
                            <p>2. Click "Start Stream & Record"</p>
                            <p>3. Allow microphone access</p>
                            <p>4. Your audio is recorded</p>
                            <p>5. Share the link with listeners</p>
                            <p>6. When done, click "Stop Stream"</p>
                            <p>7. Recording is automatically saved</p>
                        </div>
                    </div>

                    {/* Current Stream Info */}
                    {status?.isLive && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">
                                Stream Details
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-500">
                                        Status
                                    </span>
                                    <p className="text-red-600 font-semibold">
                                        Live
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Code</span>
                                    <p className="font-mono text-gray-700 text-lg">
                                        {status?.streamCode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

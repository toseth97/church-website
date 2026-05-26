import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";

export async function POST(req) {
    try {
        const authResult = await requireAdmin(req);
        if (!authResult.ok) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized" },
                { status: 401 },
            );
        }

        await connectDB();
        const body = await req.json();
        const { audioUrl, videoUrl, title } = body || {};

        // Stop any existing live streams
        await LiveStream.updateMany(
            { isLive: true },
            { isLive: false, stoppedAt: new Date() },
        );

        // Generate a unique stream code for shareable URL
        const streamCode = uuidv4().split("-")[0].toUpperCase(); // Short unique code

        // Create new live stream
        const stream = new LiveStream({
            isLive: true,
            audioUrl: audioUrl || null,
            videoUrl: videoUrl || null,
            title: title || "Live Worship Service",
            startedAt: new Date(),
            streamCode: streamCode,
        });

        await stream.save();

        // Generate shareable URL
        const shareableUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/listen/${streamCode}`;

        return NextResponse.json({
            ok: true,
            current: {
                id: stream._id,
                isLive: true,
                audioUrl: stream.audioUrl,
                videoUrl: stream.videoUrl,
                title: stream.title,
                startedAt: stream.startedAt,
                streamCode: stream.streamCode,
                shareableUrl: shareableUrl,
            },
        });
    } catch (err) {
        console.error("Live start error:", err);
        return NextResponse.json(
            { ok: false, error: err.message || "Failed" },
            { status: 400 },
        );
    }
}

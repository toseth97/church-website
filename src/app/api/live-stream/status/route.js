import { NextResponse } from "next/server";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";

export async function GET() {
    try {
        await connectDB();

        // Get current live stream
        const currentStream = await LiveStream.findOne({
            isLive: true,
            isActive: true,
        })
            .sort({ startedAt: -1 })
            .lean();

        const shareableUrl = currentStream?.streamCode
            ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/listen/${currentStream.streamCode}`
            : null;

        const current = currentStream
            ? {
                  id: currentStream._id,
                  isLive: true,
                  audioUrl: currentStream.audioUrl,
                  videoUrl: currentStream.videoUrl,
                  title: currentStream.title,
                  startedAt: currentStream.startedAt,
                  streamCode: currentStream.streamCode,
                  shareableUrl: shareableUrl,
              }
            : {
                  isLive: false,
                  audioUrl: null,
                  videoUrl: null,
                  title: null,
                  startedAt: null,
                  streamCode: null,
                  shareableUrl: null,
              };

        return NextResponse.json({ ok: true, current });
    } catch (err) {
        console.error("Live status error:", err);
        return NextResponse.json(
            { ok: false, error: "Failed to get status" },
            { status: 500 },
        );
    }
}

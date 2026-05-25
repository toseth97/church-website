import { NextResponse } from "next/server";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";

export async function GET() {
  try {
    await connectDB();

    // Get current live stream
    const currentStream = await LiveStream.findOne({ isLive: true, isActive: true }).sort({ startedAt: -1 }).lean();

    const current = currentStream
      ? {
          isLive: true,
          audioUrl: currentStream.audioUrl,
          videoUrl: currentStream.videoUrl,
          title: currentStream.title,
          startedAt: currentStream.startedAt,
        }
      : { isLive: false, audioUrl: null, videoUrl: null, title: null, startedAt: null };

    return NextResponse.json({ ok: true, current });
  } catch (err) {
    console.error("Live status error:", err);
    return NextResponse.json({ ok: false, error: "Failed to get status" }, { status: 500 });
  }
}

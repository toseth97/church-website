import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";

export async function POST(req) {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { audioUrl, videoUrl, title } = body || {};

    if (!audioUrl && !videoUrl) {
      return NextResponse.json(
        { ok: false, error: "Audio URL or Video URL is required" },
        { status: 400 }
      );
    }

    // Stop any existing live streams
    await LiveStream.updateMany(
      { isLive: true },
      { isLive: false, stoppedAt: new Date() }
    );

    // Create new live stream
    const stream = new LiveStream({
      isLive: true,
      audioUrl: audioUrl || null,
      videoUrl: videoUrl || null,
      title: title || "Live Worship Service",
      startedAt: new Date(),
    });

    await stream.save();

    return NextResponse.json({
      ok: true,
      current: {
        isLive: true,
        audioUrl: stream.audioUrl,
        videoUrl: stream.videoUrl,
        title: stream.title,
        startedAt: stream.startedAt,
      },
    });
  } catch (err) {
    console.error("Live start error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed" }, { status: 400 });
  }
}

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

    const currentStream = await LiveStream.findOne({ isLive: true });

    if (!currentStream) {
      return NextResponse.json({ ok: false, error: "No active stream to stop" }, { status: 400 });
    }

    currentStream.isLive = false;
    currentStream.stoppedAt = new Date();
    await currentStream.save();

    return NextResponse.json({ ok: true, record: currentStream });
  } catch (err) {
    console.error("Live stop error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed" }, { status: 400 });
  }
}

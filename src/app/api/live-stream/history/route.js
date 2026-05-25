import { NextResponse } from "next/server";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit")) || 20;

    const history = await LiveStream.find({ isLive: false })
      .sort({ stoppedAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ ok: true, history });
  } catch (err) {
    console.error("Live history error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch history" }, { status: 500 });
  }
}

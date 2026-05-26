import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";
import Recording from "@/server/models/Recording.js";

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

        const currentStream = await LiveStream.findOne({ isLive: true });

        if (!currentStream) {
            return NextResponse.json(
                { ok: false, error: "No active stream to stop" },
                { status: 400 },
            );
        }

        // Stop the stream
        currentStream.isLive = false;
        currentStream.stoppedAt = new Date();
        await currentStream.save();

        // Create a recording entry if audio URL exists
        let recording = null;
        if (currentStream.audioUrl) {
            recording = new Recording({
                title: currentStream.title,
                description: `Recorded from live stream on ${new Date(currentStream.startedAt).toLocaleDateString()}`,
                audioUrl: currentStream.audioUrl,
                startedAt: currentStream.startedAt,
                stoppedAt: currentStream.stoppedAt,
                linkedLiveStreamId: currentStream._id,
                status: "completed",
            });
            await recording.save();
            currentStream.recordingId = recording._id;
            await currentStream.save();
        }

        return NextResponse.json({
            ok: true,
            stream: currentStream,
            recording: recording,
        });
    } catch (err) {
        console.error("Live stop error:", err);
        return NextResponse.json(
            { ok: false, error: err.message || "Failed" },
            { status: 400 },
        );
    }
}

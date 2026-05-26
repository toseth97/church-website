import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";
import fs from "fs";
import path from "path";

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
        const { title } = body || {};

        if (!title || !title.trim()) {
            return NextResponse.json(
                { ok: false, error: "Stream title is required" },
                { status: 400 },
            );
        }

        // Stop any existing live streams
        await LiveStream.updateMany(
            { isLive: true },
            { isLive: false, stoppedAt: new Date() },
        );

        // Generate a unique stream code
        const streamCode = uuidv4().split("-")[0].toUpperCase();

        // Create recordings directory if it doesn't exist
        const recordingsDir = path.join(process.cwd(), "public", "recordings");
        if (!fs.existsSync(recordingsDir)) {
            fs.mkdirSync(recordingsDir, { recursive: true });
        }

        // Create recording file path
        const recordingFileName = `${streamCode}-${Date.now()}.wav`;
        const recordingPath = path.join(recordingsDir, recordingFileName);

        // Create empty recording file
        fs.writeFileSync(recordingPath, "");

        // Create new live stream
        const stream = new LiveStream({
            isLive: true,
            audioUrl: null,
            videoUrl: null,
            title: title.trim(),
            startedAt: new Date(),
            streamCode: streamCode,
            recordingPath: recordingPath,
            recordingFileName: recordingFileName,
        });

        await stream.save();

        // Generate shareable URL
        const shareableUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/listen/${streamCode}`;

        return NextResponse.json({
            ok: true,
            current: {
                id: stream._id,
                isLive: true,
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

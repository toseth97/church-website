import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";
import fs from "fs";

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

        // Get the audio blob from request
        const buffer = await req.arrayBuffer();
        
        // Get streamCode from query params
        const { searchParams } = new URL(req.url);
        const streamCode = searchParams.get("streamCode");

        if (!streamCode) {
            return NextResponse.json(
                { ok: false, error: "Stream code required" },
                { status: 400 },
            );
        }

        // Find the active stream
        const stream = await LiveStream.findOne({
            streamCode: streamCode,
            isLive: true,
        });

        if (!stream || !stream.recordingPath) {
            return NextResponse.json(
                { ok: false, error: "Stream not found or not recording" },
                { status: 404 },
            );
        }

        // Append the audio chunk to the recording file
        try {
            fs.appendFileSync(stream.recordingPath, Buffer.from(buffer));
            return NextResponse.json({ ok: true });
        } catch (err) {
            console.error("Error writing audio chunk:", err);
            return NextResponse.json(
                { ok: false, error: "Failed to save audio chunk" },
                { status: 500 },
            );
        }
    } catch (err) {
        console.error("Upload chunk error:", err);
        return NextResponse.json(
            { ok: false, error: err.message || "Failed" },
            { status: 400 },
        );
    }
}

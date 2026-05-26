import { NextResponse } from "next/server";
import connectDB from "@/server/lib/db.js";
import LiveStream from "@/server/models/LiveStream.js";
import fs from "fs";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { streamCode } = params;

        // Find the stream
        const stream = await LiveStream.findOne({
            streamCode: streamCode,
        });

        if (!stream) {
            return new NextResponse("Stream not found", { status: 404 });
        }

        // Check if recording file exists
        if (!stream.recordingPath || !fs.existsSync(stream.recordingPath)) {
            return new NextResponse("Recording not found", { status: 404 });
        }

        // If stream is still live, stream the live file
        if (stream.isLive) {
            return new NextResponse(fs.createReadStream(stream.recordingPath), {
                headers: {
                    "Content-Type": "audio/webm",
                    "Accept-Ranges": "bytes",
                },
            });
        }

        // If stream is stopped, serve the complete file
        const stat = fs.statSync(stream.recordingPath);
        const fileSize = stat.size;

        // Support range requests for partial playback
        const range = req.headers.get("range");
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = end - start + 1;

            const fileStream = fs.createReadStream(stream.recordingPath, {
                start,
                end,
            });

            return new NextResponse(fileStream, {
                status: 206,
                headers: {
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize.toString(),
                    "Content-Type": "audio/webm",
                },
            });
        }

        // Return full file
        return new NextResponse(fs.createReadStream(stream.recordingPath), {
            headers: {
                "Content-Type": "audio/webm",
                "Content-Length": fileSize.toString(),
            },
        });
    } catch (err) {
        console.error("Stream error:", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

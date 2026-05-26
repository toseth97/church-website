import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import Recording from "@/server/models/Recording.js";

export async function DELETE(req, { params }) {
    try {
        const authResult = await requireAdmin(req);
        if (!authResult.ok) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized" },
                { status: 401 },
            );
        }

        await connectDB();

        const { id } = params;

        const recording = await Recording.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true },
        );

        if (!recording) {
            return NextResponse.json(
                { ok: false, error: "Recording not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({
            ok: true,
            message: "Recording deleted",
            recording,
        });
    } catch (err) {
        console.error("Delete recording error:", err);
        return NextResponse.json(
            { ok: false, error: err.message || "Failed" },
            { status: 400 },
        );
    }
}

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const recording = await Recording.findById(id);

        if (!recording || !recording.isActive) {
            return NextResponse.json(
                { ok: false, error: "Recording not found" },
                { status: 404 },
            );
        }

        // Increment download count
        recording.downloadCount = (recording.downloadCount || 0) + 1;
        await recording.save();

        return NextResponse.json({ ok: true, recording });
    } catch (err) {
        console.error("Get recording error:", err);
        return NextResponse.json(
            { ok: false, error: err.message || "Failed" },
            { status: 400 },
        );
    }
}

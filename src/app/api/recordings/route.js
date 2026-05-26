import { NextResponse } from "next/server";
import connectDB from "@/server/lib/db.js";
import Recording from "@/server/models/Recording.js";

export async function GET(req) {
    try {
        await connectDB();

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const limit = Math.min(
            parseInt(searchParams.get("limit") || "20"),
            100,
        );
        const skip = parseInt(searchParams.get("skip") || "0");

        const recordings = await Recording.find({ isActive: true })
            .sort({ startedAt: -1 })
            .limit(limit)
            .skip(skip)
            .select(
                "title description audioUrl duration startedAt stoppedAt downloadCount createdAt",
            );

        const total = await Recording.countDocuments({ isActive: true });

        return NextResponse.json({
            ok: true,
            recordings,
            pagination: {
                total,
                limit,
                skip,
                hasMore: skip + limit < total,
            },
        });
    } catch (err) {
        console.error("Get recordings error:", err);
        return NextResponse.json(
            { ok: false, error: err.message || "Failed" },
            { status: 400 },
        );
    }
}

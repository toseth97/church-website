import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import Sermon from "@/server/models/Sermon.js";

// GET all sermons (public)
export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit")) || 50;
    const featured = url.searchParams.get("featured");

    const query = { isActive: true };
    if (featured === "true") query.isFeatured = true;

    const sermons = await Sermon.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ ok: true, sermons });
  } catch (err) {
    console.error("Sermons GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch sermons" }, { status: 500 });
  }
}

// POST create sermon (admin only)
export async function POST(req) {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const sermon = new Sermon(body);
    await sermon.save();

    return NextResponse.json({ ok: true, sermon }, { status: 201 });
  } catch (err) {
    console.error("Sermons POST error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to create sermon" }, { status: 400 });
  }
}

// PUT update sermon (admin only)
export async function PUT(req) {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Sermon ID is required" }, { status: 400 });
    }

    const sermon = await Sermon.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!sermon) {
      return NextResponse.json({ ok: false, error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, sermon });
  } catch (err) {
    console.error("Sermons PUT error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to update sermon" }, { status: 400 });
  }
}

// DELETE sermon (admin only)
export async function DELETE(req) {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "Sermon ID is required" }, { status: 400 });
    }

    const sermon = await Sermon.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!sermon) {
      return NextResponse.json({ ok: false, error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Sermon deleted successfully" });
  } catch (err) {
    console.error("Sermons DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete sermon" }, { status: 500 });
  }
}

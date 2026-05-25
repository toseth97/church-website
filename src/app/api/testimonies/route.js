import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import Testimony from "@/server/models/Testimony.js";

// GET all testimonies (public)
export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit")) || 50;
    const approved = url.searchParams.get("approved");

    const query = { isActive: true };
    if (approved !== "false") query.isApproved = true;

    const testimonies = await Testimony.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ ok: true, testimonies });
  } catch (err) {
    console.error("Testimonies GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch testimonies" }, { status: 500 });
  }
}

// POST create testimony (admin only)
export async function POST(req) {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const testimony = new Testimony(body);
    await testimony.save();

    return NextResponse.json({ ok: true, testimony }, { status: 201 });
  } catch (err) {
    console.error("Testimonies POST error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to create testimony" }, { status: 400 });
  }
}

// PUT update testimony (admin only)
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
      return NextResponse.json({ ok: false, error: "Testimony ID is required" }, { status: 400 });
    }

    const testimony = await Testimony.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!testimony) {
      return NextResponse.json({ ok: false, error: "Testimony not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, testimony });
  } catch (err) {
    console.error("Testimonies PUT error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to update testimony" }, { status: 400 });
  }
}

// DELETE testimony (admin only)
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
      return NextResponse.json({ ok: false, error: "Testimony ID is required" }, { status: 400 });
    }

    const testimony = await Testimony.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!testimony) {
      return NextResponse.json({ ok: false, error: "Testimony not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Testimony deleted successfully" });
  } catch (err) {
    console.error("Testimonies DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete testimony" }, { status: 500 });
  }
}

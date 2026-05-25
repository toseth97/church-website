import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";
import connectDB from "@/server/lib/db.js";
import Event from "@/server/models/Event.js";

// GET all events (public)
export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit")) || 50;
    const featured = url.searchParams.get("featured");

    const query = { isActive: true };
    if (featured === "true") query.isFeatured = true;

    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ ok: true, events });
  } catch (err) {
    console.error("Events GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST create event (admin only)
export async function POST(req) {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const event = new Event(body);
    await event.save();

    return NextResponse.json({ ok: true, event }, { status: 201 });
  } catch (err) {
    console.error("Events POST error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to create event" }, { status: 400 });
  }
}

// PUT update event (admin only)
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
      return NextResponse.json({ ok: false, error: "Event ID is required" }, { status: 400 });
    }

    const event = await Event.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!event) {
      return NextResponse.json({ ok: false, error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, event });
  } catch (err) {
    console.error("Events PUT error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Failed to update event" }, { status: 400 });
  }
}

// DELETE event (admin only)
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
      return NextResponse.json({ ok: false, error: "Event ID is required" }, { status: 400 });
    }

    // Soft delete
    const event = await Event.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!event) {
      return NextResponse.json({ ok: false, error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("Events DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete event" }, { status: 500 });
  }
}

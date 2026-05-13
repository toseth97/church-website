import { NextResponse } from "next/server";
import { startStream } from "@/server/lib/liveStore";
import { requireAdmin } from "@/server/lib/adminAuth";

export async function POST(req) {
  const admin = await requireAdmin(req);
  if (!admin.ok) return admin.res;

  const body = await req.json().catch(() => ({}));
  const { audioUrl } = body || {};

  try {
    const current = startStream({ audioUrl });
    return NextResponse.json({ ok: true, current });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed" }, { status: 400 });
  }
}


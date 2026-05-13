import { NextResponse } from "next/server";
import { stopStream } from "@/server/lib/liveStore";
import { requireAdmin } from "@/server/lib/adminAuth";

export async function POST(req) {
  const admin = await requireAdmin(req);
  if (!admin.ok) return admin.res;

  const body = await req.json().catch(() => ({}));
  const { savedAudioUrl } = body || {};

  try {
    const record = stopStream({ savedAudioUrl });
    return NextResponse.json({ ok: true, record });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed" }, { status: 400 });
  }
}


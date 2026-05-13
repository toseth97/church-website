import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/adminAuth";

export async function GET(req) {
  const admin = await requireAdmin(req);
  if (!admin.ok) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true });
}


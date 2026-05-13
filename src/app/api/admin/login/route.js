import { NextResponse } from "next/server";
import { adminLogin } from "@/server/lib/adminAuth";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { password } = body || {};

  const result = adminLogin({ password });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}


import { NextResponse } from "next/server";
import { getLiveStatus } from "@/server/lib/liveStore";

export async function GET() {
  const current = getLiveStatus();
  return NextResponse.json({ ok: true, current });
}


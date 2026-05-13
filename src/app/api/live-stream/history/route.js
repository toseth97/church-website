import { NextResponse } from "next/server";
import { listHistory } from "@/server/lib/liveStore";

export async function GET(req) {
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");

  const history = listHistory({ limit });
  return NextResponse.json({ ok: true, history });
}


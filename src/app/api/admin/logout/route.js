import { NextResponse } from "next/server";
import { adminLogout } from "@/server/lib/adminAuth";

export async function POST() {
  adminLogout();
  return NextResponse.json({ ok: true });
}


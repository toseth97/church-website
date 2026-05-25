import { NextResponse } from "next/server";
import { adminLogoutHandler } from "@/server/lib/auth.js";

export async function POST() {
  try {
    await adminLogoutHandler();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Logout failed" }, { status: 500 });
  }
}

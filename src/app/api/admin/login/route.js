import { NextResponse } from "next/server";
import { adminLoginHandler } from "@/server/lib/auth.js";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body || {};

    const result = await adminLoginHandler({ email, password });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      admin: result.admin,
    });
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { ok: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}

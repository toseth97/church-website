import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/lib/auth.js";

export async function GET(req) {
  try {
    const result = await requireAdmin(req);
    if (!result.ok) {
      return NextResponse.json({ ok: false });
    }

    return NextResponse.json({
      ok: true,
      admin: {
        id: result.admin._id,
        name: result.admin.name,
        email: result.admin.email,
        role: result.admin.role,
      },
    });
  } catch (err) {
    return NextResponse.json({ ok: false });
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "church_admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function requireAdmin(req) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  // Simple cookie check
  if (token && ADMIN_PASSWORD && token === `admin:${ADMIN_PASSWORD}`) {
    return { ok: true };
  }

  // If admin password isn't configured, deny everything by default
  return {
    ok: false,
    res: NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    ),
  };
}

export function adminLogin({ password }) {
  if (!ADMIN_PASSWORD) {
    return {
      ok: false,
      error: "Server is not configured. Set ADMIN_PASSWORD.",
    };
  }

  if (password !== ADMIN_PASSWORD) {
    return { ok: false, error: "Invalid password" };
  }

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, `admin:${ADMIN_PASSWORD}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6, // 6 hours
  });

  return { ok: true };
}

export function adminLogout() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}


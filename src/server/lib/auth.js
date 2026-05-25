import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Admin from "../models/Admin.js";
import connectDB from "./db.js";

const JWT_SECRET = process.env.JWT_SECRET || "hhgc-super-secret-key-change-in-production-2024";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "hhgc-refresh-secret-key-change-in-production-2024";
const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes for access token
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days for refresh token
const COOKIE_NAME = "hhgc_admin_token";
const REFRESH_COOKIE_NAME = "hhgc_admin_refresh";

/**
 * Generate access token
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

/**
 * Verify access token
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Set auth cookies with security flags
 */
export function setAuthCookies(token, refreshToken) {
  const cookieStore = cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60, // 15 minutes
  });

  cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/**
 * Clear auth cookies
 */
export function clearAuthCookies() {
  const cookieStore = cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  cookieStore.set(REFRESH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}

/**
 * Require admin authentication middleware
 * Returns { ok: true, admin } or { ok: false, res: NextResponse }
 */
export async function requireAdmin(req) {
  await connectDB();

  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  // Try access token first
  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded && decoded.userId) {
      try {
        const admin = await Admin.findById(decoded.userId).select("-password -refreshToken");
        if (admin && admin.isActive && !admin.isLocked) {
          return { ok: true, admin };
        }
      } catch (err) {
        // Admin not found, continue
      }
    }
  }

  // Try refresh token if access token is expired
  if (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded && decoded.userId) {
      try {
        const admin = await Admin.findById(decoded.userId).select("-password -refreshToken");
        if (admin && admin.isActive && !admin.isLocked) {
          // Generate new access token
          const newAccessToken = generateAccessToken({
            userId: admin._id,
            email: admin.email,
            role: admin.role,
          });

          // Set new access token cookie
          cookieStore.set(COOKIE_NAME, newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 15 * 60,
          });

          return { ok: true, admin };
        }
      } catch (err) {
        // Admin not found
      }
    }
  }

  return {
    ok: false,
    error: "Unauthorized",
  };
}

/**
 * Admin login handler
 */
export async function adminLoginHandler({ email, password }) {
  await connectDB();

  if (!email || !password) {
    return { ok: false, error: "Email and password are required" };
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password +loginAttempts +lockUntil");

    if (!admin) {
      return { ok: false, error: "Invalid email or password" };
    }

    // Check if account is locked
    if (admin.isLocked) {
      const lockRemaining = Math.ceil((admin.lockUntil - Date.now()) / (1000 * 60));
      return {
        ok: false,
        error: `Account is temporarily locked due to too many failed attempts. Try again in ${lockRemaining} minutes.`,
      };
    }

    // Check if account is active
    if (!admin.isActive) {
      return { ok: false, error: "Account has been deactivated. Contact superadmin." };
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      await admin.incLoginAttempts();
      return { ok: false, error: "Invalid email or password" };
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: admin._id,
      email: admin.email,
      role: admin.role,
    });

    const refreshToken = generateRefreshToken({
      userId: admin._id,
      email: admin.email,
      role: admin.role,
    });

    // Save refresh token to DB
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    // Set cookies
    setAuthCookies(accessToken, refreshToken);

    return {
      ok: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  } catch (err) {
    console.error("Login error:", err);
    return { ok: false, error: "An error occurred during login" };
  }
}

/**
 * Admin logout handler
 */
export async function adminLogoutHandler() {
  try {
    await connectDB();
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      if (decoded?.userId) {
        const admin = await Admin.findById(decoded.userId);
        if (admin) {
          admin.refreshToken = null;
          await admin.save({ validateBeforeSave: false });
        }
      }
    }
  } catch (err) {
    // Continue with logout even if DB operation fails
  }

  clearAuthCookies();
  return { ok: true };
}

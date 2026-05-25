import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Admin from "../models/Admin.js";
import connectDB from "./db.js";

const JWT_SECRET =
    process.env.JWT_SECRET || "hhgc-super-secret-key-change-in-production-2024";
const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET ||
    "hhgc-refresh-secret-key-change-in-production-2024";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";
const COOKIE_NAME = "hhgc_admin_token";
const REFRESH_COOKIE_NAME = "hhgc_admin_refresh";

export function generateAccessToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (err) {
        return null;
    }
}

export async function setAuthCookies(token, refreshToken) {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
    });

    cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();

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

export async function requireAdmin(req) {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

    if (token) {
        const decoded = verifyAccessToken(token);
        if (decoded && decoded.userId) {
            try {
                const admin = await Admin.findById(decoded.userId).select(
                    "-password -refreshToken",
                );
                if (admin && admin.isActive && !admin.isLocked) {
                    return { ok: true, admin };
                }
            } catch (err) {
                // Fall through
            }
        }
    }

    if (refreshToken) {
        const decoded = verifyRefreshToken(refreshToken);
        if (decoded && decoded.userId) {
            try {
                const admin = await Admin.findById(decoded.userId).select(
                    "-password -refreshToken",
                );
                if (admin && admin.isActive && !admin.isLocked) {
                    const newAccessToken = generateAccessToken({
                        userId: admin._id,
                        email: admin.email,
                        role: admin.role,
                    });

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
                // Fall through
            }
        }
    }

    return { ok: false, error: "Unauthorized" };
}

export async function adminLoginHandler({ email, password }) {
    await connectDB();

    if (!email || !password) {
        return { ok: false, error: "Email and password are required" };
    }

    try {
        const admin = await Admin.findOne({
            email: email.toLowerCase(),
        }).select("+password +loginAttempts +lockUntil");

        if (!admin) {
            return { ok: false, error: "Invalid email or password" };
        }

        if (admin.isLocked) {
            const lockRemaining = Math.ceil(
                (admin.lockUntil - Date.now()) / (1000 * 60),
            );
            return {
                ok: false,
                error: `Account is temporarily locked. Try again in ${lockRemaining} minutes.`,
            };
        }

        if (!admin.isActive) {
            return {
                ok: false,
                error: "Account has been deactivated. Contact superadmin.",
            };
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            await admin.incLoginAttempts();
            return { ok: false, error: "Invalid email or password" };
        }

        await admin.resetLoginAttempts();

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

        // Save token by bypassing the pre-save password re-hash completely
        await Admin.updateOne(
            { _id: admin._id },
            { $set: { refreshToken: refreshToken } },
        );

        await setAuthCookies(accessToken, refreshToken);

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

export async function adminLogoutHandler() {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

        if (refreshToken) {
            const decoded = verifyRefreshToken(refreshToken);
            if (decoded?.userId) {
                await Admin.updateOne(
                    { _id: decoded.userId },
                    { $unset: { refreshToken: 1 } },
                );
            }
        }
    } catch (err) {
        // Fall through
    }

    await clearAuthCookies();
    return { ok: true };
}

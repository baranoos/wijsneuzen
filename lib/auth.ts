import crypto from "crypto"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "fallback-secret"
export const SESSION_COOKIE = "user_session"

// ── Password hashing ─────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  const verify = crypto.scryptSync(password, salt, 64).toString("hex")
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(verify))
}

// ── Session tokens ───────────────────────────────────────

export function createSessionToken(userId: string, role: string): string {
  const payload = `${userId}:${role}`
  const hmac = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex")
  return `${payload}.${hmac}`
}

export function verifySessionToken(
  token: string
): { userId: string; role: string } | null {
  const dotIndex = token.lastIndexOf(".")
  if (dotIndex === -1) return null

  const payload = token.substring(0, dotIndex)
  const hmac = token.substring(dotIndex + 1)

  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex")

  if (hmac.length !== expected.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected)))
    return null

  const [userId, role] = payload.split(":")
  if (!userId || !role) return null
  return { userId, role }
}

// ── Cookie helpers (server-side) ─────────────────────────

export async function setSessionCookie(userId: string, role: string) {
  const token = createSessionToken(userId, role)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  // Also clear legacy admin_session cookie
  cookieStore.delete("admin_session")
}

/**
 * Get the current authenticated user from the session cookie.
 * Returns null if not logged in or session invalid.
 */
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (!session?.value) return null

  const parsed = verifySessionToken(session.value)
  if (!parsed) return null

  try {
    const user = await prisma.user.findUnique({
      where: { id: parsed.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
    return user
  } catch {
    return null
  }
}

/**
 * Parse session token from raw cookie value (for middleware / edge).
 * Does NOT hit the database - only verifies the HMAC signature.
 */
export function parseSessionFromToken(
  token: string
): { userId: string; role: string } | null {
  return verifySessionToken(token)
}

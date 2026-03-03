import { NextRequest, NextResponse } from "next/server"

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "fallback-secret"
const SESSION_COOKIE = "user_session"

// Web Crypto API compatible HMAC for Edge runtime
async function hmacHex(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

async function parseSession(token: string): Promise<{ userId: string; role: string } | null> {
  const dotIndex = token.lastIndexOf(".")
  if (dotIndex === -1) return null

  const payload = token.substring(0, dotIndex)
  const hmac = token.substring(dotIndex + 1)

  const expected = await hmacHex(SESSION_SECRET, payload)

  if (!timingSafeEqual(hmac, expected)) return null

  const [userId, role] = payload.split(":")
  if (!userId || !role) return null
  return { userId, role }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPage = pathname.startsWith("/admin")
  const isAdminApi = pathname.startsWith("/api/admin")

  // Public auth routes - always accessible
  const isPublicAuth =
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/register"

  // Legacy admin auth routes - keep accessible
  const isLegacyAuthRoute =
    pathname.startsWith("/api/admin/auth/login") ||
    pathname.startsWith("/api/admin/auth/check")
  const isLoginPage = pathname === "/admin/login"

  if (isPublicAuth || isLegacyAuthRoute || isLoginPage) {
    return NextResponse.next()
  }

  if (isAdminPage || isAdminApi) {
    const session = request.cookies.get(SESSION_COOKIE)

    if (!session || !session.value) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 })
      }
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    const parsed = await parseSession(session.value)
    if (!parsed) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Ongeldige sessie" }, { status: 401 })
      }
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Admin pages/APIs require at least VERIFIED role
    const allowedRoles = ["VERIFIED", "WIJSNEUZEN"]
    if (!allowedRoles.includes(parsed.role)) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: "Geen toegang. Je account moet geverifieerd zijn." },
          { status: 403 }
        )
      }
      // Redirect non-verified users to homepage
      const homeUrl = new URL("/", request.url)
      return NextResponse.redirect(homeUrl)
    }

    // Add user info to headers for downstream use
    const response = NextResponse.next()
    response.headers.set("x-user-id", parsed.userId)
    response.headers.set("x-user-role", parsed.role)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/login", "/register"],
}

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "crypto"

function hashToken(value: string): string {
  return crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET || "fallback-secret")
    .update(value)
    .digest("hex")
}

const SESSION_COOKIE = "admin_session"
const SESSION_VALUE = "authenticated"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin inloggegevens niet geconfigureerd op de server." },
        { status: 500 }
      )
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Onjuist e-mailadres of wachtwoord." },
        { status: 401 }
      )
    }

    // Create session token
    const token = hashToken(SESSION_VALUE)

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Er is een fout opgetreden." },
      { status: 500 }
    )
  }
}

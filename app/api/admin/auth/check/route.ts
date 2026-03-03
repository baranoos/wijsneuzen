import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "crypto"

function hashToken(value: string): string {
  return crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET || "fallback-secret")
    .update(value)
    .digest("hex")
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  const expectedToken = hashToken("authenticated")

  if (session?.value === expectedToken) {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, setSessionCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail en wachtwoord zijn verplicht." },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: "Onjuist e-mailadres of wachtwoord." },
        { status: 401 }
      )
    }

    const valid = verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { error: "Onjuist e-mailadres of wachtwoord." },
        { status: 401 }
      )
    }

    if (user.role === "PENDING") {
      return NextResponse.json(
        { error: "Je account is nog niet goedgekeurd. Wacht tot een beheerder je account activeert." },
        { status: 403 }
      )
    }

    await setSessionCookie(user.id, user.role)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het inloggen." },
      { status: 500 }
    )
  }
}

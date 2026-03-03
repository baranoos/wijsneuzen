import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Naam, e-mail en wachtwoord zijn verplicht." },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Wachtwoord moet minstens 6 tekens bevatten." },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "Dit e-mailadres is al geregistreerd." },
        { status: 409 }
      )
    }

    const hashedPassword = hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PENDING",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Account aangemaakt. Je moet wachten tot een beheerder je account goedkeurt.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het registreren." },
      { status: 500 }
    )
  }
}

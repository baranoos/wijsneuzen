import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"

// Creates the first WIJSNEUZEN admin user from ADMIN_EMAIL + ADMIN_PASSWORD env vars
// Only works if no WIJSNEUZEN user exists yet
export async function POST() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL en ADMIN_PASSWORD moeten geconfigureerd zijn als omgevingsvariabelen." },
        { status: 500 }
      )
    }

    // Check if any WIJSNEUZEN user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "WIJSNEUZEN" },
    })

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Er bestaat al een WIJSNEUZEN gebruiker.", exists: true },
        { status: 200 }
      )
    }

    // Check if user with this email exists — upgrade them
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: "WIJSNEUZEN" },
      })
      return NextResponse.json({
        message: `Bestaande gebruiker ${adminEmail} is nu WIJSNEUZEN.`,
        upgraded: true,
      })
    }

    // Create new WIJSNEUZEN user
    const hashedPassword = await hashPassword(adminPassword)
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "WIJSNEUZEN",
      },
    })

    return NextResponse.json({
      message: `WIJSNEUZEN gebruiker aangemaakt met ${adminEmail}.`,
      created: true,
    })
  } catch (error) {
    console.error("Error seeding admin user:", error)
    return NextResponse.json(
      { error: "Kon admin gebruiker niet aanmaken." },
      { status: 500 }
    )
  }
}

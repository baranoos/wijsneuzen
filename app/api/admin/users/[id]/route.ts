import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// PUT - update user role (WIJSNEUZEN only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== "WIJSNEUZEN") {
    return NextResponse.json({ error: "Geen toegang" }, { status: 403 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { role } = body

    const validRoles = ["PENDING", "USER", "VERIFIED", "WIJSNEUZEN"]
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Ongeldige rol" },
        { status: 400 }
      )
    }

    // Prevent demoting yourself
    if (id === currentUser.id && role !== "WIJSNEUZEN") {
      return NextResponse.json(
        { error: "Je kunt je eigen rol niet wijzigen." },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Kon gebruiker niet bijwerken" },
      { status: 500 }
    )
  }
}

// DELETE - delete user (WIJSNEUZEN only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== "WIJSNEUZEN") {
    return NextResponse.json({ error: "Geen toegang" }, { status: 403 })
  }

  try {
    const { id } = await params

    if (id === currentUser.id) {
      return NextResponse.json(
        { error: "Je kunt je eigen account niet verwijderen." },
        { status: 400 }
      )
    }

    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { error: "Kon gebruiker niet verwijderen" },
      { status: 500 }
    )
  }
}

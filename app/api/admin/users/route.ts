import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// GET all users (WIJSNEUZEN only)
export async function GET() {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== "WIJSNEUZEN") {
    return NextResponse.json({ error: "Geen toegang" }, { status: 403 })
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            blogPosts: true,
            volunteerPosts: true,
          },
        },
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Kon gebruikers niet laden" },
      { status: 500 }
    )
  }
}

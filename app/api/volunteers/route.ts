import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all open volunteer posts (public)
export async function GET() {
  try {
    const posts = await prisma.volunteerPost.findMany({
      where: { status: { in: ["open", "vol"] } },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { applications: true } },
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching volunteer posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch volunteer posts" },
      { status: 500 }
    )
  }
}

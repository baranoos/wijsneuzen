import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET single volunteer post (public)
export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    // Try finding by id or slug
    const post = await prisma.volunteerPost.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        applications: {
          where: { status: { in: ["pending", "accepted"] } },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            message: true,
            createdAt: true,
          },
        },
        _count: { select: { applications: true } },
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching volunteer post:", error)
    return NextResponse.json(
      { error: "Failed to fetch volunteer post" },
      { status: 500 }
    )
  }
}

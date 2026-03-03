import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET single volunteer post
export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const post = await prisma.volunteerPost.findUnique({
      where: { id },
      include: {
        applications: {
          orderBy: { createdAt: "desc" },
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

// PUT update volunteer post
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      title,
      slug,
      description,
      content,
      featuredImage,
      spotsNeeded,
      authorName,
      location,
      date,
      status,
    } = body

    // Check slug uniqueness (excluding current)
    if (slug) {
      const existing = await prisma.volunteerPost.findUnique({ where: { slug } })
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Een vrijwilligerspost met deze slug bestaat al" },
          { status: 409 }
        )
      }
    }

    const post = await prisma.volunteerPost.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(spotsNeeded !== undefined && { spotsNeeded }),
        ...(authorName !== undefined && { authorName }),
        ...(location !== undefined && { location }),
        ...(date !== undefined && { date }),
        ...(status !== undefined && { status }),
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating volunteer post:", error)
    return NextResponse.json(
      { error: "Failed to update volunteer post" },
      { status: 500 }
    )
  }
}

// DELETE volunteer post (WIJSNEUZEN only)
export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "WIJSNEUZEN") {
      return NextResponse.json({ error: "Alleen Wijsneuzen kunnen posts verwijderen" }, { status: 403 })
    }

    const { id } = await params
    await prisma.volunteerPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting volunteer post:", error)
    return NextResponse.json(
      { error: "Failed to delete volunteer post" },
      { status: 500 }
    )
  }
}

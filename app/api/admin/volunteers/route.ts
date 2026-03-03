import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// GET all volunteer posts (for admin)
export async function GET() {
  try {
    const posts = await prisma.volunteerPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
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

// POST create a new volunteer post (VERIFIED or WIJSNEUZEN)
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || !(["VERIFIED", "WIJSNEUZEN"] as string[]).includes(user.role)) {
      return NextResponse.json({ error: "Geen toegang" }, { status: 403 })
    }

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

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Titel en slug zijn verplicht" },
        { status: 400 }
      )
    }

    const existing = await prisma.volunteerPost.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: "Een vrijwilligerspost met deze slug bestaat al" },
        { status: 409 }
      )
    }

    const post = await prisma.volunteerPost.create({
      data: {
        title,
        slug,
        description: description || "",
        content: content || "",
        featuredImage: featuredImage || "",
        spotsNeeded: spotsNeeded || 1,
        authorName: authorName || user.name,
        authorId: user.id,
        location: location || "",
        date: date || "",
        status: status || "open",
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating volunteer post:", error)
    return NextResponse.json(
      { error: "Failed to create volunteer post" },
      { status: 500 }
    )
  }
}

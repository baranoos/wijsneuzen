import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// GET all blog posts (for admin)
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    })

    const formatted = posts.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags),
      author: { name: p.authorName, avatar: p.authorAvatar },
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}

// POST create a new blog post (VERIFIED or WIJSNEUZEN)
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
      excerpt,
      content,
      featuredImage,
      authorName,
      authorAvatar,
      status,
      tags,
      publishedAt,
    } = body

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      )
    }

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: "Een blogpost met deze slug bestaat al" },
        { status: 409 }
      )
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || "",
        content: content || "",
        featuredImage: featuredImage || "",
        authorName: authorName || user.name,
        authorAvatar: authorAvatar || "",
        authorId: user.id,
        status: status || "draft",
        tags: JSON.stringify(tags || []),
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    })

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags),
      author: { name: post.authorName, avatar: post.authorAvatar },
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    )
  }
}

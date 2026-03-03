import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// PUT update a blog post (VERIFIED or WIJSNEUZEN)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Check if slug is taken by another post
    if (slug) {
      const existing = await prisma.blogPost.findUnique({ where: { slug } })
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Een andere blogpost gebruikt deze slug al" },
          { status: 409 }
        )
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(authorName !== undefined && { authorName }),
        ...(authorAvatar !== undefined && { authorAvatar }),
        ...(status !== undefined && { status }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
        ...(publishedAt !== undefined && {
          publishedAt: new Date(publishedAt),
        }),
      },
    })

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags),
      author: { name: post.authorName, avatar: post.authorAvatar },
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

// DELETE a blog post (WIJSNEUZEN only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "WIJSNEUZEN") {
      return NextResponse.json({ error: "Alleen Wijsneuzen kunnen blogposts verwijderen" }, { status: 403 })
    }

    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    )
  }
}

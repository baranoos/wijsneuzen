import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { blogPosts } from "@/lib/blog-data"

export async function POST() {
  try {
    let seeded = 0

    for (const post of blogPosts) {
      const existing = await prisma.blogPost.findUnique({
        where: { slug: post.slug },
      })

      if (!existing) {
        await prisma.blogPost.create({
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            featuredImage: post.featuredImage,
            authorName: post.author.name,
            authorAvatar: post.author.avatar,
            status: post.status,
            tags: JSON.stringify(post.tags),
            publishedAt: new Date(post.publishedAt),
          },
        })
        seeded++
      }
    }

    return NextResponse.json({
      message: `Blog seeded: ${seeded} posts aangemaakt.`,
      seeded,
    })
  } catch (error) {
    console.error("Error seeding blog:", error)
    return NextResponse.json(
      { error: "Failed to seed blog" },
      { status: 500 }
    )
  }
}

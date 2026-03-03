import { notFound } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"

export const dynamic = "force-dynamic"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  let post: {
    title: string
    slug: string
    content: string
    excerpt: string
    featuredImage: string
    authorName: string
    authorAvatar: string
    tags: string[]
    publishedAt: Date
    status: string
  } | null = null

  try {
    const dbPost = await prisma.blogPost.findUnique({ where: { slug } })
    if (dbPost) {
      post = {
        ...dbPost,
        tags: JSON.parse(dbPost.tags) as string[],
      }
    }
  } catch {
    // fallback
  }

  if (!post || post.status !== "published") {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <div className="bg-sepia-dark text-cream py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Terug naar blog</span>
              </Link>
              <button className="text-cream/80 hover:text-cream transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sepia-dark/80 to-transparent" />
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Article Header */}
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-10 border-2 border-border mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar || "/placeholder.svg"}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-medium text-foreground">{post.authorName}</p>
                    <p className="text-xs">Auteur</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-10 border-2 border-border mb-8">
              <div 
                className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Back Button */}
            <div className="text-center pb-8">
              <Button asChild variant="outline" className="border-primary text-primary bg-transparent">
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Terug naar alle artikelen
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

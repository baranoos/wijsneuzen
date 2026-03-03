import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { getPageContent } from "@/lib/page-content"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const heroContent = await getPageContent("blog", "hero")

  let posts: Array<{
    id: string
    title: string
    slug: string
    excerpt: string
    featuredImage: string
    authorName: string
    authorAvatar: string
    tags: string[]
    publishedAt: Date
  }> = []

  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    })
    posts = dbPosts.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags) as string[],
    }))
  } catch {
    // fallback: empty
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-sepia-dark text-cream overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-balance">
                {heroContent.title}
              </h1>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-cream/80 leading-relaxed">
                {heroContent.content}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {posts.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <p className="text-muted-foreground text-lg mb-2">
                    Er zijn nog geen blogposts.
                  </p>
                  <p className="text-muted-foreground/80 text-sm max-w-md mx-auto">
                    Beheerders kunnen via het admin panel (Blogbeheer) nieuwe berichten toevoegen.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {posts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className={`overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all group ${index === 0 ? 'md:flex' : ''}`}>
                        {/* Featured post (first) */}
                        {index === 0 ? (
                          <>
                            <div className="md:w-1/2 relative">
                              <div className="aspect-video md:aspect-auto md:h-full">
                                <img
                                  src={post.featuredImage || "/placeholder.svg"}
                                  alt={post.title}
                                  className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500"
                                />
                              </div>
                            </div>
                            <CardContent className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <h2 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                {post.title}
                              </h2>
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={post.authorAvatar || "/placeholder.svg"}
                                    alt={post.authorName}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  <span>{post.authorName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(post.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                              </div>
                            </CardContent>
                          </>
                        ) : (
                          /* Regular posts */
                          <div className="md:flex">
                            <div className="md:w-1/3 relative">
                              <div className="aspect-video md:aspect-auto md:h-full">
                                <img
                                  src={post.featuredImage || "/placeholder.svg"}
                                  alt={post.title}
                                  className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500"
                                />
                              </div>
                            </div>
                            <CardContent className="md:w-2/3 p-6 flex flex-col justify-center">
                              <div className="flex flex-wrap gap-2 mb-2">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(post.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}</span>
                                </div>
                                <span className="text-primary text-sm font-medium flex items-center gap-1">
                                  Lees meer <ArrowRight className="h-4 w-4" />
                                </span>
                              </div>
                            </CardContent>
                          </div>
                        )}
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

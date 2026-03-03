import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Users, MapPin, Calendar, ArrowRight, HandHeart } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function VrijwilligersPage() {
  let posts: Array<{
    id: string
    title: string
    slug: string
    description: string
    featuredImage: string
    spotsNeeded: number
    spotsFilled: number
    status: string
    authorName: string
    location: string
    date: string
    createdAt: Date
    _count: { applications: number }
  }> = []

  try {
    posts = await prisma.volunteerPost.findMany({
      where: { status: { in: ["open", "vol"] } },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    })
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
              <HandHeart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-balance">
                Vrijwilligers Gezocht
              </h1>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-cream/80 leading-relaxed">
                Help mee met het bewaren en delen van de geschiedenis van Philippine.
                Bekijk de openstaande vrijwilligersoproepen en meld je aan!
              </p>
            </div>
          </div>
        </section>

        {/* Volunteer Posts */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Er zijn momenteel geen openstaande vrijwilligersoproepen.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Kom later terug voor nieuwe mogelijkheden!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => {
                    const spotsLeft = post.spotsNeeded - post.spotsFilled
                    const isFull = post.status === "vol" || spotsLeft <= 0

                    return (
                      <Link key={post.id} href={`/vrijwilligers/${post.slug}`}>
                        <Card className="overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all group">
                          <div className="md:flex">
                            {post.featuredImage && (
                              <div className="md:w-1/3 relative">
                                <div className="aspect-video md:aspect-auto md:h-full">
                                  <img
                                    src={post.featuredImage || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500"
                                  />
                                </div>
                              </div>
                            )}
                            <CardContent className={`${post.featuredImage ? "md:w-2/3" : "w-full"} p-6`}>
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <Badge variant={isFull ? "secondary" : "default"}>
                                  {isFull ? "Vol" : "Open"}
                                </Badge>
                                <Badge variant="outline">
                                  <Users className="h-3 w-3 mr-1" />
                                  {post.spotsFilled}/{post.spotsNeeded} plekken
                                </Badge>
                              </div>

                              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h2>

                              <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                {post.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                {post.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{post.location}</span>
                                  </div>
                                )}
                                {post.date && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{post.date}</span>
                                  </div>
                                )}
                                {post.authorName && (
                                  <span>Door: {post.authorName}</span>
                                )}
                              </div>

                              <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:underline">
                                {isFull ? "Bekijk details" : "Bekijk & meld je aan"}
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
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

import { notFound } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { ApplyForm } from "@/components/volunteers/apply-form"
import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  User,
  MessageCircle,
} from "lucide-react"

export const dynamic = "force-dynamic"

interface VrijwilligersDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function VrijwilligersDetailPage({
  params,
}: VrijwilligersDetailPageProps) {
  const { slug } = await params

  let post: {
    id: string
    title: string
    slug: string
    description: string
    content: string
    featuredImage: string
    spotsNeeded: number
    spotsFilled: number
    status: string
    authorName: string
    location: string
    date: string
    createdAt: Date
    applications: Array<{
      id: string
      name: string
      message: string
      createdAt: Date
    }>
  } | null = null

  try {
    const dbPost = await prisma.volunteerPost.findUnique({
      where: { slug },
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
      },
    })
    if (dbPost) {
      post = dbPost
    }
  } catch {
    // fallback
  }

  if (!post) {
    notFound()
  }

  const spotsLeft = post.spotsNeeded - post.spotsFilled
  const isFull = post.status === "vol" || spotsLeft <= 0

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-12 md:py-20 bg-sepia-dark text-cream overflow-hidden">
          {post.featuredImage && (
            <div className="absolute inset-0">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover opacity-20 sepia-[0.5]"
              />
            </div>
          )}
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto">
              <Link href="/vrijwilligers">
                <Button
                  variant="ghost"
                  className="text-cream/80 hover:text-cream mb-6 -ml-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Terug naar overzicht
                </Button>
              </Link>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={isFull ? "secondary" : "default"}>
                  {isFull ? "Vol" : "Open"}
                </Badge>
                <Badge variant="outline" className="border-cream/30 text-cream">
                  <Users className="h-3 w-3 mr-1" />
                  {post.spotsFilled}/{post.spotsNeeded} plekken bezet
                </Badge>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h1>

              <p className="text-cream/80 text-lg leading-relaxed mb-6">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-cream/70">
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
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Door: {post.authorName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-[1fr_320px]">
              {/* Main content */}
              <div className="space-y-8">
                {post.content && (
                  <div className="prose prose-stone dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                )}

                {/* Reacties / Aanmeldingen */}
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Reacties ({post.applications.length})
                  </h2>

                  {post.applications.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Nog geen reacties. Wees de eerste!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {post.applications.map((app) => (
                        <Card key={app.id} className="border border-border">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {app.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(app.createdAt).toLocaleDateString(
                                    "nl-NL",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                            {app.message && (
                              <p className="text-sm text-muted-foreground leading-relaxed ml-10">
                                {app.message}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar: Apply form */}
              <div className="md:sticky md:top-24">
                <ApplyForm postId={post.id} isFull={isFull} />

                {/* Spots indicator */}
                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Plekken
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {post.spotsFilled} / {post.spotsNeeded}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        isFull ? "bg-red-500" : "bg-primary"
                      }`}
                      style={{
                        width: `${Math.min(
                          (post.spotsFilled / post.spotsNeeded) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {isFull
                      ? "Alle plekken zijn bezet"
                      : `Nog ${spotsLeft} ${spotsLeft === 1 ? "plek" : "plekken"} beschikbaar`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

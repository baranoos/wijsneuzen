import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Landmark, Clock, MapPin, BookOpen, Anchor, Fish, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPageContents } from "@/lib/page-content"

export const dynamic = "force-dynamic"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

function parseTimelineEvents(raw: string): TimelineEvent[] {
  return raw
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => {
      const [year, title, description] = line.split("|")
      return { year: year?.trim() ?? "", title: title?.trim() ?? "", description: description?.trim() ?? "" }
    })
}

export default async function GeschiedenisPage() {
  const content = await getPageContents("geschiedenis")

  const hero = content["hero"] ?? { title: "Geschiedenis van Philippine", content: "" }
  const intro = content["intro"] ?? { title: "", content: "" }
  const kasteel = content["kasteel"] ?? { title: "", content: "" }
  const mosselvisserij = content["mosselvisserij"] ?? { title: "", content: "" }
  const omgeving = content["omgeving"] ?? { title: "", content: "" }
  const vandaag = content["vandaag"] ?? { title: "", content: "" }
  const timeline = content["timeline"] ?? { title: "Tijdlijn", content: "" }
  const timelineEventsRaw = content["timeline-events"] ?? { title: "", content: "" }
  const image1 = content["image-1"] ?? { title: "", content: "" }
  const image2 = content["image-2"] ?? { title: "", content: "" }
  const image3 = content["image-3"] ?? { title: "", content: "" }

  const events = parseTimelineEvents(timelineEventsRaw.content)
  const images = [image1, image2, image3].filter((img) => img.content)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-sepia-dark text-cream overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('/bord1-philipine-mosselvlotbergen.png')`,
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/20 text-cream border-primary/30">
                <Landmark className="h-3 w-3 mr-1" />
                Historisch Overzicht
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                {hero.title}
              </h1>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-cream/80 text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
                {hero.content}
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        {intro.content && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {intro.title}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-p:mb-4 prose-p:text-muted-foreground
                    prose-strong:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: intro.content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Images Gallery */}
        {images.length > 0 && (
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className={`grid gap-6 ${images.length === 1 ? "max-w-2xl mx-auto" : images.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"}`}>
                {images.map((img, i) => (
                  <Card key={i} className="overflow-hidden border-2">
                    <div className="aspect-[4/3] relative">
                      {img.content.startsWith("http") ? (
                        <img
                          src={img.content}
                          alt={img.title || "Geschiedenis van Philippine"}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src={img.content}
                          alt={img.title || "Geschiedenis van Philippine"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    {img.title && (
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground text-center italic">
                          {img.title}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Kasteel Section */}
        {kasteel.content && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Landmark className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {kasteel.title}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-p:mb-4 prose-p:text-muted-foreground
                    prose-strong:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: kasteel.content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Mosselvisserij Section */}
        {mosselvisserij.content && (
          <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Fish className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {mosselvisserij.title}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-p:mb-4 prose-p:text-muted-foreground
                    prose-strong:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: mosselvisserij.content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Omgeving Section */}
        {omgeving.content && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Anchor className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {omgeving.title}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-p:mb-4 prose-p:text-muted-foreground
                    prose-strong:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: omgeving.content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Vandaag Section */}
        {vandaag.content && (
          <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {vandaag.title}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-p:mb-4 prose-p:text-muted-foreground
                    prose-strong:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: vandaag.content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        {events.length > 0 && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4">
                    <Clock className="h-3 w-3 mr-1" />
                    Door de eeuwen heen
                  </Badge>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {timeline.title}
                  </h2>
                  {timeline.content && (
                    <div
                      className="text-muted-foreground mt-3 max-w-xl mx-auto"
                      dangerouslySetInnerHTML={{ __html: timeline.content }}
                    />
                  )}
                </div>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

                  <div className="space-y-8">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className={`relative flex items-start gap-6 ${
                          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Content */}
                        <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                          <Card className="border-2 hover:border-primary/30 transition-colors">
                            <CardContent className="p-5">
                              <Badge variant="outline" className="mb-2 font-mono text-primary border-primary/30">
                                {event.year}
                              </Badge>
                              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                                {event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {event.description}
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Dot */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background ring-2 ring-primary/20 mt-6" />

                        {/* Spacer for alternating layout */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-sepia-dark text-cream">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Klaar om de geschiedenis te beleven?
            </h2>
            <p className="text-cream/70 max-w-lg mx-auto mb-8">
              Start de wandelroute door het wandelbos en ontdek de vijf informatieborden met QR-codes.
            </p>
            <Link
              href="/route"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Bekijk de Route
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

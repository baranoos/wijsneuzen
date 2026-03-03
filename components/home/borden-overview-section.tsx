import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Info } from "lucide-react"
import { bordenData } from "@/lib/borden-data"
import { getPageContents } from "@/lib/page-content"

export async function BordenOverviewSection() {
  const content = await getPageContents("home")
  const bordenOverview = content["borden-overview"] || { title: "Ontdek de Route", content: "" }
  const bordenBadge = content["borden-badge"] || { title: "5 Informatieborden", content: "" }
  const bordenButton = content["borden-button"] || { title: "Bekijk volledige route", content: "/route" }

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Info className="h-4 w-4" />
            <span>{bordenBadge.title}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {bordenOverview.title}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-px bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-8 h-px bg-primary" />
          </div>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty">
            {bordenOverview.content}
          </p>
        </div>

        {/* Borden grid - first 2 large, then 3 below */}
        <div className="grid gap-6 mb-10">
          {/* Top row: 2 large feature cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {bordenData.slice(0, 2).map((bord) => (
              <Link key={bord.id} href={`/bord/${bord.id}`}>
                <Card className="group overflow-hidden bg-card border-2 border-border hover:border-primary transition-all hover:shadow-xl h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={bord.heroImage}
                      alt={bord.title}
                      className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sepia-dark/90 via-sepia-dark/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                        <MapPin className="h-3 w-3" />
                        Bord {bord.id}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-1">
                        {bord.title}
                      </h3>
                      <p className="text-sm text-cream/80 font-medium mb-2">
                        {bord.subtitle}
                      </p>
                      <p className="text-xs text-cream/70 line-clamp-2 leading-relaxed hidden md:block">
                        {bord.content.intro}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Bottom row: 3 smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {bordenData.slice(2, 5).map((bord) => (
              <Link key={bord.id} href={`/bord/${bord.id}`}>
                <Card className="group overflow-hidden bg-card border-2 border-border hover:border-primary transition-all hover:shadow-xl h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={bord.heroImage}
                      alt={bord.title}
                      className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sepia-dark/90 via-sepia-dark/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                        <MapPin className="h-3 w-3" />
                        Bord {bord.id}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-lg font-bold text-cream mb-1">
                        {bord.title}
                      </h3>
                      <p className="text-xs text-cream/80 font-medium">
                        {bord.subtitle}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
            <Link href={bordenButton.content || "/route"} className="flex items-center gap-2">
              {bordenButton.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

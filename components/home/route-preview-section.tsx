import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin } from "lucide-react"
import { getPageContent } from "@/lib/page-content"

const stops = [
  {
    id: 1,
    title: "Het Ontstaan",
    description: "Van polder tot stad",
    image: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=400&q=80",
  },
  {
    id: 2,
    title: "Water",
    description: "De haven & de Braakman",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
  },
  {
    id: 3,
    title: "Spaanse Linies",
    description: "Verdedigingswerken",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80",
  },
  {
    id: 4,
    title: "Prins Maurits",
    description: "Landing & het Mauritsfort",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80",
  },
  {
    id: 5,
    title: "De Vesting",
    description: "Van schans tot vestingstad",
    image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=400&q=80",
  },
]

export async function RoutePreviewSection() {
  const routePreview = await getPageContent("home", "route-preview")

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {routePreview.title}
          </h2>
          <p className="text-muted-foreground">
            {routePreview.content}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stops.map((stop) => (
            <Link key={stop.id} href={`/bord/${stop.id}`}>
              <Card className="group overflow-hidden bg-card border-2 border-border hover:border-primary transition-all hover:shadow-lg">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={stop.image || "/placeholder.svg"}
                    alt={stop.title}
                    className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sepia-dark/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-1 text-cream mb-1">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span className="text-xs">Bord {stop.id}</span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-cream">
                      {stop.title}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
            <Link href="/route" className="flex items-center gap-2">
              Bekijk volledige route
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

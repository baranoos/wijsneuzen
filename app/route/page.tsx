import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Footprints, ArrowRight, Map } from "lucide-react"
import Link from "next/link"
import { getPageContents, getPageContent } from "@/lib/page-content"
import { RouteMap } from "@/components/route/route-map"

const informatieBorden = [
  {
    id: 1,
    title: "Het Ontstaan van het Dorp",
    subtitle: "Van polder tot stad — het verhaal van Philippine",
    description: "In 1505 kreeg Jeronimus Laureyn toestemming om een nieuwe polder aan te leggen, vernoemd naar Filips de Schone. Ontdek hoe dit de basis legde voor het dorp Philippine en welke grootse plannen Jeronimus had.",
    image: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=600&q=80",
    duration: "5 min",
  },
  {
    id: 2,
    title: "Water",
    subtitle: "De haven, de Braakman & de natuurrampen",
    description: "Philippine lag tot 1952 direct aan het water via de Braakman. Lees over de bloeiende mosselvisserij, de strijd tegen verzanding, de verwoestende Doorbraak van Nieuwersluis in 1488 en het einde van de haven.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    duration: "7 min",
  },
  {
    id: 3,
    title: "Spaanse Linies",
    subtitle: "Verdedigingswerken door de eeuwen heen",
    description: "Tussen 1568 en 1794 werden in Zeeuws-Vlaanderen verdedigingslinies aangelegd van aarden forten, schansen en grachten. Ontdek hoe inundatie als wapen werd ingezet en wat scheurbroeken waren.",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80",
    duration: "6 min",
  },
  {
    id: 4,
    title: "Prins Maurits",
    subtitle: "De landing bij Philippine & het Mauritsfort",
    description: "In juni 1600 landde Prins Maurits van Oranje-Nassau met duizenden soldaten bij Philippine, op weg naar de Slag bij Nieuwpoort. Lees over het Mauritsfort en de verovering van Philippine in 1633.",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80",
    duration: "7 min",
  },
  {
    id: 5,
    title: "De Vesting van Philippine",
    subtitle: "Van Spaanse schans tot Zeeuwse vestingstad",
    description: "Philippine begon als driehoekige Spaanse schans ('het Kasteel') en groeide uit tot een vestingstad met 4 bastions. Ontdek het verschil tussen Hoog- en Laag-Philippine en de sporen die vandaag nog zichtbaar zijn.",
    image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&q=80",
    duration: "6 min",
  },
]

export default async function RoutePage() {
  const heroContent = await getPageContent("route", "hero")

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
              <p className="text-cream/80 leading-relaxed mb-4">
                {heroContent.content}
              </p>

              <p className="text-cream/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Dit Digitaal Archeopad is ontwikkeld door De Wijsneuzen (PWVO Terneuzen) 
                in samenwerking met de Historics van Philippine en studenten van Scalda. 
                Scan de QR-codes bij elk bord voor extra informatie en achtergrondverhalen.
              </p>
              
              {/* Route stats */}
              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <Footprints className="h-5 w-5 text-primary" />
                  <span className="text-sm">Wandelbos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">~45 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">5 QR-borden</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Route Map */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                  <Map className="h-4 w-4" />
                  <span>Routekaart</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  De Wandelroute
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Volg de route van bord naar bord door het wandelbos. Klik op een bord om in te zoomen.
                </p>
              </div>
              <RouteMap />
            </div>
          </div>
        </section>

        {/* Informatieborden */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {informatieBorden.map((bord, index) => (
                <Card 
                  key={bord.id} 
                  className="overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all group"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 relative">
                      <div className="aspect-video md:aspect-auto md:h-full">
                        <img
                          src={bord.image || "/placeholder.svg"}
                          alt={bord.title}
                          className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          Bord {bord.id}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <CardContent className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                          {bord.title}
                        </h2>
                        <p className="text-primary font-medium text-sm mb-3">
                          {bord.subtitle}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {bord.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{bord.duration} leestijd</span>
                        </div>
                        <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                          <Link href={`/bord/${bord.id}`} className="flex items-center gap-2">
                            Lees meer
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

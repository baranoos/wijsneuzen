import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Footprints, ArrowRight, Map } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPageContents, getPageContent } from "@/lib/page-content"

const informatieBorden = [
  {
    id: 1,
    title: "Het Ontstaan van het Dorp",
    subtitle: "Van polder tot stad — het verhaal van Philippine",
    description: "In 1505 kreeg Jeronimus Laureyn toestemming om een nieuwe polder aan te leggen, vernoemd naar Filips de Schone. Ontdek hoe dit de basis legde voor het dorp Philippine en welke grootse plannen Jeronimus had.",
    image: "/bord1-philipine-mosselvlotbergen.png",
    duration: "5 min",
  },
  {
    id: 2,
    title: "Water",
    subtitle: "De haven, de Braakman & de natuurrampen",
    description: "Philippine lag tot 1952 direct aan het water via de Braakman. Lees over de bloeiende mosselvisserij, de strijd tegen verzanding, de verwoestende Doorbraak van Nieuwersluis in 1488 en het einde van de haven.",
    image: "/bord2-zeeland-toen.png",
    duration: "7 min",
  },
  {
    id: 3,
    title: "Spaanse Linies",
    subtitle: "Verdedigingswerken door de eeuwen heen",
    description: "Tussen 1568 en 1794 werden in Zeeuws-Vlaanderen verdedigingslinies aangelegd van aarden forten, schansen en grachten. Ontdek hoe inundatie als wapen werd ingezet en wat scheurbroeken waren.",
    image: "/bord3-spaanse-linies.png",
    duration: "6 min",
  },
  {
    id: 4,
    title: "Prins Maurits",
    subtitle: "De landing bij Philippine & het Mauritsfort",
    description: "In juni 1600 landde Prins Maurits van Oranje-Nassau met duizenden soldaten bij Philippine, op weg naar de Slag bij Nieuwpoort. Lees over het Mauritsfort en de verovering van Philippine in 1633.",
    image: "/bord4-prins-maurits.png",
    duration: "7 min",
  },
  {
    id: 5,
    title: "De Vesting van Philippine",
    subtitle: "Van Spaanse schans tot Zeeuwse vestingstad",
    description: "Philippine begon als driehoekige Spaanse schans ('het Kasteel') en groeide uit tot een vestingstad met 4 bastions. Ontdek het verschil tussen Hoog- en Laag-Philippine en de sporen die vandaag nog zichtbaar zijn.",
    image: "/bord5-vesting-philipine.png",
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
        <section className="relative py-12 sm:py-16 md:py-24 bg-sepia-dark text-cream overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="container mx-auto relative">
            <div className="max-w-2xl mx-auto text-center px-2">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight">
                {heroContent.title}
              </h1>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-cream/80 leading-relaxed mb-4 text-sm sm:text-base">
                {heroContent.content}
              </p>

              <p className="text-cream/70 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                Dit Digitaal Archeopad is ontwikkeld door De Wijsneuzen (PWVO Terneuzen) 
                in samenwerking met de Historics van Philippine en studenten van Scalda. 
                Scan de QR-codes bij elk bord voor extra informatie en achtergrondverhalen.
              </p>
              
              {/* Route stats — wrap on small screens */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <Footprints className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Wandelbos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">~45 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">5 QR-borden</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Route Map */}
        <section className="py-10 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 sm:mb-8 px-2">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                  <Map className="h-4 w-4" />
                  <span>Routekaart</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  De Wandelroute
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
                  Volg de route van bord naar bord door het wandelbos. Scan de QR-codes bij elk informatiebord.
                </p>
              </div>

              {/* Officiële plankaart Wandelbos Philippine (actuele route) */}
              <div className="mb-8 rounded-xl overflow-hidden border-2 border-border shadow-lg bg-card">
                <Image
                  src="/wandelbos-philippine-route.png"
                  alt="Plankaart Wandelbos Philippine — pad, bos, open plekken, uitkijkpunt (Stichting Landschapsbeheer Zeeland)"
                  width={1200}
                  height={900}
                  className="w-full h-auto object-contain"
                  priority
                />
                <p className="text-center text-sm text-muted-foreground py-3 px-4 border-t border-border bg-secondary/30">
                  Officiële plankaart Wandelbos Philippine (Stichting Landschapsbeheer Zeeland)
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Informatieborden — responsive cards */}
        <section className="py-10 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {informatieBorden.map((bord) => (
                <Card 
                  key={bord.id} 
                  className="overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 group rounded-xl shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image — fixed aspect on mobile, 1/3 width on desktop */}
                    <div className="relative w-full md:w-2/5 lg:w-1/3 shrink-0">
                      <div className="aspect-video md:aspect-[4/3] md:min-h-[220px] w-full">
                        <img
                          src={bord.image || "/placeholder.svg"}
                          alt={bord.title}
                          className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500"
                        />
                      </div>
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-primary-foreground px-2.5 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold shadow">
                        Bord {bord.id}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <CardContent className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between min-w-0">
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1 leading-tight">
                          {bord.title}
                        </h2>
                        <p className="text-primary font-medium text-xs sm:text-sm mb-3">
                          {bord.subtitle}
                        </p>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
                          {bord.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-border/80">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span>{bord.duration} leestijd</span>
                        </div>
                        <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-full sm:w-auto shrink-0">
                          <Link href={`/bord/${bord.id}`} className="flex items-center justify-center gap-2">
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

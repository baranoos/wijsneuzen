import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getAllBorden } from "@/lib/borden-data"
import { getQuizQuestionsForBord } from "@/lib/quiz-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, HelpCircle } from "lucide-react"

export default function QuizPage() {
  const borden = getAllBorden()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 bg-background">
        {/* Hero */}
        <div className="bg-sepia-dark text-cream py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-cream" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Historische Quiz
            </h1>
            <p className="text-cream/80 max-w-lg mx-auto">
              Test je kennis over de geschiedenis van Philippine! Kies een
              locatie en beantwoord de vragen.
            </p>
          </div>
        </div>

        {/* Quiz locations */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-4">
            {borden.map((bord) => {
              const questionCount = getQuizQuestionsForBord(bord.id).length
              return (
                <Link key={bord.id} href={`/quiz/${bord.id}`}>
                  <Card className="bg-cream border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-md group cursor-pointer overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-48 h-40 sm:h-auto relative shrink-0">
                        <img
                          src={bord.heroImage || "/placeholder.svg"}
                          alt={bord.title}
                          className="w-full h-full object-cover sepia-[0.4]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sepia-dark/20" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                            Bord {bord.id}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-5 flex items-center justify-between gap-4">
                        <div>
                          <h2 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {bord.title}
                          </h2>
                          <p className="text-sm text-muted-foreground mb-2">
                            {bord.subtitle}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <HelpCircle className="h-3 w-3" />
                              {questionCount} vragen
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Philippine
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Total summary */}
          <div className="max-w-3xl mx-auto mt-10 text-center">
            <p className="text-muted-foreground text-sm">
              In totaal{" "}
              <span className="font-semibold text-foreground">
                {borden.reduce(
                  (total, bord) =>
                    total + getQuizQuestionsForBord(bord.id).length,
                  0
                )}
              </span>{" "}
              vragen over de geschiedenis van Philippine
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

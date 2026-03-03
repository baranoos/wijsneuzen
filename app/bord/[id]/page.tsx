import { notFound } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ToenNuSlider } from "@/components/bord/toen-nu-slider"
import { BordQuiz } from "@/components/bord/bord-quiz"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getBordById, getAllBorden } from "@/lib/borden-data"
import { ArrowLeft, Share2, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface BordPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const borden = getAllBorden()
  return borden.map((bord) => ({
    id: bord.id.toString(),
  }))
}

export default async function BordPage({ params }: BordPageProps) {
  const { id } = await params
  const bordId = parseInt(id, 10)
  const bord = getBordById(bordId)

  if (!bord) {
    notFound()
  }

  const allBorden = getAllBorden()
  const prevBord = bordId > 1 ? getBordById(bordId - 1) : null
  const nextBord = bordId < allBorden.length ? getBordById(bordId + 1) : null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Header — responsive: back, title (truncate on small), share */}
        <div className="bg-sepia-dark text-cream py-4 sm:py-5">
          <div className="container mx-auto">
            <div className="flex items-center justify-between gap-3 min-w-0">
              <Link
                href="/route"
                className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Terug</span>
              </Link>
              <h1 className="font-display text-base sm:text-lg font-semibold truncate text-center min-w-0 flex-1 px-2">
                Bord {bord.id}: {bord.title}
              </h1>
              <button
                type="button"
                aria-label="Delen"
                className="shrink-0 text-cream/80 hover:text-cream transition-colors p-1"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb — wrap on small screens */}
        <div className="bg-secondary/50 border-b border-border py-2.5">
          <div className="container mx-auto">
            <nav className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link href="/" className="hover:text-primary transition-colors">Philippine wandeling</Link>
              <span aria-hidden>›</span>
              <span className="text-primary font-medium">Bord {bord.id}: {bord.title}</span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto py-6 sm:py-8 lg:py-10">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            {/* Title */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
              {bord.subtitle}
            </h2>

            {/* Hero image */}
            <div className="rounded-xl overflow-hidden border-2 border-border shadow-md">
              <img
                src={bord.heroImage || "/placeholder.svg"}
                alt={bord.title}
                className="w-full aspect-video object-cover sepia-[0.4]"
              />
            </div>

            {/* Main content with drop cap */}
            <div className="prose prose-lg max-w-none">
              <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1 text-foreground leading-relaxed text-base sm:text-lg">
                {bord.content.intro}
              </p>
              
              {bord.content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mt-4 text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Toen & Nu slider — alleen op bord 2 */}
            {bord.id === 2 && (
              <ToenNuSlider
                historicImage={bord.historicImage}
                modernImage={bord.modernImage}
              />
            )}

            {/* Quiz */}
            <BordQuiz
              question={bord.quiz.question}
              hint={bord.quiz.hint}
              options={bord.quiz.options}
              correctAnswer={bord.quiz.correctAnswer}
              explanation={bord.quiz.explanation}
            />

            {/* Historisch Weetje */}
            <Card className="bg-primary/5 border-2 border-primary/20 rounded-xl overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                      Historisch Weetje
                    </p>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                      {bord.historischWeetje.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {bord.historischWeetje.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation between boards — responsive stack on small */}
            <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-border" aria-label="Navigatie tussen borden">
              <div className="order-2 sm:order-1 flex justify-center">
                <Link
                  href="/route"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Alle borden
                </Link>
              </div>
              <div className="order-1 sm:order-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full sm:w-auto">
                {prevBord ? (
                  <Button asChild variant="outline" className="border-primary text-primary bg-transparent shrink-0">
                    <Link href={`/bord/${prevBord.id}`} className="flex items-center justify-center gap-2 py-3">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">{prevBord.title}</span>
                      <span className="sm:hidden">Vorige bord</span>
                    </Link>
                  </Button>
                ) : (
                  <div className="sm:w-[120px]" />
                )}

                {nextBord ? (
                  <Button asChild className="bg-primary text-primary-foreground shrink-0">
                    <Link href={`/bord/${nextBord.id}`} className="flex items-center justify-center gap-2 py-3">
                      <span className="hidden sm:inline">{nextBord.title}</span>
                      <span className="sm:hidden">Volgende bord</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="bg-primary text-primary-foreground shrink-0">
                    <Link href="/quiz" className="flex items-center justify-center gap-2 py-3">
                      Start Quiz
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

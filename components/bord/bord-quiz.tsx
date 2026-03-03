"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Check, X, ArrowRight, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export interface QuizQuestionItem {
  question: string
  hint: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
}

interface BordQuizProps {
  questions: QuizQuestionItem[]
}

const TOTAL = 5

export function BordQuiz({ questions }: BordQuizProps) {
  const take = questions.slice(0, TOTAL)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [isFinished, setIsFinished] = useState(false)

  const current = take[currentIndex]
  const isCorrect = current && selectedAnswer === current.correctAnswer

  const handleCheck = () => {
    if (!current || !selectedAnswer) return
    setIsChecked(true)
    setResults((prev) => [...prev, selectedAnswer === current.correctAnswer])
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setIsChecked(false)
    setShowHint(false)
    if (currentIndex >= take.length - 1) {
      setIsFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsChecked(false)
    setShowHint(false)
    setResults([])
    setIsFinished(false)
  }

  if (take.length === 0) return null

  // Eindresultaat
  if (isFinished) {
    const score = results.filter(Boolean).length
    const percentage = Math.round((score / TOTAL) * 100)
    return (
      <Card className="bg-cream border-2 border-primary/30 overflow-hidden rounded-xl shadow-sm">
        <div className="bg-primary/10 px-4 py-3 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
            Wijsneus Quiz — Resultaat
          </h3>
        </div>
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-2xl font-bold text-primary">
              {score}/{TOTAL}
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
            Je hebt {score} van {TOTAL} vragen goed!
          </h4>
          <p className="text-muted-foreground text-sm mb-6">
            {percentage >= 80
              ? "Heel goed gedaan, echte Wijsneus!"
              : percentage >= 60
                ? "Goed gedaan! Lees de borden nog eens voor meer weetjes."
                : "Niet erg — probeer het opnieuw of lees de tekst nog eens."}
          </p>
          <Button onClick={handleReset} variant="outline" className="border-primary text-primary bg-transparent">
            Quiz opnieuw doen
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Huidige vraag
  return (
    <Card className="bg-cream border-2 border-primary/30 overflow-hidden rounded-xl shadow-sm">
      <div className="bg-primary/10 px-4 py-3 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary shrink-0" />
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
          Wijsneus Quiz
        </h3>
        <span className="ml-auto text-sm text-muted-foreground">
          Vraag {currentIndex + 1} van {TOTAL}
        </span>
      </div>

      <CardContent className="p-4 sm:p-6">
        {!isChecked ? (
          <>
            <p className="text-foreground font-medium mb-4 leading-relaxed text-sm sm:text-base">
              {current.question}
            </p>

            {showHint && (
              <p className="text-sm text-muted-foreground italic mb-4 bg-secondary/50 p-3 rounded-lg">
                Hint: {current.hint}
              </p>
            )}

            <div className="space-y-2 sm:space-y-3 mb-6">
              {current.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedAnswer(option.id)}
                  className={cn(
                    "w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    selectedAnswer === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/50"
                  )}
                >
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                      selectedAnswer === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {option.id}
                  </span>
                  <span className="text-foreground text-sm sm:text-base min-w-0">{option.text}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <Button
                onClick={handleCheck}
                disabled={!selectedAnswer}
                className="flex-1 w-full sm:w-auto"
              >
                Controleer antwoord
              </Button>
              {!showHint && (
                <Button
                  variant="outline"
                  onClick={() => setShowHint(true)}
                  className="border-primary text-primary w-full sm:w-auto shrink-0"
                >
                  Hint
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                  isCorrect ? "bg-green-100" : "bg-red-100"
                )}
              >
                {isCorrect ? (
                  <Check className="h-6 w-6 text-green-600" />
                ) : (
                  <X className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <h4 className={cn("font-display font-bold", isCorrect ? "text-green-600" : "text-red-600")}>
                  {isCorrect ? "Goed!" : "Helaas"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isCorrect ? "Dat is correct." : `Het juiste antwoord was ${current.correctAnswer}.`}
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 text-left">
              <p className="text-sm text-muted-foreground leading-relaxed">{current.explanation}</p>
            </div>

            <Button onClick={handleNext} className="w-full sm:w-auto">
              {currentIndex >= take.length - 1 ? "Bekijk resultaat" : "Volgende vraag"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

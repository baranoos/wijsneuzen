"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { QuizQuestion } from "@/components/quiz/quiz-question"
import { QuizResult } from "@/components/quiz/quiz-result"
import { getBordById } from "@/lib/borden-data"
import { getQuizQuestionsForBord } from "@/lib/quiz-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"

interface QuizAnswer {
  questionIndex: number
  selectedAnswer: string
  isCorrect: boolean
}

export default function LocationQuizPage() {
  const params = useParams()
  const bordId = Number(params.id)
  const bord = getBordById(bordId)
  const quizQuestions = getQuizQuestionsForBord(bordId)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [showResult, setShowResult] = useState(false)

  if (!bord || quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Quiz niet gevonden
            </h1>
            <p className="text-muted-foreground">
              Er is geen quiz beschikbaar voor deze locatie.
            </p>
            <Button asChild>
              <Link href="/quiz">Terug naar quiz overzicht</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const questions = quizQuestions.map((q, index) => ({
    id: index + 1,
    title: bord.title,
    image: bord.heroImage,
    question: q.question,
    hint: q.hint,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    historischWeetje: bord.historischWeetje,
  }))

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const correctAnswers = answers.filter((a) => a.isCorrect).length

  const handleAnswer = (selectedAnswer: string, isCorrect: boolean) => {
    const newAnswer: QuizAnswer = {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      isCorrect,
    }
    setAnswers([...answers, newAnswer])
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setShowResult(false)
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-background">
          <QuizResult
            totalQuestions={questions.length}
            correctAnswers={correctAnswers}
            onRestart={handleRestart}
          />
        </main>
        <Footer />
      </div>
    )
  }

  const currentAnswer = answers.find(
    (a) => a.questionIndex === currentQuestionIndex
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-sepia-dark text-cream py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link
                href="/quiz"
                className="flex items-center gap-1 text-cream/70 hover:text-cream text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Overzicht
              </Link>
              <div className="text-center">
                <h1 className="font-display text-lg font-semibold">
                  Quiz: {bord.title}
                </h1>
                <p className="text-cream/70 text-xs flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Bord {bord.id}
                </p>
              </div>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-secondary/50 border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Vraag {currentQuestionIndex + 1} van {questions.length}
              </span>
              <span className="text-sm text-primary font-semibold">
                {Math.round(progress)}% Voltooid
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <QuizQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
              hasAnswered={!!currentAnswer}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

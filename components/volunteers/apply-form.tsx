"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, Send } from "lucide-react"

interface ApplyFormProps {
  postId: string
  isFull: boolean
}

export function ApplyForm({ postId, isFull }: ApplyFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name.trim()) {
      setError("Vul je naam in")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/volunteers/${postId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Er ging iets mis")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis")
    } finally {
      setSubmitting(false)
    }
  }

  if (isFull) {
    return (
      <Card className="border-2 border-muted">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Alle plekken zijn bezet. Bedankt voor je interesse!
          </p>
        </CardContent>
      </Card>
    )
  }

  if (submitted) {
    return (
      <Card className="border-2 border-green-500/30 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-foreground mb-1">
            Aanmelding verstuurd!
          </h3>
          <p className="text-muted-foreground text-sm">
            Bedankt voor je aanmelding, {name}! We nemen zo snel mogelijk contact met je op.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="font-display text-xl">Meld je aan als vrijwilliger</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Naam *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Je volledige naam"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              E-mail
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je@email.nl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Bericht / motivatie
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Vertel kort waarom je wilt helpen..."
              rows={4}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Versturen...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Aanmelden
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Users } from "lucide-react"
import { getPageContents } from "@/lib/page-content"

export default async function WijsneuzenPage() {
  const content = await getPageContents("wijsneuzen")
  const hero = content["hero"] || { title: "Project Philippine", content: "" }
  const story = content["our-story"] || { title: "Our Story", content: "" }
  const contact = content["contact"] || { title: "De Wijsneuzen", content: "" }
  const team = content["team"] || { title: "De Wijsneuzen", content: "" }

  const teamMembers =
    team.content
      ?.split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const [name, role] = line.split("|").map((part) => part.trim())
        return { name, role }
      })
      .filter((member) => member.name && member.role) ?? []

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(139, 119, 92, 0.8), rgba(139, 119, 92, 0.95)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
            }}
          />
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 italic text-balance">
              {hero.title}
            </h1>
            <p className="text-cream/80 max-w-2xl mx-auto leading-relaxed text-pretty">
              {hero.content}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/route">
                  Explore the Tour
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
                {story.title}
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6" dangerouslySetInnerHTML={{ __html: story.content }} />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {team.title || "De Wijsneuzen"}
                </h2>
              </div>

              <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden border-2 border-border shadow-md">
                <Image
                  src="/team-wijsneuzen.png"
                  alt="Teamfoto De Wijsneuzen"
                  width={1024}
                  height={576}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <Card key={member.name} className="bg-card border-2 border-border text-center overflow-hidden">
                  <CardContent className="p-4">
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      {member.role}
                    </p>
                  </CardContent>
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

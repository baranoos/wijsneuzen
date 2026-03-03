import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Users, Mail, MapPin, ExternalLink } from "lucide-react"
import { getPageContents } from "@/lib/page-content"

const teamMembers = [
  {
    name: "Bram Janssen",
    role: "Project Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Anouska de Vries",
    role: "Chief Historian",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    name: "Marc Sanders",
    role: "Visual Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  },
  {
    name: "Sofie Peeters",
    role: "Local Liaison",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
]

export default async function WijsneuzenPage() {
  const content = await getPageContents("wijsneuzen")
  const hero = content["hero"] || { title: "Project Philippine", content: "" }
  const story = content["our-story"] || { title: "Our Story", content: "" }
  const contact = content["contact"] || { title: "De Wijsneuzen", content: "" }

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
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  The Creative Team
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <Card key={member.name} className="bg-card border-2 border-border text-center overflow-hidden">
                  <CardContent className="p-4">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">
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

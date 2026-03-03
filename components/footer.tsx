"use client"

import Link from "next/link"
import Image from "next/image"
import { Castle, Mail, MapPin } from "lucide-react"

const partners = [
  { name: "Scalda", logo: "/logos/scalda.png" },
  { name: "Prins Willem van Oranje School", logo: "/logos/pwvo.png" },
  { name: "Elevantio", logo: "/logos/elevantio.png" },
  { name: "Laureyn Basisschool", logo: "/logos/laureyn.png" },
  { name: "Gemeente Terneuzen", logo: "/logos/terneuzen.png" },
  { name: "Stichting Landschapsbeheer Zeeland", logo: "/logos/landschapsbeheer.png" },
  { name: "Philippine", logo: "/logos/philippine.png" },
  { name: "FIRST LEGO League", logo: "/logos/fll.png" },
  { name: "Dow", logo: "/logos/dow.png" },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Partners marquee */}
      <div className="bg-background py-10 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Onze Partners
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-primary" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-8 h-px bg-primary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Dit project is mede mogelijk gemaakt door deze organisaties
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling track */}
          <div className="flex animate-marquee">
            {partners.map((partner, i) => (
              <div
                key={`a-${i}`}
                className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
                style={{ minWidth: "160px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
            {partners.map((partner, i) => (
              <div
                key={`b-${i}`}
                className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
                style={{ minWidth: "160px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-sepia-dark text-cream">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Castle className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-bold">De Wijsneuzen</span>
              </div>
              <p className="text-sm text-cream/80 leading-relaxed">
                Het erfgoed van Philippine beleefbaar maken voor iedereen.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-sm text-cream/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@wijsneuzen-philippine.nl</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Philippine, Zeeland</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4">Navigatie</h3>
              <nav className="flex flex-col gap-2 text-sm text-cream/80">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/route" className="hover:text-primary transition-colors">De Route</Link>
                <Link href="/geschiedenis" className="hover:text-primary transition-colors">Geschiedenis</Link>
                <Link href="/wijsneuzen" className="hover:text-primary transition-colors">De Wijsneuzen</Link>
                <Link href="/vrijwilligers" className="hover:text-primary transition-colors">Vrijwilligers</Link>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </nav>
            </div>
          </div>

          {/* Scalda attribution */}
          <div className="mt-10 pt-8 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-cream/70">
            <a
              href="https://www.scalda.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-cream transition-colors"
            >
              <Image
                src="/logos/scalda.png"
                alt="Scalda logo"
                width={100}
                height={32}
                className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
              <span>Ontwikkeld door studenten van Scalda</span>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-cream/20 text-center text-sm text-cream/60">
            <p>&copy; {new Date().getFullYear()} Project De Wijsneuzen. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

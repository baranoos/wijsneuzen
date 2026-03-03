"use client"

import { useEffect, useState } from "react"

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

interface PartnersContent {
  title: string
  content: string
}

export function PartnersMarquee({ partnersTitle, partnersDescription }: { partnersTitle?: string; partnersDescription?: string }) {
  return (
    <section className="py-12 md:py-16 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {partnersTitle || "Onze Partners"}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-8 h-px bg-primary" />
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {partnersDescription || "Dit project is mede mogelijk gemaakt door deze organisaties"}
          </p>
        </div>
      </div>

      {/* Marquee wrapper */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {/* First set */}
          {partners.map((partner, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
              style={{ minWidth: "160px" }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                title={partner.name}
                className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partners.map((partner, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
              style={{ minWidth: "160px" }}
            >
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
    </section>
  )
}

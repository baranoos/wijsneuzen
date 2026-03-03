"use client"

import React from "react"

import { useState } from "react"
import { History } from "lucide-react"

interface ToenNuSliderProps {
  historicImage: string
  modernImage: string
  historicYear?: string
  modernYear?: string
}

export function ToenNuSlider({
  historicImage,
  modernImage,
  historicYear = "1920",
  modernYear = "Vandaag",
}: ToenNuSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <div className="bg-card rounded-xl border-2 border-border p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
          Toen & Nu
        </h3>
        <History className="h-5 w-5 text-primary shrink-0" />
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden touch-none">
        {/* Modern image (background) */}
        <img
          src={modernImage || "/placeholder.svg"}
          alt="Modern"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Historic image (foreground, clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={historicImage || "/placeholder.svg"}
            alt="Historisch"
            className="absolute inset-0 w-full h-full object-cover sepia"
            style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: "none" }}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-4 h-4 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Year labels */}
        <div className="absolute bottom-3 left-3 bg-sepia-dark/80 text-cream px-2 py-1 rounded text-sm font-medium">
          {historicYear}
        </div>
        <div className="absolute bottom-3 right-3 bg-sepia-dark/80 text-cream px-2 py-1 rounded text-sm font-medium">
          {modernYear}
        </div>

        {/* Invisible slider input */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"

// Bord locations in/around Wandelbos Philippine
// These coordinates are approximate positions along the walking route
const bordLocations = [
  {
    id: 1,
    title: "Het Ontstaan van het Dorp",
    subtitle: "Van polder tot stad",
    lat: 51.2985,
    lng: 3.8095,
  },
  {
    id: 2,
    title: "Water",
    subtitle: "De haven & de Braakman",
    lat: 51.2978,
    lng: 3.8115,
  },
  {
    id: 3,
    title: "Spaanse Linies",
    subtitle: "Verdedigingswerken",
    lat: 51.2968,
    lng: 3.8130,
  },
  {
    id: 4,
    title: "Prins Maurits",
    subtitle: "Landing & het Mauritsfort",
    lat: 51.2958,
    lng: 3.8110,
  },
  {
    id: 5,
    title: "De Vesting van Philippine",
    subtitle: "Van schans tot vestingstad",
    lat: 51.2950,
    lng: 3.8088,
  },
]

// Center of the route
const CENTER: [number, number] = [51.2968, 3.8105]
const ZOOM = 16

export function RouteMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeBoard, setActiveBoard] = useState<number | null>(null)

  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return

    // Dynamically import leaflet (client-side only)
    import("leaflet").then((leafletModule) => {
      if (!mapRef.current || mapInstanceRef.current) return
      const L = leafletModule.default ?? leafletModule

      // Import leaflet CSS via link tag
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Create map
      const map = L.map(mapRef.current, {
        center: CENTER,
        zoom: ZOOM,
        scrollWheelZoom: false,
        zoomControl: true,
      })

      // Add tile layer
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }
      ).addTo(map)

      // Custom marker icon
      const createIcon = (bordId: number) =>
        L.divIcon({
          className: "custom-marker",
          html: `<div style="
            background: hsl(30, 90%, 50%);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-family: system-ui, sans-serif;
          ">${bordId}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -20],
        })

      // Add markers with popups
      bordLocations.forEach((bord) => {
        const marker = L
          .marker([bord.lat, bord.lng], { icon: createIcon(bord.id) })
          .addTo(map)

        marker.bindPopup(
          `<div style="font-family: Georgia, serif; text-align: center; min-width: 160px;">
            <strong style="font-size: 14px; color: hsl(30, 30%, 25%);">Bord ${bord.id}</strong>
            <br/>
            <span style="font-size: 13px; color: hsl(30, 20%, 15%);">${bord.title}</span>
            <br/>
            <span style="font-size: 11px; color: hsl(30, 15%, 45%);">${bord.subtitle}</span>
            <br/>
            <a href="/bord/${bord.id}" style="
              display: inline-block;
              margin-top: 8px;
              padding: 4px 12px;
              background: hsl(30, 90%, 50%);
              color: white;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12px;
              font-weight: 600;
            ">Bekijk bord →</a>
          </div>`
        )
      })

      // Draw route line between boards
      const routeCoords: [number, number][] = bordLocations.map((b) => [b.lat, b.lng])
      L.polyline(routeCoords, {
          color: "hsl(30, 90%, 50%)",
          weight: 4,
          opacity: 0.8,
          dashArray: "10, 8",
          lineCap: "round",
        })
        .addTo(map)

      mapInstanceRef.current = map
      setIsLoaded(true)

      // Fix map sizing after render
      setTimeout(() => map.invalidateSize(), 100)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const flyToBoard = (bordId: number) => {
    const bord = bordLocations.find((b) => b.id === bordId)
    if (bord && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([bord.lat, bord.lng], 17, { duration: 0.8 })
      setActiveBoard(bordId)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Map — responsive height for mobile */}
      <div className="relative rounded-xl overflow-hidden border-2 border-border shadow-lg -mx-2 sm:mx-0">
        <div
          ref={mapRef}
          className="w-full h-[280px] sm:h-[380px] md:h-[450px] lg:h-[500px] bg-secondary"
          style={{ zIndex: 1, minHeight: 280 }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 animate-pulse text-primary" />
              <p className="text-sm">Kaart laden...</p>
            </div>
          </div>
        )}
      </div>

      {/* Board legend / quick navigation — responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {bordLocations.map((bord) => (
          <button
            key={bord.id}
            type="button"
            onClick={() => flyToBoard(bord.id)}
            className={`text-left p-3 rounded-xl border-2 transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              activeBoard === bord.id
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                {bord.id}
              </span>
              <span className="text-xs text-muted-foreground truncate">Bord {bord.id}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight line-clamp-2">
              {bord.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

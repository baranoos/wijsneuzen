"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Castle, ChevronDown, LogIn, LogOut, User, Shield, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const bordenItems = [
  { href: "/bord/1", label: "Bord 1 — Het Ontstaan van het Dorp" },
  { href: "/bord/2", label: "Bord 2 — Water" },
  { href: "/bord/3", label: "Bord 3 — Spaanse Linies" },
  { href: "/bord/4", label: "Bord 4 — Prins Maurits" },
  { href: "/bord/5", label: "Bord 5 — De Vesting van Philippine" },
]

const navItems = [
  { href: "/", label: "Home" },
  { href: "/geschiedenis", label: "Geschiedenis" },
  { href: "/wijsneuzen", label: "De Wijsneuzen" },
  { href: "/vrijwilligers", label: "Vrijwilligers" },
  { href: "/blog", label: "Blog" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [routeOpen, setRouteOpen] = useState(false)
  const [mobileRouteOpen, setMobileRouteOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.ok ? r.json() : null).then(data => {
      const u = data?.user
      if (u) setUser({ name: u.name, role: u.role })
    })
  }, [])

  const canAccessAdmin = user && (user.role === "VERIFIED" || user.role === "WIJSNEUZEN")

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/")
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setRouteOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setRouteOpen(false), 150)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Castle className="h-6 w-6 text-primary" />
          <span className="font-display text-lg font-bold text-foreground">
            Historie Wandeltour
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>

          {/* Route dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/route"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              De Route
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${routeOpen ? "rotate-180" : ""}`} />
            </Link>
            {routeOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="w-64 rounded-md border border-border bg-background shadow-lg py-1">
                  {bordenItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setRouteOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border">
              {canAccessAdmin && (
                <Link href="/admin">
                  <Button variant="default" size="sm" className="text-xs h-7 px-3 gap-1.5">
                    <Settings className="h-3.5 w-3.5" />
                    Admin
                  </Button>
                </Link>
              )}
              <span className="text-xs text-muted-foreground hidden lg:flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs h-7 px-2" title="Uitloggen">
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs h-7 px-3 ml-2">
                <LogIn className="h-3.5 w-3.5 mr-1" />
                Inloggen
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground transition-colors hover:text-primary py-2"
              >
                Home
              </Link>

              {/* Mobile Route dropdown */}
              <div>
                <button
                  onClick={() => setMobileRouteOpen(!mobileRouteOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-foreground transition-colors hover:text-primary py-2"
                >
                  De Route
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileRouteOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileRouteOpen && (
                  <div className="flex flex-col gap-1 pl-4 mt-1">
                    <Link
                      href="/route"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary py-1.5"
                    >
                      Overzicht
                    </Link>
                    {bordenItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary py-1.5"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary py-2"
                >
                  {item.label}
                </Link>
              ))}

              {canAccessAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-primary transition-colors hover:text-primary/80 py-2"
                >
                  <Settings className="h-5 w-5" />
                  Admin Panel
                </Link>
              )}

              <div className="border-t border-border pt-4 mt-2">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{user.role}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { handleLogout(); setIsOpen(false) }}>
                      <LogOut className="h-4 w-4 mr-1" />
                      Uitloggen
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <LogIn className="h-4 w-4 mr-1" />
                      Inloggen
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { ContentEditor } from "@/components/admin/content-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Database,
  FileText,
  Home,
  MapPin,
  Users,
  BookOpen,
  HelpCircle,
  Loader2,
  ImageIcon,
  Landmark,
  FolderKanban,
  Info,
  LogOut,
  Undo2,
  Shield,
  HandHeart,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PageSection {
  pageSlug: string
  sectionKey: string
  title: string
  content: string
}

const pageConfig: Record<
  string,
  { label: string; icon: React.ReactNode; description: string }
> = {
  home: {
    label: "Homepage",
    icon: <Home className="h-4 w-4" />,
    description: "De hoofdpagina van de website",
  },
  route: {
    label: "De Route",
    icon: <MapPin className="h-4 w-4" />,
    description: "De wandelroute pagina",
  },
  wijsneuzen: {
    label: "De Wijsneuzen",
    icon: <Users className="h-4 w-4" />,
    description: "Over het team en het project",
  },
  blog: {
    label: "Blog",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Blog overzichtspagina",
  },
  quiz: {
    label: "Quiz",
    icon: <HelpCircle className="h-4 w-4" />,
    description: "Quiz pagina",
  },
  geschiedenis: {
    label: "Geschiedenis",
    icon: <Landmark className="h-4 w-4" />,
    description: "De geschiedenis van Philippine",
  },
  "het-project": {
    label: "Het Project",
    icon: <FolderKanban className="h-4 w-4" />,
    description: "Over het project",
  },
  about: {
    label: "Over Ons",
    icon: <Info className="h-4 w-4" />,
    description: "Over ons pagina",
  },
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Sectie",
  features: "Kenmerken Sectie",
  "route-preview": "Route Preview",
  "our-story": "Ons Verhaal",
  contact: "Contact Sectie",
  intro: "Introductie",
  kasteel: "Vestingstad",
  mosselvisserij: "Mosselvisserij",
  omgeving: "Water en Landwinning",
  vandaag: "Philippine Vandaag",
  timeline: "Tijdlijn",
  "timeline-events": "Tijdlijn Gebeurtenissen",
  "image-1": "Afbeelding 1",
  "image-2": "Afbeelding 2",
  "image-3": "Afbeelding 3",
  "project-info": "Projectinformatie",
  goals: "Doelstellingen",
  team: "Het Team",
  mission: "Onze Missie",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [sections, setSections] = useState<PageSection[]>([])
  const [originalSections, setOriginalSections] = useState<PageSection[]>([])
  const [activePage, setActivePage] = useState<string>("home")
  const [saving, setSaving] = useState<string | null>(null)
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [userRole, setUserRole] = useState<string>("")
  const [userName, setUserName] = useState<string>("")

  // Fetch current user role
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserRole(data.user.role)
          setUserName(data.user.name)
        }
      })
      .catch(() => {})
  }, [])

  const fetchContent = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/content")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setSections(data)
      setOriginalSections(JSON.parse(JSON.stringify(data)))
    } catch {
      setStatus({ type: "error", message: "Kon content niet laden." })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const handleSave = async (section: PageSection) => {
    const key = `${section.pageSlug}-${section.sectionKey}`
    setSaving(key)
    setStatus(null)

    try {
      const res = await fetch("/api/admin/content/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      })

      if (!res.ok) throw new Error("Failed to save")

      // Update original so cancel works correctly after save
      setOriginalSections((prev) =>
        prev.map((s) =>
          s.pageSlug === section.pageSlug && s.sectionKey === section.sectionKey
            ? { ...section }
            : s
        )
      )

      setStatus({
        type: "success",
        message: `"${sectionLabels[section.sectionKey] || section.sectionKey}" opgeslagen!`,
      })
    } catch {
      setStatus({ type: "error", message: "Opslaan mislukt. Probeer opnieuw." })
    } finally {
      setSaving(null)
    }
  }

  const handleSeed = async () => {
    setSeeding(true)
    setStatus(null)
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" })
      if (!res.ok) throw new Error("Failed to seed")
      const data = await res.json()
      setStatus({
        type: "success",
        message: data.message,
      })
      await fetchContent()
    } catch {
      setStatus({ type: "error", message: "Database seeden mislukt." })
    } finally {
      setSeeding(false)
    }
  }

  const handleCancel = (pageSlug: string, sectionKey: string) => {
    const original = originalSections.find(
      (s) => s.pageSlug === pageSlug && s.sectionKey === sectionKey
    )
    if (original) {
      setSections((prev) =>
        prev.map((s) =>
          s.pageSlug === pageSlug && s.sectionKey === sectionKey
            ? { ...original }
            : s
        )
      )
      setStatus({ type: "info", message: "Wijzigingen ongedaan gemaakt." })
    }
  }

  const hasChanges = (pageSlug: string, sectionKey: string) => {
    const current = sections.find(
      (s) => s.pageSlug === pageSlug && s.sectionKey === sectionKey
    )
    const original = originalSections.find(
      (s) => s.pageSlug === pageSlug && s.sectionKey === sectionKey
    )
    if (!current || !original) return false
    return current.title !== original.title || current.content !== original.content
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch {
      router.push("/login")
    }
  }

  const updateSection = (
    pageSlug: string,
    sectionKey: string,
    field: "title" | "content",
    value: string
  ) => {
    setSections((prev) =>
      prev.map((s) =>
        s.pageSlug === pageSlug && s.sectionKey === sectionKey
          ? { ...s, [field]: value }
          : s
      )
    )
  }

  const currentSections = sections.filter((s) => s.pageSlug === activePage)
  const pages = Object.keys(pageConfig)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {userRole === "WIJSNEUZEN" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSeed}
                disabled={seeding}
              >
                {seeding ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                Database Seeden
              </Button>
            )}
            {userRole === "WIJSNEUZEN" && (
              <Button variant="outline" size="sm" onClick={fetchContent}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Vernieuwen
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">← Naar Website</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Bar */}
        {status && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-lg p-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : status.type === "error"
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {status.message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Page Navigation */}
          <aside className="md:w-64 shrink-0">
            <div className="sticky top-24">
              {userRole === "WIJSNEUZEN" && (
                <>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Pagina&apos;s
              </h2>
              <nav className="space-y-1">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activePage === page
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {pageConfig[page].icon}
                    {pageConfig[page].label}
                    <Badge
                      variant="secondary"
                      className={`ml-auto text-xs ${
                        activePage === page
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : ""
                      }`}
                    >
                      {sections.filter((s) => s.pageSlug === page).length}
                    </Badge>
                  </button>
                ))}
              </nav>
                </>
              )}

              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-8">
                Beheer
              </h2>
              <nav className="space-y-1">
                <Link
                  href="/admin/blog"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Blogbeheer
                </Link>
                {userRole === "WIJSNEUZEN" && (
                  <Link
                    href="/admin/images"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Beeldbeheer
                  </Link>
                )}
                <Link
                  href="/admin/vrijwilligers"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <HandHeart className="h-4 w-4" />
                  Vrijwilligers
                </Link>
                {userRole === "WIJSNEUZEN" && (
                  <Link
                    href="/admin/users"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Gebruikersbeheer
                  </Link>
                )}
              </nav>

              {/* User info */}
              {userName && (
                <div className="mt-8 p-3 rounded-lg bg-secondary/50 border">
                  <p className="text-xs text-muted-foreground">Ingelogd als</p>
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-primary font-medium">{userRole}</p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {userRole === "VERIFIED" ? (
              /* VERIFIED users see a simplified dashboard */
              <div>
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Welkom, {userName}!
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Je bent geverifieerd. Je kunt blogposts en vrijwilligersoproepen aanmaken en bewerken.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link href="/admin/blog">
                    <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-8 text-center">
                        <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-display text-lg font-semibold">Blogbeheer</h3>
                        <p className="text-sm text-muted-foreground mt-2">Maak en bewerk blogposts</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/admin/vrijwilligers">
                    <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-8 text-center">
                        <HandHeart className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-display text-lg font-semibold">Vrijwilligersbeheer</h3>
                        <p className="text-sm text-muted-foreground mt-2">Maak en bewerk vrijwilligersoproepen</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            ) : (
              /* WIJSNEUZEN users see full CMS editor */
              <>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                {pageConfig[activePage]?.icon}
                {pageConfig[activePage]?.label}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {pageConfig[activePage]?.description}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : currentSections.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Geen secties gevonden voor deze pagina.
                  </p>
                  <Button onClick={handleSeed} variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Database Seeden met Standaardinhoud
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {currentSections.map((section) => {
                  const key = `${section.pageSlug}-${section.sectionKey}`
                  const isSaving = saving === key

                  return (
                    <Card key={key} className="border-2">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                          <CardTitle className="text-lg font-display">
                            {sectionLabels[section.sectionKey] ||
                              section.sectionKey}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {section.pageSlug} / {section.sectionKey}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {hasChanges(section.pageSlug, section.sectionKey) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCancel(section.pageSlug, section.sectionKey)
                              }
                            >
                              <Undo2 className="h-4 w-4 mr-2" />
                              Annuleren
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleSave(section)}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            Opslaan
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Title field */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Titel
                          </label>
                          <Input
                            value={section.title}
                            onChange={(e) =>
                              updateSection(
                                section.pageSlug,
                                section.sectionKey,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Voer een titel in..."
                            className="border-2"
                          />
                        </div>

                        {/* Content field */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Inhoud
                          </label>
                          <ContentEditor
                            value={section.content}
                            onChange={(val) =>
                              updateSection(
                                section.pageSlug,
                                section.sectionKey,
                                "content",
                                val
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

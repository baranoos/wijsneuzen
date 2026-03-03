"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { ImagePicker } from "@/components/admin/image-picker"
import { ContentEditor } from "@/components/admin/content-editor"
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  ArrowLeft,
  Loader2,
  Eye,
  Users,
  MapPin,
  Calendar,
  X,
  User,
  HandHeart,
} from "lucide-react"
import Link from "next/link"

interface VolunteerPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featuredImage: string
  spotsNeeded: number
  spotsFilled: number
  status: string
  authorName: string
  location: string
  date: string
  _count?: { applications: number }
  applications?: Array<{
    id: string
    name: string
    email: string
    message: string
    status: string
    createdAt: string
  }>
}

const emptyPost: Omit<VolunteerPost, "id"> = {
  title: "",
  slug: "",
  description: "",
  content: "",
  featuredImage: "",
  spotsNeeded: 1,
  spotsFilled: 0,
  status: "open",
  authorName: "",
  location: "",
  date: "",
}

export default function AdminVolunteersPage() {
  const [posts, setPosts] = useState<VolunteerPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [userRole, setUserRole] = useState<string>("")

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.ok ? r.json() : null).then(data => { if (data?.user) setUserRole(data.user.role) })
  }, [])

  const [editingPost, setEditingPost] = useState<VolunteerPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newPost, setNewPost] =
    useState<Omit<VolunteerPost, "id">>(emptyPost)

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [confirmSave, setConfirmSave] = useState(false)
  const [pendingSave, setPendingSave] = useState<(() => Promise<void>) | null>(
    null
  )

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/volunteers")
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch {
      setStatus({ type: "error", message: "Kon vrijwilligersposten niet laden" })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

  const handleCreate = async () => {
    if (!newPost.title || !newPost.slug) {
      setStatus({ type: "error", message: "Titel en slug zijn verplicht" })
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/admin/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Fout bij aanmaken")
      }

      setNewPost(emptyPost)
      setIsCreating(false)
      setStatus({ type: "success", message: "Vrijwilligerspost aangemaakt!" })
      fetchPosts()
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Fout bij aanmaken",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingPost) return

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/volunteers/${editingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Fout bij opslaan")
      }

      setEditingPost(null)
      setStatus({ type: "success", message: "Vrijwilligerspost bijgewerkt!" })
      fetchPosts()
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Fout bij opslaan",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/volunteers/${id}`, { method: "DELETE" })
      setStatus({ type: "success", message: "Vrijwilligerspost verwijderd!" })
      fetchPosts()
    } catch {
      setStatus({ type: "error", message: "Kon niet verwijderen" })
    }
  }

  const startEdit = async (post: VolunteerPost) => {
    try {
      const res = await fetch(`/api/admin/volunteers/${post.id}`)
      if (res.ok) {
        const full = await res.json()
        setEditingPost(full)
      } else {
        setEditingPost(post)
      }
    } catch {
      setEditingPost(post)
    }
  }

  // --- FORM RENDERER ---
  const renderForm = (
    post: Omit<VolunteerPost, "id"> | VolunteerPost,
    mode: "new" | "edit"
  ) => {
    const isEdit = mode === "edit"

    const updateField = (field: string, value: string | number) => {
      if (isEdit) {
        setEditingPost((p) => (p ? { ...p, [field]: value } : p))
      } else {
        setNewPost((p) => ({ ...p, [field]: value }))
      }
    }

    return (
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Titel *</label>
          <Input
            value={post.title}
            onChange={(e) => {
              updateField("title", e.target.value)
              if (!isEdit) updateField("slug", generateSlug(e.target.value))
            }}
            placeholder="Titel van de oproep"
            className="border-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Korte beschrijving
          </label>
          <Textarea
            value={post.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Waar gaat deze oproep over?"
            rows={3}
            className="border-2"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Inhoud</label>
          <ContentEditor
            value={post.content}
            onChange={(val) => updateField("content", val)}
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Uitgelichte afbeelding
          </label>
          <div className="flex gap-2">
            <Input
              value={post.featuredImage}
              onChange={(e) => updateField("featuredImage", e.target.value)}
              placeholder="https://..."
              className="flex-1 border-2"
            />
            <ImagePicker
              value={post.featuredImage}
              onChange={(url) => updateField("featuredImage", url)}
            />
          </div>
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt="Preview"
              className="mt-2 rounded-md max-h-32 object-cover border border-border"
            />
          )}
        </div>

        {/* Spots, Location, Date */}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Vrijwilligers nodig
            </label>
            <Input
              type="number"
              min={1}
              value={post.spotsNeeded}
              onChange={(e) =>
                updateField("spotsNeeded", parseInt(e.target.value) || 1)
              }
              className="border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Locatie</label>
            <Input
              value={post.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Philippine"
              className="border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Datum</label>
            <Input
              type="date"
              value={post.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="border-2"
            />
          </div>
        </div>

        {/* Author, Status */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1.5">Auteur</label>
            <Input
              value={post.authorName}
              onChange={(e) => updateField("authorName", e.target.value)}
              placeholder="Naam van de organisator"
              className="border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select
              value={post.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm"
            >
              <option value="open">Open</option>
              <option value="vol">Vol</option>
              <option value="gesloten">Gesloten</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <HandHeart className="h-6 w-6 text-primary" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Vrijwilligers Beheer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchPosts}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Vernieuwen
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">← Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status */}
        {status && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-lg p-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
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

        {/* New Post Button */}
        {!isCreating && !editingPost && (
          <Button
            className="mb-6"
            onClick={() => {
              setIsCreating(true)
              setNewPost(emptyPost)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Oproep
          </Button>
        )}

        {/* Create Form */}
        {isCreating && (
          <Card className="mb-6 border-2 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="font-display text-lg">
                Nieuwe Vrijwilligersoproep
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsCreating(false)
                    setNewPost(emptyPost)
                  }}
                >
                  Annuleren
                </Button>
                <Button
                  size="sm"
                  onClick={handleCreate}
                  disabled={saving || !newPost.title || !newPost.slug}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Aanmaken
                </Button>
              </div>
            </CardHeader>
            <CardContent>{renderForm(newPost, "new")}</CardContent>
          </Card>
        )}

        {/* Edit Form */}
        {editingPost && (
          <>
            <Card className="mb-6 border-2 border-primary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="font-display text-lg">
                  <span className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Bewerken: {editingPost.title}
                  </span>
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingPost(null)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Terug
                  </Button>
                  <Link
                    href={`/vrijwilligers/${editingPost.slug}`}
                    target="_blank"
                  >
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Bekijken
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={handleUpdate}
                    disabled={
                      saving || !editingPost.title || !editingPost.slug
                    }
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Opslaan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>{renderForm(editingPost, "edit")}</CardContent>
            </Card>

            {/* Applications */}
            {editingPost.applications &&
              editingPost.applications.length > 0 && (
                <Card className="mb-6 border-2">
                  <CardHeader>
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Aanmeldingen ({editingPost.applications.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {editingPost.applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">
                                {app.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {app.status}
                              </Badge>
                            </div>
                            {app.email && (
                              <p className="text-xs text-muted-foreground">
                                {app.email}
                              </p>
                            )}
                            {app.message && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {app.message}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(app.createdAt).toLocaleDateString(
                                "nl-NL",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </>
        )}

        {/* Posts List */}
        {!editingPost && !isCreating && (
          <>
            <h2 className="font-display text-lg font-bold mb-4">
              Alle oproepen ({posts.length})
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <HandHeart className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Nog geen vrijwilligersoproepen aangemaakt.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <Card key={post.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1 min-w-0">
                          {post.featuredImage && (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-20 h-14 rounded object-cover border border-border shrink-0 hidden sm:block"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-display font-semibold text-foreground truncate">
                                {post.title}
                              </h3>
                              <Badge
                                variant={
                                  post.status === "open"
                                    ? "default"
                                    : post.status === "vol"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs shrink-0"
                              >
                                {post.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {post.description || "Geen beschrijving"}
                            </p>
                            <div className="flex gap-2 mt-1.5 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {post.spotsFilled}/{post.spotsNeeded} plekken
                              </Badge>
                              {post._count && (
                                <Badge variant="outline" className="text-xs">
                                  {post._count.applications} aanmeldingen
                                </Badge>
                              )}
                              {post.location && (
                                <Badge variant="outline" className="text-xs">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {post.location}
                                </Badge>
                              )}
                              {post.date && (
                                <Badge variant="outline" className="text-xs">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {post.date}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              startEdit(post)
                              setIsCreating(false)
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          {userRole === "WIJSNEUZEN" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => setConfirmDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Confirm Save Dialog */}
      <ConfirmDialog
        open={confirmSave}
        onOpenChange={setConfirmSave}
        title="Weet je het zeker?"
        description="Wil je deze vrijwilligersoproep opslaan? De wijzigingen worden direct doorgevoerd."
        confirmLabel="Ja, opslaan"
        cancelLabel="Annuleren"
        onConfirm={() => {
          setConfirmSave(false)
          pendingSave?.()
        }}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={(open) => {
          if (!open) setConfirmDelete(null)
        }}
        title="Oproep verwijderen?"
        description="Weet je zeker dat je deze vrijwilligersoproep wilt verwijderen? Alle aanmeldingen worden ook verwijderd. Dit kan niet ongedaan worden."
        confirmLabel="Ja, verwijderen"
        cancelLabel="Annuleren"
        variant="destructive"
        onConfirm={() => {
          if (confirmDelete) handleDelete(confirmDelete)
        }}
      />
    </div>
  )
}

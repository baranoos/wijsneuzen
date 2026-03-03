"use client"

import { useState, useEffect, useCallback } from "react"
import { ContentEditor } from "@/components/admin/content-editor"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { ImagePicker } from "@/components/admin/image-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  ArrowLeft,
  FileText,
  Loader2,
  Eye,
  EyeOff,
  Database,
  X,
} from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  authorName: string
  authorAvatar: string
  status: string
  tags: string[]
  publishedAt: string
  author?: { name: string; avatar: string }
}

const emptyPost: Omit<BlogPost, "id"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  authorName: "",
  authorAvatar: "",
  status: "draft",
  tags: [],
  publishedAt: new Date().toISOString().split("T")[0],
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
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

  // Edit state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newPost, setNewPost] = useState<Omit<BlogPost, "id">>(emptyPost)
  const [tagInput, setTagInput] = useState("")

  // Confirmation dialogs
  const [confirmSave, setConfirmSave] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [pendingSave, setPendingSave] = useState<
    (() => Promise<void>) | null
  >(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/blog")
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setPosts(
        data.map((p: BlogPost & { author?: { name: string; avatar: string } }) => ({
          ...p,
          authorName: p.authorName || p.author?.name || "",
          authorAvatar: p.authorAvatar || p.author?.avatar || "",
        }))
      )
    } catch {
      setStatus({ type: "error", message: "Kon blogposts niet laden." })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // --- CREATE ---
  const handleCreate = () => {
    const doSave = async () => {
      setSaving(true)
      setStatus(null)
      try {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Failed")
        }
        setStatus({ type: "success", message: "Blogpost aangemaakt!" })
        setNewPost(emptyPost)
        setIsCreating(false)
        setTagInput("")
        await fetchPosts()
      } catch (e) {
        setStatus({
          type: "error",
          message:
            e instanceof Error ? e.message : "Aanmaken mislukt.",
        })
      } finally {
        setSaving(false)
      }
    }
    setPendingSave(() => doSave)
    setConfirmSave(true)
  }

  // --- UPDATE ---
  const handleUpdate = () => {
    if (!editingPost) return
    const doSave = async () => {
      setSaving(true)
      setStatus(null)
      try {
        const res = await fetch(`/api/admin/blog/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPost),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Failed")
        }
        setStatus({
          type: "success",
          message: `"${editingPost.title}" opgeslagen!`,
        })
        setEditingPost(null)
        setTagInput("")
        await fetchPosts()
      } catch (e) {
        setStatus({
          type: "error",
          message:
            e instanceof Error ? e.message : "Opslaan mislukt.",
        })
      } finally {
        setSaving(false)
      }
    }
    setPendingSave(() => doSave)
    setConfirmSave(true)
  }

  // --- DELETE ---
  const handleDelete = async (id: string) => {
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed")
      setStatus({ type: "success", message: "Blogpost verwijderd!" })
      if (editingPost?.id === id) setEditingPost(null)
      await fetchPosts()
    } catch {
      setStatus({ type: "error", message: "Verwijderen mislukt." })
    } finally {
      setSaving(false)
      setConfirmDelete(null)
    }
  }

  // --- SEED ---
  const handleSeed = async () => {
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch("/api/admin/blog/seed", { method: "POST" })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setStatus({ type: "success", message: data.message })
      await fetchPosts()
    } catch {
      setStatus({ type: "error", message: "Seeden mislukt." })
    } finally {
      setSaving(false)
    }
  }

  // Slug generator
  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

  // Tag helpers
  const addTag = (post: "new" | "edit") => {
    const tag = tagInput.trim()
    if (!tag) return
    if (post === "new") {
      if (!newPost.tags.includes(tag)) {
        setNewPost((p) => ({ ...p, tags: [...p.tags, tag] }))
      }
    } else if (editingPost) {
      if (!editingPost.tags.includes(tag)) {
        setEditingPost((p) =>
          p ? { ...p, tags: [...p.tags, tag] } : p
        )
      }
    }
    setTagInput("")
  }

  const removeTag = (tag: string, post: "new" | "edit") => {
    if (post === "new") {
      setNewPost((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }))
    } else if (editingPost) {
      setEditingPost((p) =>
        p ? { ...p, tags: p.tags.filter((t) => t !== tag) } : p
      )
    }
  }

  // --- FORM RENDERER ---
  const renderForm = (
    post: Omit<BlogPost, "id"> | BlogPost,
    mode: "new" | "edit"
  ) => {
    const isEdit = mode === "edit"

    const updateField = (
      field: string,
      value: string | string[]
    ) => {
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
          <label className="block text-sm font-medium mb-1.5">
            Titel *
          </label>
          <Input
            value={post.title}
            onChange={(e) => {
              updateField("title", e.target.value)
              updateField("slug", generateSlug(e.target.value))
            }}
            placeholder="Titel van de blogpost"
            className="border-2"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Samenvatting
          </label>
          <Textarea
            value={post.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Korte samenvatting van de post..."
            rows={3}
            className="border-2"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Inhoud
          </label>
          <ContentEditor
            value={post.content}
            onChange={(val) => updateField("content", val)}
          />
        </div>

        {/* Featured Image */}
        <ImagePicker
          label="Uitgelichte afbeelding"
          value={post.featuredImage}
          onChange={(url) => updateField("featuredImage", url)}
        />

        {/* Author + Date */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Auteur naam
            </label>
            <Input
              value={post.authorName}
              onChange={(e) => updateField("authorName", e.target.value)}
              placeholder="Naam"
              className="border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Auteur avatar (URL)
            </label>
            <Input
              value={post.authorAvatar}
              onChange={(e) =>
                updateField("authorAvatar", e.target.value)
              }
              placeholder="https://..."
              className="border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Publicatiedatum
            </label>
            <Input
              type="date"
              value={
                typeof post.publishedAt === "string"
                  ? post.publishedAt.split("T")[0]
                  : ""
              }
              onChange={(e) => updateField("publishedAt", e.target.value)}
              className="border-2"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Status
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={post.status === "published" ? "default" : "outline"}
              onClick={() => updateField("status", "published")}
            >
              <Eye className="h-4 w-4 mr-1" />
              Gepubliceerd
            </Button>
            <Button
              type="button"
              size="sm"
              variant={post.status === "draft" ? "default" : "outline"}
              onClick={() => updateField("status", "draft")}
            >
              <EyeOff className="h-4 w-4 mr-1" />
              Concept
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Tags</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="gap-1 pr-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag, mode === "edit" ? "edit" : "new")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(mode === "edit" ? "edit" : "new")
                }
              }}
              placeholder="Voeg tag toe en druk Enter"
              className="border-2 max-w-xs"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => addTag(mode === "edit" ? "edit" : "new")}
            >
              <Plus className="h-4 w-4" />
            </Button>
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
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Blog Beheer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSeed}>
              <Database className="h-4 w-4 mr-2" />
              Blog Seeden
            </Button>
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
              setTagInput("")
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Blogpost
          </Button>
        )}

        {/* Create Form */}
        {isCreating && (
          <Card className="mb-6 border-2 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="font-display text-lg">
                Nieuwe Blogpost
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsCreating(false)
                    setTagInput("")
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
                  onClick={() => {
                    setEditingPost(null)
                    setTagInput("")
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Terug
                </Button>
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
        )}

        {/* Posts List */}
        {!editingPost && !isCreating && (
          <>
            <h2 className="font-display text-lg font-bold mb-4">
              Alle blogposts ({posts.length})
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Geen blogposts gevonden.
                  </p>
                  <Button variant="outline" onClick={handleSeed}>
                    <Database className="h-4 w-4 mr-2" />
                    Standaard Posts Laden
                  </Button>
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
                                  post.status === "published"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs shrink-0"
                              >
                                {post.status === "published"
                                  ? "Gepubliceerd"
                                  : "Concept"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {post.excerpt || "Geen samenvatting"}
                            </p>
                            <div className="flex gap-2 mt-1.5 flex-wrap">
                              {post.tags?.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingPost(post)
                              setIsCreating(false)
                              setTagInput("")
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
        description="Wil je deze blogpost opslaan? De wijzigingen worden direct doorgevoerd."
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
        title="Blogpost verwijderen?"
        description="Weet je zeker dat je deze blogpost wilt verwijderen? Dit kan niet ongedaan worden gemaakt."
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

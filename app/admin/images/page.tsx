"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import {
  ArrowLeft,
  Upload,
  Trash2,
  Save,
  Loader2,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  X,
  Copy,
  FileImage,
} from "lucide-react"

interface ImageRecord {
  id: string
  filename: string
  url: string
  altText: string
  caption: string
  mimeType: string
  size: number
  width: number | null
  height: number | null
  createdAt: string
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ altText: "", caption: "" })
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ImageRecord | null>(null)
  const [status, setStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/images")
      if (res.ok) {
        const data = await res.json()
        setImages(data)
      }
    } catch {
      setStatus({ type: "error", message: "Fout bij ophalen afbeeldingen" })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  // Clear status after 4 seconds
  useEffect(() => {
    if (status) {
      const t = setTimeout(() => setStatus(null), 4000)
      return () => clearTimeout(t)
    }
  }, [status])

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    if (fileArray.length === 0) return

    // Client-side validation
    const allowed = ["image/jpeg", "image/png", "image/webp"]
    const maxSize = 5 * 1024 * 1024

    for (const file of fileArray) {
      if (!allowed.includes(file.type)) {
        setStatus({
          type: "error",
          message: `"${file.name}" is geen geldig type. Toegestaan: JPG, PNG, WebP`,
        })
        return
      }
      if (file.size > maxSize) {
        setStatus({
          type: "error",
          message: `"${file.name}" is te groot (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 5MB`,
        })
        return
      }
    }

    setUploading(true)
    try {
      const formData = new FormData()
      fileArray.forEach((f) => formData.append("files", f))

      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const uploaded = await res.json()
        setImages((prev) => [...uploaded, ...prev])
        setStatus({
          type: "success",
          message: `${uploaded.length} afbeelding${uploaded.length > 1 ? "en" : ""} geüpload`,
        })
      } else {
        const err = await res.json()
        setStatus({ type: "error", message: err.error || "Upload mislukt" })
      }
    } catch {
      setStatus({ type: "error", message: "Upload mislukt" })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  // Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files)
    }
  }

  // Edit metadata
  const startEditing = (image: ImageRecord) => {
    setEditingId(image.id)
    setEditForm({ altText: image.altText, caption: image.caption })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditForm({ altText: "", caption: "" })
  }

  const saveMetadata = async (id: string) => {
    setSavingId(id)
    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })

      if (res.ok) {
        const updated = await res.json()
        setImages((prev) => prev.map((img) => (img.id === id ? updated : img)))
        setEditingId(null)
        setStatus({ type: "success", message: "Metadata opgeslagen" })
      } else {
        setStatus({ type: "error", message: "Opslaan mislukt" })
      }
    } catch {
      setStatus({ type: "error", message: "Opslaan mislukt" })
    } finally {
      setSavingId(null)
    }
  }

  // Delete
  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      const res = await fetch(`/api/admin/images/${deleteTarget.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== deleteTarget.id))
        setStatus({ type: "success", message: "Afbeelding verwijderd" })
      } else {
        setStatus({ type: "error", message: "Verwijderen mislukt" })
      }
    } catch {
      setStatus({ type: "error", message: "Verwijderen mislukt" })
    } finally {
      setDeleteTarget(null)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setStatus({ type: "success", message: "URL gekopieerd naar klembord" })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-display text-lg font-bold flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Beeldbeheer
            </h1>
          </div>
          <Badge variant="secondary">{images.length} afbeeldingen</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Status message */}
        {status && (
          <div
            className={`mb-6 p-3 rounded-lg flex items-center gap-2 text-sm ${
              status.type === "success"
                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            {status.message}
          </div>
        )}

        {/* Upload Zone */}
        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative mb-8 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Bezig met uploaden...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Sleep afbeeldingen hierheen of klik om te selecteren
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG of WebP &bull; Maximaal 5MB per bestand
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <FileImage className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg font-medium mb-1">
                Nog geen afbeeldingen
              </p>
              <p className="text-sm text-muted-foreground">
                Upload je eerste afbeelding via het veld hierboven
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden group"
              >
                {/* Image preview */}
                <div className="relative aspect-video bg-secondary/50 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.altText || image.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-background/80 backdrop-blur"
                      onClick={() => copyUrl(image.url)}
                      title="Kopieer URL"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={() => setDeleteTarget(image)}
                      title="Verwijderen"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {/* File info badge */}
                  <div className="absolute bottom-2 left-2 flex gap-1.5">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs">
                      {image.mimeType.split("/")[1].toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs">
                      {formatSize(image.size)}
                    </Badge>
                    {image.width && image.height && (
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs">
                        {image.width}×{image.height}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  {editingId === image.id ? (
                    /* Edit mode */
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`alt-${image.id}`} className="text-xs font-medium">
                          Alt-tekst
                        </Label>
                        <Input
                          id={`alt-${image.id}`}
                          value={editForm.altText}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, altText: e.target.value }))
                          }
                          placeholder="Beschrijf de afbeelding..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`cap-${image.id}`} className="text-xs font-medium">
                          Bijschrift
                        </Label>
                        <Textarea
                          id={`cap-${image.id}`}
                          value={editForm.caption}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, caption: e.target.value }))
                          }
                          placeholder="Optioneel bijschrift..."
                          rows={2}
                          className="mt-1 resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveMetadata(image.id)}
                          disabled={savingId === image.id}
                          className="flex-1"
                        >
                          {savingId === image.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                          ) : (
                            <Save className="h-3.5 w-3.5 mr-1.5" />
                          )}
                          Opslaan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div>
                      <p className="font-medium text-sm truncate" title={image.filename}>
                        {image.filename}
                      </p>
                      {image.altText && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          Alt: {image.altText}
                        </p>
                      )}
                      {image.caption && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          Bijschrift: {image.caption}
                        </p>
                      )}
                      {!image.altText && !image.caption && (
                        <p className="text-xs text-muted-foreground/60 mt-1 italic">
                          Geen metadata ingesteld
                        </p>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full"
                        onClick={() => startEditing(image)}
                      >
                        Metadata bewerken
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Afbeelding verwijderen?"
        description={`Weet je zeker dat je "${deleteTarget?.filename}" wilt verwijderen? Dit kan niet ongedaan worden gemaakt.`}
        confirmLabel="Verwijderen"
        destructive
      />
    </div>
  )
}

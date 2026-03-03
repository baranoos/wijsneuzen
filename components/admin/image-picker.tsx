"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Loader2, Check, Upload } from "lucide-react"

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
}

interface ImagePickerProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImagePicker({ value, onChange, label }: ImagePickerProps) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<ImageRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/images")
      if (res.ok) {
        setImages(await res.json())
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) fetchImages()
  }, [open, fetchImages])

  const handleSelect = (url: string) => {
    onChange(url)
    setOpen(false)
  }

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((f) => formData.append("files", f))

      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const uploaded: ImageRecord[] = await res.json()
        setImages((prev) => [...uploaded, ...prev])
        // Auto-select first uploaded image
        if (uploaded.length > 0) {
          onChange(uploaded[0].url)
          setOpen(false)
        }
      }
    } catch {
      // ignore
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1.5">{label}</label>
      )}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Afbeelding URL of kies uit bibliotheek..."
          className="border-2"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="shrink-0">
              <ImageIcon className="h-4 w-4 mr-2" />
              Kies foto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Afbeelding kiezen
              </DialogTitle>
            </DialogHeader>

            {/* Quick upload button */}
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleQuickUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  asChild
                  disabled={uploading}
                >
                  <span>
                    {uploading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Nieuwe foto uploaden
                  </span>
                </Button>
              </label>
              <span className="text-xs text-muted-foreground">
                JPG, PNG, WebP &bull; Max 5MB
              </span>
            </div>

            {/* Image grid */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">
                    Nog geen afbeeldingen. Upload er een via de knop hierboven
                    of via{" "}
                    <a
                      href="/admin/images"
                      className="text-primary underline"
                      target="_blank"
                    >
                      Beeldbeheer
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 py-3">
                  {images.map((img) => {
                    const isSelected = value === img.url
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => handleSelect(img.url)}
                        className={`relative group rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.altText || img.filename}
                          className="w-full h-full object-cover"
                        />
                        {/* Selected checkmark */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-5 w-5 text-primary-foreground" />
                            </div>
                          </div>
                        )}
                        {/* Hover info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] font-medium truncate">
                            {img.filename}
                          </p>
                          <div className="flex gap-1 mt-0.5">
                            <Badge
                              variant="secondary"
                              className="text-[9px] px-1 py-0"
                            >
                              {formatSize(img.size)}
                            </Badge>
                            {img.width && img.height && (
                              <Badge
                                variant="secondary"
                                className="text-[9px] px-1 py-0"
                              >
                                {img.width}×{img.height}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview */}
      {value && (
        <img
          src={value}
          alt="Preview"
          className="mt-2 rounded-lg h-32 object-cover border-2 border-border"
        />
      )}
    </div>
  )
}

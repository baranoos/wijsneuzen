import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { supabaseAdmin } from "@/lib/supabase"
import { randomUUID } from "crypto"

const BUCKET = "images"
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

// GET - list all images
export async function GET() {
  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json(
      { error: "Fout bij ophalen afbeeldingen" },
      { status: 500 }
    )
  }
}

// POST - upload image(s) to Supabase Storage
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Geen bestanden ontvangen" },
        { status: 400 }
      )
    }

    const uploaded = []

    for (const file of files) {
      // Validate type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Ongeldig bestandstype: ${file.type}. Toegestaan: JPG, PNG, WebP`,
          },
          { status: 400 }
        )
      }

      // Validate size
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          {
            error: `Bestand "${file.name}" is te groot (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 5MB`,
          },
          { status: 400 }
        )
      }

      // Generate unique filename
      const ext = file.name.includes(".")
        ? file.name.substring(file.name.lastIndexOf("."))
        : `.${file.type.split("/")[1]}`
      const uniqueName = `${randomUUID()}${ext}`

      // Read file buffer for dimension detection
      const buffer = Buffer.from(await file.arrayBuffer())

      // Upload to Supabase Storage
      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(uniqueName, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        console.error("Supabase upload error:", uploadError)
        return NextResponse.json(
          { error: `Upload mislukt: ${uploadError.message}` },
          { status: 500 }
        )
      }

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(uniqueName)

      const publicUrl = urlData.publicUrl

      // Get image dimensions
      let width: number | null = null
      let height: number | null = null

      if (file.type === "image/png" && buffer.length > 24) {
        width = buffer.readUInt32BE(16)
        height = buffer.readUInt32BE(20)
      }
      if (file.type === "image/jpeg") {
        const dims = getJpegDimensions(buffer)
        if (dims) {
          width = dims.width
          height = dims.height
        }
      }

      // Save to database
      const image = await prisma.image.create({
        data: {
          filename: file.name,
          url: publicUrl,
          mimeType: file.type,
          size: file.size,
          width,
          height,
        },
      })

      uploaded.push(image)
    }

    return NextResponse.json(uploaded, { status: 201 })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { error: "Fout bij uploaden" },
      { status: 500 }
    )
  }
}

function getJpegDimensions(
  buffer: Buffer
): { width: number; height: number } | null {
  try {
    let offset = 2
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) return null
      const marker = buffer[offset + 1]
      if (
        marker === 0xc0 ||
        marker === 0xc1 ||
        marker === 0xc2 ||
        marker === 0xc3
      ) {
        const height = buffer.readUInt16BE(offset + 5)
        const width = buffer.readUInt16BE(offset + 7)
        return { width, height }
      }
      const segLen = buffer.readUInt16BE(offset + 2)
      offset += 2 + segLen
    }
  } catch {
    // ignore
  }
  return null
}

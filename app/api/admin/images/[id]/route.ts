import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { supabaseAdmin } from "@/lib/supabase"

const BUCKET = "images"

// PUT - update image metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { altText, caption } = body

    const image = await prisma.image.update({
      where: { id },
      data: {
        altText: altText ?? undefined,
        caption: caption ?? undefined,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.error("Error updating image:", error)
    return NextResponse.json(
      { error: "Fout bij bijwerken afbeelding" },
      { status: 500 }
    )
  }
}

// DELETE - delete image from Supabase Storage and database
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const image = await prisma.image.findUnique({ where: { id } })
    if (!image) {
      return NextResponse.json(
        { error: "Afbeelding niet gevonden" },
        { status: 404 }
      )
    }

    // Extract filename from Supabase URL
    // URL format: https://<ref>.supabase.co/storage/v1/object/public/images/<filename>
    const urlParts = image.url.split(`/storage/v1/object/public/${BUCKET}/`)
    if (urlParts.length === 2) {
      const storagePath = urlParts[1]
      const { error: deleteError } = await supabaseAdmin.storage
        .from(BUCKET)
        .remove([storagePath])

      if (deleteError) {
        console.error("Supabase delete error:", deleteError)
      }
    }

    // Delete from database
    await prisma.image.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json(
      { error: "Fout bij verwijderen afbeelding" },
      { status: 500 }
    )
  }
}

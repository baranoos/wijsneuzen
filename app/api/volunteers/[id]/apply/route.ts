import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET applications for a volunteer post
export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const applications = await prisma.volunteerApplication.findMany({
      where: { volunteerPostId: id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}

// POST create a new application (public - no auth required)
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, email, message } = body

    if (!name) {
      return NextResponse.json(
        { error: "Naam is verplicht" },
        { status: 400 }
      )
    }

    // Check if the post exists and is open
    const post = await prisma.volunteerPost.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json(
        { error: "Vrijwilligerspost niet gevonden" },
        { status: 404 }
      )
    }

    if (post.status !== "open") {
      return NextResponse.json(
        { error: "Deze vrijwilligerspost is gesloten" },
        { status: 400 }
      )
    }

    const application = await prisma.volunteerApplication.create({
      data: {
        volunteerPostId: id,
        name,
        email: email || "",
        message: message || "",
      },
    })

    // Update spotsFilled count
    const applicationCount = await prisma.volunteerApplication.count({
      where: { volunteerPostId: id, status: { in: ["pending", "accepted"] } },
    })

    await prisma.volunteerPost.update({
      where: { id },
      data: {
        spotsFilled: applicationCount,
        // Auto-close if all spots are filled
        ...(applicationCount >= post.spotsNeeded && { status: "vol" }),
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    )
  }
}

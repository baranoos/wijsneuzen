import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { defaultPageContent } from "@/lib/page-content"
import { hashPassword } from "@/lib/auth"

export async function POST() {
  try {
    let seeded = 0

    for (const item of defaultPageContent) {
      const existing = await prisma.pageContent.findUnique({
        where: {
          pageSlug_sectionKey: {
            pageSlug: item.pageSlug,
            sectionKey: item.sectionKey,
          },
        },
      })

      if (!existing) {
        await prisma.pageContent.create({
          data: {
            pageSlug: item.pageSlug,
            sectionKey: item.sectionKey,
            title: item.title,
            content: item.content,
          },
        })
        seeded++
      }
    }

    // Also seed admin user if ADMIN_EMAIL + ADMIN_PASSWORD are set and no WIJSNEUZEN exists
    let adminSeeded = false
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    if (adminEmail && adminPassword) {
      const existingAdmin = await prisma.user.findFirst({ where: { role: "WIJSNEUZEN" } })
      if (!existingAdmin) {
        const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
        if (existing) {
          await prisma.user.update({ where: { id: existing.id }, data: { role: "WIJSNEUZEN" } })
        } else {
          const hashedPassword = await hashPassword(adminPassword)
          await prisma.user.create({
            data: { name: "Admin", email: adminEmail, password: hashedPassword, role: "WIJSNEUZEN" },
          })
        }
        adminSeeded = true
      }
    }

    return NextResponse.json({
      message: `Database seeded successfully. ${seeded} records created.${adminSeeded ? " Admin user created/upgraded." : ""}`,
      seeded,
      adminSeeded,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    )
  }
}

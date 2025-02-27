import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const settings = await db.settings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const settings = await db.settings.upsert({
      where: { id: 1 },
      update: {
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        footerText: data.footerText,
        contactEmail: data.contactEmail,
        socialLinks: data.socialLinks,
      },
      create: {
        id: 1,
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        footerText: data.footerText,
        contactEmail: data.contactEmail,
        socialLinks: data.socialLinks,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}


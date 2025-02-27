import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const category = searchParams.get("category")
  const tag = searchParams.get("tag")
  const institution = searchParams.get("institution")
  const search = searchParams.get("search")

  try {
    // This would be replaced with actual database queries
    const articles = await db.article.findMany({
      where: {
        ...(category ? { categoryId: category } : {}),
        ...(tag ? { tags: { some: { id: tag } } } : {}),
        ...(institution ? { authors: { some: { institutionId: institution } } } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search } },
                { abstract: { contains: search } },
                { keywords: { contains: search } },
              ],
            }
          : {}),
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        tags: true,
        authors: {
          include: {
            institution: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    })

    const total = await db.article.count({
      where: {
        ...(category ? { categoryId: category } : {}),
        ...(tag ? { tags: { some: { id: tag } } } : {}),
        ...(institution ? { authors: { some: { institutionId: institution } } } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search } },
                { abstract: { contains: search } },
                { keywords: { contains: search } },
              ],
            }
          : {}),
      },
    })

    return NextResponse.json({
      articles,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Validate required fields according to standards
    if (!data.title || !data.abstract || !data.content || !data.authors || !data.categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const article = await db.article.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        content: data.content,
        doi: data.doi,
        keywords: data.keywords,
        categoryId: data.categoryId,
        userId: session.user.id,
        status: "pending",
        authors: {
          create: data.authors.map((author: any) => ({
            name: author.name,
            email: author.email,
            institutionId: author.institutionId,
            order: author.order,
          })),
        },
        tags: {
          connect: data.tags.map((tagId: string) => ({ id: tagId })),
        },
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}


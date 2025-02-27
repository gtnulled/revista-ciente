"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: string
  slug: string
  title: string
  abstract: string
  publishedAt: string
  category: {
    id: string
    name: string
  }
  authors: {
    id: string
    name: string
    institution: {
      id: string
      name: string
    }
  }[]
}

export function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/articles?featured=true&limit=3")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching featured articles:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Featured Research</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Featured Research</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle className="line-clamp-2">
                <Link href={`/articles/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">{article.abstract}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{article.category.name}</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


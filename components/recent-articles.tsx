"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

export function RecentArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/articles?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching recent articles:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div>
        <h2 className="mb-6 text-2xl font-bold">Recent Publications</h2>
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="mb-4">
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
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Recent Publications</h2>
      {articles.map((article) => (
        <Card key={article.id} className="mb-4">
          <CardHeader>
            <CardTitle className="line-clamp-2">
              <Link href={`/articles/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">{article.abstract}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{article.category.name}</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/articles/${article.slug}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="mt-6 text-center">
        <Button variant="outline" asChild>
          <Link href="/articles">View All Articles</Link>
        </Button>
      </div>
    </div>
  )
}


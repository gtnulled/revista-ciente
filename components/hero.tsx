"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [settings, setSettings] = useState({
    siteName: "Scientific Publication Platform",
    siteDescription: "A platform for publishing scientific articles following international and Brazilian standards",
  })

  useEffect(() => {
    // Fetch site settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings({
            siteName: data.siteName || "Scientific Publication Platform",
            siteDescription:
              data.siteDescription ||
              "A platform for publishing scientific articles following international and Brazilian standards",
          })
        }
      })
      .catch((err) => console.error("Error fetching site settings:", err))
  }, [])

  return (
    <section className="w-full bg-gradient-to-b from-muted/50 to-background py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {settings.siteName}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{settings.siteDescription}</p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/articles">Browse Articles</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/submit">Submit Your Research</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


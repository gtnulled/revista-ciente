"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { useSession } from "next-auth/react"

export function SiteHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [settings, setSettings] = useState({
    siteName: "Scientific Publication Platform",
    logoUrl: null,
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Fetch site settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings({
            siteName: data.siteName || "Scientific Publication Platform",
            logoUrl: data.logoUrl,
          })
        }
      })
      .catch((err) => console.error("Error fetching site settings:", err))
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/articles?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              <Link href="/" className={`text-lg font-medium ${pathname === "/" ? "text-primary" : "text-foreground"}`}>
                Home
              </Link>
              <Link
                href="/articles"
                className={`text-lg font-medium ${pathname === "/articles" ? "text-primary" : "text-foreground"}`}
              >
                Articles
              </Link>
              <Link
                href="/submit"
                className={`text-lg font-medium ${pathname === "/submit" ? "text-primary" : "text-foreground"}`}
              >
                Submit
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium ${pathname === "/about" ? "text-primary" : "text-foreground"}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-lg font-medium ${pathname === "/contact" ? "text-primary" : "text-foreground"}`}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {settings.logoUrl ? (
            <img src={settings.logoUrl || "/placeholder.svg"} alt={settings.siteName} className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-bold">{settings.siteName}</span>
          )}
        </Link>
        <nav className="hidden md:flex md:gap-6">
          <Link href="/" className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-foreground"}`}>
            Home
          </Link>
          <Link
            href="/articles"
            className={`text-sm font-medium ${pathname === "/articles" ? "text-primary" : "text-foreground"}`}
          >
            Articles
          </Link>
          <Link
            href="/submit"
            className={`text-sm font-medium ${pathname === "/submit" ? "text-primary" : "text-foreground"}`}
          >
            Submit
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${pathname === "/about" ? "text-primary" : "text-foreground"}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium ${pathname === "/contact" ? "text-primary" : "text-foreground"}`}
          >
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <ThemeToggle />
          {session ? (
            <UserNav user={session.user} />
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth/signin">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}


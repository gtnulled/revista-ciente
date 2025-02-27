"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function SiteFooter() {
  const [settings, setSettings] = useState({
    siteName: "Scientific Publication Platform",
    footerText: "© 2024 Scientific Publication Platform. All rights reserved.",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: "",
    },
  })

  useEffect(() => {
    // Fetch site settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings({
            siteName: data.siteName || "Scientific Publication Platform",
            footerText: data.footerText || "© 2024 Scientific Publication Platform. All rights reserved.",
            socialLinks: data.socialLinks || {
              facebook: "",
              twitter: "",
              instagram: "",
              linkedin: "",
              github: "",
            },
          })
        }
      })
      .catch((err) => console.error("Error fetching site settings:", err))
  }, [])

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-medium">{settings.siteName}</h3>
            <p className="text-sm text-muted-foreground">
              A platform for publishing scientific articles following international and Brazilian standards.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-foreground">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Resources</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/guidelines" className="text-muted-foreground hover:text-foreground">
                  Submission Guidelines
                </Link>
              </li>
              <li>
                <Link href="/standards" className="text-muted-foreground hover:text-foreground">
                  Publication Standards
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="text-muted-foreground hover:text-foreground">
                  Ethics Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Connect</h3>
            <div className="flex space-x-4">
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
              {settings.socialLinks.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">{settings.footerText}</div>
      </div>
    </footer>
  )
}


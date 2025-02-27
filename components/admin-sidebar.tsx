"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Tag, FolderTree, Building2, Users, MessageSquare, Settings } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/articles", label: "Articles", icon: FileText },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/tags", label: "Tags", icon: Tag },
    { href: "/admin/institutions", label: "Institutions", icon: Building2 },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="hidden w-64 flex-shrink-0 border-r bg-muted/40 md:block">
      <div className="flex h-full flex-col py-4">
        <div className="px-4 py-2 text-lg font-semibold">Admin Panel</div>
        <nav className="mt-4 flex-1 space-y-1 px-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(link.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}


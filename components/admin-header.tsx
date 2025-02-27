"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession } from "next-auth/react"
import { UserNav } from "@/components/user-nav"

export function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden">
            <AdminSidebar />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="font-bold">
            Admin Panel
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              View Site
            </Link>
          </Button>
          <ThemeToggle />
          {session?.user && <UserNav user={session.user} />}
        </div>
      </div>
    </header>
  )
}


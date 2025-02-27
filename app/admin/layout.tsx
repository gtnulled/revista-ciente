import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminAuthCheck } from "@/components/admin-auth-check"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthCheck>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminAuthCheck>
  )
}


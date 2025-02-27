import { AdminUserList } from "@/components/admin-user-list"

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>
      <AdminUserList />
    </div>
  )
}


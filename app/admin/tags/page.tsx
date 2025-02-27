import { AdminTagList } from "@/components/admin-tag-list"
import { AdminTagForm } from "@/components/admin-tag-form"

export default function AdminTagsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Tags</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <AdminTagList />
        <AdminTagForm />
      </div>
    </div>
  )
}


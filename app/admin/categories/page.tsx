import { AdminCategoryList } from "@/components/admin-category-list"
import { AdminCategoryForm } from "@/components/admin-category-form"

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Categories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <AdminCategoryList />
        <AdminCategoryForm />
      </div>
    </div>
  )
}


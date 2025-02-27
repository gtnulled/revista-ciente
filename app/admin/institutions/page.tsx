import { AdminInstitutionList } from "@/components/admin-institution-list"
import { AdminInstitutionForm } from "@/components/admin-institution-form"

export default function AdminInstitutionsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Institutions</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <AdminInstitutionList />
        <AdminInstitutionForm />
      </div>
    </div>
  )
}


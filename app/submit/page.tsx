import { SubmissionForm } from "@/components/submission-form"
import { SubmissionGuidelines } from "@/components/submission-guidelines"

export default function SubmitPage() {
  return (
    <div className="container px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Submit an Article</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <SubmissionGuidelines />
        </div>
        <div className="md:col-span-2">
          <SubmissionForm />
        </div>
      </div>
    </div>
  )
}


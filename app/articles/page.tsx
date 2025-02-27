import { ArticleFilters } from "@/components/article-filters"
import { ArticleList } from "@/components/article-list"
import { Pagination } from "@/components/pagination"

export default function ArticlesPage() {
  return (
    <div className="container px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Scientific Articles</h1>
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <ArticleFilters />
        </div>
        <div className="md:col-span-3">
          <ArticleList />
          <Pagination className="mt-8" />
        </div>
      </div>
    </div>
  )
}


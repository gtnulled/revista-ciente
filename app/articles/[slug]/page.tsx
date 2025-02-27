import { ArticleHeader } from "@/components/article-header"
import { ArticleContent } from "@/components/article-content"
import { ArticleMetadata } from "@/components/article-metadata"
import { ArticleReferences } from "@/components/article-references"
import { ArticleAuthors } from "@/components/article-authors"
import { RelatedArticles } from "@/components/related-articles"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="container px-4 py-12">
      <article className="mx-auto max-w-4xl">
        <ArticleHeader slug={params.slug} />
        <div className="my-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ArticleContent slug={params.slug} />
            <ArticleReferences slug={params.slug} className="mt-12" />
          </div>
          <div>
            <ArticleMetadata slug={params.slug} />
            <ArticleAuthors slug={params.slug} className="mt-8" />
          </div>
        </div>
      </article>
      <RelatedArticles slug={params.slug} className="mt-16" />
    </div>
  )
}


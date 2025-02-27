import { FeaturedArticles } from "@/components/featured-articles"
import { Hero } from "@/components/hero"
import { RecentArticles } from "@/components/recent-articles"
import { Categories } from "@/components/categories"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <div className="container px-4 py-12 md:py-16 lg:py-24">
        <FeaturedArticles />
        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          <div className="md:col-span-2">
            <RecentArticles />
          </div>
          <div>
            <Categories />
          </div>
        </div>
      </div>
    </main>
  )
}


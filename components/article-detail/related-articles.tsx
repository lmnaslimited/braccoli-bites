import { BlogCard } from '@/components/blog/blog-card'
import type { BlogPost } from '@/lib/types'

interface RelatedArticlesProps {
  articles: BlogPost[]
  className?: string
}

export function RelatedArticles({ articles, className }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className={className}>
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {articles.slice(0, 3).map((article) => (
          <BlogCard
            key={article.id}
            title={article.title}
            description={article.description}
            slug={article.slug}
            category={article.category.name}
            author={article.author.name}
            date={article.publishedAt}
            image={article.featuredImage ? {
              src: article.featuredImage.url,
              alt: article.featuredImage.alternativeText || article.title,
            } : undefined}
          />
        ))}
      </div>
    </section>
  )
}

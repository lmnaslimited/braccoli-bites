import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@repo/ui/lib/utils'
import { formatDate } from '../../lib/utils/date'
import { Tblog } from '@repo/middleware/types'


//blog card component to display the blog post in the blog section
export function BlogCard({
  idBlogCardProps
}: {
  idBlogCardProps: Tblog["blogHeader"]
}) {
  const href = `/${idBlogCardProps.slug}`

  return (
    <Link href={href}>
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl',
          'border border-border/80 dark:border-white/10',
          'bg-background transition-all duration-300',
          'hover:border-border hover:shadow-md'
        )}
      >
        {/* Image */}
        {idBlogCardProps.image && (
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={idBlogCardProps.image}
              alt={idBlogCardProps.blogTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col gap-5 p-6">
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {idBlogCardProps.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              'line-clamp-2 text-xl font-semibold tracking-tight',
              'text-foreground transition-colors duration-300'
            )}
          >
            {idBlogCardProps.blogTitle}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground/80 md:text-base">
            {idBlogCardProps.blogExert}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-foreground">
                {idBlogCardProps.author}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatDate(idBlogCardProps.publishingDate)}
              </p>
            </div>

            <svg
              className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7m0 0l-7 7m7-7H5"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
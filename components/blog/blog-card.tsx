import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@repo/ui/lib/utils'
import { formatDate } from '../../lib/utils/date'

interface BlogCardProps {
  title: string
  description: string
  slug: string
  category: string
  author: string
  date: string
  image?: {
    src: string
    alt: string
  }
  featured?: boolean
  className?: string
}

export function BlogCard({
  title,
  description,
  slug,
  category,
  author,
  date,
  image,
  featured = false,
  className,
}: BlogCardProps) {
  const href = `/article/${slug}`

  return (
    <Link href={href}>
      <article
        className={cn(
          'group h-full rounded-lg overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-accent/50 hover:shadow-lg',
          featured && 'md:col-span-2 md:grid md:grid-cols-2 gap-6',
          className
        )}
      >
        {/* Image Container */}
        {image && (
          <div className={cn(
            'relative overflow-hidden bg-muted',
            featured ? 'aspect-video md:aspect-auto md:h-full' : 'aspect-video'
          )}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content Container */}
        <div className={cn(
          'p-6 flex flex-col gap-4',
          featured && 'md:py-0 md:pr-0'
        )}>
          {/* Category Badge */}
          <div className="flex gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className={cn(
            'font-bold leading-tight text-foreground group-hover:text-accent transition-colors',
            featured ? 'text-3xl md:text-4xl' : 'text-xl'
          )}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Meta Footer */}
          <div className={cn(
            'flex items-center justify-between pt-4 border-t border-border/50 mt-auto',
            featured && 'md:pt-8'
          )}>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-foreground">{author}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(date)}
              </p>
            </div>
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300"
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

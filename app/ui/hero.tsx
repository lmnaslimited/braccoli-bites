import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  description: string
  image?: {
    src: string
    alt: string
  }
  badge?: string
  author?: {
    name: string
    date: string
  }
  className?: string
  contentClassName?: string
}

export function Hero({
  title,
  description,
  image,
  badge,
  author,
  className,
  contentClassName,
}: HeroProps) {
  return (
    <section className={cn('w-full', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image */}
        {image && (
          <div className="relative w-full aspect-square md:aspect-auto md:h-96 rounded-lg overflow-hidden bg-card">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className={cn('flex flex-col gap-6', contentClassName)}>
          {badge && (
            <div className="inline-flex w-fit">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-pretty">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            {description}
          </p>

          {author && (
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div>
                <p className="font-semibold text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.date}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

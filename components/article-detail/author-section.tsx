import type { Author } from '@/lib/types'
import { formatDate } from '@/lib/utils/date'

interface AuthorSectionProps {
  author: Author
  date: string
  readingTime: number
}

export function AuthorSection({ author, date, readingTime }: AuthorSectionProps) {
  return (
    <div className="py-6 border-y border-border/40">
      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-accent">
            {author.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>

        {/* Author info */}
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{author.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {author.bio || 'Author at LMNAs'}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{formatDate(date)}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}

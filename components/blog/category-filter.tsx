'use client'
import { cn } from '@repo/ui/lib/utils'
import type { Category } from '../../lib/types'

interface CategoryFilterProps {
  categories: Category[]

  selectedCategory?: string
  onCategoryChange: (categoryId: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-foreground">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-full transition-colors border',
            !selectedCategory
              ? 'bg-accent text-accent-foreground border-accent'
              : 'bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-full transition-colors border',
              selectedCategory === category.id
                ? 'bg-accent text-accent-foreground border-accent'
                : 'bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

'use client'
import { cn } from '@repo/ui/lib/utils'

type TcategoryFilterProps = {
  categories: {
    id: string
    name: string
    slug?: string
  }[]
  selectedCategory?: string
  onCategoryChange: (categoryId: string | null) => void
}

// This component renders category filter buttons for the blog section. It receives a list of categories, the currently selected category, and a callback function to handle category changes. The active category button is styled differently to indicate selection.
export function CategoryFilter({
  idCategoryFilterProps,
}: {
  idCategoryFilterProps: TcategoryFilterProps
}) {
const fnGetButtonStyles = (isActive: boolean) =>
  cn(
    'rounded-full border px-5 py-2.5 text-base font-medium transition-all',
    isActive
      ? 'bg-accent text-accent-foreground border-accent'
      : 'bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
  )
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => idCategoryFilterProps.onCategoryChange(null)}
        className={fnGetButtonStyles(!idCategoryFilterProps.selectedCategory)}
      >
        All
      </button>
       {/* Map through categories and render buttons */}
      {idCategoryFilterProps.categories.map((category) => {
        const isActive =
          idCategoryFilterProps.selectedCategory === category.id

        return (
          <button
            key={category.id}
            onClick={() =>
              idCategoryFilterProps.onCategoryChange(category.id)
            }
            className={fnGetButtonStyles(isActive)}
          >
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
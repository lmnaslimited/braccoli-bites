'use client'

import { useMemo, useState } from 'react'
import { cn } from '@repo/ui/lib/utils'

import { BlogCard } from '../blog/blog-card'
import { CategoryFilter } from '../blog/category-filter'

import type { TblogPageSource } from '@repo/middleware/types'

type TblogSectionProps = {
  blogs: TblogPageSource
}

export function BlogSection({
  blogs,
}: TblogSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null)

  const [currentPage, setCurrentPage] =
    useState(1)

  const POSTS_PER_PAGE = 3

  /** Categories **/
  const categories = useMemo(() => {
    const laCategories = Array.from(
      new Set(
        blogs.blogs.map(
          (blog) => blog.blogHeader.category
        )
      )
    )

    return laCategories.map((category) => ({
      id: category.toLowerCase(),
      name: category,
      slug: category.toLowerCase(),
    }))
  }, [blogs])

  /** Posts **/
  const formattedPosts = useMemo(() => {
    return blogs.blogs
  }, [blogs])

  /** Filtered Posts **/
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return formattedPosts
    }

    const lCategory = categories.find(
      (category) =>
        category.id === selectedCategory
    )

    return formattedPosts.filter(
      (post) =>
        post.blogHeader.category ===
        lCategory?.name
    )
  }, [
    selectedCategory,
    formattedPosts,
    categories,
  ])

  /** Pagination **/
  const totalPages = Math.ceil(
    filteredPosts.length / POSTS_PER_PAGE
  )

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <section className="w-full py-10 text-foreground">
      <div className="flex flex-col gap-10">
        {/* Category Filter */}
        <CategoryFilter
          idCategoryFilterProps={{
            categories,
            selectedCategory:
              selectedCategory || undefined,
onCategoryChange: (category) => {
  setSelectedCategory(category)
  setCurrentPage(1)
}
          }}
        />

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post) => (
            <BlogCard
              key={post.slug}
              idBlogCardProps={
                post.blogHeader
              }
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors',
                  currentPage === index + 1
                    ? 'bg-foreground text-background'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                )}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  )
}
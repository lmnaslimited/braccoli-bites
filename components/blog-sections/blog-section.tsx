'use client'
import { useMemo, useState } from 'react'
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

  /** Categories**/
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

  /*Posts*/
  const formattedPosts = useMemo(() => {
    return blogs.blogs
  }, [blogs])

  /*Filtered Posts*/
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

  return (
    <section className="w-full py-10 text-foreground">
      <div className="flex flex-col gap-10">
        {/* Category Filter */}
        <CategoryFilter
          idCategoryFilterProps={{
            categories,
            selectedCategory:
              selectedCategory || undefined,
            onCategoryChange:
              setSelectedCategory,
          }}
        />

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.blogHeader.slug}
              idBlogCardProps={
                post.blogHeader
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { useMemo, useState } from 'react'

import { BlogCard } from '../blog/blog-card'
import { CategoryFilter } from '../blog/category-filter'

import type {TblogPageSource } from '@repo/middleware/types'

type TProps = {
  blogs: TblogPageSource
}

export function BlogSection({ blogs }: TProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Generate categories dynamically from blogs
  const categories = useMemo(() => {
    const laCategories = Array.from(
      new Set(
        blogs.blogs.map((blog) => blog.blogHeader.category)
      )
    )

    return laCategories.map((category) => ({
      id: category.toLowerCase(),
      name: category,
      slug: category.toLowerCase(),
    }))
  }, [blogs])

  // Transform Strapi data
  const formattedPosts = useMemo(() => {
    return blogs.blogs
  }, [blogs])

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return formattedPosts

    const category = categories.find(
      (c) => c.id === selectedCategory
    )

    return formattedPosts.filter(
      (post) => post.blogHeader.category === category?.name
    )
  }, [selectedCategory, formattedPosts, categories])

  return (
<div className="w-full space-y-10 py-10 text-foreground">  
   <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory || undefined}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.blogHeader.slug}
            idBlogCardProps={post.blogHeader}
          />
        ))}
      </div>
    </div>
  )
}
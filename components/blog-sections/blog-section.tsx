'use client'

import { useMemo, useState } from 'react'

import { BlogCard } from '../blog/blog-card'
import { CategoryFilter } from '../blog/category-filter'

const categories = [
  { id: 'technology', name: 'Technology', slug: 'technology' },
  { id: 'ai', name: 'AI', slug: 'ai' },
  { id: 'cloud', name: 'Cloud', slug: 'cloud' },
]

const posts = [
  {
    title: 'Sample Blog Post',
    description: 'This is a sample blog post description.',
    slug: 'sample-blog-post',
    category: 'Technology',
    author: 'John Doe',
    date: '2023-10-01',
  },
  {
    title: 'AI Manufacturing Intelligence',
    description: 'Enterprise AI transformation strategies.',
    slug: 'ai-manufacturing',
    category: 'AI',
    author: 'LMNAs',
    date: '2024-01-15',
  },
]

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts

    const category = categories.find(
      (c) => c.id === selectedCategory
    )

    return posts.filter(
      (post) => post.category === category?.name
    )
  }, [selectedCategory])

  return (
    <div className="space-y-10">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory || undefined}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </div>
  )
}

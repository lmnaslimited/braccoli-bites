// Strapi API Response Types

export interface StrapiMeta {
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface StrapiResponse<T> {
  data: T
  meta?: StrapiMeta
}

export interface Author {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: {
    url: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  publishedAt: string
  readingTime: number
  featured: boolean
  createdAt: string
  updatedAt: string
  featuredImage?: {
    url: string
    alternativeText?: string
  }
  author: Author
  category: Category
}

export interface BlogPostResponse extends StrapiResponse<BlogPost[]> {
  data: BlogPost[]
}

export interface SingleBlogPostResponse extends StrapiResponse<BlogPost> {
  data: BlogPost
}

export interface CategoriesResponse extends StrapiResponse<Category[]> {
  data: Category[]
}

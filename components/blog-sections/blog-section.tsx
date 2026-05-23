"use client";
import { useMemo, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { BlogCard } from "../blog/blog-card";
import { CategoryFilter } from "../blog/category-filter";
import type { TblogPageSource } from "@repo/middleware/types";

type TblogSectionProps = {
blogs: TblogPageSource;
};
// This component renders the blog section on the blog homepage. It includes a category filter, a grid of blog cards, and pagination controls. The category filter allows users to filter blog posts by category, and the pagination controls allow users to navigate through multiple pages of blog posts.

export function BlogSection({ blogs }: TblogSectionProps) {
  const [LSelectedCategory, fnSetSelectedCategory] = useState<string | null>(
    null,
  );
  const [LCurrentPage, fnSetCurrentPage] = useState(1);

  /// Constants per page for pagination
  const POSTS_PER_PAGE = 6;

  /** Categories **/
  const Lcategories = useMemo(() => {
    const LaCategories = Array.from(
      new Set(blogs.blogs.map((blog) => blog.blogHeader.category)),
    );

    return LaCategories.map((category) => ({
      id: category.toLowerCase(),
      name: category,
      slug: category.toLowerCase(),
    }));
  }, [blogs]);

  /** Posts **/
  const LdformattedPosts = useMemo(() => {
    return blogs.blogs;
  }, [blogs]);

  /** Filtered Posts **/
  const LdfilteredPosts = useMemo(() => {
    if (!LSelectedCategory) {
      return LdformattedPosts;
    }

    const LCategory = Lcategories.find(
      (category) => category.id === LSelectedCategory,
    );

    return LdformattedPosts.filter(
      (post) => post.blogHeader.category === LCategory?.name,
    );
  }, [LSelectedCategory, LdformattedPosts, Lcategories]);

  /** Pagination **/
  // Calculate total pages and slice the filtered posts for the current page
  const LtotalPages = Math.ceil(LdfilteredPosts.length / POSTS_PER_PAGE);
  const LdpaginatedPosts = LdfilteredPosts.slice(
    (LCurrentPage - 1) * POSTS_PER_PAGE,
    LCurrentPage * POSTS_PER_PAGE,
  );

  return (
    <section className="w-full py-10 text-foreground">
      <div className="flex flex-col gap-10">
        {/* Category Filter */}
        <CategoryFilter
          idCategoryFilterProps={{
            categories: Lcategories,
            selectedCategory: LSelectedCategory || undefined,
            onCategoryChange: (category) => {
              fnSetSelectedCategory(category);
              fnSetCurrentPage(1);
            },
          }}
        />

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LdpaginatedPosts.map((post) => (
            <BlogCard key={post.slug} idBlogCardProps={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: LtotalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => fnSetCurrentPage(index + 1)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors",
                LCurrentPage === index + 1
                  ? "bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:bg-muted",
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

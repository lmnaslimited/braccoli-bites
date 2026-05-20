import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { TblogPageTarget } from "@repo/middleware/types";

export function Hero({
  idProps,
  featuredBlog,
}: {
  idProps: TblogPageTarget;
  featuredBlog?: TblogPageTarget["blogs"][0];
}) {
  if (!featuredBlog) {
    return null;
  }

  return (
    <section className="w-full pb-16">
      {/* Intro Content */}
      <div className="mb-12 max-w-3xl">
        <div className="flex flex-col gap-6">
          {idProps.blogHome.blogHeader.badge && (
            <div className="inline-flex w-fit">
              <span className="inline-flex items-center rounded-full border bg-accent px-3 py-1 text-sm text-accent-foreground">
                {idProps.blogHome.blogHeader.badge}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {idProps.blogHome.blogHeader.title}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {idProps.blogHome.blogHeader.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Blog */}
      <Link href={`/blog/${featuredBlog.slug}`}>
        <article
          className={cn(
            "group grid grid-cols-1 overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-xl md:grid-cols-2"
          )}
        >
          {/* Content */}
          <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span className="inline-flex items-center rounded-full border bg-accent px-3 py-1 text-sm text-accent-foreground">
                Featured Blog
              </span>
            </div>

            {/* Category */}
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {featuredBlog.blogHeader?.category}
            </span>

            {/* Title */}
            <h2 className="text-4xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent md:text-5xl">
              {featuredBlog.blogHeader?.blogTitle}
            </h2>

            {/* Excerpt */}
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {featuredBlog.blogHeader?.blogExert}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                {featuredBlog.blogHeader?.author?.charAt(0) || "A"}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {featuredBlog.blogHeader?.author || "Anonymous"}
                </span>

                <span className="text-sm text-muted-foreground">
                  {featuredBlog.blogHeader?.publishingDate || "No date"}
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[320px] overflow-hidden">
            <Image
              src={featuredBlog.blogHeader?.image || ""}
              alt={featuredBlog.blogHeader?.blogTitle || "Featured blog"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </article>
      </Link>
    </section>
  );
}
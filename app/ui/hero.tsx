import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <section className="relative w-full overflow-hidden pb-12">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Intro */}
      <div className="mb-16 max-w-4xl">
        <div className="flex flex-col gap-8">
          {idProps.blogHome.blogHeader.badge && (
            <div className="inline-flex w-fit items-center rounded-full border border-border/60 bg-background/80 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wide text-primary">
                {idProps.blogHome.blogHeader.badge}
              </span>
            </div>
          )}

          <div className="space-y-6">
            <h1 className="max-w-4xl text-3xl font-black tracking-tight md:text-4xl lg:text-6xl">
              {idProps.blogHome.blogHeader.title}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {idProps.blogHome.blogHeader.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Label */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-12 w-1 rounded-full bg-primary" />
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {idProps.blogHome.blogHeader.highlight}
          </h2>
        </div>
      </div>

      {/* Featured Card */}
      <Link href={`blog/${featuredBlog.slug}`}>
        <article
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
          )}
        >
          {/* KEY: flex row so both sides stretch to the same height */}
          <div className="flex flex-col lg:flex-row">

            {/* Content — left side */}
            <div className="relative flex flex-col justify-between p-6 md:p-10 lg:p-12 lg:w-[55%]">
              {/* subtle glow */}
              <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Category */}
                <div className="inline-flex w-fit items-center rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 backdrop-blur-sm">
                  <span className="text-sm font-medium text-foreground/80">
                    {featuredBlog.blogHeader.category}
                  </span>
                </div>

                {/* Title + Excerpt */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-black leading-tight tracking-tight transition-all duration-300 group-hover:text-primary md:text-4xl lg:text-5xl">
                    {featuredBlog.blogHeader?.blogTitle}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg line-clamp-3">
                    {featuredBlog.blogHeader?.blogExert}
                  </p>
                </div>
              </div>

              {/* Footer — pinned to bottom */}
              <div className="relative z-10 flex items-center justify-between pt-6">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-muted text-base font-bold">
                    {featuredBlog.blogHeader?.author?.charAt(0) || "A"}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-sm md:text-base">
                      {featuredBlog.blogHeader?.author || "Anonymous"}
                    </span>
                    <span className="text-xs text-muted-foreground md:text-sm">
                      {featuredBlog.blogHeader?.publishingDate || "No date"}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Image — right side, stretches to full card height */}
            <div className="relative lg:w-[45%] min-h-[260px] lg:min-h-0">
              <Image
                src={featuredBlog.blogHeader?.image || ""}
                alt={featuredBlog.blogHeader?.blogTitle || "Featured blog"}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

          </div>
        </article>
      </Link>
    </section>
  );
}
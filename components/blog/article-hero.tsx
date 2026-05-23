import Image from "next/image";
import { TblogArticleTarget } from "@repo/middleware/types";

// Individual Page - Article Hero Component
export default function ArticleHero({
  idArticle,
}: {
  idArticle: TblogArticleTarget
}) {
  if (!idArticle) return null;
  return (
    <div className="mx-auto max-w-4xl mb-12">
      {/* Banner Image */}
      {idArticle.blogs[0]?.blogHeader?.image && (
        <div className="relative w-full overflow-hidden rounded-2xl mb-8">
          <Image
            src={idArticle.blogs[0]?.blogHeader?.image}
            alt={idArticle.blogs[0]?.blogHeader?.blogTitle || "Article banner"}
            width={1920}
            height={1080}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      {/* Title */}
      <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl mb-8">
        {idArticle.blogs[0]?.blogHeader?.blogTitle}
      </h1>

      {/* Author (left) + Date (right) */}
      <div className="flex items-center justify-between">
        {/* Author - left */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-muted text-sm font-bold text-foreground">
            {idArticle.blogs[0]?.blogHeader?.author?.charAt(0) || "A"}
          </div>
          <span className="font-semibold text-foreground text-sm md:text-base">
            {idArticle.blogs[0]?.blogHeader?.author || "Anonymous"}
          </span>
        </div>

        {/* Date - right */}
        <span className="text-xs text-muted-foreground md:text-sm">
          {idArticle.blogs[0]?.blogHeader?.publishingDate || "No date"}
        </span>
      </div>
      {/* Divider */}
      <div className="mt-8 h-px w-full bg-border/40" />
    </div>
  );
}

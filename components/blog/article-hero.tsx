import Image from "next/image";
import { TblogArticleTarget } from "@repo/middleware/types";

export default function ArticleHero({
  article,
}: {
  article: TblogArticleTarget["blogs"][0];
}) {
  if (!article) return null;

  return (
    <div className="mx-auto max-w-4xl mb-12">


      {/* Banner Image */}
      {article.blogHeader?.image && (
        <div className="relative w-full overflow-hidden rounded-2xl mb-8">
          <Image
            src={article.blogHeader.image}
            alt={article.blogHeader?.blogTitle || "Article banner"}
            width={1920}
            height={1080}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      {/* Title */}
      <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl mb-8">
        {article.blogHeader?.blogTitle}
      </h1>

      {/* Author (left) + Date (right) */}
      <div className="flex items-center justify-between">
        {/* Author - left */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-muted text-sm font-bold text-foreground">
            {article.blogHeader?.author?.charAt(0) || "A"}
          </div>
          <span className="font-semibold text-foreground text-sm md:text-base">
            {article.blogHeader?.author || "Anonymous"}
          </span>
        </div>

        {/* Date - right */}
        <span className="text-xs text-muted-foreground md:text-sm">
          {article.blogHeader?.publishingDate || "No date"}
        </span>
      </div>

      {/* Divider */}
      <div className="mt-8 h-px w-full bg-border/40" />
    </div>
  );
}
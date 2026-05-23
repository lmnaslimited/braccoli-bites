// 'use client'
import { fnGetCacheData } from "../../api/strapi/get-data";
import { clTransformerFactory } from "@repo/middleware";
import { fnGetStatus } from "@/lib/utils/get-status";
import ArticleContent from "@/components/blog/article";
import TitleSubtitle from "@repo/ui/components/title-subtitle";
import ArticleHero from "@/components/blog/article-hero";
import { TblogArticleTarget, Tcontext } from "@repo/middleware/types";
import { NewsletterSubscription } from "@/components/subscription";
import { getPageMetadata } from "@/lib/utils/metadata/page-metadata";
import type { Metadata } from "next";
async function fnGetBlogArticleData(params: { locale: string; slug: string }) {
  const { locale, slug } = params;
  const LStatus = await fnGetStatus();
  const LdBlogcontext: Tcontext = {
    locale,
    status: LStatus,
    filters: {
      slug: {
        eq: slug,
      },
    },
  };

  // Fetch the blog article data from the cache using the provided context and transformer.
  const LdPageData: TblogArticleTarget = await fnGetCacheData(
    LdBlogcontext,
    clTransformerFactory.createTransformer("blogs"),
  );
  return LdPageData;
}
// generateMetadata is a Next.js function that generates metadata for the blog article page based on the article's metaData.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const LdpageData = await fnGetBlogArticleData({ slug, locale });
  if (!LdpageData?.blogs?.[0]?.metaData) {
    throw new Error(`Meta data not found for blog slug: ${slug}`);
  }
  return getPageMetadata(LdpageData.blogs[0].metaData);
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const LdblogArticleData = await fnGetBlogArticleData(await params);
  const Ldjson = LdblogArticleData.blogs[0]?.metaData.schemaData;

  return (
    <>
      <div className="min-h-auto bg-background text-foreground">
        <section className="bg-background py-20 text-foreground transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6">
            <ArticleHero idArticle={LdblogArticleData} />

            <ArticleContent
              idContent={LdblogArticleData.blogs[0]?.blogContent || ""}
            />

            {LdblogArticleData.blogs[0]?.ctasection && (
              <div className="mx-auto mt-28 flex flex-col items-center px-6 py-8 md:px-14">
                <div className="max-w-2xl text-center">
                  <TitleSubtitle
                    idTitle={LdblogArticleData.blogs[0]?.ctasection}
                  />
                </div>

                <div className="w-full max-w-2xl">
                  <NewsletterSubscription
                    idProps={LdblogArticleData.blogs[0]?.ctasection}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      {Ldjson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Ldjson, null, 2).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}

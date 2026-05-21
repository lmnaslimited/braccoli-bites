// 'use client'
import { fnGetCacheData } from "../../api/strapi/get-data";
import { clTransformerFactory } from "@repo/middleware";
import { fnGetStatus } from "@/lib/utils/get-status";
import ArticleContent from "@/components/blog/article";
import TitleSubtitle from "@repo/ui/components/title-subtitle";
import ArticleHero from "@/components/blog/article-hero";
import {
  TblogArticleTarget,
  Tcontext,
} from "@repo/middleware/types";
import { NewsletterSubscription } from "@/components/subscription";
async function fnGetBlogArticleData(params: {
  locale: string;
  slug: string;
}) {
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

  const pageData: TblogArticleTarget =
    await fnGetCacheData(
      LdBlogcontext,
      clTransformerFactory.createTransformer(
        "blogs"
      )
    );

  return pageData;
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const LdblogArticleData =
    await fnGetBlogArticleData(
      await params
    );

  const Ldarticle =
    LdblogArticleData.blogs[0];

  return (
    <div className="min-h-auto bg-background text-foreground">
      <section className="bg-background py-20 text-foreground transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
                    <ArticleHero article={Ldarticle} />
          
          <ArticleContent
            content={
              Ldarticle?.blogContent || ""
            }
          />

          {Ldarticle?.ctasection && (
            <div className="mx-auto mt-28 flex flex-col items-center px-6 py-8 md:px-14">
              
              <div className="max-w-2xl text-center">
                <TitleSubtitle
                  idTitle={
                    Ldarticle.ctasection
                  }
                />
              </div>

              <div className="w-full max-w-2xl">
                <NewsletterSubscription
                  idProps={
                    Ldarticle.ctasection
                  }
                />
              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
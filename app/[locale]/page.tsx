import { fnGetCacheData } from "../api/strapi/get-data";
import { clTransformerFactory } from "@repo/middleware";
import { fnGetStatus } from "@/lib/utils/get-status";
import TitleSubtitle from "@repo/ui/components/title-subtitle";
import { NewsletterSubscriptionForm } from "@repo/ui/components/subscription";
import { BlogSection } from "../../components/blog-sections/blog-section";
import { Hero } from "../ui/hero";
import { TblogPageTarget, Tcontext } from "@repo/middleware/types";
import { getPageMetadata } from "@/lib/utils/metadata/page-metadata";
import type { Metadata } from "next";

async function fnGetBlogPageData(params: { locale: string }) {
  const { locale } = params;
  const LStatus = await fnGetStatus();
  const LdBlogcontext: Tcontext = {
    locale,
    status: LStatus,
    blogsLocale2: locale,
    blogsStatus2: LStatus,
  };

  const LdPageData: TblogPageTarget = await fnGetCacheData(
    LdBlogcontext,
    clTransformerFactory.createTransformer("blogHome"),
  );
  return LdPageData;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const pageData = await fnGetBlogPageData(await params);
  return getPageMetadata(pageData.blogHome.metaData);
}

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const LdPageData = await fnGetBlogPageData(await params);

  const LdfeaturedBlog = LdPageData.blogs.find((idBlog) => idBlog.featuredBlog);
  const Ldjson = LdPageData.blogHome.metaData.schemaData;
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border/40 bg-background py-20 text-foreground transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6">
            <Hero idProps={LdPageData} idFeaturedBlog={LdfeaturedBlog} />
            <BlogSection blogs={LdPageData} />
            <div className="mx-auto mt-28 flex flex-col items-center px-6 py-8 md:px-14">
              <div className="max-w-2xl text-center">
                <TitleSubtitle idTitle={LdPageData.blogHome.ctaSection} />
              </div>
              <div className="w-full max-w-2xl">
              <section className="w-full py-6">
              <div className="container mx-auto px2 md:px-6">
                <div className="mx-auto w-full max-w-2xl ">
                  <div className="space-y-6 text-center m-0">
                  <NewsletterSubscriptionForm
                    placeholder={LdPageData.blogHome.ctaSection.buttons[0]?.description ?? ""}
                    buttonLabel={LdPageData.blogHome.ctaSection.buttons[0]?.label ?? ""}
                    buttonPendingLabel={String(LdPageData.blogHome.ctaSection.buttons[0]?.icon) ?? ""}
                    variant="lg"
                    source="blog-home"
                  />
                </div>
                </div>
                </div>
                </section>
              </div>
            </div>
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

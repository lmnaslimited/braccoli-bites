// 'use client'
    import { fnGetCacheData } from "../../../api/strapi/get-data"
import Footer from "@repo/ui/components/footer";
import Navbar from "@repo/ui/components/navbar";
import { clTransformerFactory } from "@repo/middleware";
import { fnGetStatus } from "@/lib/utils/get-status";
import ArticleContent from "@/components/blog/article";
// import TitleSubtitle from "@repo/ui/components/title-subtitle";
import {
  TblogArticleTarget,
  Tcontext,
  TfooterTarget,
  TnavbarTarget,
} from "@repo/middleware/types";

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const LdContext: Tcontext = { locale: locale };

  const LStatus = await fnGetStatus();
  // Context for Blog Page - includes locale and status for fetching blog-specific data
  const LdBlogcontext: Tcontext = {
    locale: locale,
    status: LStatus,
    blogsLocale2: locale,
    blogsStatus2: LStatus,
  };

  const LdfooterData: TfooterTarget = await fnGetCacheData(
    LdContext,
    clTransformerFactory.createTransformer("footer"),
  );

  const LdblogArticleData: TblogArticleTarget = await fnGetCacheData(
    LdBlogcontext,
    clTransformerFactory.createTransformer("blogs"),
  );

  console.log("Blog Article Data:", LdblogArticleData); // Debug log to check the fetched data

  const LdnavbarData: TnavbarTarget = await fnGetCacheData(
    LdContext,
    clTransformerFactory.createTransformer("navbar"),
  );
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar idNavbar={LdnavbarData} />
      <section className="border-b border-border/40 bg-background py-20 text-foreground transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
     {/* <ArticleContent  /> */}
          {/* <TitleSubtitle idTitle={HeroData.heading} /> */}
        </div>
      </section>
      <Footer idFooter={LdfooterData} />
    </div>
  );
}

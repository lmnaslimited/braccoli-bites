// 'use client'
import { fnGetCacheData } from "./api/strapi/get-data";
import Footer from "@repo/ui/components/footer";
import Navbar from "@repo/ui/components/navbar";
import { clTransformerFactory } from "@repo/middleware";

// import TitleSubtitle from "@repo/ui/components/title-subtitle";
import {
  TblogPageTarget,
  Tcontext,
  TfooterTarget,
  TnavbarTarget,
} from "@repo/middleware/types";
// import ArticleContent from "./components/article";
import { BlogSection } from "../components/blog-sections/blog-section";
import { Hero } from "./ui/hero";

// const HeroData = {
//   heading: {
//     textWithoutColor: "Blog Coming Soon...",
//     subtitle: "Stay Tuned for Exciting Updates!"
//   }
// }

// Mock featured article

export default async function Blog({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;
  const context: Tcontext = { locale: locale };
  const footerData: TfooterTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer("footer"),
  );

  const LdblogHomeData: TblogPageTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer("blogHome"),
  );

  console.log("LdblogHomeData", LdblogHomeData);

  const navbarData: TnavbarTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer("navbar"),
  );
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar idNavbar={navbarData} />
      <section className="border-b border-border/40 bg-background py-20 text-foreground transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <Hero idProps={LdblogHomeData} />
          <BlogSection blogs={LdblogHomeData} />
          {/* <TitleSubtitle idTitle={HeroData.heading} /> */}
        </div>
      </section>
      <Footer idFooter={footerData} />
    </div>
  );
}

import { Tcontext } from "@repo/middleware";
import Footer from "@repo/ui/components/footer";
import Navbar from "@repo/ui/components/navbar";
import TitleSubtitle from "@repo/ui/components/titleSubtitle";
import { TfooterTarget, TnavbarTarget } from "@repo/middleware";
import { clTransformerFactory } from "@repo/middleware";
import { fnGetCacheData } from "./api/getData";

const HeroData = {
  heading: {
    textWithoutColor: "Blog Coming Soon...",
    subtitle: "Stay Tuned for Exciting Updates!"
  }
}
export default async function Blog({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;
  const context: Tcontext = { locale: locale }
  const footerData: TfooterTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer('footer')
  );

  const navbarData: TnavbarTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer('navbar')
  );
  return (
    <div >
      <Navbar idNavbar={navbarData} />
      <section className="border-b border-border/40 py-20 bg-gradient-to-b from-primary to-primary/70 text-background">
        <div className="container mx-auto px-4 md:px-6">
          <TitleSubtitle idTitle={HeroData.heading} />
        </div>
      </section>
      <Footer idFooter={footerData} />
    </div>);
}

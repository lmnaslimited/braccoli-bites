import Footer from "@repo/ui/components/footer";
import Navbar from "@repo/ui/components/navbar";
import TitleSubtitle from "@repo/ui/components/titleSubtitle";

const HeroData = {
  heading:{
    textWithoutColor: "Blog Coming Soon...",
    subtitle:"Stay Tuned for Exciting Updates!"
  }
}
export default function Blog() {
  return (
    <div >
      <Navbar />
      <section className="border-b border-border/40 py-20 bg-gradient-to-b from-primary to-primary/70 text-background">
      <div className="container mx-auto px-4 md:px-6">
      <TitleSubtitle idTitle={HeroData.heading} />
      </div>
      </section>
      <Footer />
    </div>
  )
}


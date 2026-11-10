import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Header />
      <main id="main-content" className="overflow-x-clip pb-24 lg:pb-0">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <CTA />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

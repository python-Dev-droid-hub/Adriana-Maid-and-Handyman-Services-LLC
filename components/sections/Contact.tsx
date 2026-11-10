import { Suspense } from "react";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactSection } from "@/lib/data";

export function Contact() {
  return (
    <>
      <SectionReveal
        id="contact"
        aria-label="Contact"
        className="section-pad scroll-mt-28 overflow-x-clip bg-gradient-to-b from-[#EEF6FF] via-offwhite to-white"
      >
        <Container>
          <SectionHeading
            title={contactSection.title}
            subtitle={contactSection.intro}
          />

          <div className="mt-10 grid items-stretch gap-8 md:mt-12 md:gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
            <ContactDetails />
          </div>
        </Container>
      </SectionReveal>

      <section
        aria-label={contactSection.mapTitle}
        className="relative w-full overflow-hidden bg-white"
      >
        <iframe
          title={contactSection.mapTitle}
          src={contactSection.mapEmbedUrl}
          className="block h-[280px] w-full border-0 sm:h-[360px] lg:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}

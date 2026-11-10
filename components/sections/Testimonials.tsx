"use client";

import { SectionReveal } from "@/components/motion/SectionReveal";
import { TestimonialSection } from "@/components/ui/testimonials";
import { Container } from "@/components/ui/Container";
import { testimonials, testimonialsSection } from "@/lib/data";

export function Testimonials() {
  return (
    <SectionReveal
      id="testimonials"
      aria-label="Testimonials"
      className="section-pad scroll-mt-28 overflow-x-clip bg-gradient-to-b from-[#EEF6FF] via-offwhite to-white"
    >
      <Container>
        <TestimonialSection
          title={testimonialsSection.title}
          subtitle={testimonialsSection.subtitle}
          testimonials={testimonials.map((item) => ({
            id: item.id,
            quote: item.quote,
            name: item.name,
            role: item.role,
            imageSrc: item.imageSrc,
          }))}
        />
      </Container>
    </SectionReveal>
  );
}

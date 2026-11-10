"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesSection } from "@/lib/data";

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionReveal
      id="services"
      aria-label="Services"
      className="section-pad scroll-mt-28 overflow-x-clip bg-gradient-to-b from-[#EEF6FF] via-offwhite to-white pt-[clamp(2.75rem,3vw+1rem,4.25rem)]"
    >
      <Container>
        <SectionHeading
          title={servicesSection.title}
          subtitle={servicesSection.subtitle}
        />

        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5"
          variants={reduceMotion ? undefined : gridContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </motion.div>
      </Container>
    </SectionReveal>
  );
}

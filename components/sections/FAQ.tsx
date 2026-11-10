"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import {
  FaqCategoryTabs,
  type FaqCategoryTab,
} from "@/components/faq/FaqCategoryTabs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, faqSection } from "@/lib/data";

const defaultCategory =
  (faqSection.categories.find((tab) => tab.id !== "all")?.id as
    | FaqCategoryTab
    | undefined) ?? "pricing";

function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        flip ? "bottom-0 translate-y-px rotate-180" : "top-0 -translate-y-px"
      } ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 72"
        fill="currentColor"
        className="block h-10 w-full sm:h-12 md:h-14"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
}

export function FAQ() {
  const reduceMotion = useReducedMotion();
  const [category, setCategory] = useState<FaqCategoryTab>(defaultCategory);

  const filtered = useMemo(
    () => faqs.filter((faq) => faq.category === category).slice(0, 5),
    [category],
  );

  const defaultOpenId = useMemo(() => {
    const preferred = filtered.find((faq) => faq.id === faqSection.defaultOpenId);
    if (preferred) return preferred.id;
    const popular = filtered.find((faq) => faq.popular);
    return popular?.id ?? filtered[0]?.id ?? faqSection.defaultOpenId;
  }, [filtered]);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section-pad relative scroll-mt-28 overflow-x-clip bg-gradient-to-b from-[#E6F3FF] to-[#F7FAFC]"
    >
      <WaveDivider className="z-20 text-white" />
      <WaveDivider flip className="z-20 text-[#EEF6FF]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2545 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            label={faqSection.label}
            title={faqSection.title}
            subtitle={faqSection.subtitle}
          />
        </motion.div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <motion.div
            className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[32px]">
              <Image
                src={faqSection.image}
                alt={faqSection.imageAlt}
                fill
                sizes="(min-width:1024px) 40vw, 90vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <FaqCategoryTabs
              category={category}
              onCategoryChange={setCategory}
            />
            <div className="mt-5">
              <FaqAccordion items={filtered} defaultOpenId={defaultOpenId} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

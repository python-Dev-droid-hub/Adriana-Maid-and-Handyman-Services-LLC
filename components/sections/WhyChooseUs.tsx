"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { FloatingShapes } from "@/components/why/FloatingShapes";
import { WhyChooseCard } from "@/components/why/WhyChooseCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/data";

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        flip ? "bottom-0 translate-y-px rotate-180 text-offwhite" : "top-0 -translate-y-px text-white"
      }`}
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

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const featured = whyChooseUs.tiles.find((tile) => tile.featured) ?? whyChooseUs.tiles[0];
  const [fair, trained, satisfaction] = whyChooseUs.tiles.filter((tile) => !tile.featured);

  return (
    <SectionReveal
      id="why-us"
      aria-label="Why choose us"
      className="section-pad relative scroll-mt-28 overflow-x-clip bg-gradient-to-b from-[#E6F3FF] to-[#F7FAFC]"
    >
      <WaveDivider />
      <WaveDivider flip />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2545 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <FloatingShapes />

      <Container className="relative z-10">
        <SectionHeading
          label={whyChooseUs.label}
          title={whyChooseUs.title}
          subtitle={whyChooseUs.subtitle}
        />

        <motion.div
          className="mt-14 grid grid-cols-1 gap-10 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 lg:gap-y-8"
          variants={reduceMotion ? undefined : gridContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div
            variants={reduceMotion ? undefined : item}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <WhyChooseCard tile={featured} className="min-h-[300px] lg:h-full" />
          </motion.div>

          <motion.div variants={reduceMotion ? undefined : item}>
            <WhyChooseCard tile={fair} />
          </motion.div>

          <motion.div variants={reduceMotion ? undefined : item}>
            <WhyChooseCard tile={trained} />
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : item}
            className="md:col-span-2 lg:col-span-2"
          >
            <WhyChooseCard tile={satisfaction} />
          </motion.div>
        </motion.div>
      </Container>
    </SectionReveal>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Phone, Shield, Star, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CaredForSwoosh } from "@/components/hero/CaredForSwoosh";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { HeroWave } from "@/components/hero/HeroWave";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company, hero, trustBadges } from "@/lib/data";

const trustIconMap: Record<(typeof trustBadges)[number]["icon"], LucideIcon> = {
  Shield,
  Star,
  Zap,
};

const headlineContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 22 },
  },
};

const staggerButtons: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.34 } },
};

const staggerBadges: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative overflow-hidden bg-[#06182F] pb-[clamp(3.5rem,4vw+1.5rem,5.75rem)] pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-36"
    >
      {/* z-0: full-bleed image */}
      <HeroVisual />

      {/* z-[1]: dark navy overlays above image, below content */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {/* Desktop: left → right navy read strip (~70% width) */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,24,47,0.96) 0%, rgba(11,37,69,0.92) 22%, rgba(11,37,69,0.78) 40%, rgba(11,37,69,0.35) 58%, rgba(11,37,69,0.12) 74%, rgba(11,37,69,0) 100%)",
          }}
        />
        {/* Mobile / tablet: top → bottom for text contrast */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,24,47,0.94) 0%, rgba(11,37,69,0.88) 32%, rgba(11,37,69,0.55) 58%, rgba(11,37,69,0.25) 100%)",
          }}
        />
        {/* Soft teal glow, bottom-left */}
        <div
          className="absolute -bottom-10 left-0 h-56 w-56 rounded-full bg-[#13A89E]/15 blur-3xl sm:h-72 sm:w-72"
        />
        {/* Bottom edge fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06182F]/55 via-[#06182F]/20 to-transparent sm:h-28 lg:h-32" />
      </div>

      {/* z-10: copy */}
      <Container className="relative z-10">
        <div className="relative max-w-2xl lg:flex lg:min-h-[calc(100svh-9rem)] lg:flex-col lg:justify-center lg:py-6">
          <motion.h1
            className="type-display max-w-[14ch] font-bold tracking-tight text-white sm:max-w-[16ch]"
            variants={reduceMotion ? undefined : headlineContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
          >
            <motion.span variants={reduceMotion ? undefined : fadeUp} className="block text-white">
              {hero.headlineLead}
            </motion.span>
            <motion.span
              variants={reduceMotion ? undefined : fadeUp}
              className="mt-1 inline-block"
            >
              <span className="text-white">{hero.headlineAccentBefore}</span>
              <span className="relative inline-block text-[#13A89E]">
                {hero.headlineAccent}
                <CaredForSwoosh className="left-0 w-full max-w-none" />
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="type-body-lg mt-5 max-w-xl text-white/85"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            variants={reduceMotion ? undefined : staggerButtons}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
          >
            <motion.div variants={reduceMotion ? undefined : popIn}>
              <Button
                href={hero.quoteHref}
                variant="primary"
                className="w-full rounded-full px-7 py-3.5 text-base shadow-[0_12px_30px_-10px_rgba(255,138,61,0.7)] sm:w-auto"
              >
                {hero.quoteLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
            <motion.div variants={reduceMotion ? undefined : popIn}>
              <Button
                href={company.phoneHref}
                variant="outline-light"
                className="w-full rounded-full border-white/40 bg-white/10 px-7 py-3.5 text-base text-white backdrop-blur-md hover:bg-white/20 focus-visible:outline-white sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {hero.callLabel}
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
            variants={reduceMotion ? undefined : staggerBadges}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
          >
            {trustBadges.map((badge) => {
              const Icon = trustIconMap[badge.icon];
              const iconClass =
                badge.icon === "Star" ? "text-orange" : "text-[#13A89E]";

              return (
                <motion.li
                  key={badge.id}
                  variants={reduceMotion ? undefined : fadeUp}
                  className="flex items-center gap-2 text-sm font-medium text-white"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    <Icon className={`h-4 w-4 ${iconClass}`} aria-hidden />
                  </span>
                  <span className="whitespace-nowrap">{badge.label}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>

      <HeroWave />
    </section>
  );
}

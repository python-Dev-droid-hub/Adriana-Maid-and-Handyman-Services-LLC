"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { sectionReveal } from "@/components/motion/motion-presets";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  as?: "section" | "footer";
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

export function SectionReveal({
  as = "section",
  children,
  className,
  id,
  "aria-label": ariaLabel,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();
  const motionProps = {
    id,
    "aria-label": ariaLabel,
    className: cn(className),
    variants: reduceMotion ? undefined : sectionReveal,
    initial: reduceMotion ? false : ("hidden" as const),
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.12 },
  };

  if (as === "footer") {
    return <motion.footer {...motionProps}>{children}</motion.footer>;
  }

  return <motion.section {...motionProps}>{children}</motion.section>;
}

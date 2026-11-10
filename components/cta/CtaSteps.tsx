"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta, type CtaStepIcon } from "@/lib/data";

const stepIconMap: Record<CtaStepIcon, LucideIcon> = {
  MessageSquare,
  FileText,
  CheckCircle,
};

export function CtaSteps() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-12 md:mt-14 lg:mt-16">
      <SectionHeading
        title={cta.stepsTitle}
        subtitle={cta.stepsSubtitle}
      />

      <ol className="relative mt-10 grid gap-8 md:mt-12 lg:grid-cols-3 lg:gap-6">
        <div
          className="pointer-events-none absolute left-[1.15rem] top-4 bottom-4 w-px border-l border-dashed border-teal/40 lg:left-8 lg:right-8 lg:top-[1.15rem] lg:h-px lg:w-auto lg:border-l-0 lg:border-t"
          aria-hidden
        />

        {cta.steps.map((step, index) => {
          const Icon = stepIconMap[step.icon];
          return (
            <motion.li
              key={step.id}
              className="relative z-10 flex gap-4 lg:flex-col lg:items-center lg:text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : 0.08 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-sm font-bold text-white shadow-glow-teal lg:h-10 lg:w-10">
                {step.number}
              </span>
              <div className="min-w-0 lg:flex lg:flex-col lg:items-center">
                <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-semibold text-navy sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

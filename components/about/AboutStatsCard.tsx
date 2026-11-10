"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Trophy, Users, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { about, type AboutStat } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<AboutStat["icon"], LucideIcon> = {
  Users,
  Award,
  Trophy,
};

type AboutStatsCardProps = {
  className?: string;
};

export function AboutStatsCard({ className }: AboutStatsCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass grid grid-cols-3 gap-1 rounded-[28px] border border-white px-2.5 py-3.5 shadow-soft-lg sm:gap-2 sm:px-4 sm:py-4">
        {about.stats.map((stat) => {
          const Icon = iconMap[stat.icon];

          return (
            <div key={stat.id} className="flex min-w-0 flex-col items-center px-1 text-center">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-teal/10 sm:h-9 sm:w-9">
                <Icon
                  className={cn("h-3.5 w-3.5 text-teal sm:h-4 sm:w-4", stat.iconClassName)}
                  aria-hidden
                />
              </span>
              <p className="mt-1.5 font-heading text-sm font-bold leading-none text-navy sm:text-lg">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[9px] leading-snug text-navy/65 sm:text-[11px]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

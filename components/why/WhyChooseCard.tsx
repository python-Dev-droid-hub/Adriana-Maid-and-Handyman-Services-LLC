"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { usePrefersMotion } from "@/hooks/usePrefersMotion";
import type { WhyChooseTile } from "@/lib/data";
import { cn } from "@/lib/utils";

type WhyChooseCardProps = {
  tile: WhyChooseTile;
  className?: string;
};

export function WhyChooseCard({ tile, className }: WhyChooseCardProps) {
  const prefersMotion = usePrefersMotion();
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], prefersMotion ? [6, -6] : [0, 0]);
  const rotateY = useTransform(springX, [-0.5, 0.5], prefersMotion ? [-6, 6] : [0, 0]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!prefersMotion || tile.featured) return;
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, prefersMotion, tile.featured],
  );

  const onPointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  if (tile.featured) {
    return (
      <motion.article
        className={cn(
          "group relative flex h-full flex-col overflow-visible rounded-[28px]",
          className,
        )}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-[#0E5B6E] to-teal p-6 text-white shadow-soft-lg sm:p-7">
          <span
            className="pointer-events-none absolute right-4 top-3 font-heading text-5xl font-bold leading-none text-white/15 sm:text-6xl"
            aria-hidden
          >
            {tile.number}
          </span>

          <motion.div
            className="relative z-10 -mt-12 mb-4 flex justify-center sm:-mt-14"
            whileHover={
              reduceMotion
                ? undefined
                : { y: -6, rotate: 4, transition: { type: "spring", stiffness: 300, damping: 16 } }
            }
          >
            <Image
              src={tile.image}
              alt={tile.imageAlt}
              width={120}
              height={120}
              className="h-[100px] w-[100px] object-contain drop-shadow-lg sm:h-[120px] sm:w-[120px]"
              sizes="120px"
            />
          </motion.div>

          {tile.badge ? (
            <span className="relative z-10 mb-4 inline-flex w-fit rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white shadow-glow">
              {tile.badge}
            </span>
          ) : null}

          <h3 className="relative z-10 font-heading text-xl font-semibold text-white sm:text-[1.35rem]">
            {tile.title}
          </h3>
          <p className="relative z-10 mt-3 flex-1 text-[15px] leading-relaxed text-white/90">
            {tile.description}
          </p>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className={cn("group relative h-full [perspective:1000px]", className)}
      style={
        prefersMotion
          ? { rotateX, rotateY, transformStyle: "preserve-3d" }
          : undefined
      }
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
    >
      <div className="relative flex h-full flex-col overflow-visible rounded-[28px] border border-white bg-white/80 px-5 pb-6 pt-10 shadow-[0_12px_40px_-16px_rgb(11_37_69_/_0.18)] backdrop-blur-xl transition-shadow duration-300 group-hover:shadow-[0_22px_50px_-18px_rgb(11_37_69_/_0.28)] sm:px-6 sm:pb-7 sm:pt-11">
        <span
          className="pointer-events-none absolute inset-x-8 top-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-teal to-orange transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden
        />

        <span
          className="pointer-events-none absolute right-4 top-3 font-heading text-4xl font-bold leading-none text-teal/20 sm:text-5xl"
          aria-hidden
        >
          {tile.number}
        </span>

        <motion.div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[42%]"
          whileHover={
            reduceMotion
              ? undefined
              : { y: -6, rotate: 4, transition: { type: "spring", stiffness: 300, damping: 16 } }
          }
        >
          <Image
            src={tile.image}
            alt={tile.imageAlt}
            width={112}
            height={112}
            className="h-[90px] w-[90px] object-contain drop-shadow-md sm:h-[112px] sm:w-[112px]"
            sizes="112px"
          />
        </motion.div>

        <h3 className="mt-8 font-heading text-xl font-semibold text-navy">
          {tile.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-slate-700">
          {tile.description}
        </p>
      </div>
    </motion.article>
  );
}

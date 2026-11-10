"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type UiTestimonial = {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
};

export type TestimonialSectionProps = {
  title: string;
  subtitle: string;
  testimonials: UiTestimonial[];
  className?: string;
};

type TestimonialCardVisualProps = {
  testimonial: UiTestimonial;
  className?: string;
};

export function TestimonialPhotoCard({
  testimonial,
  className,
}: TestimonialCardVisualProps) {
  return (
    <figure
      className={cn(
        "relative h-[420px] w-[min(86vw,320px)] shrink-0 overflow-hidden rounded-[28px] bg-navy shadow-soft-lg sm:h-[460px] sm:w-[340px]",
        className,
      )}
    >
      <Image
        src={testimonial.imageSrc}
        alt={testimonial.name}
        fill
        sizes="340px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />

      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
        <Quote className="mb-3 h-7 w-7 text-teal/80" aria-hidden />
        <blockquote className="text-sm font-medium leading-relaxed sm:text-base">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <p className="mt-4 font-heading text-sm font-semibold">
          — {testimonial.name}
          <span className="ml-1 font-sans font-medium text-white/65">
            {testimonial.role}
          </span>
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Photo-card testimonials with an infinite horizontal carousel.
 * Autoplay pauses while the pointer is inside the section.
 */
export function TestimonialSection({
  title,
  subtitle,
  testimonials,
  className,
}: TestimonialSectionProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const looped = [...testimonials, ...testimonials];

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused || !trackRef.current) return;

    const halfWidth = trackRef.current.scrollWidth / 2;
    if (halfWidth <= 0) return;

    const speed = 36; // px per second
    let next = x.get() - (speed * delta) / 1000;
    if (Math.abs(next) >= halfWidth) {
      next += halfWidth;
    }
    x.set(next);
  });

  return (
    <section
      className={cn("w-full py-4", className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-0 text-center sm:px-2">
        <h2 className="type-section-title font-bold tracking-tight text-navy">
          {title}
        </h2>
        <p className="type-body-lg mx-auto mt-4 max-w-2xl text-pretty text-navy/70">
          {subtitle}
        </p>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#EEF6FF] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

          <motion.div
            ref={trackRef}
            className="flex w-max gap-5 px-2 sm:gap-6"
            style={{ x }}
          >
            {looped.map((testimonial, index) => (
              <TestimonialPhotoCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>

        <p className="mt-5 text-xs text-navy/45 sm:text-sm">
          {paused ? "Paused — move away to continue" : "Hover or tap to pause"}
        </p>
      </div>
    </section>
  );
}

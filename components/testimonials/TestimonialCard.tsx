"use client";

import { TestimonialPhotoCard } from "@/components/ui/testimonials";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: Testimonial;
  elevated?: boolean;
  className?: string;
};

/** @deprecated Prefer TestimonialSection carousel; kept for compatibility. */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <TestimonialPhotoCard
      testimonial={{
        id: testimonial.id,
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
        imageSrc: testimonial.imageSrc,
      }}
      className={cn("w-full max-w-none", className)}
    />
  );
}

"use client";

import Image from "next/image";
import { hero } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Tiny navy placeholder while the hero image loads. */
const heroBlurDataURL =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#06182F"/><stop offset="1" stop-color="#0B2545"/></linearGradient></defs><rect width="16" height="9" fill="url(#g)"/></svg>`,
  );

type HeroVisualProps = {
  className?: string;
};

export function HeroVisual({ className }: HeroVisualProps) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={heroBlurDataURL}
        className="object-cover object-right"
      />
    </div>
  );
}

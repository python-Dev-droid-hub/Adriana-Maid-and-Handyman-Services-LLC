"use client";

import { motion, useReducedMotion, useSpring, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { usePrefersMotion } from "@/hooks/usePrefersMotion";
import type { Service } from "@/lib/data";
import { cn } from "@/lib/utils";

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const prefersMotion = usePrefersMotion();
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const rotateX = useSpring(0, { stiffness: 240, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 240, damping: 22 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!prefersMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      rotateY.set(px * 10);
      rotateX.set(-py * 10);
    },
    [prefersMotion, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.article
      ref={cardRef}
      variants={item}
      className={cn("h-full [perspective:1100px]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      style={
        prefersMotion
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
    >
      <GlassCard className="group flex h-full flex-col rounded-card-lg border border-white/90 p-5 text-center shadow-soft transition-shadow duration-300 hover:shadow-soft-lg sm:p-6">
        <motion.div
          className="mx-auto mb-5 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.08,
                  rotate: 4,
                  transition: { type: "spring", stiffness: 300, damping: 16 },
                }
          }
        >
          <Image
            src={service.image}
            alt={`${service.title} icon`}
            width={144}
            height={144}
            loading="lazy"
            sizes="(max-width: 768px) 112px, 144px"
            className="h-28 w-28 object-contain drop-shadow-md sm:h-32 sm:w-32"
          />
        </motion.div>

        <h3 className="font-heading text-lg font-bold text-navy sm:text-xl">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
          {service.cardDescription}
        </p>

        <Link
          href={service.learnMoreHref}
          className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-teal/80"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </GlassCard>
    </motion.article>
  );
}

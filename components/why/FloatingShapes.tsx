"use client";

import { motion } from "framer-motion";
import { usePrefersMotion } from "@/hooks/usePrefersMotion";
import { cn } from "@/lib/utils";

const shapes = [
  {
    id: "teal-sphere",
    className:
      "left-[4%] top-16 h-14 w-14 rounded-full bg-gradient-to-br from-[#5EEAD4] to-teal shadow-[inset_-6px_-8px_16px_rgba(11,37,69,0.18),inset_4px_4px_10px_rgba(255,255,255,0.45)]",
    delay: 0,
    duration: 7.2,
  },
  {
    id: "orange-cube",
    className:
      "right-[8%] top-24 h-11 w-11 rotate-12 rounded-2xl bg-gradient-to-br from-[#FFB07A] to-orange shadow-[inset_-5px_-6px_14px_rgba(11,37,69,0.16),inset_3px_3px_8px_rgba(255,255,255,0.4)]",
    delay: 1.1,
    duration: 6.4,
  },
  {
    id: "sky-ring",
    className:
      "bottom-28 left-[12%] h-16 w-16 rounded-full border-[10px] border-[#7AD7F0]/55 bg-transparent shadow-[0_8px_20px_rgba(122,215,240,0.25)]",
    delay: 0.5,
    duration: 8,
  },
  {
    id: "teal-mini",
    className:
      "bottom-20 right-[18%] h-8 w-8 rounded-full bg-gradient-to-br from-[#99F6E4] to-[#14B8A6]/80 shadow-[inset_-3px_-4px_10px_rgba(11,37,69,0.12),inset_2px_2px_6px_rgba(255,255,255,0.5)]",
    delay: 1.8,
    duration: 6.8,
  },
] as const;

export function FloatingShapes() {
  const prefersMotion = usePrefersMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {shapes.map((shape) => (
        <motion.span
          key={shape.id}
          className={cn("absolute opacity-80", shape.className)}
          animate={
            prefersMotion
              ? { y: [0, -14, 0], rotate: [0, 8, 0] }
              : undefined
          }
          transition={
            prefersMotion
              ? {
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: shape.delay,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

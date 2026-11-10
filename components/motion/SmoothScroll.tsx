"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { usePrefersMotion } from "@/hooks/usePrefersMotion";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersMotion = usePrefersMotion();

  useEffect(() => {
    if (!prefersMotion) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.15,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frame = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(onFrame);
    };
    frame = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [prefersMotion]);

  return children;
}

"use client";

import { useEffect, useState } from "react";
import { usePrefersMotion } from "@/hooks/usePrefersMotion";

/** Desktop-only WebGL hero scene (off for mobile, reduced motion, low-power). */
export function useAllow3D() {
  const prefersMotion = usePrefersMotion();
  const [allow3D, setAllow3D] = useState(false);

  useEffect(() => {
    if (!prefersMotion) {
      setAllow3D(false);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const lowCores =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency <= 4;

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const lowPower =
      lowCores ||
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    setAllow3D(!isMobile && !lowPower);
  }, [prefersMotion]);

  return allow3D;
}

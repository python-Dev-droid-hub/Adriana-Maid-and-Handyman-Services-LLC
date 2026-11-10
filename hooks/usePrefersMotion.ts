"use client";

import { useReducedMotion } from "framer-motion";

/** True when decorative motion (float, parallax, Lenis) is allowed. */
export function usePrefersMotion() {
  const reduceMotion = useReducedMotion();
  return !reduceMotion;
}

"use client";

import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

type MotionShellProps = {
  children: React.ReactNode;
};

export function MotionShell({ children }: MotionShellProps) {
  return (
    <SmoothScroll>
      <ScrollProgressBar />
      {children}
    </SmoothScroll>
  );
}

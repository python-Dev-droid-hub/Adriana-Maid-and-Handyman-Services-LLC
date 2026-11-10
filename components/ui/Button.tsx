"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-orange text-white shadow-soft hover:shadow-glow focus-visible:outline-orange",
  outline:
    "border border-navy/15 bg-white/70 text-navy shadow-soft hover:border-teal hover:text-teal hover:shadow-glow-teal focus-visible:outline-teal",
  "outline-light":
    "border border-white/85 bg-transparent text-white shadow-soft hover:bg-white/10 focus-visible:outline-white",
  glass:
    "glass text-navy hover:shadow-glow-teal focus-visible:outline-teal",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
} & Omit<HTMLMotionProps<"button">, "children">;

const MotionLink = motion.create(Link);

function isExternalHref(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

export function Button({
  variant = "primary",
  className,
  children,
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-card-sm px-6 py-3 text-sm font-semibold transition-[box-shadow,color,background-color,border-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className,
  );
  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -3 },
        whileTap: { y: 0, scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 420, damping: 24 },
      };

  if (href && !isExternalHref(href)) {
    return (
      <MotionLink href={href} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  if (href) {
    const opensNewTab = href.startsWith("http");
    return (
      <motion.a
        href={href}
        className={classes}
        {...(opensNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}

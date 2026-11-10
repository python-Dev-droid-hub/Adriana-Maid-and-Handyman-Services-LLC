"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CtaSteps } from "@/components/cta/CtaSteps";
import { Container } from "@/components/ui/Container";
import { cta, type CtaTrustIcon } from "@/lib/data";
import { cn } from "@/lib/utils";

const trustIconMap: Record<CtaTrustIcon, LucideIcon> = {
  ShieldCheck,
  Star,
  Zap,
};

function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0",
        flip ? "bottom-0 translate-y-px rotate-180" : "top-0 -translate-y-px",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 72"
        fill="currentColor"
        className="block h-10 w-full sm:h-12 md:h-14"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
}

export function CTA() {
  const reduceMotion = useReducedMotion();
  const [crewVisible, setCrewVisible] = useState(true);

  return (
    <section
      id={cta.id}
      aria-label="Get a free quote"
      className="section-pad relative scroll-mt-28 overflow-x-clip bg-gradient-to-b from-[#E6F3FF] to-[#F7FAFC]"
    >
      <WaveDivider className="z-20 text-[#F7FAFC]" />
      <WaveDivider flip className="z-20 text-[#EEF6FF]" />

      <Container className="relative z-10 max-w-7xl">
        <div className="relative">
          <motion.div
            className="relative rounded-[40px] shadow-[0_28px_80px_-36px_rgba(11,37,69,0.55)]"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[40px]"
              aria-hidden
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B2545_0%,#0E5B6E_48%,#13A89E_100%)]" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-orange/35 blur-3xl" />
            </div>

            <div
              className={cn(
                "relative z-10 grid items-end gap-6 px-6 pb-8 pt-8 sm:gap-8 sm:px-8 sm:pb-10 sm:pt-10 lg:grid-cols-12 lg:gap-4 lg:px-10 lg:pb-0 lg:pt-12 xl:px-12",
                !crewVisible && "lg:justify-items-center lg:pb-12",
              )}
            >
              <div
                className={cn(
                  "lg:col-span-7 lg:pb-12 xl:col-span-6",
                  !crewVisible && "mx-auto max-w-xl text-center lg:col-span-12",
                )}
              >
                <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white sm:text-sm">
                  {cta.label}
                </span>

                <h2 className="type-section-title mt-5 max-w-[18ch] text-balance font-bold tracking-tight text-white">
                  {cta.titleLead}{" "}
                  <span className="text-orange">{cta.titleAccent}</span>{" "}
                  {cta.titleTrail}
                </h2>

                <p className="type-body-lg mt-4 max-w-md text-pretty text-white/80">
                  {cta.subtitle}
                </p>

                <div
                  className={cn(
                    "mt-7 flex flex-col gap-3 sm:flex-row sm:items-center",
                    !crewVisible && "sm:justify-center",
                  )}
                >
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            boxShadow: [
                              "0 0 0 0 rgba(255,138,61,0.35)",
                              "0 0 0 14px rgba(255,138,61,0)",
                              "0 0 0 0 rgba(255,138,61,0)",
                            ],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 4, repeat: Infinity, ease: "easeOut" }
                    }
                    className="rounded-full"
                  >
                    <Link
                      href={cta.quoteHref}
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(255,138,61,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:w-auto"
                    >
                      {cta.quoteLabel}
                    </Link>
                  </motion.div>

                  <Link
                    href={cta.callHref}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/45 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {cta.callLabel}
                  </Link>
                </div>

                <ul
                  className={cn(
                    "mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2",
                    !crewVisible && "sm:justify-center",
                  )}
                >
                  {cta.trustItems.map((item) => {
                    const Icon = trustIconMap[item.icon];
                    return (
                      <li
                        key={item.id}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/90"
                      >
                        <Icon
                          className={
                            item.icon === "Star"
                              ? "h-4 w-4 text-amber-300"
                              : "h-4 w-4 text-teal-200"
                          }
                          aria-hidden
                        />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {crewVisible ? (
                <motion.div
                  className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:-mt-10 lg:mb-0 lg:max-w-none xl:col-span-6"
                  initial={
                    reduceMotion ? false : { opacity: 0, x: 36, scale: 0.96 }
                  }
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0.35 : 0.6,
                    delay: reduceMotion ? 0 : 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className="pointer-events-none absolute bottom-[8%] left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-[100%] bg-navy/40 blur-2xl"
                    aria-hidden
                  />
                  <Image
                    src={cta.crewImage}
                    alt={cta.crewImageAlt}
                    width={900}
                    height={720}
                    sizes="(min-width:1024px) 45vw, 100vw"
                    className="relative z-10 mx-auto h-auto w-full object-contain object-bottom drop-shadow-[0_24px_40px_rgba(6,24,47,0.35)]"
                    onError={() => setCrewVisible(false)}
                  />
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </div>

        <CtaSteps />
      </Container>
    </section>
  );
}

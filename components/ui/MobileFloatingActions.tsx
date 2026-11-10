"use client";

import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { company } from "@/lib/data";
import { usePrefersMotion } from "@/hooks/usePrefersMotion";
import { cn } from "@/lib/utils";

export function MobileFloatingActions() {
  const prefersMotion = usePrefersMotion();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersMotion ? "smooth" : "auto",
    });
  };

  return (
    <div aria-live="polite">
      <a
        href={company.phoneHref}
        className={cn(
          "fixed bottom-5 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white shadow-glow",
          "transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
          "max-[1023px]:inline-flex lg:hidden",
        )}
        aria-label={`Call Now at ${company.phoneDisplay}`}
      >
        <Phone className="h-4 w-4" aria-hidden />
        Call Now
      </a>

      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-5 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/90 text-navy shadow-soft-lg",
          "transition-all hover:-translate-y-0.5 hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
          showBackToTop ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/icons/LogoMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company, hero, navLinks } from "@/lib/data";
import { hrefToSectionId, useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Header() {
  const activeSection = useActiveSection();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header id="header" className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
      <Container>
        <motion.div
          className={cn(
            "glass flex items-center justify-between gap-3 rounded-full border border-white/90 px-4 py-2.5 sm:px-5 sm:py-3",
            scrolled && "shadow-header-float",
          )}
          layout
        >
          <Link
            href="#hero"
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <LogoMark />
            <span className="truncate font-heading text-sm font-bold leading-tight text-navy sm:text-base">
              <span className="hidden min-[480px]:inline">{company.headerBrand}</span>
              <span className="min-[480px]:hidden">{company.shortName}</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-2"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const sectionId = hrefToSectionId(link.href);
              const isActive = sectionId === activeSection;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 xl:px-3.5",
                    isActive
                      ? "text-teal"
                      : "text-navy/80 hover:text-navy",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={hero.quoteHref}
              variant="primary"
              className="hidden rounded-full px-4 py-2.5 text-sm shadow-glow sm:inline-flex"
            >
              {hero.quoteLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/70 text-navy shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav"
              className="mt-3 overflow-hidden lg:hidden"
              initial={reduceMotion ? false : { height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass rounded-card border border-white/90 p-4 shadow-header-float">
                <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                  {navLinks.map((link, index) => {
                    const sectionId = hrefToSectionId(link.href);
                    const isActive = sectionId === activeSection;

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "rounded-card-sm px-4 py-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                          isActive
                            ? "bg-teal/10 text-teal"
                            : "text-navy/80 hover:bg-white/60",
                        )}
                        onClick={() => setMobileOpen(false)}
                        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * index }}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </nav>
                <div className="mt-4 border-t border-navy/5 pt-4">
                  <Button
                    href={hero.quoteHref}
                    variant="primary"
                    className="w-full rounded-full shadow-glow"
                    onClick={() => setMobileOpen(false)}
                  >
                    {hero.quoteLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}

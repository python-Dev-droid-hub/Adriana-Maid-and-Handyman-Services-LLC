"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "services",
  "about",
  "gallery",
  "testimonials",
  "contact",
] as const;

export type ActiveSectionId = (typeof SECTION_IDS)[number];

const HREF_TO_SECTION: Record<string, ActiveSectionId> = {
  "#hero": "hero",
  "#services": "services",
  "#about": "about",
  "#gallery": "gallery",
  "#testimonials": "testimonials",
  "#contact": "contact",
};

export function hrefToSectionId(href: string): ActiveSectionId | null {
  return HREF_TO_SECTION[href] ?? null;
}

export function useActiveSection() {
  const [active, setActive] = useState<ActiveSectionId>("hero");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top?.target.id && SECTION_IDS.includes(top.target.id as ActiveSectionId)) {
          setActive(top.target.id as ActiveSectionId);
        }
      },
      {
        rootMargin: "-42% 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    elements.forEach((el) => observer.observe(el));

    const onScrollTop = () => {
      if (window.scrollY < 80) setActive("hero");
    };
    window.addEventListener("scroll", onScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollTop);
    };
  }, []);

  return active;
}

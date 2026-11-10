"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import type { FaqCategory } from "@/lib/data";
import { faqSection } from "@/lib/data";
import { cn } from "@/lib/utils";

export type FaqCategoryTab = Exclude<FaqCategory, "all">;

type FaqCategoryTabsProps = {
  category: FaqCategoryTab;
  onCategoryChange: (value: FaqCategoryTab) => void;
};

const categories = faqSection.categories.filter((tab) => tab.id !== "all") as Array<{
  id: FaqCategoryTab;
  label: string;
}>;

export function FaqCategoryTabs({
  category,
  onCategoryChange,
}: FaqCategoryTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const count = categories.length;
    const next = ((index % count) + count) % count;
    onCategoryChange(categories[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#E6F3FF] to-transparent md:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#F7FAFC] to-transparent md:hidden"
        aria-hidden
      />
      <div
        role="tablist"
        aria-label="FAQ categories"
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((tab, index) => {
          const isActive = category === tab.id;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onCategoryChange(tab.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  focusTab(index + 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  focusTab(index - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  focusTab(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  focusTab(categories.length - 1);
                }
              }}
              className={cn(
                "relative min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                isActive ? "text-white" : "bg-white/70 text-navy/70 hover:bg-white",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="faq-tab-indicator"
                  className="absolute inset-0 rounded-full bg-teal shadow-glow-teal"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Faq } from "@/lib/data";
import { faqSection } from "@/lib/data";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: Faq[];
  defaultOpenId: string;
};

type FaqItemProps = {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onKeyNavigate: (direction: "up" | "down") => void;
  buttonId: string;
  panelId: string;
  buttonRef: (node: HTMLButtonElement | null) => void;
};

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
  onKeyNavigate,
  buttonId,
  panelId,
  buttonRef,
}: FaqItemProps) {
  const reduceMotion = useReducedMotion();
  const serviceIcon = faq.service ? faqSection.serviceIcons[faq.service] : null;

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={reduceMotion || isOpen ? undefined : { y: -4 }}
      className={cn(
        "overflow-hidden rounded-[24px] border border-white bg-white/80 shadow-[0_12px_40px_-18px_rgb(11_37_69_/_0.16)] backdrop-blur-md transition-shadow duration-300",
        !isOpen && "hover:shadow-[0_18px_44px_-16px_rgb(11_37_69_/_0.22)]",
        isOpen && "shadow-[0_18px_44px_-16px_rgb(11_37_69_/_0.22)]",
      )}
    >
      <div className="relative">
        {isOpen ? (
          <span
            className="pointer-events-none absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-teal to-orange"
            aria-hidden
          />
        ) : null}

        <h3>
          <button
            ref={buttonRef}
            id={buttonId}
            type="button"
            className="flex min-h-11 w-full items-start justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal sm:px-6 sm:py-5"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                onKeyNavigate("down");
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                onKeyNavigate("up");
              }
            }}
          >
            <span className="min-w-0 flex-1">
              <span className="mb-2 flex flex-wrap items-center gap-2">
                {faq.popular ? (
                  <span className="inline-flex rounded-full bg-orange/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange">
                    Popular
                  </span>
                ) : null}
                {faq.service && serviceIcon ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-white/80 px-2 py-0.5 text-[11px] font-medium text-navy/70">
                    <Image
                      src={serviceIcon}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    {faq.service}
                  </span>
                ) : null}
              </span>
              <span className="font-heading text-[17px] font-semibold leading-snug text-navy">
                {faq.question}
              </span>
            </span>

            <motion.span
              className={cn(
                "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                isOpen ? "bg-orange/15 text-orange" : "bg-teal/10 text-teal",
              )}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
              aria-hidden
            >
              {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </motion.span>
          </button>
        </h3>

        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
          }
          className="overflow-hidden"
        >
          <p className="px-5 pb-5 text-base leading-[1.7] text-slate-600 sm:px-6 sm:pb-6">
            {faq.answer}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function FaqAccordion({ items, defaultOpenId }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (items.some((item) => item.id === openId)) return;
    setOpenId(
      items.find((item) => item.id === defaultOpenId)?.id ?? items[0]?.id ?? null,
    );
  }, [items, openId, defaultOpenId]);

  const focusAt = useCallback((index: number) => {
    const count = buttonRefs.current.length;
    if (count === 0) return;
    const next = ((index % count) + count) % count;
    buttonRefs.current[next]?.focus();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="space-y-3" role="region" aria-label="FAQ answers">
      <AnimatePresence mode="popLayout">
        {items.map((faq, index) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            index={index}
            isOpen={openId === faq.id}
            buttonId={`${baseId}-btn-${faq.id}`}
            panelId={`${baseId}-panel-${faq.id}`}
            buttonRef={(node) => {
              buttonRefs.current[index] = node;
            }}
            onToggle={() =>
              setOpenId((current) => (current === faq.id ? null : faq.id))
            }
            onKeyNavigate={(direction) =>
              focusAt(direction === "down" ? index + 1 : index - 1)
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

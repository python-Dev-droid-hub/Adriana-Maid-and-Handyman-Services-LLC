"use client";

import { CountUp } from "@/components/ui/CountUp";
import { whyChooseUs } from "@/lib/data";

export function WhyTrustStrip() {
  return (
    <div className="glass mx-auto mt-10 max-w-3xl rounded-[28px] border border-white px-5 py-5 shadow-soft sm:mt-12 sm:rounded-full sm:px-6 sm:py-5">
      <ul className="grid grid-cols-1 divide-y divide-navy/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {whyChooseUs.trustStats.map((stat) => (
          <li
            key={stat.id}
            className="flex flex-col items-center px-3 py-3 text-center sm:py-1"
          >
            <p className="font-heading text-2xl font-bold leading-none text-orange sm:text-3xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-xs font-medium text-navy sm:text-sm">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

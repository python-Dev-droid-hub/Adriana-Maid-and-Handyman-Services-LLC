import { Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { company, contactSection } from "@/lib/data";

const publicContactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || company.email;

export function ContactDetails() {
  return (
    <GlassCard className="flex h-full flex-col rounded-card-lg border border-white/90 p-0 shadow-soft-lg sm:p-0">
      <div className="border-b border-navy/8 px-6 py-5 sm:px-7 sm:py-6">
        <h3 className="font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">
          {contactSection.detailsTitle}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-navy/70 sm:text-[0.95rem]">
          {contactSection.detailsIntro}
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <a
          href={company.phoneHref}
          className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-teal/[0.04] sm:px-7"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal">
            <Phone className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
              Phone
            </p>
            <p className="mt-0.5 text-base font-semibold text-navy">
              {company.phoneDisplay}
            </p>
          </div>
        </a>

        <a
          href={company.emailHref}
          className="flex items-center gap-4 border-t border-navy/8 px-6 py-4 transition-colors hover:bg-teal/[0.04] sm:px-7"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal">
            <Mail className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
              Email
            </p>
            <p className="mt-0.5 break-all text-base font-semibold text-navy">
              {publicContactEmail}
            </p>
          </div>
        </a>

        <div className="border-t border-navy/8 px-6 py-4 sm:px-7">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal">
              <Clock className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                Business Hours
              </p>
              <ul className="mt-2 space-y-1.5">
                {company.hours.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <span className="font-medium text-navy">{row.label}</span>
                    <span className="text-right text-navy/70">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-navy/8 bg-gradient-to-br from-[#0B2545] via-[#0E5B6E] to-[#13A89E] px-6 py-5 sm:px-7 sm:py-6">
        <p className="font-heading text-lg font-semibold text-white">
          {contactSection.callCtaTitle}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-white/80">
          {contactSection.callCtaText}
        </p>
        <Button
          href={company.phoneHref}
          variant="primary"
          className="mt-4 w-full rounded-full py-3.5 text-base shadow-[0_12px_30px_-10px_rgba(255,138,61,0.7)]"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {contactSection.callCtaLabel}
        </Button>
      </div>
    </GlassCard>
  );
}

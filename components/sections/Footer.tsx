import Link from "next/link";
import type { ReactNode } from "react";
import { Clock, Mail, Phone } from "lucide-react";
import { FooterSubscribe } from "@/components/footer/FooterSubscribe";
import { FooterWave } from "@/components/footer/FooterWave";
import { LogoMark } from "@/components/icons/LogoMark";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Container } from "@/components/ui/Container";
import { company, footer } from "@/lib/data";

export function Footer() {
  return (
    <SectionReveal
      as="footer"
      id="footer"
      className="section-pad relative overflow-x-clip bg-navy pb-0 text-white"
    >
      <FooterWave />

      <Container className="relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.35fr_0.9fr_0.9fr_1fr_1.35fr] xl:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#hero" className="inline-flex items-center gap-3">
              <LogoMark className="bg-white/10" iconClassName="text-white" />
              <span className="font-heading text-base font-bold leading-tight">
                {company.shortName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              {footer.tagline}
            </p>
          </div>

          <FooterColumn title="Quick Links">
            <ul className="space-y-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Our Services">
            <ul className="space-y-2.5">
              {footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={footer.contactTitle}>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-start gap-3 text-sm text-white/75 transition-colors hover:text-teal"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  <span>{company.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="flex items-start gap-3 text-sm text-white/75 transition-colors hover:text-teal"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  <span className="break-all">{company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/75">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                <span>
                  {company.hours.map((row) => (
                    <span key={row.label} className="block">
                      {row.label}: {row.value}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </FooterColumn>

          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <FooterSubscribe />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 py-6">
          <p className="text-center text-sm text-white/65">
            {footer.copyright} {footer.creditPrefix}{" "}
            <a
              href={footer.creditHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 underline-offset-2 transition-colors hover:text-teal hover:underline"
            >
              {footer.creditLabel}
            </a>
            .
          </p>
        </div>
      </Container>
    </SectionReveal>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

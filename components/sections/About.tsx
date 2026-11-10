import { ArrowRight } from "lucide-react";
import { TeamPhoto } from "@/components/about/TeamPhoto";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/lib/data";

export function About() {
  return (
    <SectionReveal
      id="about"
      aria-label="About"
      className="section-pad scroll-mt-32 overflow-x-clip bg-gradient-to-b from-offwhite via-white to-[#EEF6FF] pb-[clamp(2.75rem,3vw+1rem,4.25rem)] lg:scroll-mt-28"
    >
      <Container>
        <div className="grid items-start gap-7 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <TeamPhoto />

          <div className="flex max-w-xl flex-col lg:max-w-none">
            <SectionHeading
              align="left"
              label={about.label}
              title={about.title}
              subtitle={about.paragraph}
              className="max-w-none"
            />

            <div className="mt-7">
              <Button
                href={about.learnMoreHref}
                variant="primary"
                className="w-full rounded-full px-7 py-3.5 text-base shadow-glow sm:w-auto"
              >
                {about.learnMoreLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </SectionReveal>
  );
}

import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";

export function FaqJsonLd() {
  const jsonLd = buildFaqPageJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

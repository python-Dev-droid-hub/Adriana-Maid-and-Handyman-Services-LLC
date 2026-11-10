import { buildLocalBusinessJsonLd } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

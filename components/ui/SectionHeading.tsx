import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {label ? (
        <span
          className={cn(
            "inline-flex rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide sm:text-sm",
            dark
              ? "border-white/20 bg-white/15 text-white"
              : "border-teal/20 bg-teal/10 text-teal",
          )}
        >
          {label}
        </span>
      ) : null}
      <h2
        className={cn(
          "type-section-title font-bold tracking-tight",
          label ? "mt-3" : "mt-0",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "type-body-lg mt-4 text-pretty",
            dark ? "text-white/80" : "text-navy/70",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

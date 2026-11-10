import { cn } from "@/lib/utils";

type CaredForSwooshProps = {
  className?: string;
};

export function CaredForSwoosh({ className }: CaredForSwooshProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute -bottom-1 left-0 h-3 w-full sm:h-3.5",
        className,
      )}
      viewBox="0 0 176 18"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 11.5C30 4 58 2.5 90 6.5C120 10.2 146 13.5 174 8.5"
        stroke="#FF8A3D"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15C38 11.5 66 12.5 96 13.8C124 15 150 13.2 168 11"
        stroke="#FF8A3D"
        strokeWidth="2.75"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

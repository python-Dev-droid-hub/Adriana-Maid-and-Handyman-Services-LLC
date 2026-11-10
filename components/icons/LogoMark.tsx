import { Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function LogoMark({ className, iconClassName }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-soft",
        className,
      )}
      aria-hidden
    >
      <Home className={cn("h-5 w-5 text-navy", iconClassName)} strokeWidth={2.25} />
      <Sparkles
        className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-teal"
        strokeWidth={2.5}
      />
    </span>
  );
}

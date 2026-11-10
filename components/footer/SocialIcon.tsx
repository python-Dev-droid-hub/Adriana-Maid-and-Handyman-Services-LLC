import type { FooterSocialIcon } from "@/lib/data";
import { cn } from "@/lib/utils";

type SocialIconProps = {
  icon: FooterSocialIcon;
  className?: string;
};

export function SocialIcon({ icon, className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      aria-hidden
      fill="currentColor"
    >
      {icon === "facebook" ? (
        <path d="M13.5 8.5H16V5h-2.5C11.57 5 10 6.74 10 9v2.5H7v3h3V19h3v-6.5h2.6l.4-3H13V9c0-.83.67-1.5 1.5-1.5z" />
      ) : null}
      {icon === "instagram" ? (
        <path d="M8 5h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H8zm4 2.5A4.5 4.5 0 1 1 7.5 14 4.5 4.5 0 0 1 12 9.5zm0 2A2.5 2.5 0 1 0 14.5 14 2.5 2.5 0 0 0 12 11.5zM17.25 7.5a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75z" />
      ) : null}
      {icon === "google" ? (
        <path d="M21.8 12.2c0-.7-.06-1.22-.19-1.75H12v3.18h5.58c-.12.9-.76 2.26-2.18 3.31l-.02.14 3.17 2.45.22.02c2.02-1.86 3.23-4.6 3.23-7.35zM12 21c2.86 0 5.26-.94 7.01-2.57l-3.34-2.57c-.9.62-2.1 1.05-3.67 1.05-2.8 0-5.18-1.89-6.03-4.43l-.13.01-3.27 2.53-.04.12C3.88 18.88 7.6 21 12 21zM5.97 12.67A5.9 5.9 0 0 1 5.73 12c0-.58.1-1.14.24-1.67l-.01-.15-3.31-2.57-.11.05A9.82 9.82 0 0 0 3 12c0 1.58.38 3.08 1.04 4.4l3.93-3.03zM12 6.78c1.99 0 3.34.86 4.1 1.57l2.99-2.93C17.22 3.96 14.86 3 12 3 7.6 3 3.88 5.12 2.04 8.23l3.93 3.03C6.82 8.72 9.2 6.78 12 6.78z" />
      ) : null}
    </svg>
  );
}

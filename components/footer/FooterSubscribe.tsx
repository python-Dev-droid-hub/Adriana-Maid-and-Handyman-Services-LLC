"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { SocialIcon } from "@/components/footer/SocialIcon";
import { company, footer } from "@/lib/data";

export function FooterSubscribe() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent("Newsletter subscribe");
    const body = encodeURIComponent(`Please add me to updates:\n${value}`);
    window.location.href = `${company.emailHref}?subject=${subject}&body=${body}`;
    setStatus("success");
    setEmail("");
  };

  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-white">
        {footer.subscribeTitle}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        {footer.subscribeNote}
      </p>

      <form className="mt-4" onSubmit={onSubmit} noValidate>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-teal/60">
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder={footer.subscribePlaceholder}
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/45"
          />
          <button
            type="submit"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            aria-label={footer.subscribeLabel}
          >
            {status === "success" ? (
              <Check className="h-4 w-4" aria-hidden />
            ) : (
              <ArrowRight className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
        <p className="mt-2 min-h-5 text-xs text-white/65" role="status">
          {status === "success"
            ? footer.subscribeSuccess
            : status === "error"
              ? "Enter a valid email address."
              : ""}
        </p>
      </form>

      <div className="mt-5 flex flex-wrap gap-3">
        {footer.socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-teal hover:bg-teal/20 hover:text-teal"
            aria-label={social.label}
          >
            <SocialIcon icon={social.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}

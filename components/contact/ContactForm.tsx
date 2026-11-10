"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { contactSection, services } from "@/lib/data";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full rounded-card-sm border border-navy/10 bg-white/85 px-4 py-3 text-sm text-navy shadow-soft outline-none transition-[border-color,box-shadow] focus:border-teal focus:ring-2 focus:ring-teal/20";

function readServiceSlugFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  const queryIndex = hash.indexOf("?");
  if (queryIndex === -1) return null;
  return (
    new URLSearchParams(hash.slice(queryIndex + 1))
      .get("service")
      ?.trim()
      .toLowerCase() ?? null
  );
}

function serviceTitleFromSlug(slug: string | null): string | null {
  if (!slug) return null;
  const match = services.find((service) => service.slug === slug);
  return match?.title ?? null;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      message: "",
      companyWebsite: "",
    },
  });

  useEffect(() => {
    const applyServiceFromLocation = () => {
      const slug =
        searchParams.get("service")?.trim().toLowerCase() ??
        readServiceSlugFromHash();
      const title = serviceTitleFromSlug(slug);
      if (!title) return;
      setValue("service", title, { shouldDirty: true, shouldValidate: true });
    };

    applyServiceFromLocation();
    window.addEventListener("hashchange", applyServiceFromLocation);
    return () => window.removeEventListener("hashchange", applyServiceFromLocation);
  }, [searchParams, setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (payload.ok) {
        setSubmitted(true);
        reset();
        return;
      }

      setServerError(payload.error ?? "We could not send your message. Please try again.");
    } catch {
      setServerError("We could not send your message. Please check your connection and try again.");
    }
  };

  if (submitted) {
    return (
      <GlassCard className="rounded-card-lg border border-white/90 p-6 text-center shadow-soft-lg sm:p-8">
        <CheckCircle2 className="mx-auto h-12 w-12 text-teal" aria-hidden />
        <h3 className="mt-4 font-heading text-2xl font-bold text-navy">
          {contactSection.successTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
          {contactSection.successMessage}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="rounded-card-lg border border-white/90 p-6 shadow-soft-lg sm:p-8">
      <h3 className="font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">
        {contactSection.formTitle}
      </h3>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className="hidden" aria-hidden>
          <label htmlFor="companyWebsite">Company website</label>
          <input
            id="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("companyWebsite")}
          />
        </p>

        <Field label="Full Name" id="fullName" error={errors.fullName?.message}>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className={fieldClassName}
            {...register("fullName")}
          />
        </Field>

        <Field label="Phone" id="phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClassName}
            {...register("phone")}
          />
        </Field>

        <Field label="Email" id="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={fieldClassName}
            {...register("email")}
          />
        </Field>

        <Field label="Service" id="service" error={errors.service?.message}>
          <select id="service" className={cn(fieldClassName, "appearance-none")} {...register("service")}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" id="message" error={errors.message?.message}>
          <textarea
            id="message"
            rows={4}
            className={cn(fieldClassName, "resize-y")}
            {...register("message")}
          />
        </Field>

        {serverError ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {serverError}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full rounded-full py-3.5 text-base shadow-glow sm:w-auto"
        >
          {isSubmitting ? "Sending..." : contactSection.submitLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </form>
    </GlassCard>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

import { z } from "zod";
import { services } from "@/lib/data";

const serviceTitles = services.map((service) => service.title) as [string, ...string[]];

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(24, "Phone number is too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  service: z
    .string()
    .min(1, "Please choose a service.")
    .refine(
      (value): value is (typeof serviceTitles)[number] =>
        (serviceTitles as readonly string[]).includes(value),
      "Please choose a service.",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few details about the job.")
    .max(2000, "Message is too long."),
  companyWebsite: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactApiSchema = contactFormSchema.extend({
  companyWebsite: z.string().optional(),
});

const emailLike = z.string().trim().email();
const phoneLike = z
  .string()
  .trim()
  .regex(/^[\d\s+().-]{7,24}$/, "Enter a valid phone or email.");

export const quoteRequestSchema = z.object({
  source: z.literal("cta-quote"),
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  contact: z
    .string()
    .trim()
    .min(5, "Enter a phone number or email.")
    .max(120, "That looks too long.")
    .refine(
      (value) => emailLike.safeParse(value).success || phoneLike.safeParse(value).success,
      "Enter a valid phone number or email.",
    ),
  services: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one service.")
    .max(5),
  companyWebsite: z.string().optional(),
});

export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;

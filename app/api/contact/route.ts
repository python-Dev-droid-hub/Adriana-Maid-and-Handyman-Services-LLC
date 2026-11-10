import { Resend } from "resend";
import { NextResponse } from "next/server";
import { company } from "@/lib/data";
import { contactApiSchema, quoteRequestSchema } from "@/lib/validations/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const quoteParsed = quoteRequestSchema.safeParse(json);
  if (quoteParsed.success) {
    if (quoteParsed.data.companyWebsite?.trim()) {
      return NextResponse.json({ ok: true as const });
    }

    const { RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL } = process.env;

    if (!RESEND_API_KEY || !CONTACT_EMAIL) {
      return NextResponse.json(
        { error: "Contact form is not configured yet. Please call us directly." },
        { status: 503 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const from =
      RESEND_FROM_EMAIL ?? `${company.shortName} <onboarding@resend.dev>`;
    const { fullName, contact, services } = quoteParsed.data;
    const isEmail = contact.includes("@");

    const { error } = await resend.emails.send({
      from,
      to: CONTACT_EMAIL,
      replyTo: isEmail ? contact : undefined,
      subject: `Website quote request — ${fullName}`,
      text: [
        "New free quote request from the site CTA.",
        "",
        `Name: ${fullName}`,
        `${isEmail ? "Email" : "Phone"}: ${contact}`,
        `Services: ${services.join(", ")}`,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        { error: "We could not send your request. Please try calling us instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true as const });
  }

  const parsed = contactApiSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite?.trim()) {
    return NextResponse.json({ ok: true as const });
  }

  const { RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please call us directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const from =
    RESEND_FROM_EMAIL ?? `${company.shortName} <onboarding@resend.dev>`;

  const { fullName, phone, email, service, message } = parsed.data;

  const text = [
    `New message from ${fullName}`,
    "",
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service: ${service}`,
    "",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Website contact — ${service} (${fullName})`,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: "We could not send your message. Please try calling us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const });
}

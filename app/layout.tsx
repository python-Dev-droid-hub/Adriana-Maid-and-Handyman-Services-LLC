import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { MotionShell } from "@/components/motion/MotionShell";
import { MobileFloatingActions } from "@/components/ui/MobileFloatingActions";
import { company } from "@/lib/data";
import { defaultDescription, defaultTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B2545",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${company.shortName}`,
  },
  description: defaultDescription,
  applicationName: company.shortName,
  keywords: [
    "maid service Park City",
    "handyman Park City",
    "home cleaning Utah",
    "garage door repair",
    "hedge trimming",
    "Adriana Maid and Handyman",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: company.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: company.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og-cover.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LocalBusinessJsonLd />
        <MotionShell>
          {children}
          <MobileFloatingActions />
        </MotionShell>
      </body>
    </html>
  );
}

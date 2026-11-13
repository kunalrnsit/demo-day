import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Your live address. Used for share previews (WhatsApp, LinkedIn).
// Change it when you move to your own domain.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://demo-day-ruby.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Startup Karna Hai (SKH) | Build, pitch and raise",
  description:
    "Startup Karna Hai helps early-stage founders build, pitch and raise, with a network of investors, investment bankers and IIT, IIM and ISB alumni.",
  applicationName: "Startup Karna Hai",
  openGraph: {
    type: "website",
    siteName: "Startup Karna Hai",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

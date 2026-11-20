import type { MetadataRoute } from "next";
import { SESSIONS } from "@/lib/sessions";

// Tells Google which pages the site has.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://demo-day-ruby.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/demo-day", priority: 0.9, changeFrequency: "weekly" },
    { path: "/collab", priority: 0.7, changeFrequency: "weekly" },
    { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
    { path: "/sessions", priority: 0.8, changeFrequency: "weekly" },
    { path: "/community", priority: 0.7, changeFrequency: "monthly" },
    { path: "/register", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/refund", priority: 0.2, changeFrequency: "yearly" },
  ];

  for (const s of SESSIONS) pages.push({ path: `/sessions/${s.slug}`, priority: 0.6, changeFrequency: "monthly" });

  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

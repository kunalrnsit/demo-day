import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://demo-day-ruby.vercel.app";

// Lets search engines read the public site, and keeps them out of admin and API routes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/round-2"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

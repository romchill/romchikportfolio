export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, localePath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${site.url}${localePath(locale)}`]),
  );

  return locales.map((locale) => ({
    url: `${site.url}${localePath(locale)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "ru" ? 1 : 0.8,
    alternates: { languages },
  }));
}

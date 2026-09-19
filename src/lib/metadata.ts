import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";

export const siteViewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/** Метаданные страницы для локали: русская в корне, английская в /en/ */
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = localePath(locale);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: path,
      languages: {
        ru: localePath("ru"),
        en: localePath("en"),
        "x-default": localePath("ru"),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: path,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Romchik — Telegram Mini Apps",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/opengraph-image.png"],
    },
  };
}

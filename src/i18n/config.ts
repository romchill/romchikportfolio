export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Адрес главной для локали: русская живёт в корне, английская — в /en/ */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { ru, type Dictionary } from "./dictionaries/ru";

const dictionaries: Record<Locale, Dictionary> = { ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";

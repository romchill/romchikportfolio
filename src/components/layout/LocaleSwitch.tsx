import { localeNames, localePath, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Переключатель RU / EN. Обычные ссылки, а не next/link: смена языка
 * меняет lang у документа, и полная перезагрузка тут честнее.
 */
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div
      className="glass flex items-center rounded-full p-1 font-mono text-[11px] tracking-[0.12em]"
      aria-label={label}
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <a
            key={item}
            href={localePath(item)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors duration-300",
              active ? "text-chalk bg-white/10" : "text-faint hover:text-muted",
            )}
          >
            {localeNames[item]}
          </a>
        );
      })}
    </div>
  );
}

import type { ReactNode } from "react";
import { Inter, Unbounded } from "next/font/google";
import { Background } from "./Background";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Preloader } from "./Preloader";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Общая оболочка страницы. У русской и английской версий свои корневые
 * layout-файлы — иначе не получилось бы держать русскую в корне сайта, —
 * а вся начинка живёт здесь, в одном месте.
 */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      // Инлайн-скрипт ниже дописывает класс rp-skip до гидратации
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element --
          правило про Pages Router; в App Router <head> в корневом
          layout — штатный способ, а скрипт обязан выполниться до отрисовки */}
      <head>
        {/* Прелоадер показываем один раз за сессию — без мигания при переходах */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('rp-seen')==='1')document.documentElement.classList.add('rp-skip')}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          {dict.a11y.skip}
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: `${site.url}${localePath(locale)}`,
              jobTitle:
                locale === "ru" ? "Разработчик Telegram Mini Apps" : "Telegram Mini Apps developer",
              description: dict.meta.description,
              sameAs: [site.telegram],
              knowsAbout: [
                "Telegram Mini Apps",
                "Telegram Bots",
                "TypeScript",
                "React",
                "Node.js",
                "Python",
                "PostgreSQL",
                "Docker",
              ],
            }),
          }}
        />

        <Preloader label={dict.preloader.label} />
        <Background />
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex flex-1 flex-col pt-16 md:pt-20">
          {children}
        </main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}

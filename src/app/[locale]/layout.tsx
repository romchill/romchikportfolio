import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Background } from "@/components/layout/Background";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { site } from "@/content/site";
import { getDictionary, isLocale, locales } from "@/i18n";

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

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: "/ru", en: "/en", "x-default": "/ru" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: `/${locale}`,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      // Инлайн-скрипт ниже дописывает класс rp-skip до гидратации
      suppressHydrationWarning
    >
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
        <a
          href="#main"
          className="skip-link"
        >
          {dict.a11y.skip}
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: `${site.url}/${locale}`,
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

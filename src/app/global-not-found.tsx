import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { getDictionary, defaultLocale } from "@/i18n";

// Файл в обход layout: стили и шрифты подключаем здесь сами
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

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: `404 — ${dict.notFound.title}`,
  description: dict.notFound.text,
};

export default function GlobalNotFound() {
  return (
    <html
      lang={defaultLocale}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="bg-void flex min-h-full flex-col justify-center px-5 md:px-8">
        <div className="mx-auto w-full max-w-[1240px]">
          <p className="font-display text-[min(30vw,220px)] leading-none font-black tracking-tighter text-white/10">
            404
          </p>
          <h1 className="font-display text-chalk mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            {dict.notFound.title}
          </h1>
          <p className="text-muted mt-5 max-w-md text-[15px] leading-relaxed">
            {dict.notFound.text}
          </p>
          <a
            href={`/${defaultLocale}`}
            className="bg-chalk text-void mt-9 inline-flex h-14 items-center rounded-full px-7 text-[15px] font-medium transition-colors duration-300 hover:bg-white/90"
          >
            {dict.notFound.cta}
          </a>
        </div>
      </body>
    </html>
  );
}

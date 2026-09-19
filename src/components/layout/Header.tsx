"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LocaleSwitch } from "./LocaleSwitch";
import type { Dictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { locale: Locale; dict: Dictionary };

export function Header({ locale, dict }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#cases", label: dict.nav.cases },
    { href: "#process", label: dict.nav.process },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? // На телефоне сплошной фон вместо размытия: backdrop-filter
              // заставляет перерисовывать шапку на каждый кадр прокрутки
              "bg-void/95 md:bg-void/70 border-b border-white/[0.07] md:backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between md:h-20">
          <a
            href={localePath(locale)}
            className="group font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            {site.name.toLowerCase()}
            <span className="bg-chalk ml-0.5 inline-block size-1.5 rounded-full align-baseline transition-transform duration-300 group-hover:scale-150" />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-chalk relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LocaleSwitch locale={locale} label={dict.a11y.switchLanguage} />

            <Button href={site.telegram} size="sm" className="hidden md:inline-flex" magnetic>
              <Send className="size-3.5" aria-hidden />
              {dict.cta.write}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.a11y.openMenu}
              className="glass text-chalk flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/[0.08] md:hidden"
            >
              <Menu className="size-4" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="bg-void/95 fixed inset-0 z-[60] flex flex-col backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <Container className="flex h-16 items-center justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={dict.a11y.closeMenu}
                className="glass text-chalk flex size-9 items-center justify-center rounded-full"
              >
                <X className="size-4" aria-hidden />
              </button>
            </Container>

            <Container className="flex flex-1 flex-col justify-center gap-2 pb-24">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.05, duration: 0.5, ease: easeOutExpo }}
                  className="font-display text-chalk/90 active:text-muted text-4xl font-bold tracking-tight transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: easeOutExpo }}
                className="mt-10"
              >
                <Button href={site.telegram} size="lg" className="w-full">
                  <Send className="size-4" aria-hidden />
                  {dict.cta.write}
                </Button>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

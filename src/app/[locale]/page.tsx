import { ArrowUpRight, Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { getDictionary, isLocale } from "@/i18n";
import { notFound } from "next/navigation";

// Временная витрина Шага 3: показывает шрифты, стекло, кнопки и анимации.
// На Шаге 4 её место займёт настоящий Hero.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <Container className="flex flex-1 flex-col justify-center py-20 md:py-28">
      <Reveal>
        <Badge pulse>{dict.preview.eyebrow}</Badge>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="font-display mt-8 text-[13vw] leading-[0.95] font-black tracking-tighter md:text-[9vw]">
          <span className="block">Romchik</span>
          <span className="text-stroke block">{dict.preview.title}</span>
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="text-muted mt-8 max-w-md text-[15px] leading-relaxed">{dict.preview.text}</p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={site.telegram} size="lg" magnetic>
            <Send className="size-4" aria-hidden />
            {dict.cta.order}
          </Button>
          <Button href={site.github} variant="ghost" size="lg">
            GitHub
            <ArrowUpRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <dl className="mt-16 grid gap-3 sm:grid-cols-3">
          {[
            ["void", "#000000"],
            ["chalk", "#FFFFFF"],
            ["muted", "#A8A8A8"],
          ].map(([name, hex]) => (
            <div
              key={name}
              className="glass edge-light flex items-center justify-between rounded-2xl px-5 py-4 font-mono text-xs"
            >
              <dt className="text-faint">{name}</dt>
              <dd className="text-chalk">{hex}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Container>
  );
}

import { ArrowDown, Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, cta } = dict;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 md:min-h-[calc(100svh-5rem)] md:py-20">
      <Container>
        <Reveal>
          <Badge pulse>{hero.badge}</Badge>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display mt-8 text-[min(12.5vw,170px)] leading-[0.92] font-black tracking-tighter md:mt-10">
            <span className="block">{hero.line1}</span>
            <span className="text-stroke block">{hero.line2}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-faint mt-5 font-mono text-[10px] tracking-[0.3em] uppercase md:text-xs">
            {hero.tagline}
          </p>
        </Reveal>

        <div className="mt-12 grid max-w-4xl gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
          <Reveal delay={0.2}>
            <p className="text-muted text-[15px] leading-relaxed md:text-base">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="text-muted text-[15px] leading-relaxed md:text-base">{hero.lead2}</p>
          </Reveal>
        </div>

        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={site.telegram} size="lg" magnetic>
              <Send className="size-4" aria-hidden />
              {cta.order}
            </Button>
            <Button href="#cases" variant="ghost" size="lg">
              {cta.cases}
              <ArrowDown className="size-4" aria-hidden />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 md:mt-20">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="bg-void px-6 py-7">
                <dt className="font-display text-chalk text-2xl font-bold tracking-tight md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="text-faint mt-2 text-[13px] leading-relaxed">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

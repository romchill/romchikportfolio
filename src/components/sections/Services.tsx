import { Bot, Database, Rocket, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Dictionary } from "@/i18n";

const icons: Record<string, LucideIcon> = {
  app: Smartphone,
  bot: Bot,
  server: Database,
  ai: Sparkles,
  deploy: Rocket,
};

export function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;

  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionTitle
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />

        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
          {services.items.map((item, index) => {
            const Icon = icons[item.icon] ?? Smartphone;

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="glass edge-light h-full rounded-3xl p-7 transition-colors duration-500 hover:border-white/25 md:p-9">
                  <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <Icon className="text-chalk size-5" aria-hidden />
                  </span>

                  <h3 className="font-display mt-6 text-xl font-bold tracking-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-muted mt-4 text-sm leading-relaxed md:text-[15px]">
                    {item.text}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-7">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-faint flex gap-3 text-[13px] leading-relaxed"
                      >
                        <span
                          className="mt-[7px] size-1 shrink-0 rounded-full bg-white/35"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

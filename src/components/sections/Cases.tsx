import { ArrowUpRight } from "lucide-react";
import { PhoneMockup } from "@/components/cases/PhoneMockup";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export function Cases({ dict }: { dict: Dictionary }) {
  const { cases, mockups } = dict;

  return (
    <section id="cases" className="scroll-mt-24 border-t border-white/10 py-24 md:py-32">
      <Container>
        <SectionTitle eyebrow={cases.eyebrow} title={cases.title} description={cases.description} />

        <div className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-32">
          {cases.items.map((item, index) => {
            const project = projects.find((entry) => entry.slug === item.slug);
            if (!project) return null;

            const isShop = item.slug === "promt-shop";
            const flipped = index % 2 === 1;

            return (
              <article
                key={item.slug}
                className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
              >
                <Reveal
                  className={cn("flex justify-center", flipped && "lg:order-2")}
                  distance={36}
                >
                  <PhoneMockup
                    app={isShop ? "promt-shop" : "podsekay"}
                    labels={isShop ? mockups.promtShop : mockups.podsekay}
                    appName={item.title}
                  />
                </Reveal>

                <div>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-faint text-sm font-bold tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="text-faint font-mono text-[11px]">{project.year}</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <h3 className="font-display mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="text-muted mt-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                      {item.tagline}
                    </p>
                  </Reveal>

                  <Reveal delay={0.12}>
                    <p className="text-muted mt-6 text-[15px] leading-relaxed md:text-base">
                      {item.text}
                    </p>
                  </Reveal>

                  <Reveal delay={0.18}>
                    <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-faint flex gap-3 text-[13px] leading-relaxed md:text-sm"
                        >
                          <span
                            className="mt-[7px] size-1 shrink-0 rounded-full bg-white/35"
                            aria-hidden
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.24}>
                    <div className="mt-8">
                      <p className="text-faint font-mono text-[10px] tracking-[0.18em] uppercase">
                        {cases.stackLabel}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="text-muted hover:text-chalk rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] transition-colors duration-300 hover:border-white/30"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Button href={project.url} size="md" magnetic>
                        {cases.openInTelegram}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </Button>
                      <span className="text-faint font-mono text-[12px]">{project.handle}</span>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

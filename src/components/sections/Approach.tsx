import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Dictionary } from "@/i18n";

export function Approach({ dict }: { dict: Dictionary }) {
  const { approach } = dict;

  return (
    <section id="process" className="scroll-mt-24 border-t border-white/10 py-24 md:py-32">
      <Container>
        <SectionTitle eyebrow={approach.eyebrow} title={approach.title} />

        <div className="mt-14 grid gap-14 md:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="space-y-6">
            {approach.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
                <p className="text-muted text-[15px] leading-[1.85] md:text-base">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <ol className="divide-y divide-white/10 border-y border-white/10">
            {approach.points.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05}>
                <li className="flex gap-5 py-6 md:gap-7 md:py-7">
                  <span className="font-display text-faint text-sm font-bold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold tracking-tight md:text-lg">
                      {point.title}
                    </h3>
                    <p className="text-muted mt-2.5 text-[13px] leading-relaxed md:text-sm">
                      {point.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

import { Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CopyHandle } from "@/components/ui/CopyHandle";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-28 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[150px]"
      />

      <Container className="relative">
        <Reveal>
          <p className="text-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            {contact.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display mt-6 text-[min(10vw,138px)] leading-[0.95] font-black tracking-tighter">
            <span className="block">{contact.line1}</span>
            <span className="text-stroke block">{contact.line2}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid max-w-4xl gap-6 md:mt-14 md:grid-cols-2 md:gap-10">
          <Reveal delay={0.12}>
            <p className="text-muted text-[15px] leading-relaxed md:text-base">{contact.text}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-muted text-[15px] leading-relaxed md:text-base">{contact.text2}</p>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button href={site.telegram} size="lg" magnetic>
              <Send className="size-4" aria-hidden />
              {contact.cta}
            </Button>

            <CopyHandle
              value={site.telegramHandle}
              copyLabel={contact.copy}
              copiedLabel={contact.copied}
            />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Badge pulse>{contact.badge}</Badge>
            <span className="text-faint font-mono text-[11px] tracking-[0.14em] uppercase">
              {contact.handleLabel}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

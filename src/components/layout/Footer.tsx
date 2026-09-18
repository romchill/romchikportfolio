import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";
import { ToTop } from "./ToTop";

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-8 md:py-10">
      <Container className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-base font-bold tracking-tight">
            {site.name.toLowerCase()}
            <span className="bg-chalk ml-0.5 inline-block size-1.5 rounded-full align-baseline" />
          </span>
          <span className="text-faint font-mono text-[11px]">© {year}</span>
        </div>

        <p className="text-faint font-mono text-[11px]">{dict.footer.built}</p>

        <ToTop label={dict.footer.toTop} />
      </Container>
    </footer>
  );
}

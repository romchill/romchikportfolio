import { locale as rootLocale } from "next/root-params";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary, isLocale, defaultLocale } from "@/i18n";

export default async function NotFound() {
  const value = await rootLocale();
  const current = value && isLocale(value) ? value : defaultLocale;
  const dict = getDictionary(current);

  return (
    <section className="flex flex-1 items-center py-28">
      <Container>
        <p className="font-display text-[min(30vw,220px)] leading-none font-black tracking-tighter text-white/10">
          404
        </p>
        <h1 className="font-display mt-6 text-3xl font-bold tracking-tight md:text-5xl">
          {dict.notFound.title}
        </h1>
        <p className="text-muted mt-5 max-w-md text-[15px] leading-relaxed">{dict.notFound.text}</p>
        <div className="mt-9">
          <Button href={`/${current}`} size="lg" magnetic>
            {dict.notFound.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}

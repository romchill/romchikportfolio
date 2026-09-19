import { Approach } from "@/components/sections/Approach";
import { Cases } from "@/components/sections/Cases";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function Landing({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <Marquee />
      <Services dict={dict} />
      <Cases dict={dict} />
      <Approach dict={dict} />
      <Contact dict={dict} />
    </>
  );
}

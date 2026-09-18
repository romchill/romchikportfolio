import { notFound } from "next/navigation";
import { Approach } from "@/components/sections/Approach";
import { Cases } from "@/components/sections/Cases";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { getDictionary, isLocale } from "@/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

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

import { stackRowOne, stackRowTwo } from "@/content/stack";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex min-w-max shrink-0">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={`marquee-track flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12 ${
            reverse
              ? "animate-[marquee-reverse_52s_linear_infinite]"
              : "animate-[marquee_46s_linear_infinite]"
          }`}
        >
          {items.map((item) => (
            <li
              key={item}
              className="text-faint hover:text-chalk flex shrink-0 items-center gap-8 font-mono text-sm whitespace-nowrap transition-colors duration-300 md:gap-12 md:text-base"
            >
              {item}
              <span className="size-1 rounded-full bg-white/20" aria-hidden />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Бесконечная лента стека в две стороны */
export function Marquee() {
  return (
    <section
      aria-label="Stack"
      className="marquee relative overflow-hidden border-y border-white/10 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] py-6 md:py-8"
    >
      <div className="flex flex-col gap-5 md:gap-7">
        <Row items={stackRowOne} />
        <Row items={stackRowTwo} reverse />
      </div>
    </section>
  );
}

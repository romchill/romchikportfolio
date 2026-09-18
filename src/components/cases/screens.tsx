import { Search, Star, Timer } from "lucide-react";
import type { PhoneScreen } from "./PhoneMockup";
import type { Dictionary } from "@/i18n";

type PromtShop = Dictionary["mockups"]["promtShop"];
type Podsekay = Dictionary["mockups"]["podsekay"];

const card = "rounded-xl border border-white/10 bg-white/[0.035] p-2.5";

/** Экраны мокапа «Магазин промтов»: каталог и карточка товара */
export function promtShopScreens(m: PromtShop): PhoneScreen[] {
  return [
    {
      id: "catalog",
      title: m.catalog,
      mainButton: m.mainCatalog,
      content: (
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-2.5 py-2">
            <Search className="text-faint size-3 shrink-0" aria-hidden />
            <span className="text-faint text-[9px]">{m.search}</span>
          </div>

          <div className="flex gap-1.5">
            {m.chips.map((chip, index) => (
              <span
                key={chip}
                className={
                  index === 1
                    ? "bg-chalk text-void rounded-full px-2 py-[3px] text-[8px] font-semibold"
                    : "text-faint rounded-full border border-white/12 px-2 py-[3px] text-[8px]"
                }
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {m.items.map((item) => (
              <div key={item.title} className={card}>
                <p className="text-chalk text-[10px] leading-snug font-semibold">{item.title}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-faint text-[8px]">{item.meta}</span>
                  <span className="text-chalk flex items-center gap-0.5 text-[9px] font-semibold">
                    <Star className="fill-chalk size-2.5" aria-hidden />
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "item",
      title: m.item,
      mainButton: m.mainItem,
      content: (
        <div className="flex h-full flex-col gap-2.5">
          <span className="text-muted w-fit rounded-full border border-white/15 px-2 py-[3px] text-[8px]">
            {m.itemBadge}
          </span>
          <p className="text-chalk text-[12px] leading-snug font-bold">{m.items[0].title}</p>
          <p className="text-muted text-[9px] leading-relaxed">{m.itemText}</p>

          <div className="mt-auto rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-faint text-[8px] tracking-[0.12em] uppercase">
                {m.priceLabel}
              </span>
              <span className="text-chalk flex items-center gap-1 text-[13px] font-bold">
                <Star className="fill-chalk size-3" aria-hidden />
                {m.items[0].price}
              </span>
            </div>
            <p className="text-faint mt-1.5 text-[8px]">{m.bought}</p>
          </div>
        </div>
      ),
    },
  ];
}

/** Экраны мокапа Podsekay: трекер сессии и таймеры */
export function podsekayScreens(m: Podsekay): PhoneScreen[] {
  const stats = [
    { label: m.session, value: "01:47" },
    { label: m.weight, value: "24.6" },
    { label: m.bait, value: "340" },
  ];

  const progress = ["62%", "18%", "84%"];

  return [
    {
      id: "tracker",
      title: m.tracker,
      mainButton: m.mainTracker,
      content: (
        <div className="flex h-full flex-col gap-2.5">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-center">
            <p className="font-display text-chalk text-2xl leading-none font-black tabular-nums">
              12 840
            </p>
            <p className="text-faint mt-1.5 text-[8px] tracking-[0.15em] uppercase">{m.rate}</p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/[0.04] px-2 py-1.5 text-center">
                <p className="text-chalk text-[10px] font-semibold tabular-nums">{stat.value}</p>
                <p className="text-faint mt-0.5 text-[7px]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-faint text-[8px] tracking-[0.12em] uppercase">{m.lastCatch}</p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {m.catches.map((fish) => (
                <div
                  key={fish.name}
                  className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-[7px]"
                >
                  <span className="text-chalk text-[9px] font-medium">{fish.name}</span>
                  <span className="text-faint text-[8px]">{fish.weight}</span>
                  <span className="text-chalk text-[9px] tabular-nums">{fish.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "timers",
      title: m.timers,
      mainButton: m.mainTimers,
      content: (
        <div className="flex h-full flex-col gap-2">
          {m.timerItems.map((item, index) => (
            <div key={item.name} className={card}>
              <div className="flex items-center justify-between">
                <span className="text-chalk flex items-center gap-1.5 text-[10px] font-medium">
                  <Timer className="text-faint size-3" aria-hidden />
                  {item.name}
                </span>
                <span className="text-chalk text-[10px] font-semibold tabular-nums">
                  {item.left}
                </span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div
                  style={{ width: progress[index] }}
                  className="bg-chalk h-1 rounded-full transition-all duration-700"
                />
              </div>
            </div>
          ))}

          <p className="text-faint mt-auto text-[8px] leading-relaxed">{m.timersHint}</p>
        </div>
      ),
    },
  ];
}

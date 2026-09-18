"use client";

import type { ReactNode } from "react";
import { ChevronRight, ImageUp, Search, Sparkles, Star, Timer } from "lucide-react";
import type { PhoneScreen } from "./PhoneMockup";
import type { Dictionary } from "@/i18n";

export type AppKey = "promt-shop" | "podsekay";

type PromtShop = Dictionary["mockups"]["promtShop"];
type Podsekay = Dictionary["mockups"]["podsekay"];

export type MockupLabels = PromtShop | Podsekay;

export function buildScreens(app: AppKey, labels: MockupLabels): PhoneScreen[] {
  return app === "promt-shop"
    ? promtShopScreens(labels as PromtShop)
    : podsekayScreens(labels as Podsekay);
}

/* ─────────────────────────── мелкие кирпичики ─────────────────────────── */

function Title({ children }: { children: ReactNode }) {
  return <h3 className="text-chalk text-[13px] leading-tight font-bold">{children}</h3>;
}

function Tap({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "block w-full text-left transition-transform duration-200 active:scale-[0.97] " + className
      }
    >
      {children}
    </button>
  );
}

const CARD = "rounded-xl border border-white/10 bg-white/[0.05]";

/* ─────────────────────────── магазин промтов ─────────────────────────── */

function promtShopScreens(m: PromtShop): PhoneScreen[] {
  return [
    {
      id: "catalog",
      title: m.screens.catalog,
      mainButton: m.mainCatalog,
      onMain: "product",
      content: (go) => (
        <div className="flex h-full flex-col gap-2">
          <Title>{m.screens.catalog}</Title>

          <Tap onClick={() => go("generate")}>
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] px-2.5 py-[7px]">
              <Search className="text-faint size-3 shrink-0" aria-hidden />
              <span className="text-faint text-[9px]">{m.search}</span>
            </div>
          </Tap>

          <div className="flex gap-1.5 overflow-hidden">
            {m.chips.map((chip, index) => (
              <span
                key={chip}
                className={
                  index === 1
                    ? "bg-chalk text-void shrink-0 rounded-full px-2 py-[3px] text-[8px] font-semibold"
                    : "text-muted shrink-0 rounded-full bg-white/[0.07] px-2 py-[3px] text-[8px]"
                }
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {m.tiles.map((tile) => (
              <Tap key={tile.title} onClick={() => go("product")}>
                <div className="flex h-full flex-col rounded-xl bg-white/[0.06] p-1.5">
                  <div className="flex items-start justify-between">
                    <span className="text-[13px] leading-none" aria-hidden>
                      {tile.emoji}
                    </span>
                    <span className="text-chalk flex items-center gap-[2px] rounded-full bg-black/40 px-1.5 py-[2px] text-[7px] font-semibold">
                      <Star className="fill-chalk size-2" aria-hidden />
                      {tile.price}
                    </span>
                  </div>
                  <p className="text-chalk mt-1.5 line-clamp-2 text-[8.5px] leading-snug font-semibold">
                    {tile.title}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-1.5">
                    <span className="text-faint truncate text-[6.5px]">{tile.models}</span>
                    <span className="text-muted shrink-0 text-[6.5px]">★ {tile.rating}</span>
                  </div>
                </div>
              </Tap>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "product",
      title: m.screens.product,
      mainButton: m.product.main,
      back: "catalog",
      onMain: "hub",
      content: () => (
        <div className="flex h-full flex-col gap-2">
          <Title>{m.tiles[0].title}</Title>
          <p className="text-muted text-[9px] leading-relaxed">{m.product.summary}</p>

          <div className="flex flex-wrap gap-1">
            {m.product.tags.map((tag) => (
              <span
                key={tag}
                className="text-muted rounded-full border border-white/12 px-1.5 py-[2px] text-[7px]"
              >
                {tag}
              </span>
            ))}
            <span className="text-muted rounded-full border border-white/12 px-1.5 py-[2px] text-[7px]">
              {m.product.rating}
            </span>
          </div>

          <div className={CARD + " mt-0.5 p-2"}>
            <p className="text-faint text-[7px] tracking-[0.12em] uppercase">
              {m.product.previewLabel}
            </p>
            <p className="text-chalk/80 mt-1.5 text-[8.5px] leading-relaxed">{m.product.preview}</p>
          </div>

          <p className="text-faint mt-auto text-[7.5px]">{m.product.note}</p>
        </div>
      ),
    },
    {
      id: "hub",
      title: m.screens.hub,
      mainButton: m.hub.main,
      back: "catalog",
      onMain: "catalog",
      content: (go) => (
        <div className="flex h-full flex-col gap-2">
          <Title>{m.screens.hub}</Title>

          <div className="flex flex-col gap-1.5">
            {m.hub.rows.map((row, index) => (
              <Tap key={row.title} onClick={() => go(index === 1 ? "generate" : "product")}>
                <div className={CARD + " flex items-center gap-2 px-2.5 py-2"}>
                  <div className="min-w-0 flex-1">
                    <p className="text-chalk truncate text-[9.5px] font-semibold">{row.title}</p>
                    <p className="text-faint truncate text-[7.5px]">{row.subtitle}</p>
                  </div>
                  <ChevronRight className="text-faint size-3 shrink-0" aria-hidden />
                </div>
              </Tap>
            ))}
          </div>

          <p className="text-faint mt-1 text-[7px] tracking-[0.12em] uppercase">
            {m.hub.docsLabel}
          </p>
          <div className={CARD + " flex items-center gap-2 px-2.5 py-2"}>
            <div className="min-w-0 flex-1">
              <p className="text-chalk truncate text-[9.5px] font-semibold">{m.hub.docs.title}</p>
              <p className="text-faint truncate text-[7.5px]">{m.hub.docs.subtitle}</p>
            </div>
            <ChevronRight className="text-faint size-3 shrink-0" aria-hidden />
          </div>
        </div>
      ),
    },
    {
      id: "generate",
      title: m.screens.generate,
      mainButton: m.generate.main,
      back: "hub",
      onMain: "product",
      content: () => (
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="text-chalk size-3 shrink-0" aria-hidden />
            <Title>{m.screens.generate}</Title>
          </div>
          <p className="text-muted text-[8.5px] leading-relaxed">{m.generate.hint}</p>

          <div className={CARD + " h-[88px] p-2"}>
            <p className="text-faint text-[8.5px] leading-relaxed">{m.generate.placeholder}</p>
          </div>

          <p className="text-faint text-[7px] tracking-[0.12em] uppercase">
            {m.generate.categoryLabel}
          </p>
          <div className="flex gap-1.5">
            {m.generate.chips.map((chip, index) => (
              <span
                key={chip}
                className={
                  index === 0
                    ? "bg-chalk text-void rounded-full px-2 py-[3px] text-[8px] font-semibold"
                    : "text-muted rounded-full bg-white/[0.07] px-2 py-[3px] text-[8px]"
                }
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="text-faint mt-auto text-[7.5px]">{m.generate.note}</p>
        </div>
      ),
    },
  ];
}

/* ─────────────────────────── помощник рыбака ─────────────────────────── */

function podsekayScreens(m: Podsekay): PhoneScreen[] {
  return [
    {
      id: "home",
      title: m.screens.home,
      mainButton: m.home.main,
      onMain: "tracker",
      content: (go) => (
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center justify-between rounded-xl bg-white/[0.06] px-2.5 py-1.5">
            <span className="text-faint text-[8px]">
              {m.home.levelLabel}{" "}
              <span className="text-chalk text-[10px] font-semibold">{m.home.level}</span>
            </span>
            <span className="text-faint text-[8px]">
              {m.home.silverLabel}{" "}
              <span className="text-chalk text-[10px] font-semibold tabular-nums">
                {m.home.silver}
              </span>
            </span>
          </div>

          <div className={CARD + " px-2.5 py-2.5 text-center"}>
            <p className="font-display text-chalk text-xl leading-none font-black tabular-nums">
              {m.home.gameTime}
            </p>
            <p className="text-faint mt-1 text-[7px] tracking-[0.14em] uppercase">
              {m.home.gameTimeLabel}
            </p>
            <p className="text-faint mt-1.5 text-[7.5px]">
              {m.home.realTimeLabel} {m.home.realTime}
            </p>
          </div>

          <Tap onClick={() => go("timers")}>
            <div className={CARD + " flex items-center gap-2 px-2.5 py-2"}>
              <div className="min-w-0 flex-1">
                <p className="text-chalk truncate text-[9.5px] font-semibold">{m.home.planTitle}</p>
                <p className="text-faint truncate text-[7.5px]">{m.home.planNote}</p>
              </div>
              <span className="bg-chalk text-void shrink-0 rounded-full px-1.5 py-[2px] text-[7px] font-bold">
                {m.home.planBadge}
              </span>
            </div>
          </Tap>

          <p className="text-faint mt-0.5 text-[7px] tracking-[0.12em] uppercase">
            {m.home.recentLabel}
          </p>
          <div className="flex flex-col gap-1.5">
            {m.home.recent.map((item) => (
              <Tap key={item.place} onClick={() => go("tracker")}>
                <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-[7px]">
                  <span className="text-chalk truncate text-[8.5px]">{item.place}</span>
                  <span className="text-faint shrink-0 text-[7.5px]">{item.time}</span>
                  <span className="text-chalk shrink-0 text-[8.5px] tabular-nums">{item.rate}</span>
                </div>
              </Tap>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "tracker",
      title: m.screens.tracker,
      mainButton: m.tracker.main,
      back: "home",
      onMain: "add",
      content: (go) => (
        <div className="flex h-full flex-col gap-2">
          <div className={CARD + " px-2.5 py-2.5 text-center"}>
            <p className="font-display text-chalk text-2xl leading-none font-black tabular-nums">
              {m.tracker.rate}
            </p>
            <p className="text-faint mt-1.5 text-[7px] tracking-[0.14em] uppercase">
              {m.tracker.rateLabel}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {m.tracker.stats.map((stat) => (
              <Tap key={stat.label} onClick={() => go("timers")}>
                <div className="rounded-lg bg-white/[0.05] px-1.5 py-1.5 text-center">
                  <p className="text-chalk text-[10px] font-semibold tabular-nums">{stat.value}</p>
                  <p className="text-faint mt-0.5 text-[6.5px]">{stat.label}</p>
                </div>
              </Tap>
            ))}
          </div>

          <p className="text-faint mt-0.5 text-[7px] tracking-[0.12em] uppercase">
            {m.tracker.catchLabel}
          </p>
          <div className="flex flex-col gap-1.5">
            {m.tracker.catches.map((fish) => (
              <Tap key={fish.name} onClick={() => go("add")}>
                <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-[7px]">
                  <span className="text-chalk text-[9px] font-medium">{fish.name}</span>
                  {fish.tag ? (
                    <span className="text-faint rounded-full border border-white/15 px-1.5 py-[1px] text-[6.5px]">
                      {fish.tag}
                    </span>
                  ) : null}
                  <span className="text-faint ml-auto text-[7.5px]">{fish.weight}</span>
                  <span className="text-chalk text-[9px] tabular-nums">{fish.price}</span>
                </div>
              </Tap>
            ))}
          </div>

          <Tap onClick={() => go("home")} className="mt-auto">
            <div className="text-muted rounded-lg border border-white/12 py-1.5 text-center text-[8.5px]">
              {m.tracker.secondary}
            </div>
          </Tap>
        </div>
      ),
    },
    {
      id: "add",
      title: m.screens.add,
      mainButton: m.add.main,
      back: "tracker",
      onMain: "tracker",
      content: () => (
        <div className="flex h-full flex-col gap-2">
          <div className="flex gap-1.5">
            {m.add.tabs.map((tab, index) => (
              <span
                key={tab}
                className={
                  index === 1
                    ? "bg-chalk text-void flex-1 rounded-full py-[4px] text-center text-[8px] font-semibold"
                    : "text-muted flex-1 rounded-full bg-white/[0.07] py-[4px] text-center text-[8px]"
                }
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center rounded-xl border border-dashed border-white/15 px-3 py-3 text-center">
            <ImageUp className="text-faint size-4" aria-hidden />
            <p className="text-chalk mt-1.5 text-[8.5px] font-medium">{m.add.dropTitle}</p>
            <p className="text-faint mt-1 text-[7.5px] leading-relaxed">{m.add.dropNote}</p>
          </div>

          <div className={CARD + " p-2"}>
            <p className="text-faint flex items-center gap-1 text-[7px] tracking-[0.12em] uppercase">
              <Sparkles className="size-2.5" aria-hidden />
              {m.add.recognizedLabel}
            </p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-chalk text-[11px] font-semibold">{m.add.fish}</span>
              <span className="text-muted text-[9px]">{m.add.weight}</span>
              <span className="text-chalk text-[11px] font-semibold tabular-nums">
                {m.add.price}
              </span>
            </div>
          </div>

          <p className="text-faint text-[7px] tracking-[0.12em] uppercase">{m.add.tagLabel}</p>
          <div className="flex gap-1.5">
            {m.add.tags.map((tag, index) => (
              <span
                key={tag}
                className={
                  index === 1
                    ? "bg-chalk text-void rounded-full px-2 py-[3px] text-[8px] font-semibold"
                    : "text-muted rounded-full bg-white/[0.07] px-2 py-[3px] text-[8px]"
                }
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "timers",
      title: m.screens.timers,
      mainButton: m.timers.main,
      back: "home",
      onMain: "home",
      content: () => (
        <div className="flex h-full flex-col gap-2">
          {m.timers.items.map((item) => (
            <div key={item.name} className={CARD + " p-2"}>
              <div className="flex items-center justify-between">
                <span className="text-chalk flex items-center gap-1.5 text-[9.5px] font-medium">
                  <Timer className="text-faint size-3" aria-hidden />
                  {item.name}
                </span>
                <span className="text-chalk text-[9.5px] font-semibold tabular-nums">
                  {item.left}
                </span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div style={{ width: item.progress }} className="bg-chalk h-1 rounded-full" />
              </div>
            </div>
          ))}
          <p className="text-faint mt-auto text-[7.5px] leading-relaxed">{m.timers.hint}</p>
        </div>
      ),
    },
  ];
}

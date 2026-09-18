"use client";

import { ArrowUp } from "lucide-react";

export function ToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="glass group text-faint hover:text-chalk flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 hover:border-white/25 active:scale-95"
    >
      {label}
      <ArrowUp
        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}

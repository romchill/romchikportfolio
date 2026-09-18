import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Пульсирующая точка слева — для статуса «на связи» */
  pulse?: boolean;
};

export function Badge({ children, className, pulse = false }: Props) {
  return (
    <span
      className={cn(
        "glass text-muted inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase",
        className,
      )}
    >
      {pulse && (
        <span className="relative flex size-1.5">
          <span className="bg-chalk absolute inline-flex size-full animate-ping rounded-full opacity-70" />
          <span className="bg-chalk relative inline-flex size-1.5 rounded-full" />
        </span>
      )}
      {children}
    </span>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, className, align = "left" }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="text-muted font-mono text-[11px] tracking-[0.22em] uppercase">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="font-display mt-4 text-3xl leading-[1.05] font-bold tracking-tight text-balance md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="text-muted mt-5 text-[15px] leading-relaxed md:text-base">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

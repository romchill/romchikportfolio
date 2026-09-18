"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMagnetic } from "@/lib/use-magnetic";
import { cn } from "@/lib/utils";

/** Обёртка, притягивающая что угодно к курсору */
export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLDivElement>(strength);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Смещение снизу в пикселях */
  distance?: number;
  once?: boolean;
};

/** Проявляет содержимое, когда оно доезжает до экрана */
export function Reveal({ children, className, delay = 0, distance = 24, once = true }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

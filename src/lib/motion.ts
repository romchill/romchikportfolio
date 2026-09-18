import type { Transition, Variants } from "motion/react";

/** Основная кривая проекта: быстрый старт, мягкая посадка */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeSpring = [0.34, 1.56, 0.64, 1] as const;

export const transition: Transition = { duration: 0.7, ease: easeOutExpo };
export const fastTransition: Transition = { duration: 0.35, ease: easeOutExpo };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** Родитель, раздающий детям задержку по очереди */
export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };
}

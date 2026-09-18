"use client";

import { useRef, type PointerEvent } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Притягивает элемент к курсору. На тач-устройствах и при
 * prefers-reduced-motion не делает ничего.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.22) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 20, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 240, damping: 20, mass: 0.35 });

  function onPointerMove(event: PointerEvent) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, x, y, onPointerMove, onPointerLeave };
}

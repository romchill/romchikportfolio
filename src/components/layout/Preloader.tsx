"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

export const PRELOADER_KEY = "rp-seen";

const DURATION = 1400;

/**
 * Счётчик 0→100 и шторка вверх. Показывается один раз за сессию:
 * повторные заходы отсекает инлайн-скрипт в layout (класс rp-skip).
 */
export function Preloader({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(PRELOADER_KEY) === "1";
    } catch {
      // приватный режим — просто показываем прелоадер
    }

    if (seen || reduceMotion) {
      // Кадром позже: сам оверлей уже скрыт классом rp-skip, мигания нет
      const skip = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(skip);
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(PRELOADER_KEY, "1");
        } catch {
          // не критично
        }
        window.setTimeout(() => setVisible(false), 260);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-preloader
          className="bg-void fixed inset-0 z-[100] flex flex-col justify-end px-5 pb-8 md:px-10 md:pb-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          <div className="flex items-end justify-between">
            <motion.span
              className="text-faint font-mono text-[11px] tracking-[0.24em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {label}
            </motion.span>

            <span className="font-display text-[22vw] leading-[0.8] font-black tracking-tighter tabular-nums md:text-[14vw]">
              {progress}
            </span>
          </div>

          <div className="mt-6 h-px w-full bg-white/10">
            <motion.div
              className="bg-chalk h-px"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

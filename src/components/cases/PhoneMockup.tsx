"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type PhoneScreen = {
  id: string;
  title: string;
  mainButton: string;
  content: ReactNode;
};

const AUTOPLAY_MS = 5200;

/**
 * Мокап смартфона с обвязкой Telegram Mini App.
 * Экраны листаются свайпом, точками и сами по таймеру,
 * корпус наклоняется за курсором.
 */
export function PhoneMockup({ screens, appName }: { screens: PhoneScreen[]; appName: string }) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateX = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (paused || reduceMotion || screens.length < 2) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % screens.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, screens.length]);

  function goTo(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + screens.length) % screens.length);
    setPaused(true);
  }

  function handleTilt(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * -10);
  }

  function resetTilt() {
    rawX.set(0);
    rawY.set(0);
  }

  const screen = screens[index];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={frameRef}
        onPointerMove={handleTilt}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className="relative w-[272px] shrink-0 sm:w-[300px]"
      >
        {/* Корпус */}
        <div className="bg-coal-800 relative rounded-[2.6rem] border border-white/15 p-[9px] shadow-[0_50px_120px_-50px_#000]">
          <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-linear-to-b from-white/10 via-transparent to-transparent" />

          {/* Экран */}
          <div className="bg-void relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.1rem]">
            {/* Вырез камеры */}
            <div className="absolute top-2 left-1/2 z-30 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />

            {/* Статус-бар */}
            <div className="text-chalk/80 flex items-center justify-between px-5 pt-2.5 pb-1 text-[9px] font-medium">
              <span className="tabular-nums">9:41</span>
              <span className="flex items-center gap-[3px]">
                <span className="flex items-end gap-[1.5px]">
                  {[3, 5, 7, 9].map((height) => (
                    <span
                      key={height}
                      style={{ height }}
                      className="bg-chalk/70 w-[2px] rounded-xs"
                    />
                  ))}
                </span>
                <span className="border-chalk/50 ml-1 h-[8px] w-[15px] rounded-[3px] border p-[1.5px]">
                  <span className="bg-chalk/70 block h-full w-2/3 rounded-[1px]" />
                </span>
              </span>
            </div>

            {/* Шапка Telegram */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-3 py-2.5">
              <ChevronLeft className="text-chalk/60 size-4 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-chalk truncate text-[11px] leading-tight font-semibold">
                  {appName}
                </p>
                <p className="text-faint truncate text-[8px] leading-tight">mini app</p>
              </div>
              <MoreVertical className="text-chalk/60 size-4 shrink-0" aria-hidden />
            </div>

            {/* Контент экрана */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={screen.id}
                  custom={direction}
                  drag={screens.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragStart={() => setPaused(true)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) goTo(index + 1);
                    else if (info.offset.x > 40) goTo(index - 1);
                  }}
                  initial={{ opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -28 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="absolute inset-0 cursor-grab touch-pan-y overflow-hidden px-3 py-3 active:cursor-grabbing"
                >
                  {screen.content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Главная кнопка Telegram */}
            <div className="px-3 pt-2 pb-3">
              <div className="bg-chalk text-void flex h-9 items-center justify-center rounded-xl text-[11px] font-semibold">
                {screen.mainButton}
              </div>
              <div className="bg-chalk/25 mx-auto mt-2.5 h-[3px] w-1/3 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Точки переключения */}
      {screens.length > 1 && (
        <div className="mt-6 flex items-center gap-2">
          {screens.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(itemIndex)}
              aria-label={item.title}
              aria-current={itemIndex === index ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                itemIndex === index ? "bg-chalk w-7" : "w-1.5 bg-white/25 hover:bg-white/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

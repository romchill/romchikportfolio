"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { buildScreens, type AppKey, type MockupLabels } from "./screens";

export type PhoneScreen = {
  id: string;
  /** Заголовок в шапке Telegram */
  title: string;
  mainButton: string;
  /** Куда ведёт главная кнопка */
  onMain?: string;
  /** Куда ведёт стрелка назад */
  back?: string;
  content: (go: (id: string) => void) => ReactNode;
};

const AUTOPLAY_MS = 5600;

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Есть ли у устройства мышь. На сервере и до гидратации отвечаем «нет»:
 * на телефоне наклон корпуса не нужен, а его motion-значения держали бы
 * мокап в отдельном трёхмерном слое и подтормаживали прокрутку.
 */
function useFinePointer() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(FINE_POINTER);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

/**
 * Мокап смартфона с обвязкой Telegram Mini App.
 * Экраны настоящие: по ним можно ходить нажатиями, листать свайпом
 * и точками. Пока никто не трогал — переключаются сами.
 */
export function PhoneMockup({
  app,
  labels,
  appName,
}: {
  app: AppKey;
  labels: MockupLabels;
  appName: string;
}) {
  const reduceMotion = useReducedMotion();
  const canTilt = useFinePointer();
  const screens = useMemo(() => buildScreens(app, labels), [app, labels]);

  // Пока мокап за пределами экрана, переключать в нём нечего
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "200px" });

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touched, setTouched] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateX = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!inView || touched || reduceMotion || screens.length < 2) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % screens.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [inView, touched, reduceMotion, screens.length]);

  function goToIndex(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + screens.length) % screens.length);
    setTouched(true);
  }

  /** Переход по идентификатору экрана — им пользуются кнопки внутри мокапа */
  function go(id: string) {
    const next = screens.findIndex((screen) => screen.id === id);
    if (next !== -1) goToIndex(next);
  }

  function handleTilt(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * -9);
  }

  function resetTilt() {
    rawX.set(0);
    rawY.set(0);
  }

  const screen = screens[index];

  return (
    <div ref={rootRef} className="flex flex-col items-center">
      <motion.div
        // Наклон только там, где есть мышь. На телефоне не вешаем ни
        // обработчиков, ни трёхмерного стиля: иначе браузер держит мокап
        // в отдельном слое и перерисовывает его на каждый кадр прокрутки
        onPointerMove={canTilt ? handleTilt : undefined}
        onPointerLeave={canTilt ? resetTilt : undefined}
        style={canTilt ? { rotateX, rotateY, transformPerspective: 1400 } : undefined}
        className="relative w-[272px] shrink-0 sm:w-[300px]"
      >
        <div className="bg-coal-800 relative rounded-[2.6rem] border border-white/15 p-[9px] shadow-[0_20px_40px_-20px_#000] md:shadow-[0_50px_120px_-50px_#000]">
          <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-linear-to-b from-white/10 via-transparent to-transparent" />

          <div className="phone-screen bg-void relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.1rem]">
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

            {/* Шапка мини-аппа */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-2 py-2">
              <button
                type="button"
                onClick={() => screen.back && go(screen.back)}
                disabled={!screen.back}
                aria-label={screen.back ? screen.title : undefined}
                className="text-chalk/60 enabled:hover:text-chalk flex size-6 shrink-0 items-center justify-center rounded-full transition-colors enabled:hover:bg-white/10 disabled:opacity-30"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-chalk truncate text-[11px] leading-tight font-semibold">
                  {appName}
                </p>
                <p className="text-faint truncate text-[8px] leading-tight">{screen.title}</p>
              </div>
              <MoreVertical className="text-chalk/60 size-4 shrink-0" aria-hidden />
            </div>

            {/* Содержимое экрана */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={screen.id}
                  custom={direction}
                  drag={screens.length > 1 ? "x" : false}
                  // Направление определяется один раз за жест: вертикальная
                  // прокрутка пальцем перестаёт спорить с горизонтальным свайпом
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragStart={() => setTouched(true)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) goToIndex(index + 1);
                    else if (info.offset.x > 40) goToIndex(index - 1);
                  }}
                  initial={{ opacity: 0, x: direction * 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -26 }}
                  transition={{ duration: 0.38, ease: easeOutExpo }}
                  className="absolute inset-0 touch-pan-y overflow-hidden px-3 py-2.5"
                >
                  {screen.content(go)}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Главная кнопка Telegram */}
            <div className="px-3 pt-2 pb-3">
              <button
                type="button"
                onClick={() => (screen.onMain ? go(screen.onMain) : setTouched(true))}
                className="bg-chalk text-void flex h-9 w-full items-center justify-center rounded-xl text-[11px] font-semibold transition-transform duration-200 active:scale-[0.97]"
              >
                {screen.mainButton}
              </button>
              <div className="bg-chalk/25 mx-auto mt-2.5 h-[3px] w-1/3 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center gap-2">
        {screens.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goToIndex(itemIndex)}
            aria-label={item.title}
            aria-current={itemIndex === index ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              itemIndex === index ? "bg-chalk w-7" : "w-1.5 bg-white/25 hover:bg-white/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export type { ReactNode };

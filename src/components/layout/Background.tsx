/** Неподвижный фон: сетка, два синих пятна и плёночное зерно */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-backdrop absolute inset-0" />
      {/* Размытие на 160px — тяжёлая операция, на телефонах его заменяет
          обычный градиент: выглядит так же, а рисуется даром */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgb(255_255_255/0.06),transparent_70%)] md:hidden" />
      <div className="absolute -top-[28%] left-1/2 hidden size-[900px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[160px] md:block" />
      <div className="absolute -right-[15%] bottom-[-25%] hidden size-[620px] rounded-full bg-white/[0.035] blur-[150px] md:block" />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}

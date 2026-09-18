/** Неподвижный фон: сетка, два синих пятна и плёночное зерно */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-backdrop absolute inset-0" />
      <div className="absolute -top-[28%] left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[160px]" />
      <div className="absolute -right-[15%] bottom-[-25%] size-[620px] rounded-full bg-white/[0.035] blur-[150px]" />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}

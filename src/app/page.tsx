// Временная заглушка Шага 2: подтверждает, что каркас и Docker живы.
// На Шаге 3 отсюда вырастет настоящий лендинг.
export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5">
      <div
        aria-hidden
        className="bg-tg-500/15 pointer-events-none absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
      />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
        <p className="text-tg-400 font-mono text-xs tracking-[0.2em] uppercase">
          step 2 — foundation
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Romchik</h1>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          Telegram Mini Apps и боты на заказ. Каркас проекта поднят: Next.js, Tailwind, Docker.
        </p>
        <dl className="text-faint mt-6 space-y-2 border-t border-white/10 pt-6 font-mono text-xs">
          <div className="flex justify-between">
            <dt>framework</dt>
            <dd className="text-chalk">Next.js 16 · App Router</dd>
          </div>
          <div className="flex justify-between">
            <dt>styles</dt>
            <dd className="text-chalk">Tailwind CSS v4</dd>
          </div>
          <div className="flex justify-between">
            <dt>runtime</dt>
            <dd className="text-chalk">Docker · standalone</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}

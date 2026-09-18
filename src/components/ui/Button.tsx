"use client";

import { useCallback, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

type Ripple = { id: number; x: number; y: number; size: number };

type Props = {
  children: ReactNode;
  /** Внешняя ссылка или якорь; без него отрисуется <button> */
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.97] will-change-transform";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-chalk text-void shadow-[0_0_44px_-16px_rgb(255_255_255/0.5)] hover:bg-white/90 hover:shadow-[0_0_64px_-14px_rgb(255_255_255/0.6)]",
  ghost: "glass text-chalk hover:border-white/25 hover:bg-white/[0.08]",
  quiet: "text-muted hover:text-chalk",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
  onClick,
  type = "button",
  ...rest
}: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawnRipple = useCallback((event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const id = performance.now();

    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size },
    ]);
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 640);
  }, []);

  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  const content = (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={cn("ripple", variant !== "primary" && "ripple-light")}
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const isExternal = Boolean(href && /^(https?:|mailto:|tel:)/.test(href));

  const element = href ? (
    <a
      href={href}
      className={classes}
      onPointerDown={spawnRipple}
      onClick={onClick}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {content}
    </a>
  ) : (
    <button type={type} className={classes} onPointerDown={spawnRipple} onClick={onClick} {...rest}>
      {content}
    </button>
  );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}

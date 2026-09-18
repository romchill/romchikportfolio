"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

type Props = { value: string; copyLabel: string; copiedLabel: string };

/** Хэндл, который копируется в буфер по клику */
export function CopyHandle({ value, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // буфер недоступен — хэндл всё равно виден на экране
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : copyLabel}
      className="glass group text-muted hover:text-chalk flex h-14 items-center gap-3 rounded-full px-6 font-mono text-sm transition-colors duration-300 hover:border-white/25 active:scale-[0.97]"
    >
      {value}
      <span className="relative flex size-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="absolute"
            >
              <Check className="text-chalk size-4" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="absolute"
            >
              <Copy className="size-4" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

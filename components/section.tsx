"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

export function SectionHeading({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-5 sm:mb-14">
      <motion.span
        aria-hidden="true"
        className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-line-strong bg-surface-2 px-1.5 font-mono text-[11px] text-brass"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {index}
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
      >
        {label}
      </motion.p>
      <motion.span
        aria-hidden="true"
        className="inline-block h-px flex-1 origin-left rounded-full bg-gradient-to-r from-line-strong to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      />
    </div>
  );
}
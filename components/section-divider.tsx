"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

export function SectionDivider() {
  const reduce = useReducedMotion();

  if (reduce) return <div aria-hidden="true" className="h-px w-full bg-line" />;

  return (
    <div aria-hidden="true" className="relative h-px w-full overflow-visible bg-line">
      <motion.span
        className="absolute inset-0 origin-left bg-brass"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <motion.span
        className="absolute -top-[3px] h-[7px] w-[2px] bg-brass shadow-[0_0_8px_rgba(201,154,62,0.9)]"
        initial={{ left: 0 }}
        whileInView={{ left: "calc(100% - 2px)" }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </div>
  );
}
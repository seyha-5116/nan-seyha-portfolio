"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowUpIcon } from "@/components/icons";

export function ScrollTop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setVisible(value > 640);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border border-line-strong bg-ink/85 text-muted backdrop-blur-md transition-colors hover:border-brass hover:text-brass"
        >
          <ArrowUpIcon className="text-base" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
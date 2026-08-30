"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BlinkCursor } from "@/components/blink-cursor";
import { Clock } from "@/components/clock";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/icons";
import { EASE, sequence, sequenceItem } from "@/lib/motion";

const ROLES = ["Full-stack developer", "AI-product builder", "Interface engineer", "Systems thinker"];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const primaryCta = (
    <a
      href="#projects"
      className="group inline-flex h-12 items-center gap-2 bg-brass px-6 font-mono text-sm text-ink transition-colors hover:bg-brass-bright"
    >
      View projects <ArrowRightIcon className="text-base transition-transform group-hover:translate-x-1" />
    </a>
  );

  const secondaryCta = (
    <a
      href="#contact"
      className="inline-flex h-12 items-center gap-2 border border-line-strong px-6 font-mono text-sm text-text transition-colors hover:border-brass hover:text-brass"
    >
      Contact me
    </a>
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="flex min-h-svh flex-col justify-between pb-10 pt-32 sm:pb-14"
    >
      <motion.div
        className="mx-auto grid w-full max-w-[1120px] flex-1 content-center px-4 sm:px-6"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        variants={sequence}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "visible"}
      >
        <motion.div variants={sequenceItem}>
          <CommandLine />
        </motion.div>

        <div className="mt-3 py-2">
          <NameReveal />
        </div>

        <motion.p
          variants={sequenceItem}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Full-stack developer building precise, functional web applications — from engineering-grade
          frontends to dependable backends. No decoration for its own sake; every element earns its
          place.
        </motion.p>

        <motion.div variants={sequenceItem} className="mt-10 flex flex-wrap items-center gap-4">
          {primaryCta}
          {secondaryCta}
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-24 w-full max-w-[1120px] px-4 sm:px-6">
        <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <p className="font-mono text-xs tracking-widest text-muted">
              BASED IN PHNOM PENH, KH — REMOTE OK
            </p>
            <Clock />
          </div>
          <ScrollCue />
        </div>
      </div>
    </section>
  );
}

function NameReveal() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 aria-label="Nan Seyha" className="fluid-hero font-display font-bold text-text">
        NAN <span className="text-brass">SEYHA</span>
      </h1>
    );
  }

  return (
    <motion.h1
      aria-label="Nan Seyha"
      className="fluid-hero font-display font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {["NAN", "SEYHA"].map((word, wordIndex) => (
        <span
          key={word}
          className="mb-[-0.06em] mr-[0.18em] inline-block overflow-hidden pb-[0.07em] align-bottom last:mr-0"
        >
          <motion.span
            className={`inline-block will-change-transform ${wordIndex === 1 ? "text-brass" : "text-text"}`}
            style={
              wordIndex === 1
                ? { textShadow: "0 0 32px rgba(201, 154, 62, 0.4)" }
                : undefined
            }
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 0.7, ease: EASE } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

function CommandLine() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((value) => (value + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  const role = ROLES[index];

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <AvailabilityDot />
      <span className="text-brass">$</span>
      nan@seyha:~$
      {reduce ? (
        <span className="text-brass" aria-hidden="true">
          {role}
        </span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={role}
            aria-hidden="true"
            className="text-brass"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {role}
          </motion.span>
        </AnimatePresence>
      )}
      <BlinkCursor />
    </p>
  );
}

function AvailabilityDot() {
  const reduce = useReducedMotion();

  return (
    <span aria-hidden="true" className="relative mr-1 flex h-2 w-2">
      <span className="h-2 w-2 rounded-full bg-brass" />
      {!reduce ? (
        <motion.span
          className="absolute inset-0 rounded-full bg-brass"
          animate={{ opacity: [0.8, 0, 0.8], scale: [1, 2.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </span>
  );
}

function ScrollCue() {
  const reduce = useReducedMotion();

  return (
    <a
      href="#about"
      aria-label="Scroll to About section"
      className="flex flex-col items-center gap-1.5 text-muted transition-colors hover:text-brass"
    >
      <span className="font-mono text-[10px] tracking-[0.25em] text-muted">SCROLL</span>
      {reduce ? (
        <ChevronDownIcon className="text-base" />
      ) : (
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.9, 0.4, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="text-base" />
        </motion.span>
      )}
    </a>
  );
}
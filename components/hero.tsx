"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Clock } from "@/components/clock";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/icons";
import { ProfileImage } from "@/components/profile-image";
import { EASE } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="flex min-h-svh flex-col justify-between pb-12 pt-32 sm:pb-14"
    >
      <motion.div
        className="mx-auto grid w-full max-w-[80%] flex-1 content-center px-4 sm:px-6"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="w-full max-w-2xl flex-1">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="mb-5"
            >
              <RoleLine />
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            >
              <AvailabilityBadge />
            </motion.div>

            <div className="mt-6">
              <NameReveal />
            </div>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              I&apos;m a full-stack developer crafting precise, reliable web products — from
              engineering-grade frontends to dependable backends and practical AI tooling. Every
              element earns its place.
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.62 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-brass px-7 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
              >
                View projects
                <ArrowRightIcon className="text-base transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-7 font-sans text-sm text-text transition-colors hover:border-brass hover:text-brass"
              >
                Contact me
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="flex-none lg:-mt-10"
          >
            <ProfileImage size="xl" priority />
          </motion.div>
        </div>
      </motion.div>

      <div className="mx-auto mt-24 w-full max-w-[80%] px-4 sm:px-6">
        <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <p className="font-mono text-xs tracking-widest text-muted">
              PHNOM PENH, KH <span className="text-line-strong">·</span> REMOTE-READY
            </p>
            <Clock />
          </div>
          <ScrollCue />
        </div>
      </div>
    </section>
  );
}

function AvailabilityBadge() {
  const reduce = useReducedMotion();

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2/80 px-4 py-2 backdrop-blur-sm">
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
        {!reduce ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#4ade80]"
            animate={{ opacity: [0.7, 0, 0.7], scale: [1, 2.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Available for new projects
      </span>
    </span>
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
    <motion.h1 aria-label="Nan Seyha" className="fluid-hero font-display font-bold">
      <HeroWord delay={0.2}>NAN</HeroWord>
      <HeroWord accent delay={0.42}>
        SEYHA
      </HeroWord>
    </motion.h1>
  );
}

function HeroWord({
  children,
  accent = false,
  delay = 0,
}: {
  children: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <span className="mr-[0.18em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      >
        <span className={accent ? "text-brass" : "text-text"}>{children}</span>
      </motion.span>
    </span>
  );
}

const ROLE_LABELS = [
  "UX UI Designer",
  "Frontend Developer",
  "Backend Developer",
];

function RoleLine() {
  const reduce = useReducedMotion();

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
      <span aria-hidden="true" className="text-brass">$</span>
      <span>nan@seyha:~$</span>
      <span className="relative flex items-center text-brass">
        {reduce ? ROLE_LABELS[0] : <Typewriter labels={ROLE_LABELS} />}
        {!reduce ? <BlinkCursor /> : null}
      </span>
    </p>
  );
}

function Typewriter({ labels }: { labels: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = labels[index];

    if (!deleting) {
      if (text === current) {
        const id = setTimeout(() => setDeleting(true), 1700);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setText(current.slice(0, text.length + 1)), 85);
      return () => clearTimeout(id);
    }

    if (text === "") {
      const id = setTimeout(() => {
        setDeleting(false);
        setIndex((value) => (value + 1) % labels.length);
      }, 300);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => setText(current.slice(0, text.length - 1)), 42);
    return () => clearTimeout(id);
  }, [text, deleting, index, labels]);

  return (
    <span aria-hidden="true" className="inline-block">
      {text}
    </span>
  );
}

function BlinkCursor() {
  return (
    <motion.span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.95em] w-[0.55em] bg-brass align-middle"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ScrollCue() {
  const reduce = useReducedMotion();

  return (
    <a
      href="#about"
      aria-label="Scroll to About section"
      className="flex items-center gap-2 text-muted transition-colors hover:text-brass"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
      {reduce ? (
        <ChevronDownIcon className="text-base" />
      ) : (
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="text-base" />
        </motion.span>
      )}
    </a>
  );
}
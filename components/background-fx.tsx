"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const GRID_IMAGE = [
  "linear-gradient(to right, rgba(236,233,226,0.05) 1px, transparent 1px)",
  "linear-gradient(to bottom, rgba(236,233,226,0.05) 1px, transparent 1px)",
  "linear-gradient(to right, rgba(236,233,226,0.09) 1px, transparent 1px)",
  "linear-gradient(to bottom, rgba(236,233,226,0.09) 1px, transparent 1px)",
].join(", ");

const GRID_SIZE = "64px 64px, 64px 64px, 320px 320px, 320px 320px";

const GRID_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.16) 78%, rgba(0,0,0,0) 100%)";

export function BackgroundFX() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, (y) => y * 0.35);
  const gridPosition = useMotionTemplate`0px ${gridY}px`;

  const [glowVisible, setGlowVisible] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.5 });
  const glowY = useSpring(my, { stiffness: 140, damping: 24, mass: 0.5 });
  const glowBackground = useMotionTemplate`radial-gradient(620px circle at ${glowX}px ${glowY}px, rgba(201,154,62,0.14) 0%, rgba(201,154,62,0.05) 38%, rgba(201,154,62,0) 68%)`;

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    mx.set(window.innerWidth / 2);
    my.set(window.innerHeight / 3);
    const frame = requestAnimationFrame(() => setGlowVisible(true));

    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX);
      my.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [mx, my, reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: GRID_IMAGE,
          backgroundSize: GRID_SIZE,
          backgroundPosition: reduce ? "0 0" : gridPosition,
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
      {glowVisible ? (
        <>
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            style={{ background: glowBackground }}
          />
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-px bg-brass mix-blend-screen"
            style={{
              left: glowX,
              opacity: 0.28,
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px bg-brass mix-blend-screen"
            style={{
              top: glowY,
              opacity: 0.28,
              maskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          />
        </>
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block"
        style={{
          backgroundColor: "rgba(236, 233, 226, 0.05)",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
    </div>
  );
}
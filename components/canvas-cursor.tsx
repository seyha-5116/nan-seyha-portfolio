"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const MAX_PARTICLES = 240;
const SPAWN_PER_MOVE = 3;

// Site accent palette — warm golds with a rare indigo accent.
const GOLD: readonly [number, number, number] = [227, 191, 133];
const BRASS: readonly [number, number, number] = [201, 161, 92];
const INDIGO: readonly [number, number, number] = [103, 128, 190];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: readonly [number, number, number];
};

type Ring = { x: number; y: number; r: number; vr: number; alpha: number };

/**
 * Canvas cursor effect.
 *
 * A fine-grained, additive spark system that rides the pointer:
 * - mouse (fine pointer): embers stream from the cursor and inherit its
 *   motion, so fast moves draw long glowing comets and slow ones leave a
 *   warm haze; a soft bloom rides the head of the trail
 * - touch (coarse pointer): the same spark trail streams from the finger
 *   only while touching, and fades out when the finger lifts
 * - clicking/tapping emits a small burst of sparks and a thin ripple
 *
 * Draws with `lighter` blending in the site's gold accents and is disabled
 * under reduced motion.
 */
export function CanvasCursor() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: w / 2, y: h / 2, px: w / 2, py: h / 2 };
    const particles: Particle[] = [];
    const rings: Ring[] = [];
    let active = false;
    let alpha = 0;
    let lastT = performance.now();
    let rafId = 0;

    const rgba = (
      c: readonly [number, number, number],
      a: number,
    ) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

    const sparkColor = (): readonly [number, number, number] => {
      const roll = Math.random();
      if (roll < 0.68) return GOLD;
      if (roll < 0.92) return BRASS;
      return INDIGO;
    };

    const push = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      size: number,
      max: number,
    ) => {
      if (particles.length >= MAX_PARTICLES) return;
      particles.push({
        x,
        y,
        vx,
        vy,
        life: max,
        max,
        size,
        color: sparkColor(),
      });
    };

    const emitTrail = () => {
      const mvx = mouse.x - mouse.px;
      const mvy = mouse.y - mouse.py;
      const speed = Math.hypot(mvx, mvy);
      if (speed < 0.2) return;
      const count = Math.min(
        SPAWN_PER_MOVE,
        Math.max(1, Math.round(speed / 22)),
      );
      const dx = mvx / speed;
      const dy = mvy / speed;
      for (let i = 0; i < count; i++) {
        const jx = (Math.random() - 0.5) * 10;
        const jy = (Math.random() - 0.5) * 10;
        const inherit = Math.min(3.2, speed / 90);
        push(
          mouse.x + jx,
          mouse.y + jy,
          dx * inherit * (0.7 + Math.random() * 0.6) + jx * 0.12,
          dy * inherit * (0.7 + Math.random() * 0.6) + jy * 0.12,
          2 + Math.random() * 2.4,
          520 + Math.random() * 420,
        );
      }
    };

    const onMove = (event: PointerEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      active = true;
      const now = performance.now();
      if (now - lastT >= 16) {
        lastT = now;
        emitTrail();
      }
    };
    const onDown = (event: PointerEvent) => {
      active = true;
      mouse.px = event.clientX;
      mouse.py = event.clientY;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      rings.push({
        x: event.clientX,
        y: event.clientY,
        r: 4,
        vr: 1.6,
        alpha: 0.5,
      });
      for (let i = 0; i < 22; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 1.4 + Math.random() * 3.4;
        push(
          event.clientX,
          event.clientY,
          Math.cos(ang) * sp,
          Math.sin(ang) * sp - 0.6,
          1.6 + Math.random() * 2,
          380 + Math.random() * 320,
        );
      }
    };
    const onEnter = () => {
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") active = false;
    };

    const draw = () => {
      rafId = requestAnimationFrame(draw);

      const target = active && particles.length > 0 ? 1 : 0;
      alpha += (target - alpha) * 0.09;
      if (alpha < 0.001) alpha = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length === 0 && rings.length === 0 && alpha === 0) return;
      if (alpha < 0.01) return;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      // Streams of sparks — stretched along velocity so motion reads as
      // flowing light.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.955;
        p.vy = p.vy * 0.955 - 0.012;
        p.life -= 16.67;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const f = p.life / p.max;
        const sx = p.x - p.vx * 6;
        const sy = p.y - p.vy * 6;
        ctx.strokeStyle = rgba(p.color, f * 0.5 * alpha);
        ctx.lineWidth = Math.max(0.6, p.size * f);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        // Bright head of each spark.
        ctx.fillStyle = rgba(p.color, f * 0.9 * alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * f * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }

      // Click ripples — thin expanding rings.
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += ring.vr;
        ring.vr *= 0.96;
        ring.alpha -= 0.018;
        if (ring.alpha <= 0 || ring.r > 160) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = rgba(GOLD, ring.alpha * alpha);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Soft bloom riding the head of the trail.
      const glow = 64 * alpha;
      const g = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        glow,
      );
      g.addColorStop(0, rgba(GOLD, 0.28 * alpha));
      g.addColorStop(0.4, rgba(BRASS, 0.12 * alpha));
      g.addColorStop(1, rgba(BRASS, 0));
      ctx.fillStyle = g;
      ctx.fillRect(mouse.x - glow, mouse.y - glow, glow * 2, glow * 2);

      ctx.globalCompositeOperation = "source-over";
    };
    draw();

    const onResize = () => resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[50] mix-blend-screen"
    />
  );
}
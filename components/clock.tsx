"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function Clock() {
  const reduce = useReducedMotion();
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Phnom_Penh",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    if (reduce) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="font-mono text-xs tabular-nums tracking-widest text-muted">
      <span className="text-brass">KHT</span> {time}
    </span>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";

type SizeKey = "sm" | "lg" | "xl";

const SIZES: Record<SizeKey, { fig: string; initials: string }> = {
  sm: {
    fig: "h-40 w-40 sm:h-44 sm:w-44",
    initials: "text-4xl",
  },
  lg: {
    fig: "h-64 w-64 sm:h-72 sm:w-72",
    initials: "text-6xl",
  },
  xl: {
    fig: "h-[19rem] w-[19rem] sm:h-[24rem] sm:w-[24rem] lg:h-[30rem] lg:w-[30rem]",
    initials: "text-7xl",
  },
};

export function ProfileImage({ size = "sm", priority = false }: { size?: SizeKey; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const style = SIZES[size];

  return (
    <div
      className={`profile-scan relative flex ${style.fig} flex-none items-start justify-center`}
      tabIndex={0}
      role="img"
      aria-label="Portrait of Nan Seyha"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        focusable="false"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="14"
          pathLength={100}
          fill="none"
          strokeWidth="2"
          className="profile-scan-rect"
        />
      </svg>

      <div
        className={`relative overflow-hidden rounded-2xl bg-surface-2 ${style.fig}`}
      >
        {!failed ? (
          <Image
            src="/me.png"
            alt=""
            fill
            priority={priority}
            sizes={size === "xl" ? "30rem" : size === "lg" ? "18rem" : "11rem"}
            style={{ objectFit: "contain", objectPosition: "top" }}
            className="transition-transform duration-700 ease-out hover:scale-105"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-ink">
            <span className={`font-display font-bold tracking-tight text-brass ${style.initials}`}>
              N<span className="text-line-strong">S</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
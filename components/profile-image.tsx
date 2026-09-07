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
    fig: "h-80 w-80 sm:h-96 sm:w-96 lg:h-[30rem] lg:w-[30rem]",
    initials: "text-7xl",
  },
};

export function ProfileImage({ size = "sm", priority = false }: { size?: SizeKey; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const style = SIZES[size];

  return (
    <div
      aria-hidden="true"
      className={`relative flex ${style.fig} flex-none items-center justify-center`}
    >
      <div className={`relative overflow-hidden ${style.fig}`}>
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-ink">
            <span className={`font-display font-bold tracking-tight text-brass ${style.initials}`}>
              N<span className="text-line-strong">S</span>
            </span>
          </div>
        ) : (
          <Image
            src="/me.png"
            alt="Portrait of Nan Seyha"
            fill
            priority={priority}
            sizes={size === "xl" ? "30rem" : size === "lg" ? "18rem" : "11rem"}
            style={{ objectFit: "contain", objectPosition: "center" }}
            className="transition-transform duration-700 ease-out hover:scale-105"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
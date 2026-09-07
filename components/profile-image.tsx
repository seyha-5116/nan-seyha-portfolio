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
    fig: "h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96",
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
      <div className={`relative overflow-hidden rounded-full ${style.fig}`}>
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
            sizes={size === "xl" ? "24rem" : size === "lg" ? "18rem" : "11rem"}
            style={{ objectFit: "cover", objectPosition: "center 22%" }}
            className="transition-transform duration-700 ease-out hover:scale-105"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
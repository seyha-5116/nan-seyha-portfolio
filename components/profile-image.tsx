"use client";

import { useState } from "react";
import Image from "next/image";

const GRAVATAR = "";

function resolveSrc(): string {
  if (GRAVATAR) return GRAVATAR;
  return "/me.png";
}

function fallbackInitialsPair(): [string, string] {
  const fromGravatar = GRAVATAR ? /[?&]d=([^&]+)/.exec(GRAVATAR)?.[1] : undefined;
  if (fromGravatar && fromGravatar.includes("-")) {
    const [first, last] = fromGravatar.split("-");
    return [first.toUpperCase(), last.toUpperCase()];
  }
  return ["N", "S"];
}

type SizeKey = "sm" | "lg";

const SIZES: Record<SizeKey, { frame: string; fig: string; initials: string }> = {
  sm: {
    frame: "h-40 w-40 sm:h-44 sm:w-44",
    fig: "h-36 w-36 sm:h-40 sm:w-40",
    initials: "text-4xl",
  },
  lg: {
    frame: "h-64 w-64 sm:h-72 sm:w-72",
    fig: "h-60 w-60 sm:h-[17rem] sm:w-[17rem]",
    initials: "text-6xl",
  },
};

export function ProfileImage({ size = "sm", priority = false }: { size?: SizeKey; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = resolveSrc();
  const style = SIZES[size];
  const [first, last] = fallbackInitialsPair();

  return (
    <div
      aria-hidden="true"
      className={`relative flex ${style.frame} flex-none items-center justify-center`}
    >
      <span className="absolute inset-0 rounded-full border border-line-strong" />
      <span className="absolute inset-[-6px] rounded-full border border-brass/40" />
      <span className="absolute inset-[-12px] rounded-full border border-brass/15 sm:inset-[-14px]" />

      <div
        className={`relative overflow-hidden rounded-full border-2 border-ink bg-surface-2 ${style.fig}`}
      >
        {src && !failed ? (
          <Image
            src={src}
            alt="Portrait of Nan Seyha"
            fill
            priority={priority}
            sizes={size === "lg" ? "18rem" : "11rem"}
            style={{ objectFit: "cover", objectPosition: "center 22%" }}
            className="transition-transform duration-700 ease-out hover:scale-105"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-ink">
            <span className="font-display font-bold tracking-tight text-brass">
              {first}
              <span className="text-line-strong">{last}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type OfficialMediaFrameProps = {
  title: string;
  subtitle?: string;
  note?: string;
  className?: string;
  compact?: boolean;
  src?: string;
};

export function OfficialMediaFrame({
  title,
  subtitle = "Official image unavailable",
  note = "Add a licensed ICC, BCCI, IPL, RCB, Getty, Reuters, AP, or Virat Kohli official asset here.",
  className,
  compact = false,
  src
}: OfficialMediaFrameProps) {
  const [imageError, setImageError] = useState(false);

  const displayImage = src && !imageError;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_22%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))] transition-all duration-500",
        className
      )}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />
      <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {displayImage ? (
        <div className="absolute inset-0 h-full w-full pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Heavy cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60" />
        </div>
      ) : null}

      <div className={cn("relative flex h-full flex-col justify-end p-6 md:p-8 z-10", compact ? "min-h-[12rem]" : "min-h-[20rem]")}>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {title}
        </h3>
        
        {!displayImage && (
          <>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-yellow-400/90 font-medium">
              {subtitle}
            </p>
            <p className="mt-3 max-w-xl text-xs leading-6 text-white/55 md:text-sm md:leading-7">
              {note}
            </p>
          </>
        )}
      </div>
    </div>
  );
}


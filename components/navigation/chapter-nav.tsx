"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { chapters } from "@/lib/kohli-data";

export function ChapterNav() {
  const pathname = usePathname();
  const currentIndex = chapters.findIndex((c) => c.href === pathname);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="relative w-full border-t border-white/10 bg-black/80 backdrop-blur-xl shrink-0">
      <div className="chapter-content flex items-center justify-between py-4 sm:py-6 gap-2 sm:gap-4 overflow-hidden">
        
        {/* Previous Chapter */}
        {prevChapter ? (
          <Link href={prevChapter.href} className="group flex items-center gap-2 sm:gap-4 text-left min-w-0">
            <span className="text-lg sm:text-2xl text-white/30 transition group-hover:text-yellow-400 shrink-0">←</span>
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.38em] text-white/40 truncate">Prev Chapter</p>
              <p className="mt-0.5 sm:mt-1 font-display text-xs xs:text-sm sm:text-lg uppercase tracking-[0.05em] sm:tracking-[0.1em] text-white/70 transition group-hover:text-white truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">
                {prevChapter.title}
              </p>
            </div>
          </Link>
        ) : (
          <div className="w-10 sm:w-20" />
        )}

        {/* Chapter Dots */}
        <div className="hidden items-center gap-2 md:flex shrink-0">
          {chapters.map((chapter, i) => (
            <Link key={chapter.id} href={chapter.href} title={chapter.title}>
              <motion.div
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? "w-6 bg-yellow-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                layoutId="chapter-dot"
              />
            </Link>
          ))}
        </div>

        {/* Next Chapter */}
        {nextChapter ? (
          <Link href={nextChapter.href} className="group flex items-center gap-2 sm:gap-4 text-right min-w-0 justify-end">
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.38em] text-white/40 truncate">Next Chapter</p>
              <p className="mt-0.5 sm:mt-1 font-display text-xs xs:text-sm sm:text-lg uppercase tracking-[0.05em] sm:tracking-[0.1em] text-white/70 transition group-hover:text-white truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">
                {nextChapter.title}
              </p>
            </div>
            <span className="text-lg sm:text-2xl text-white/30 transition group-hover:text-yellow-400 shrink-0">→</span>
          </Link>
        ) : (
          <Link href="/" className="group flex items-center gap-2 sm:gap-4 text-right min-w-0 justify-end">
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.38em] text-white/40 truncate">Back To Start</p>
              <p className="mt-0.5 sm:mt-1 font-display text-xs xs:text-sm sm:text-lg uppercase tracking-[0.05em] sm:tracking-[0.1em] text-white/70 transition group-hover:text-white truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">
                Home
              </p>
            </div>
            <span className="text-lg sm:text-2xl text-white/30 transition group-hover:text-yellow-400 shrink-0">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

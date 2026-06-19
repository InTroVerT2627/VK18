"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { chapters } from "@/lib/kohli-data";
import { ExperienceControls } from "@/components/ui/experience-controls";

export function CinematicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const currentChapter = chapters.find((c) => c.href === pathname) || chapters[0];

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">

          {/* Logo */}
          <Link href="/" className="group relative z-50 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition group-hover:border-yellow-400/50">
              <span className="font-display text-lg text-yellow-400">18</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-sm uppercase tracking-[0.34em] text-white">Virat Kohli</p>
              <p className="text-[9px] uppercase tracking-[0.38em] text-white/50">The King of Modern Cricket</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 xl:flex">
            {chapters.slice(0, 8).map((chapter) => (
              <Link
                key={chapter.id}
                href={chapter.href}
                className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition ${
                  pathname === chapter.href
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {chapter.title}
              </Link>
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition"
            >
              More →
            </button>
          </nav>

          {/* Right Controls: Experience + Mobile Menu */}
          <div className="flex items-center gap-3 relative z-50">
            {/* ── Cinematic Experience Controls ── */}
            <ExperienceControls />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl xl:hidden transition hover:border-yellow-400/50"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4 w-4 text-white" /> : <Menu className="h-4 w-4 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 z-50 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition duration-300 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.nav
              className="grid w-full max-w-5xl grid-cols-1 gap-3 px-8 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[85vh] timeline-strip py-6 cursor-default"
              onClick={(e) => e.stopPropagation()}
              style={{ WebkitOverflowScrolling: "touch" }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={chapter.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 min-h-[135px] ${
                    pathname === chapter.href
                      ? "border-yellow-400/40 bg-yellow-400/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.38em] text-yellow-400/70">
                        Chapter {chapter.number}
                      </span>
                      <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.1em] text-white">
                        {chapter.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/40">{chapter.subtitle}</p>
                    </div>
                    <span className="font-display text-3xl text-white/10">{chapter.number}</span>
                  </div>
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

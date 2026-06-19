"use client";

import { motion } from "framer-motion";
import { X, Award, Eye, Compass, BookOpen, Heart, Shield } from "lucide-react";

type SourcesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SourcesModal({ isOpen, onClose }: SourcesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Content - Styled as a Museum Plaque */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[20px] sm:rounded-3xl border border-yellow-500/25 bg-black p-5 xs:p-6 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.08)] backdrop-blur-3xl scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Plaque Header */}
        <div className="mb-6 sm:mb-10 border-b border-yellow-500/10 pb-4 sm:pb-6 text-center md:text-left pr-8 sm:pr-0">
          <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
            <Award className="h-4 w-4 shrink-0" /> Museum Plaque
          </div>
          <h2 className="font-display text-xl xs:text-2xl md:text-3xl text-white uppercase tracking-widest font-black leading-tight">
            The Digital Tribute
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-yellow-500 to-transparent mt-3 hidden md:block" />
        </div>

        {/* Plaque Narrative Sections */}
        <div className="space-y-6 sm:space-y-8 text-left">
          
          {/* Why This Project Exists */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-yellow-500/90 font-bold">
              <Heart className="h-3.5 w-3.5 shrink-0" /> Why This Project Exists
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-body">
              This museum is born out of admiration for a career that redefined Indian cricket. It exists to capture the raw energy, the moments of absolute pressure, and the human side of a sportsman who carried the hopes of a billion people. It is a visual space built to keep those emotions alive.
            </p>
          </div>

          {/* The Philosophy Behind The Museum */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-yellow-500/90 font-bold">
              <Eye className="h-3.5 w-3.5 shrink-0" /> The Philosophy Behind The Museum
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-body">
              Unlike traditional dashboards, this experience prioritizes atmosphere and story. Statistics are details, not the main focus. We believe that runs and centuries are only symbols of something greater: resilience, character, and an unyielding will to win.
            </p>
          </div>

          {/* How The Story Was Built */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-yellow-500/90 font-bold">
              <Compass className="h-3.5 w-3.5 shrink-0" /> How The Story Was Built
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-body">
              The story has been structured into 18 chapters, mirroring the iconic jersey number. Media assets, commentary snippets, and timeline entries were curated to present a high-definition sports documentary flow that navigates from early dreams to absolute immortality.
            </p>
          </div>

          {/* Research Sources */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-yellow-500/90 font-bold">
              <BookOpen className="h-3.5 w-3.5 shrink-0" /> Research Sources
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-body">
              Data points, timestamps, and match contexts were cross-referenced against historical archives, international cricket records, and reputable sports journalism publications to maintain historical authenticity throughout the timeline.
            </p>
          </div>

          {/* About This Project */}
          <div className="space-y-2 border-t border-yellow-500/10 pt-5 sm:pt-6">
            <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-yellow-500/90 font-bold">
              <Shield className="h-3.5 w-3.5 shrink-0" /> About This Project
            </h3>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <p className="text-xs sm:text-sm font-display text-white font-extrabold tracking-widest uppercase">
                A Virat Kohli Admirer
              </p>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-mono mt-1">
                Digital tribute to cricket's greatest story
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed font-body mt-3">
                This digital museum was independently created by a lifelong admirer of Virat Kohli to preserve and celebrate one of the most influential sporting journeys ever witnessed.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed font-body mt-2">
                Every chapter is built from extensive research, historical records, interviews, match archives, statistics, and iconic moments spanning Virat Kohli's career.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 border-t border-white/5 pt-5 sm:pt-6 text-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-bold font-mono">
            © InTroVerT262 • All Rights Reserved
          </p>
        </div>
      </motion.div>
    </div>
  );
}

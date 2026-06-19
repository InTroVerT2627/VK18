"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { ParticleField } from "@/components/effects/particle-field";
import { SourcesModal } from "@/components/meta/sources-modal";
import { chapters } from "@/lib/kohli-data";

// Helper Component for Cinematic Line Scroll Reveal
function ScrollRevealLine({ text, delay = 0, isGold = false }: { text: string; delay?: number; isGold?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const initialStyles = isMobile ? { opacity: 0 } : { opacity: 0, y: 45, scale: 0.98 };
  const animateStyles = isInView ? { opacity: 1, y: 0, scale: 1 } : initialStyles;

  return (
    <motion.div
      ref={ref}
      initial={initialStyles}
      animate={animateStyles}
      transition={{ duration: isMobile ? 0.8 : 1.4, ease: [0.16, 1, 0.3, 1], delay }}
      className={`text-center py-4 sm:py-5 font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase font-black tracking-tight leading-tight select-none ${
        isGold
          ? "bg-gradient-to-r from-[#d4af37] via-[#f7e7ce] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.15)]"
          : "text-white/90"
      }`}
    >
      {text}
    </motion.div>
  );
}

// Helper Component for Timeline Row
function TimelineRow({ 
  chapter, 
  idx 
}: { 
  chapter: typeof chapters[0]; 
  idx: number; 
}) {
  const isLeft = idx % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const initialStyles = isMobile ? { opacity: 0 } : { opacity: 0, x: isLeft ? -30 : 30 };
  const animateStyles = isInView ? { opacity: 1, x: 0 } : initialStyles;

  return (
    <div 
      ref={ref}
      className="relative w-full flex flex-col lg:flex-row lg:items-center min-h-[120px] my-6 lg:my-8 pl-10 sm:pl-14 lg:pl-0"
    >
      {/* Golden Checkpoint Circle */}
      <div 
        className="absolute left-3 sm:left-6 lg:left-1/2 top-[24px] sm:top-[28px] lg:top-1/2 -translate-y-1/2 lg:-translate-x-1/2 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-yellow-500/20 bg-black text-center shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all duration-500"
      >
        {/* Glow inner circle */}
        <div className="absolute inset-0.5 rounded-full border border-yellow-500/10 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none" />
        <span className="font-mono text-[10px] sm:text-xs text-yellow-500/90 font-bold tracking-tight">
          {chapter.number}
        </span>
      </div>

      {/* Alternating Cards Layout */}
      
      {/* Left side Card (Desktop only) */}
      <div className={`w-full lg:w-1/2 lg:pr-16 flex justify-end text-right hidden lg:flex ${isLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        {isLeft && (
          <Link href={chapter.href} className="group text-right max-w-md block">
            <motion.div
              initial={initialStyles}
              animate={animateStyles}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/5 hover:border-yellow-500/20 bg-neutral-950/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:bg-neutral-900/40"
            >
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-500/60 font-bold block mb-1">
                CHAPTER {chapter.number}
              </span>
              <h3 className="font-display text-base sm:text-lg uppercase tracking-wider text-white group-hover:text-yellow-400 transition-colors duration-300 font-bold">
                {chapter.title}
              </h3>
              {chapter.subtitle && (
                <p className="text-[11px] text-zinc-400 font-body mt-2 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {chapter.subtitle}
                </p>
              )}
            </motion.div>
          </Link>
        )}
      </div>

      {/* Spacer for Desktop center */}
      <div className="hidden lg:block lg:w-0" />

      {/* Right side Card (Desktop) / Stacking Card (Mobile) */}
      <div className={`w-full lg:w-1/2 lg:pl-16 flex justify-start text-left ${!isLeft ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0"}`}>
        {(!isLeft || typeof window !== "undefined") && (
          <Link 
            href={chapter.href} 
            className={`group text-left max-w-md block w-full lg:w-auto ${isLeft ? "lg:hidden" : ""}`}
          >
            <motion.div
              initial={initialStyles}
              animate={animateStyles}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/5 hover:border-yellow-500/20 bg-neutral-950/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:bg-neutral-900/40"
            >
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-500/60 font-bold block mb-1">
                CHAPTER {chapter.number}
              </span>
              <h3 className="font-display text-base sm:text-lg uppercase tracking-wider text-white group-hover:text-yellow-400 transition-colors duration-300 font-bold">
                {chapter.title}
              </h3>
              {chapter.subtitle && (
                <p className="text-[11px] text-zinc-400 font-body mt-2 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {chapter.subtitle}
                </p>
              )}
            </motion.div>
          </Link>
        )}
      </div>

    </div>
  );
}

export default function HomePage() {
  // Viewport check state
  const [isMobile, setIsMobile] = useState(false);

  // Mouse Parallax coordinates
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMouseParallax({ x, y });
  };

  // Scroll animations mapping
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1.05, 1.01]);
  const bgOpacity = useTransform(scrollY, [0, 600], [0.30, 0.05]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -40]);
  const heroContentOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  // Bypass scroll animations on mobile devices to preserve 60fps
  const scaleVal = isMobile ? 1.02 : bgScale;
  const opacityVal = isMobile ? 0.22 : bgOpacity;
  const heroYVal = isMobile ? 0 : heroContentY;
  const heroOpacityVal = isMobile ? 1 : heroContentOpacity;

  // Split title words
  const titleWords = ["VIRAT", "KOHLI"];

  // Slice chapters 1 to 18 (excluding home)
  const timelineChapters = chapters.slice(1);

  return (
    <main 
      className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between select-none font-body scroll-smooth"
      onMouseMove={handleMouseMove}
    >
      {/* GLOBAL KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes sweepLine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.03); }
        }
        .animate-sweep {
          animation: sweepLine 6s ease-in-out infinite;
        }
        .stadium-beam {
          animation: pulseGlow 14s ease-in-out infinite;
        }
      `}</style>

      {/* LAYER 1: CINEMATIC FULL SCREEN BACKDROP (SLOW ZOOM ON PAGE LOAD) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 1.10, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 0.26 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            backgroundImage: "url('/assets/home/king_of_cricket.jpg')",
            scale: scaleVal,
            opacity: opacityVal,
            x: isMobile ? 0 : mouseParallax.x * 12,
            y: isMobile ? 0 : mouseParallax.y * 12
          }}
          className="absolute inset-0 bg-cover bg-center md:bg-[center_top_12%] brightness-[0.40] contrast-[1.10] z-0"
        />
      </div>

      {/* LAYER 2: DARK GRADIENT OVERLAYS (BLENDS EDGES INTO ZERO BLACK) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/85 via-black/90 to-black" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_15%,_#000000_85%)]" />

      {/* LAYER 3: VOLUMETRIC SPOTLIGHT BEAMS (GOLD ACCENTS) */}
      <motion.div
        style={{
          x: isMobile ? 0 : mouseParallax.x * -15,
          y: isMobile ? 0 : mouseParallax.y * -15
        }}
        className="stadium-beam absolute top-[-15%] left-[25%] h-[550px] w-[550px] rounded-full bg-yellow-500/[0.015] filter blur-[140px] z-5 pointer-events-none"
      />
      <motion.div
        style={{
          x: isMobile ? 0 : mouseParallax.x * 18,
          y: isMobile ? 0 : mouseParallax.y * 18
        }}
        className="stadium-beam absolute bottom-[15%] right-[15%] h-[500px] w-[500px] rounded-full bg-[#f7e7ce]/[0.01] filter blur-[150px] z-5 pointer-events-none"
      />

      {/* LAYER 4: FLOATING GOLD PARTICLES */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ParticleField />
      </div>

      {/* LAYER 5: BACKGROUND WATERMARK TYPOGRAPHY */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex items-center justify-center">
        <div className="font-display text-[22vw] font-black text-white/[0.007] uppercase tracking-[0.3em] leading-none font-mono">
          LEGEND
        </div>
      </div>

      <CinematicHeader />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO LANDING SCREEN
          ───────────────────────────────────────────────────────────── */}
      <motion.div 
        className="relative z-20 flex-grow flex flex-col items-center justify-center w-full max-w-[1280px] mx-auto px-6 py-24 sm:py-32 md:py-40 text-center"
        style={{
          y: heroYVal,
          opacity: heroOpacityVal
        }}
      >
        {/* Bat highlight sweep line */}
        <div className="absolute top-[26%] w-[240px] h-[1px] bg-white/5 overflow-hidden hidden md:block">
          <div className="animate-sweep absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
        </div>

        <div className="flex flex-col items-center space-y-5 md:space-y-6 max-w-3xl relative">
          
          {/* Glowing Jersey 18 Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center space-y-2"
          >
            <motion.div
              animate={{ 
                textShadow: [
                  "0 0 15px rgba(212, 175, 55, 0.2)",
                  "0 0 30px rgba(212, 175, 55, 0.5)",
                  "0 0 15px rgba(212, 175, 55, 0.2)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="font-display text-5xl sm:text-6xl md:text-7xl text-yellow-500/90 font-extrabold tracking-tighter font-mono"
            >
              18
            </motion.div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.45em] text-white/30 uppercase font-bold">
              2008 → PRESENT
            </span>
          </motion.div>

          {/* Centered Large Title */}
          <motion.h1 
            className="font-display text-white font-black uppercase tracking-tight leading-none flex flex-wrap justify-center gap-x-4 sm:gap-x-6"
            style={{ fontSize: "clamp(2.5rem, 11vw, 8rem)" }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.18 } }
            }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 15 : 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
            className="font-display text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] sm:tracking-[0.45em] text-yellow-500/80 px-2"
          >
            THE KING OF MODERN CRICKET
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.65, y: 0 }}
            transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }}
            className="max-w-xl text-white text-xs sm:text-sm leading-relaxed font-body px-4 sm:px-0"
          >
            From a fearless Under-19 captain to the defining cricketer of his generation, Virat Kohli transformed modern cricket through relentless excellence, unmatched intensity, and an obsession with greatness.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="flex flex-col items-center gap-2 pt-6 sm:pt-10 text-[9px] uppercase tracking-[0.35em] text-white/20 font-bold font-mono"
          >
            <span>Scroll to Enter</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
          </motion.div>

        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE STORY OF A GENERATION
          ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full max-w-[1280px] mx-auto px-6 py-24 sm:py-36 md:py-48 flex flex-col justify-center items-center overflow-hidden border-t border-white/5">
        <ScrollRevealLine text="Not just a cricketer." delay={0} />
        <ScrollRevealLine text="Not just a captain." delay={0.15} />
        <ScrollRevealLine text="Not just a run machine." delay={0.3} />
        <ScrollRevealLine text="A generation." delay={0.45} isGold />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TIMELINE PREVIEW (18-CHAPTER PATH)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full max-w-[1280px] mx-auto px-6 py-16 sm:py-24 md:py-28 border-t border-white/5">
        
        {/* Title */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-[10px] font-mono tracking-[0.45em] text-yellow-500/80 uppercase font-bold block mb-3">
            THE MUSEUM PATH
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-widest font-black px-2">
            The 18-Chapter Documentary
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-body mt-4 max-w-md mx-auto px-4">
            An emotional, interactive journey through the milestones, fire, and legacy of cricket's most compelling figure.
          </p>
        </div>

        {/* Interactive Glowing Timeline Path */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-yellow-600/15 via-yellow-500/35 to-yellow-600/15 lg:-translate-x-1/2 z-0" />

          {/* Render 18 Chapters */}
          <div className="relative z-10 w-full flex flex-col">
            {timelineChapters.map((chapter, idx) => (
              <TimelineRow 
                key={chapter.id} 
                chapter={chapter} 
                idx={idx} 
              />
            ))}
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER & ACKNOWLEDGEMENTS
          ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 py-12 border-t border-white/5 bg-black flex flex-col justify-center items-center gap-6">
        
        <div className="text-center space-y-1.5 select-none px-4">
          <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-bold font-mono">
            Created By
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-white font-extrabold font-display">
            A Virat Kohli Admirer
          </p>
          <p className="text-[9px] text-zinc-500 font-mono tracking-wider max-w-sm mx-auto mt-1 leading-relaxed">
            Built with passion, respect, and admiration for one of cricket's greatest stories. This digital museum exists to celebrate the journey, struggles, achievements, legacy, and impact of Virat Kohli.
          </p>
        </div>

        <button
          onClick={() => setIsSourcesOpen(true)}
          className="px-6 py-2.5 rounded-full border border-yellow-500/20 bg-black text-yellow-500/80 font-mono text-[9px] uppercase tracking-[0.3em] hover:bg-yellow-500/10 hover:text-yellow-400 hover:border-yellow-500/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 font-bold"
        >
          Research & Sources
        </button>

        <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold font-mono mt-2">
          © InTroVerT262 • All Rights Reserved
        </p>
      </footer>

      {/* Sources Modal overlay */}
      <AnimatePresence>
        {isSourcesOpen && (
          <SourcesModal isOpen={isSourcesOpen} onClose={() => setIsSourcesOpen(false)} />
        )}
      </AnimatePresence>

      <ChapterNav />
    </main>
  );
}

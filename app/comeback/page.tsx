"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

// Web Audio API Heartbeat and Chime Synthesizer (SSR Safe)
let audioCtx: AudioContext | null = null;

function playHeartbeat() {
  if (typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const ctx = audioCtx;
    const now = ctx.currentTime;
    
    // First thud
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(55, now);
    osc1.frequency.exponentialRampToValueAtTime(8, now + 0.3);
    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(now + 0.35);

    // Second thud (systole-diastole rhythm)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const now2 = now + 0.16;
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(50, now2);
    osc2.frequency.exponentialRampToValueAtTime(8, now2 + 0.28);
    gain2.gain.setValueAtTime(0.18, now2);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now2 + 0.28);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();
    osc2.stop(now2 + 0.3);
  } catch (e) {
    // Ignore context blocked
  }
}

function playTransitionSweep() {
  if (typeof window === "undefined" || !audioCtx) return;
  try {
    const ctx = audioCtx;
    const now = ctx.currentTime;
    
    // Wind noise sweep
    const bufferSize = ctx.sampleRate * 2.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(80, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(100, now + 2.0);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    // High chime bell
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now + 0.4);
    osc.frequency.setValueAtTime(1320, now + 0.65);
    oscGain.gain.setValueAtTime(0.001, now + 0.4);
    oscGain.gain.linearRampToValueAtTime(0.02, now + 0.45);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(now + 2.0);
  } catch (e) {
    // Fail silently
  }
}

// Reusable containment image card system
function PremiumImage({ src, alt, className = "", aspect = "aspect-[3/4]" }: { src: string; alt: string; className?: string; aspect?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 ${aspect} flex items-center justify-center group ${className}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt}
        className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
      />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-shine" />
    </div>
  );
}

export default function ComebackPage() {
  const [splashScreen, setSplashScreen] = useState(true);
  const [introStep, setIntroStep] = useState(0); 
  // 0: silence stats, 1: wait timeline, 2: breakthrough 71, 3: wait over, 4: reveal
  const [introStarted, setIntroStarted] = useState(false);

  // Intro step timer flow
  useEffect(() => {
    if (!introStarted) return;
    
    // Rhythmic Heartbeat loop
    playHeartbeat();
    const heartbeatTimer = setInterval(() => {
      playHeartbeat();
    }, 1200);

    const step0 = setTimeout(() => setIntroStep(1), 1500);
    const step1 = setTimeout(() => setIntroStep(2), 3000);
    const step2 = setTimeout(() => setIntroStep(3), 4500);
    const step3 = setTimeout(() => {
      clearInterval(heartbeatTimer);
      playTransitionSweep();
      setIntroStep(4);
    }, 6000);

    return () => {
      clearInterval(heartbeatTimer);
      clearTimeout(step0);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, [introStarted]);

  const startChapter = () => {
    setSplashScreen(false);
    setIntroStarted(true);
  };

  return (
    <main className="relative min-h-screen theme-masterclass text-white flex flex-col justify-between overflow-x-hidden select-none font-body scroll-smooth">
      
      <style>{`
        @keyframes goldDustRise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          12% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
        @keyframes auroraGlow {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.15; }
          50% { transform: rotate(180deg) scale(1.15); opacity: 0.3; }
        }
        .aurora-blend {
          animation: auroraGlow 25s ease-in-out infinite;
        }
        .animate-shine {
          animation: sweepLine 3s ease-in-out infinite;
        }
      `}</style>

      {/* 1. CINEMATIC SPLASH CROWNING INITIATOR */}
      <AnimatePresence>
        {splashScreen && (
          <motion.div
            key="splash-overlay"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-[#0a0d14] flex flex-col justify-center items-center font-display"
          >
            {/* Ambient Background Glows */}
            <div className="absolute h-[400px] w-[400px] rounded-full bg-blue-600/5 filter blur-[120px] pointer-events-none" />
            <div className="absolute h-[300px] w-[300px] rounded-full bg-yellow-500/5 filter blur-[100px] pointer-events-none" />
            
            <div className="z-10 space-y-8 flex flex-col items-center">
              <div className="flex flex-col items-center space-y-2">

                <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-[0.15em] leading-none text-center">
                  THE REDEMPTION
                </h1>
              </div>

              <button
                onClick={startChapter}
                className="px-8 py-3.5 rounded-full border border-yellow-500/35 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.15)]"
              >
                Enter The Coronation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SILENT TIMELINE INTRO OVERLAY */}
      <AnimatePresence>
        {!splashScreen && introStep < 4 && (
          <motion.div
            key="intro-timeline"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#0a0d14] flex flex-col justify-center items-center px-6 text-center font-display"
          >
            {/* Diagnostic scan lines */}
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] [background-size:100%_4px] pointer-events-none opacity-20" />
            <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-600/5 filter blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg space-y-12">
              
              {/* Dynamic Step Display */}
              <div className="h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {introStep === 0 && (
                    <motion.div
                      key="intro-step-0"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-3"
                    >
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">SYSTEM DATA CORRUPTION</span>
                      <div className="text-4xl md:text-5xl font-black text-slate-400 tracking-wide">STATISTICS FADING</div>
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Century metrics: 70 (Frozen since 2019)</p>
                    </motion.div>
                  )}

                  {introStep === 1 && (
                    <motion.div
                      key="intro-step-1"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-3"
                    >
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">ACOUSTIC DROUGHT</span>
                      <div className="text-4xl md:text-5xl font-black text-slate-400 tracking-wide">CROWD DISAPPEARING</div>
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Ambient chants fading into silent static</p>
                    </motion.div>
                  )}

                  {introStep === 2 && (
                    <motion.div
                      key="intro-step-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.15 }}
                      exit={{ opacity: 0, scale: 1.3 }}
                      className="space-y-2"
                    >
                      <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-widest block font-bold">TARGET UNLOCKED</span>
                      <div className="text-7xl md:text-8xl font-black text-yellow-500 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                        71
                      </div>
                    </motion.div>
                  )}

                  {introStep === 3 && (
                    <motion.div
                      key="intro-step-3"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-2"
                    >
                      <div className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase">THE WAIT IS OVER</div>
                      <div className="text-xs font-mono text-yellow-500 uppercase tracking-[0.4em] font-bold">THE KING RETURNS</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Heartbeat pulse cue */}
              <div className="flex justify-center items-center gap-1.5 font-mono text-[9px] text-cyan-400/40 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span>RHYTHMIC PULSE TRACKING...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CinematicHeader />

      {/* MAIN STORYTELLING FRAMEWORK */}
      {!splashScreen && introStep === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="relative z-10 w-full"
        >
          {/* STAGE HEADER */}
          <section className="px-6 pt-36 pb-16 lg:px-16 max-w-[1440px] mx-auto w-full text-center relative overflow-hidden">
            <span className="text-xs uppercase tracking-[0.3em] text-yellow-500 font-bold font-mono">
              THE RETURN OF THE KING
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-widest text-white mt-4 font-black leading-none drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              AFTER 1020 DAYS
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-blue-300 font-bold font-mono mt-3">
              THE CENTURY THAT CHANGED EVERYTHING
            </p>
            
          </section>

          {/* THE 4-PHASE TIMELINE EXPERIENCE */}
          <div className="w-full space-y-0">
            
            {/* PHASE 1: THE SILENCE (2020) — Cold, Desaturated Grey/Blue */}
            <section className="w-full min-h-screen py-24 bg-gradient-to-b from-[#02050f] via-[#050b18] to-[#080d19] flex flex-col justify-center border-t border-white/5 relative">
              <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-6 text-left space-y-6"
                >
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black block">
                    PHASE I // THE SILENCE [2020]
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl text-slate-300 uppercase tracking-wider font-extrabold leading-none">
                    Struggle & Fog
                  </h2>
                  <div className="h-[2px] w-16 bg-slate-600/35 rounded-full" />
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-body">
                    A heavy silence settles over the crease. Captaincy shifts, lockdowns, and empty stadium echoes make expectations feel heavier than ever. Desaturated colors and cold blue tones dominate as the standard benchmark dries up.
                  </p>
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                    ACOUSTIC STATE: NULL CENTURIES / CRITICISM INCREASING
                  </div>
                </motion.div>

                {/* Illustrated stress dashboard */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[420px] aspect-[16/10] rounded-3xl border border-slate-700/10 bg-slate-900/10 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                    <div>
                      <span className="text-[7.5px] uppercase tracking-widest text-slate-600 font-mono block mb-0.5">CRITICAL SPECTRUM</span>
                      <span className="font-display text-sm text-slate-400 font-bold block uppercase tracking-wide">Pressure Coefficient</span>
                    </div>
                    <div className="h-16 w-full flex items-end gap-1 pb-2 border-b border-white/5">
                      {[40, 58, 80, 95, 90, 68, 52, 38, 75, 98, 70, 15].map((val, idx) => (
                        <div key={idx} className="flex-grow bg-slate-600/20 rounded-t-sm" style={{ height: `${val}%` }} />
                      ))}
                    </div>
                    <span className="text-[8px] text-slate-600 font-mono uppercase tracking-wider mt-2 block">STATUS: BATTING WITH QUESTIONS</span>
                  </div>
                </div>

              </div>
            </section>

            {/* PHASE 2: THE WAIT (2021-2022) — Animated Timeline & Fading Chants */}
            <section className="w-full min-h-screen py-24 bg-gradient-to-b from-[#080d19] to-[#0c152a] flex flex-col justify-center border-b border-white/5 relative">
              <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Year sequence display */}
                <div className="lg:col-span-6 flex justify-center lg:order-first order-last">
                  <div className="w-full max-w-[400px] aspect-square rounded-3xl border border-slate-700/20 bg-slate-950/40 p-8 flex flex-col justify-between text-left backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
                    <div className="text-slate-600 font-mono text-[9px] tracking-widest uppercase">
                      PHASE II // TIMELINE SECTORS
                    </div>

                    <div className="space-y-6 my-auto font-mono">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-slate-500">2020</span>
                        <div className="h-[1px] flex-grow bg-slate-800" />
                        <span className="text-[10px] text-slate-400">Captaincy Pressure & empty lockouts</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-slate-400">2021</span>
                        <div className="h-[1px] flex-grow bg-slate-800" />
                        <span className="text-[10px] text-slate-400">Search for trigger rhythm stance</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-yellow-500 animate-pulse">2022</span>
                        <div className="h-[1px] flex-grow bg-yellow-500/20" />
                        <span className="text-[10px] text-white/80">Deciding to step away & reset</span>
                      </div>
                    </div>

                    <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                      1,021 DAYS IN COLD ISOLATION
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-6 text-left space-y-6"
                >
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black block">
                    PHASE II // THE WAIT [2021-2022]
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl text-slate-300 uppercase tracking-wider font-extrabold leading-none">
                    Questions & Time
                  </h2>
                  <div className="h-[2px] w-16 bg-slate-600/35 rounded-full" />
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-body">
                    Media segments dissect stance positions. Analysts debate off-stump triggers. Crowd noise fades into static, stats dissolve, and critics ask if the peak has passed. Virat steps away from the field entirely for 30 days, not picking up a bat, to reclaim his inner space.
                  </p>
                </motion.div>

              </div>
            </section>

            {/* PHASE 3: THE BREAKTHROUGH (The 71st) — Royal Blue, Purple Jersey & Gold Sparks */}
            <section className="w-full min-h-screen py-24 bg-gradient-to-b from-[#0c152a] via-[#12204c] to-[#1b265c] flex flex-col justify-center border-b border-white/5 relative">
              
              {/* Golden dust rising animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(18)].map((_, i) => {
                  const size = Math.random() * 3 + 2;
                  const left = Math.random() * 100;
                  const duration = Math.random() * 6 + 4;
                  return (
                    <span
                      key={i}
                      className="absolute rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        bottom: `-10px`,
                        animation: `goldDustRise ${duration}s linear infinite`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  );
                })}
              </div>

              {/* Aurora background glow */}
              <div className="aurora-blend absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08)_0%,_transparent_75%)] pointer-events-none z-0" />

              <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-6 text-left space-y-6"
                >
                  <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-widest font-black block">
                    PHASE III // THE BREAKTHROUGH [71]
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider font-black leading-none drop-shadow-md">
                    71: The Breakthrough
                  </h2>
                  <div className="h-[2px] w-20 bg-yellow-500/50 rounded-full" />
                  <p className="font-display text-sm md:text-base text-yellow-400 uppercase tracking-[0.2em] font-bold">
                    THE CENTURY THAT CHANGED EVERYTHING
                  </p>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed font-body">
                    Dubai, September 2022. An emotional 122* vs Afghanistan in the Asia Cup. Wearing the purple jersey, bringing up the hundred with a signature lofted pull, Kohli kissed his ring and smiled. A smile of sheer relief, faith, and returning joy.
                  </p>
                </motion.div>

                {/* Purple jersey smiling/bat raised images */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <PremiumImage 
                    src="/assets/comeback/71st_century_1.jpg" 
                    alt="71st Century Dubai - purple jersey smile"
                    aspect="aspect-[3/4]"
                  />
                  <div className="mt-6">
                    <PremiumImage 
                      src="/assets/comeback/71st_century_2.jpg" 
                      alt="71st Century Dubai - purple jersey bat raised"
                      aspect="aspect-[3/4]"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* PHASE 4: THE RETURN OF THE KING — Royal Blue & Triumphant Gold */}
            <section className="w-full min-h-screen py-24 bg-gradient-to-b from-[#1b265c] to-[#020617] flex flex-col justify-center relative overflow-hidden">
              
              {/* Confetti simulation to close redemption scene */}
              <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
                {[...Array(20)].map((_, i) => {
                  const size = Math.random() * 5 + 3;
                  const left = Math.random() * 100;
                  const duration = Math.random() * 5 + 4;
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-sm bg-yellow-500/60 opacity-60"
                      style={{
                        width: `${size}px`,
                        height: `${size * 1.5}px`,
                        left: `${left}%`,
                        top: -20
                      }}
                      animate={{
                        y: [0, 1000],
                        x: [0, (Math.random() - 0.5) * 80],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.2
                      }}
                    />
                  );
                })}
              </div>

              <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* World Cup Trophy Photo */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[340px]">
                    <PremiumImage 
                      src="/assets/t20/photo3.jpg" 
                      alt="Virat Kohli T20 World Cup 2024 Final Innings"
                      aspect="aspect-[9/16]"
                    />
                    <span className="text-[8px] uppercase tracking-wider text-yellow-500 font-mono mt-3 block text-center">
                      Barbados 2024 // The Final Championship Masterclass
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-6 text-left space-y-6"
                >
                  <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-widest font-black block">
                    PHASE IV // IMMORTALITY
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider font-extrabold leading-none">
                    Confidence & Glory
                  </h2>
                  <div className="h-[2px] w-16 bg-yellow-500/50 rounded-full" />
                  
                  <blockquote className="border-l-4 border-yellow-500 pl-4 py-1.5 my-2">
                    <p className="font-display text-lg text-white italic leading-relaxed">
                      "The silence ended. The king returned."
                    </p>
                  </blockquote>

                  <p className="text-white/75 text-xs md:text-sm leading-relaxed font-body">
                    Gold, royal blue, stadium lights, and confidence. Reclaiming absolute red-ball authority in Ahmedabad. BOWING in respect to the Wankhede crowd as he broke Sachin's long-standing ODI century record. Fulfilling the dream as a T20 World Champion in Barbados 2024.
                  </p>
                </motion.div>

              </div>
            </section>

          </div>

          {/* REDEMPTION EPILOGUE */}
          <section className="relative z-10 px-6 py-24 max-w-[800px] mx-auto w-full text-center">
            <div className="border-t border-white/5 py-16">
              <span className="text-[9px] uppercase tracking-[0.25em] text-yellow-400 font-mono font-bold block mb-2">
                EPILOGUE // THE VERDICT
              </span>
              <p className="font-display text-2xl md:text-3xl text-white leading-relaxed uppercase tracking-wider font-black">
                The comeback was not just a recovery of form; it was the coronation of an immortal.
              </p>
            </div>
          </section>

        </motion.div>
      )}

      {/* FOOTER METADATA */}
      <footer className="relative z-20 py-6 border-t border-white/5 bg-transparent text-center">
        
      </footer>

      <ChapterNav />
    </main>
  );
}

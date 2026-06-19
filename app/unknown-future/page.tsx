"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function UnknownFuturePage() {
  const [stage, setStage] = useState<number>(0); // 0: Intro, 1: Final Outro
  const [introTextIndex, setIntroTextIndex] = useState<number>(0); // 0: Chapter 18, 1: The End?, 2: Or Just The Beginning...
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>();

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Generate floating background particles
  useEffect(() => {
    const generated = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100, // Start below screen
      size: Math.random() * 2 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 10 + 6
    }));
    setParticles(generated);
  }, []);

  // Synthesize low-frequency heartbeat sound using Web Audio API
  const triggerHeartbeat = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Heartbeat pulse 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.35);
      gain1.gain.setValueAtTime(0.4, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);

      // Heartbeat pulse 2 (softer and slightly delayed)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(50, ctx.currentTime + 0.28);
      osc2.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.6);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.28);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio context block by browser security is caught silently
    }
  };

  // Stage 0: Entry Cinematic Text Reveals
  useEffect(() => {
    if (stage !== 0) return;

    // Heartbeat visual & optional sound triggers
    const pulseInterval = setInterval(() => {
      triggerHeartbeat();
    }, 1600);

    // Sequence texts
    // "Chapter 18" -> 2.5s
    const t1 = setTimeout(() => {
      setIntroTextIndex(1); // "The End?"
    }, 2500);

    // "The End?" -> 2.7s
    const t2 = setTimeout(() => {
      setIntroTextIndex(2); // "Or Just The Beginning..."
    }, 5200);

    // Fade and transition directly to the Outro stage
    const t3 = setTimeout(() => {
      clearInterval(pulseInterval);
      setStage(1); // Transition to Grand Outro
    }, 8500);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [stage]);

  return (
    <main 
      onClick={triggerHeartbeat} // User click unlocks Audio Context for heartbeats
      className="relative w-screen min-h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden select-none"
    >
      {/* Cinematic grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Ambient Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", x: `${p.x}vw`, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: p.size,
              height: p.size,
              filter: "blur(0.5px)"
            }}
          />
        ))}
      </div>

      {/* Pulsing vignette heartbeat background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.95) 100%)"
        }}
      />

      <AnimatePresence mode="wait">
        {/* STAGE 0: ENTRY ANIMATIONS */}
        {stage === 0 && (
          <motion.div 
            key="stage-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col justify-center items-center text-center px-6"
          >
            <AnimatePresence mode="wait">
              {introTextIndex === 0 && (
                <motion.div
                  key="chapter-18"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="space-y-4"
                >

                  <h1 className="font-display text-4xl md:text-6xl text-white uppercase tracking-[0.2em] font-light">
                    18
                  </h1>
                </motion.div>
              )}

              {introTextIndex === 1 && (
                <motion.h2
                  key="the-end"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="font-display text-4xl md:text-6xl text-white uppercase tracking-[0.1em]"
                >
                  The End?
                </motion.h2>
              )}

              {introTextIndex === 2 && (
                <motion.h2
                  key="or-beginning"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="font-display text-2xl md:text-5xl text-amber-400 uppercase tracking-[0.25em] drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                >
                  Or Just The Beginning...
                </motion.h2>
              )}
            </AnimatePresence>

            {/* Visual heartbeat pulse waves */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <motion.div 
                animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                className="w-48 h-48 rounded-full border border-amber-500/25"
              />
            </div>
          </motion.div>
        )}

        {/* STAGE 1: GRAND FINALE OUTRO SCREEN */}
        {stage === 1 && (
          <motion.div 
            key="stage-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            className="relative z-10 flex flex-col justify-center items-center text-center px-6 min-h-screen w-screen"
          >
            {/* Slow camera zoom scale effect */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 15, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
                className="font-display text-xl sm:text-3xl md:text-7xl font-bold uppercase text-white tracking-[0.15em] md:tracking-[0.38em] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                To Be Continued...
              </motion.h1>
              
              <div className="w-16 h-[1px] bg-amber-500/40 mx-auto my-6" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 1, 0.8, 1] }}
                transition={{ duration: 3, delay: 2.8, ease: "easeOut" }}
                className="space-y-2"
              >
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-amber-500/80 font-bold block">
                  PEAK LOADING
                </span>
                <h3 className="font-display text-3xl md:text-5xl text-amber-500 font-extrabold uppercase tracking-widest drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                  2027<span className="animate-pulse inline-block text-white ml-1 font-mono">?</span>
                </h3>
              </motion.div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 5.5, duration: 1.5 }}
              className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 z-30"
            >
              <Link
                href="/"
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60 hover:text-amber-500 border border-white/10 hover:border-amber-500/30 bg-white/5 hover:bg-amber-500/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
              >
                ← Return to Start
              </Link>
            </motion.div>

            {/* Final Vignette Fadeout overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/80 to-black pointer-events-none opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Volume2, 
  VolumeX, 
  Heart, 
  ShieldAlert, 
  Skull, 
  Flame, 
  TrendingUp, 
  EyeOff, 
  MessageSquare,
  Award
} from "lucide-react";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

// Web Audio API Heartbeat and Storm Wind rumble synthesizer (SSR Safe)
let audioCtx: AudioContext | null = null;
let windNode: AudioWorkletNode | ScriptProcessorNode | null = null;
let windGain: GainNode | null = null;

function playHeartbeatSound() {
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
    
    // First beat (lub)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(50, now);
    osc1.frequency.exponentialRampToValueAtTime(10, now + 0.25);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(now + 0.3);

    // Second beat (dub)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const now2 = now + 0.15;
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(45, now2);
    osc2.frequency.exponentialRampToValueAtTime(10, now2 + 0.25);
    gain2.gain.setValueAtTime(0.22, now2);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now2 + 0.25);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();
    osc2.stop(now2 + 0.3);
  } catch (e) {}
}

function startWindSound() {
  if (typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    
    const ctx = audioCtx;
    
    // Generate low frequency white noise for wind rumble
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(60, ctx.currentTime);
    
    // Modulate filter frequency slowly to simulate wind gusting
    const modulator = ctx.createOscillator();
    modulator.frequency.value = 0.2; // 0.2 Hz
    const modulatorGain = ctx.createGain();
    modulatorGain.gain.value = 35; // sweep range: 25Hz to 95Hz
    
    modulator.connect(modulatorGain);
    modulatorGain.connect(filter.frequency);
    modulator.start();
    
    windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.05, ctx.currentTime);
    
    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(ctx.destination);
    
    whiteNoise.start();
    
    // Keep reference to stop it
    (window as any).windSource = whiteNoise;
    (window as any).windModulator = modulator;
  } catch (e) {}
}

function stopWindSound() {
  try {
    if ((window as any).windSource) {
      (window as any).windSource.stop();
      (window as any).windSource = null;
    }
    if ((window as any).windModulator) {
      (window as any).windModulator.stop();
      (window as any).windModulator = null;
    }
  } catch (e) {}
}

function StormParticles({ color = "rgba(220, 38, 38, 0.15)" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fade: number;
    }> = [];

    const createParticle = () => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: Math.random() * 2.5 + 0.5,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: -(Math.random() * 1.5 + 0.5),
      opacity: Math.random() * 0.5 + 0.2,
      fade: Math.random() * 0.005 + 0.001
    });

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        ...createParticle(),
        y: Math.random() * height
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fade;

        if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[idx] = createParticle();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.shadowBlur = 4;
        ctx.shadowColor = color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

const headlines = [
  "IS IT TIME FOR VIRAT TO SAY GOODBYE?",
  "THE END OF THE KOHLI ERA",
  "KOHLI'S GREAT DECLINE",
  "CENTURY DROUGHT CONTINUES",
  "SHOULD INDIA MOVE ON?",
  "FROM IMMORTAL TO DROPPABLE",
  "CAN'T BUY A RUN",
  "THE KING WITHOUT A CROWN"
];

const comments = [
  "Drop him! Average is below 30.",
  "Finished player. Just playing for advertisements.",
  "He is dragging down the whole batting unit.",
  "We need young blood. Kohli needs domestic cricket.",
  "Selfish innings today, consumed 15 balls in powerplay.",
  "Dhoni was replaced, Tendulkar retired. Why is Kohli untouchable?",
  "He looks cooked. The hand-eye coordination is gone.",
  "Captaincy pressure has broken him completely."
];

export default function PriceOfGreatnessPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [introState, setIntroState] = useState<"not-started" | "headlines" | "hero-reveal" | "scrolling">("not-started");
  const [heroTextStep, setHeroTextStep] = useState(0);
  const [activeHeartbeat, setActiveHeartbeat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResponsive = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    handleResponsive();
    window.addEventListener("resize", handleResponsive);
    return () => window.removeEventListener("resize", handleResponsive);
  }, []);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const grayscaleVal = useTransform(scrollYProgress, [0.15, 0.35], ["grayscale(0%)", "grayscale(100%)"]);
  const rcbOverlayOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 0.75]);

  // Audio Handler
  useEffect(() => {
    if (soundEnabled && introState !== "not-started") {
      startWindSound();
    } else {
      stopWindSound();
    }
    return () => stopWindSound();
  }, [soundEnabled, introState]);

  // Heartbeat loop handler when active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeHeartbeat && soundEnabled) {
      interval = setInterval(() => {
        playHeartbeatSound();
      }, 1000); // 60 BPM
    }
    return () => clearInterval(interval);
  }, [activeHeartbeat, soundEnabled]);

  // Hero Reveal sequence
  useEffect(() => {
    if (introState === "headlines") {
      const timeoutVal = isMobile ? 6500 : 4500;
      const timer = setTimeout(() => {
        setIntroState("hero-reveal");
      }, timeoutVal);
      return () => clearTimeout(timer);
    }
  }, [introState, isMobile]);

  useEffect(() => {
    if (introState === "hero-reveal") {
      const interval = setInterval(() => {
        setHeroTextStep(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            setTimeout(() => {
              setIntroState("scrolling");
              // Enable scrolling
              document.body.style.overflow = "unset";
            }, 2500);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [introState]);

  const startJourney = () => {
    // Lock body scroll during intro
    document.body.style.overflow = "hidden";
    setIntroState("headlines");
    setSoundEnabled(true);
  };

  // Trigger heartbeat pulsing in Section 5
  useEffect(() => {
    const handleScroll = () => {
      const section5 = document.getElementById("section-silence");
      if (section5) {
        const rect = section5.getBoundingClientRect();
        const inView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
        setActiveHeartbeat(inView);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen theme-darkness text-[#F3F4F6] overflow-x-hidden font-body selection:bg-red-800 selection:text-white">
      <CinematicHeader />

      {/* SOUND CONTROL TOGGLE */}
      {introState !== "not-started" && (
        <button
          onClick={() => setSoundEnabled(prev => !prev)}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-black/80 text-red-500 backdrop-blur-xl transition hover:border-red-500/50 hover:bg-red-950/20"
        >
          {soundEnabled ? <Volume2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5 text-gray-500" />}
        </button>
      )}

      {/* INTRO SCREEN - NOT STARTED */}
      <AnimatePresence>
        {introState === "not-started" && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6"
          >
            {/* Soft blood-red ambient backlighting */}
            <div className="absolute h-[350px] w-[350px] rounded-full bg-red-900/10 filter blur-[100px] pointer-events-none" />
            <div className="absolute h-[250px] w-[250px] rounded-full bg-yellow-900/5 filter blur-[80px] pointer-events-none" />
            
            <div className="z-10 text-center space-y-12 max-w-2xl">
              <div className="space-y-3">

                <h1 className="text-4xl md:text-6xl font-display uppercase text-white tracking-[0.18em] leading-none font-bold">
                  THE PRICE OF GREATNESS
                </h1>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                  When the cheers disappeared, the expectations remained.
                </p>
              </div>

              <div className="w-16 h-[1px] bg-red-500/20 mx-auto" />

              <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-md mx-auto">
                Warning: This chapter contains simulated audio elements and addresses the psychological pressure, media backlash, and online toxicity directed at the cricketer.
              </p>

              <button
                onClick={startJourney}
                className="px-10 py-4 rounded-none border border-red-500/35 bg-red-950/5 text-red-500 hover:bg-red-600 hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
              >
                ENTER THE ARENA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TIMED HEADLINES OPENING SCENE */}
      <AnimatePresence>
        {introState === "headlines" && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none"
          >
            {/* Drift headlines */}
            {headlines.map((headline, idx) => {
              // Desktop layout (default)
              let xPos = [10, 45, 15, 60, 5, 50, 25, 40][idx];
              let yPos = [12, 22, 45, 55, 68, 78, 85, 33][idx];
              let size = [1.2, 1.8, 1.4, 2.2, 1.1, 1.5, 1.3, 1.7][idx];
              let rotation = 0;
              let delay = idx * 0.4;
              let duration = 3.5;
              let scaleVal = 1.05;

              if (isMobile) {
                // Mobile layout: stacked vertically, smaller, slightly rotated, centered
                xPos = [5, 4, 6, 5, 4, 6, 5, 4][idx];
                yPos = [6, 17, 28, 39, 50, 61, 72, 83][idx];
                size = [0.95, 1.1, 1.05, 1.15, 0.9, 1.1, 1.0, 1.1][idx];
                rotation = [-2, 1.5, -1, 2.5, -2.5, 1, -1.5, 2][idx];
                delay = idx * 0.25; // faster staggered delay on mobile to show all within the 6.5s limit
                duration = 4.2; // slower animations on mobile
                scaleVal = 1.02; // controlled scale movement
              } else if (isTablet) {
                // Tablet layout: scaled down intermediate layout
                xPos = [10, 45, 15, 55, 5, 48, 20, 35][idx];
                yPos = [12, 22, 42, 52, 65, 75, 82, 32][idx];
                size = [1.0, 1.4, 1.1, 1.6, 0.9, 1.2, 1.1, 1.3][idx];
                rotation = [-1, 1, -0.5, 1.5, -1, 0.5, -1, 1][idx];
                delay = idx * 0.35;
                duration = 3.8;
                scaleVal = 1.03;
              }
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: [0, 0.45, 0.45, 0], scale: scaleVal }}
                  transition={{ duration, delay, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    fontSize: `${size}rem`,
                    rotate: `${rotation}deg`,
                  }}
                  className="font-display font-bold uppercase tracking-wider text-white select-none text-center px-4 w-[90%] md:w-[450px]"
                >
                  {headline}
                </motion.div>
              );
            })}
            
            {/* Drifting comment strings */}
            {comments.slice(0, 5).map((comment, idx) => {
              let xPos = [70, 5, 80, 15, 65][idx];
              let yPos = [20, 60, 75, 10, 85][idx];
              let delay = idx * 0.6 + 0.2;
              let fontSize = "text-xs";
              let yOffset = -15;
              let duration = 3.2;

              if (isMobile) {
                // Mobile comments: interleaved vertically in between headlines
                xPos = [4, 12, 6, 8, 10][idx];
                yPos = [12, 34, 56, 78, 89][idx];
                delay = idx * 0.4 + 0.15;
                fontSize = "text-[9px]";
                yOffset = -5; // slower/controlled drift
                duration = 3.8;
              } else if (isTablet) {
                xPos = [60, 5, 70, 12, 55][idx];
                yPos = [20, 55, 70, 15, 80][idx];
                fontSize = "text-[10px]";
                yOffset = -10;
                duration = 3.5;
              }

              return (
                <motion.div
                  key={`comment-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: [0, 0.15, 0.15, 0], y: yOffset }}
                  transition={{ duration, delay, ease: "linear" }}
                  style={{
                    position: "absolute",
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                  }}
                  className={`font-mono ${fontSize} text-[#dc2626] tracking-widest whitespace-nowrap`}
                >
                  &gt; {comment}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO REVEAL MOMENT */}
      <AnimatePresence>
        {introState === "hero-reveal" && (
          <motion.div
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Background Newspaper Collage blend replaced with StormParticles */}
            <StormParticles color="rgba(220, 38, 38, 0.16)" />
            
            {/* Foreground container */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center px-6 text-center space-y-12">
              
              {/* Main portrait of Virat, emerging from darkness */}
              <motion.div 
                initial={{ opacity: 0, filter: "brightness(0)" }}
                animate={{ opacity: 1, filter: "brightness(0.7) contrast(1.1)" }}
                transition={{ duration: 3, delay: 0.5 }}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#121212]"
              >
                <img 
                  src="/assets/price-of-greatness/photo_shh.jpg" 
                  alt="Virat Kohli Shh"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              </motion.div>

              {/* Text sequence */}
              <div className="h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {heroTextStep === 1 && (
                    <motion.p
                      key="step-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-display text-xl md:text-2xl uppercase tracking-[0.25em] text-[#dc2626]"
                    >
                      They questioned the player.
                    </motion.p>
                  )}
                  {heroTextStep === 2 && (
                    <motion.p
                      key="step-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-display text-xl md:text-2xl uppercase tracking-[0.25em] text-[#dc2626]"
                    >
                      They blamed the captain.
                    </motion.p>
                  )}
                  {heroTextStep === 3 && (
                    <motion.p
                      key="step-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-display text-xl md:text-2xl uppercase tracking-[0.25em] text-[#dc2626]"
                    >
                      They targeted the husband.
                    </motion.p>
                  )}
                  {heroTextStep === 4 && (
                    <motion.p
                      key="step-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-display text-xl md:text-2xl uppercase tracking-[0.25em] text-[#dc2626]"
                    >
                      They doubted the king.
                    </motion.p>
                  )}
                  {heroTextStep === 5 && (
                    <motion.h2
                      key="step-5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-display text-4xl md:text-7xl font-bold uppercase tracking-[0.3em] text-white"
                    >
                      BUT HE NEVER LEFT.
                    </motion.h2>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN STORY SCROLL SECTIONS */}
      {introState === "scrolling" && (
        <>
          {/* SECTION 1: THE LONGEST WAIT (CENTURY DROUGHT) */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Cover Image & Text */}
              <div className="lg:col-span-6 space-y-8">
                <span className="eyebrow border-red-500/20 bg-red-950/10 text-red-500 font-mono">
                  The Longest Wait
                </span>
                
                <div className="space-y-4">
                  <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    THE LONGEST WAIT
                  </h2>
                  <p className="text-xs uppercase tracking-[0.25em] text-red-600 font-bold font-mono">
                    2019 — 2022 · 1021 Days of Criticism
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/70 leading-relaxed max-w-xl">
                  Every single innings was dissected. Every delivery analyzed by TV pundits. When Virat Kohli didn't score a century for nearly three years, sections of the media declared his career finished. Some demanded he be dropped from the playing XI entirely. The pressure was not just on his batsmanship—it was on his very existence in the arena.
                </p>

                <div className="border-l-2 border-red-600 pl-4 py-1">
                  <p className="text-xs uppercase font-mono tracking-widest text-[#F3F4F6]/50">
                    "Every time I went out to bat, the TV commentary began with the count of innings since my last century."
                  </p>
                </div>
              </div>

              {/* Right Column: Newspaper Collage Image & Scrolling Criticism marquee */}
              <div className="lg:col-span-6 relative flex flex-col items-center">
                {/* Photo 3: Shh Cover */}
                <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden border border-white/5 bg-[#121212] aspect-[3/4] md:aspect-[4/5] shadow-2xl">
                  <img 
                    src="/assets/price-of-greatness/photo_shh.jpg" 
                    alt="Newspaper drought clippings"
                    className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Absolute positioning of red overlay elements */}
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="font-display text-lg uppercase text-white font-bold">
                      The Drought Record
                    </h3>
                  </div>
                </div>

                {/* Overlaid Floating comments tickers */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-12 z-20">
                  <div className="w-full overflow-hidden bg-black/60 backdrop-blur-sm border-y border-red-500/10 py-2">
                    <div className="animate-marquee whitespace-nowrap text-[10px] font-mono tracking-widest text-red-500">
                      DROP KOHLI • FINISHED • OVERRATED • 1021 DAYS • NO RUNS • RETIRE VIRAT • DROP KOHLI • FINISHED
                    </div>
                  </div>
                  <div className="w-full overflow-hidden bg-black/60 backdrop-blur-sm border-y border-red-500/10 py-2">
                    <div className="animate-marquee-reverse whitespace-nowrap text-[10px] font-mono tracking-widest text-red-500">
                      DOES HE EVEN CARE? • ADVERTISEMENT KING • UNWORTHY OF CAPTAINCY • END OF ERA • GO HOME
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE BLAME GAME (ANUSHKA TARGETED) */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Grayscale image with custom parallax blend */}
              <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
                <motion.div 
                  style={{ filter: grayscaleVal }}
                  className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-white/5 aspect-[3/4] md:aspect-[4/5] shadow-2xl bg-[#080808]"
                >
                  <img 
                    src="/assets/love/first_meeting.jpg" 
                    alt="Grayscale Anushka and Virat"
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                  
                  {/* Subtle red cross line or lock graphic to emphasize targets */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <EyeOff className="h-12 w-12 text-red-600/30 animate-pulse" />
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-red-500/20 bg-red-950/10 text-red-500 font-mono">
                  The Blame Game
                </span>
                
                <div className="space-y-4">
                  <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    THE BLAME GAME
                  </h2>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F3F4F6]/40 font-semibold font-mono">
                    Unfair Targeting · Dignity in the Storm
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/70 leading-relaxed">
                  Whenever the team fell short, the backlash shifted from performance to his personal life. His wife, Anushka Sharma, became the focal point of toxic online bullying, blamed by media headlines and trolls for Virat's dry spells. It was an invasive, brutal display of toxic fan culture. Yet, through years of extreme personal attacks, they maintained absolute silence—answering only with quiet dignity, class, and mutual strength.
                </p>

                <div className="p-6 border border-white/5 bg-black/40 rounded-2xl space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-red-500" />
                    <span className="text-[10px] font-mono tracking-widest text-[#F3F4F6]/50 uppercase font-black">
                      Official DCW Intervention (Nov 2021)
                    </span>
                  </div>
                  <p className="text-xs text-[#F3F4F6]/60 leading-relaxed font-mono">
                    The toxicity grew so severe that the Delhi Commission for Women had to issue notices to the Delhi Police, demanding action against cyber mobs who issued severe threats to Virat's infant daughter. It exposed the brutal human cost behind the game.
                  </p>
                </div>

                <div className="text-2xl font-display uppercase tracking-wider text-white italic border-l-2 border-red-600 pl-4 py-2">
                  "Pressure is part of the game. Abuse never should be."
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: THE CAPTAIN UNDER FIRE (SPLIT-SCREEN VERDICT) */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="space-y-12">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                  Leadership Under Fire
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                  THE MAN THEY CALLED A FAILURE
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-[#F3F4F6]/40 mt-3 font-semibold font-mono">
                  The ICC Trophy Stigma vs. Historical Realities
                </p>
              </div>

              {/* Split Screen Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10 rounded-3xl overflow-hidden bg-black/50">
                
                {/* Left Side: Criticism (Red/Dark theme) */}
                <div className="p-8 md:p-12 space-y-8 border-b md:border-b-0 md:border-r border-white/10 bg-red-950/5">
                  <div className="flex items-center gap-3">
                    <Skull className="h-6 w-6 text-red-500" />
                    <h3 className="font-display text-2xl uppercase tracking-wider text-red-500 font-bold">
                      The Narrative
                    </h3>
                  </div>
                  
                  <p className="text-sm text-[#F3F4F6]/60 leading-relaxed font-body">
                    Labelled a "failed captain" due to the lack of ICC tournament silverware. Critics repeatedly highlighted losses in the 2017 Champions Trophy, the 2019 World Cup semifinal, and the 2021 World Test Championship final. Media headlines questioned his tactical choices, RCB's trophy-less campaigns, and his fiery aggression.
                  </p>

                  <ul className="space-y-3 font-mono text-xs text-red-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 select-none">✕</span>
                      <span>Zero ICC global trophies as captain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 select-none">✕</span>
                      <span>Relentless television debates questioning leadership</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 select-none">✕</span>
                      <span>Media attacks on on-field aggression</span>
                    </li>
                  </ul>
                </div>

                {/* Right Side: Achievements (Gold/Steel White theme) */}
                <div className="p-8 md:p-12 space-y-8 bg-neutral-950/40">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <h3 className="font-display text-2xl uppercase tracking-wider text-yellow-500 font-bold">
                      The Verdict
                    </h3>
                  </div>

                  <p className="text-sm text-[#F3F4F6]/70 leading-relaxed font-body">
                    Statistically the most successful Test captain in Indian history (40 wins). Under Kohli, India conquered overseas terrains, held the ICC Test Mace for 42 consecutive months, and never lost a single Test series at home. He rebuilt the pace attack and created a fitness revolution that raised the athletic standard.
                  </p>

                  <ul className="space-y-3 font-mono text-xs text-yellow-500/80">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 select-none">✓</span>
                      <span>58.8% Win Rate in Tests — Highest for India</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 select-none">✓</span>
                      <span>Yo-Yo fitness test made mandatory standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 select-none">✓</span>
                      <span>First Test Series victory in Australia (2018-19)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 select-none">✓</span>
                      <span>Never played safe. Refused to settle for draws.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4: THE RCB PAIN */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Text & Pauses */}
              <div className="lg:col-span-6 space-y-12">
                <span className="eyebrow border-red-500/20 bg-red-950/10 text-red-500 font-mono">
                  Franchise Burden
                </span>
                
                <div className="space-y-4">
                  <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    THE RCB PAIN
                  </h2>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#dc2626] font-bold font-mono">
                    Heartbreak · Unbroken Loyalty
                  </p>
                </div>

                <div className="space-y-4 text-xl md:text-2xl font-display uppercase tracking-widest text-[#F3F4F6]/75">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    Some players leave when success doesn't come.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-[#dc2626] font-bold"
                  >
                    He stayed.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    viewport={{ once: true }}
                    className="text-white font-bold"
                  >
                    Seventeen years.
                  </motion.p>
                </div>

                <p className="text-sm text-[#F3F4F6]/60 leading-relaxed max-w-lg">
                  Near misses, playoff exits, empty stadiums, sitting exhausted on the bench with head in hands. Trolls mocked RCB's trophy cabinet. Critics suggested he move to a different franchise to win. He refused to abandon the Chinnaswamy crowd, preferring the struggle over easy silverware.
                </p>
              </div>

              {/* Right Column: Emotional RCB image */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden border border-white/5 bg-[#121212] aspect-[4/3] md:aspect-[3/2] shadow-2xl">
                  {/* Photo 1: Newspaper collage with bat (rotated counter-clockwise and fitted to container aspect) */}
                  <img 
                    src="/assets/price-of-greatness/photo_helmet.jpg" 
                    alt="RCB Heartbreak"
                    className="absolute top-1/2 left-1/2 w-[75%] h-[133.33%] md:w-[66.67%] md:h-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover filter brightness-[0.85] contrast-[1.1] grayscale-[10%]"
                  />
                  
                  {/* Overlay red gradient */}
                  <motion.div 
                    style={{ opacity: rcbOverlayOpacity }}
                    className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/20 to-transparent pointer-events-none mix-blend-color-burn" 
                  />
                  
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="font-display text-lg uppercase text-white font-bold">
                      The Weight of Bengaluru
                    </h3>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 5: THE SILENCE BEFORE THE COMEBACK */}
          <section id="section-silence" className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 w-full text-center">
            
            <div className="max-w-2xl mx-auto space-y-12">
              <span className="eyebrow border-blue-500/20 bg-blue-950/10 text-cyan-400 font-mono">
                Quiet Before The Storm
              </span>

              {/* Pulsing circle in sync with heartbeat */}
              <div className="flex justify-center items-center py-6 h-32">
                <motion.div
                  animate={activeHeartbeat ? {
                    scale: [1, 1.25, 1.1, 1.35, 1],
                    opacity: [0.15, 0.45, 0.3, 0.65, 0.15],
                  } : {}}
                  transition={activeHeartbeat ? {
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {}}
                  className="h-24 w-24 rounded-full border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center"
                >
                  <Heart className={`h-8 w-8 text-cyan-500 ${activeHeartbeat ? "animate-pulse" : "opacity-30"}`} />
                </motion.div>
              </div>

              {/* Text sequence */}
              <div className="space-y-6 font-display text-2xl md:text-4xl uppercase tracking-[0.25em] text-[#F3F4F6]/80">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                >
                  The noise got louder.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  He got quieter.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.6 }}
                  viewport={{ once: true }}
                  className="text-cyan-400 font-bold"
                >
                  And then he went to work.
                </motion.p>
              </div>

              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3F4F6]/40 max-w-sm mx-auto">
                {soundEnabled ? "Heartbeat sound synthesized in real-time." : "Enable sound in the bottom right corner for the full audio experience."}
              </p>
            </div>
          </section>

          {/* GRAND FINALE: BELIEVE */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 w-full">
            
            <StormParticles color="rgba(234, 179, 8, 0.12)" />
            
            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Image "BELIEVE" cover */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[380px] rounded-3xl overflow-hidden border border-yellow-500/10 bg-[#151515] aspect-[3/4] md:aspect-[4/5] shadow-[0_0_50px_rgba(234,179,8,0.05)] group">
                  <img 
                    src="/assets/price-of-greatness/photo_believe.jpg" 
                    alt="Believe Collage"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                </div>
              </div>

              {/* Right Column: Redemption details */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                  The Rebuilding
                </span>

                <div className="space-y-2">
                  <h2 className="font-display text-5xl md:text-8xl font-extrabold uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-200 leading-none">
                    BELIEVE
                  </h2>
                  <p className="text-sm md:text-lg uppercase tracking-[0.25em] text-[#F3F4F6] font-bold">
                    THEY WANTED HIM TO BREAK.<br />
                    <span className="text-yellow-500">HE REBUILT HIMSELF.</span>
                  </p>
                </div>

                {/* Redemption Milestone list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 space-y-2 hover:border-yellow-500/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-[#F3F4F6]/40 uppercase font-black">2022</span>
                      <Flame className="h-4 w-4 text-red-500 animate-pulse" />
                    </div>
                    <h4 className="font-display text-base uppercase text-white font-bold">Melbourne Miracle</h4>
                    <p className="text-xs text-[#F3F4F6]/50 font-mono">82* off 53 balls vs Pakistan. The ultimate T20 chase completed from a near-impossible position.</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 space-y-2 hover:border-yellow-500/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-[#F3F4F6]/40 uppercase font-black">2023</span>
                      <TrendingUp className="h-4 w-4 text-yellow-500" />
                    </div>
                    <h4 className="font-display text-base uppercase text-white font-bold">World Cup Peak</h4>
                    <p className="text-xs text-[#F3F4F6]/50 font-mono">765 runs in a single campaign, breaking the long-standing record of 50 ODI centuries.</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 space-y-2 hover:border-yellow-500/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-[#F3F4F6]/40 uppercase font-black">2024</span>
                      <Award className="h-4 w-4 text-cyan-400" />
                    </div>
                    <h4 className="font-display text-base uppercase text-white font-bold">T20 WC Champion</h4>
                    <p className="text-xs text-[#F3F4F6]/50 font-mono">Lifting the T20 World Cup in Barbados. The perfect, emotional farewell to T20Is.</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 space-y-2 hover:border-yellow-500/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-[#F3F4F6]/40 uppercase font-black">2025</span>
                      <Flame className="h-4 w-4 text-yellow-500" />
                    </div>
                    <h4 className="font-display text-base uppercase text-white font-bold">RCB Title Complete</h4>
                    <p className="text-xs text-[#F3F4F6]/50 font-mono">Lifting the IPL trophy with RCB. 17 years of loyalty and wait crowned in front of the home fans.</p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* ENDING QUOTE */}
          <section className="relative min-h-screen flex flex-col justify-center items-center bg-transparent z-10 px-6 text-center select-none">
            <div className="max-w-3xl space-y-12">
              <div className="space-y-6">
                <p className="text-base md:text-xl text-white font-light leading-relaxed font-body max-w-2xl mx-auto">
                  "A billion voices judged him. A few tried to destroy him. Yet every time India needed him, he walked back into the arena."
                </p>
                <p className="text-sm md:text-base text-white/50 font-light font-body">
                  That is why he was never just a cricketer.
                </p>
                <h3 className="font-display text-4xl md:text-6xl uppercase tracking-[0.25em] text-white font-bold leading-none">
                  HE WAS VIRAT KOHLI.
                </h3>
              </div>

              <div className="w-12 h-[1px] bg-white/10 mx-auto pt-6" />
            </div>
          </section>

          {/* CHAPTER NAVIGATION */}
          <ChapterNav />
        </>
      )}
    </div>
  );
}

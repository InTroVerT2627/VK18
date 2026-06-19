"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Volume2, 
  VolumeX, 
  Users, 
  Flame, 
  Heart, 
  TrendingUp, 
  Award,
  EyeOff
} from "lucide-react";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

// Web Audio API Crowd Chanting Synthesizer (SSR Safe)
let audioCtx: AudioContext | null = null;

// Synthesizes a whisper or shout of "KOHLI" using noise and bandpass filters
function playChantSound(volume: number, frequency: number, isShout = false) {
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

    // 1. Noise source for the breath/whisper/crowd sibilants
    const bufferSize = ctx.sampleRate * (isShout ? 0.6 : 0.5);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(isShout ? 800 : 1000, now);
    noiseFilter.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * (isShout ? 0.3 : 0.15), now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (isShout ? 0.5 : 0.45));

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();

    // 2. Fundamental pitch/vocal oscillator for "O-I" vocal vowels
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(frequency, now);
    // Vowel formant modulation (pitch drops slightly during "Koh-li")
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.85, now + (isShout ? 0.4 : 0.35));

    const vocalFilter = ctx.createBiquadFilter();
    vocalFilter.type = "bandpass";
    vocalFilter.frequency.setValueAtTime(220, now); // Male chest formant
    vocalFilter.Q.setValueAtTime(3.0, now);

    oscGain.gain.setValueAtTime(volume * (isShout ? 0.5 : 0.12), now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + (isShout ? 0.55 : 0.4));

    osc.connect(vocalFilter);
    vocalFilter.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(now + 0.6);

    // 3. Sub-bass rumble for stadium chants (only for shouts)
    if (isShout) {
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(80, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.5);

      subGain.gain.setValueAtTime(volume * 0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start();
      subOsc.stop(now + 0.55);
    }
  } catch (e) {}
}

// Triggers a series of stadium chants with varying voices
function triggerStadiumChantGroup(voicesCount: number, volume: number) {
  for (let i = 0; i < voicesCount; i++) {
    const delay = Math.random() * 0.15; // minor timing scattering
    const baseFreq = 95 + Math.random() * 45; // pitch dispersion of crowd
    setTimeout(() => {
      playChantSound(volume / Math.sqrt(voicesCount), baseFreq, true);
    }, delay * 1000);
  }
}

export default function CultOfViratPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [introState, setIntroState] = useState<"chanting" | "scrolling">("chanting");
  const [chantStep, setChantStep] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const goldGlowOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0.1, 0.55]);

  // Automated Visual Chant Sequence Handler
  useEffect(() => {
    // Lock body scrolling during the trailer intro
    document.body.style.overflow = "hidden";

    const sequence = [
      { step: 1, delay: 500, trigger: () => playChantSound(0.2, 120) },
      { step: 2, delay: 1800, trigger: () => playChantSound(0.35, 110) },
      { step: 3, delay: 3200, trigger: () => triggerStadiumChantGroup(8, 0.5) },
      { step: 4, delay: 4500, trigger: () => triggerStadiumChantGroup(15, 0.7) },
      { step: 5, delay: 5800, trigger: () => triggerStadiumChantGroup(25, 0.9) },
    ];

    sequence.forEach((item, idx) => {
      setTimeout(() => {
        setChantStep(item.step);
        // Play subtle Web Audio bass hit only if sound is toggled on
        if (soundEnabled) {
          item.trigger();
        }
        if (idx === sequence.length - 1) {
          setTimeout(() => {
            setIntroState("scrolling");
            // Enable scrolling
            document.body.style.overflow = "unset";
          }, 2200);
        }
      }, item.delay);
    });

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [soundEnabled]);

  return (
    <div ref={containerRef} className="relative min-h-screen theme-cult text-[#F3F4F6] overflow-x-hidden font-body selection:bg-yellow-500 selection:text-black">
      <CinematicHeader />

      {/* SOUND TOGGLE BUTTON */}
      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/20 bg-black/80 text-yellow-500 backdrop-blur-xl transition hover:border-yellow-500/50 hover:bg-yellow-950/20"
        title="Toggle deep ambient sounds"
      >
        {soundEnabled ? <Volume2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5 text-gray-500" />}
      </button>

      {/* CHANTING STADIUM VISUAL OPENING SCENE */}
      <AnimatePresence>
        {introState === "chanting" && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden select-none"
          >
            {/* Camera white flash overlays on step 4 and step 5 */}
            <AnimatePresence>
              {(chantStep === 4 || chantStep === 5) && (
                <motion.div 
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white z-45 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Stadium radial lighting effect revealing slowly */}
            <motion.div 
              animate={{ 
                opacity: chantStep >= 3 ? [0.15, 0.5, 0.4, 0.6] : 0.05,
                scale: chantStep >= 3 ? [1.0, 1.03, 1.01, 1.05] : 1.0
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.35),_transparent_60%)] pointer-events-none z-0" 
            />

            {/* Visual Whispers & Shouts */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              
              {/* Step 1: Dim single whisper in the center */}
              {chantStep === 1 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-display text-3xl uppercase tracking-[0.4em] text-white/50"
                >
                  "Kohli..."
                </motion.p>
              )}

              {/* Step 2: Whispers floating on left and right */}
              {chantStep === 2 && (
                <div className="absolute inset-0 flex items-center justify-around px-12">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.55, x: 0 }}
                    className="font-display text-2xl uppercase tracking-[0.35em] text-white/60"
                  >
                    "Kohli..."
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0.65, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-4xl uppercase tracking-[0.4em] text-white/70"
                  >
                    "Kohli..."
                  </motion.p>
                </div>
              )}

              {/* Step 3: Whispers gathering all over the screen */}
              {chantStep === 3 && (
                <div className="absolute inset-0">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="absolute top-[20%] left-[15%] font-display text-2xl uppercase tracking-[0.3em] text-white/50">"Kohli..."</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.2 }} className="absolute bottom-[25%] left-[20%] font-display text-3xl uppercase tracking-[0.35em] text-white/60">"Kohli..."</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 0.4 }} className="absolute top-[35%] right-[25%] font-display text-2xl uppercase tracking-[0.3em] text-white/50">"Kohli..."</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.6 }} className="absolute bottom-[40%] right-[15%] font-display text-4xl uppercase tracking-[0.4em] text-white/70">"Kohli..."</motion.p>
                </div>
              )}

              {/* Step 4: First big visual shout */}
              {chantStep === 4 && (
                <div className="relative flex flex-col items-center justify-center space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: [0.95, 1.05, 1] }}
                    className="font-display text-4xl sm:text-7xl md:text-9xl font-black uppercase tracking-[0.2em] text-yellow-500 drop-shadow-[0_0_35px_rgba(234,179,8,0.35)]"
                  >
                    KOHLI!
                  </motion.h2>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.2 }} className="font-mono text-xs uppercase tracking-[0.3em] text-white/45">The Stadium Echoes</motion.p>
                </div>
              )}

              {/* Step 5: Massive visual chant storm filling the screen */}
              {chantStep === 5 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Central huge shout */}
                  <motion.h2
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="font-display text-5xl sm:text-8xl md:text-[11rem] font-black uppercase tracking-[0.22em] text-yellow-500 drop-shadow-[0_0_50px_rgba(234,179,8,0.5)] z-20 relative animate-pulse"
                  >
                    KOHLI!
                  </motion.h2>
                  
                  {/* Surrounding echo shouts flashing */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} className="absolute top-[10%] left-[8%] font-display text-2xl sm:text-5xl font-extrabold uppercase tracking-[0.15em] text-white/40">KOHLI!</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.1 }} className="absolute bottom-[15%] left-[10%] font-display text-3xl sm:text-6xl font-extrabold uppercase tracking-[0.15em] text-white/50">KOHLI!</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 0.25 }} className="absolute top-[18%] right-[12%] font-display text-2xl sm:text-5xl font-extrabold uppercase tracking-[0.15em] text-white/40">KOHLI!</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 0.35 }} className="absolute bottom-[20%] right-[8%] font-display text-4xl sm:text-7xl font-extrabold uppercase tracking-[0.18em] text-yellow-500/60 drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]">KOHLI!</motion.div>
                </div>
              )}

            </div>

            {/* Blinking flashlight crowd screen particles */}
            {chantStep >= 3 && (
              <div className="absolute inset-0 z-0 grid grid-cols-6 grid-rows-6 opacity-35">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 0] }}
                    transition={{ 
                      duration: Math.random() * 1.2 + 0.4, 
                      repeat: Infinity,
                      delay: Math.random() * 1.5 
                    }}
                    style={{
                      gridColumnStart: Math.floor(Math.random() * 6) + 1,
                      gridRowStart: Math.floor(Math.random() * 6) + 1,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_white]"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN STORY SCROLL SECTIONS */}
      {introState === "scrolling" && (
        <>
          {/* INTRO HERO SUMMARY */}
          <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center select-none overflow-hidden bg-[radial-gradient(circle_at_50%_15%,_rgba(30,64,175,0.2),_transparent_50%)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:30px_30px]" />
            
            {/* Blinking flashlight crowd effect */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  className="h-1 w-1 bg-white rounded-full animate-ping"
                />
              ))}
            </div>

            <div className="z-10 space-y-8 max-w-4xl">
              <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                The Cult of Virat Kohli
              </span>
              
              <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-[0.18em] text-white leading-none">
                THE CULT OF KOHLI
              </h2>

              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-yellow-500 font-black font-mono">
                "What does Virat Kohli mean to India?"
              </p>

              <div className="w-12 h-[1px] bg-yellow-500/20 mx-auto" />

              <p className="text-sm md:text-base text-[#F3F4F6]/60 leading-relaxed max-w-xl mx-auto">
                Most cricketers have supporters. Virat Kohli created believers. This is the narrative of a sociological phenomenon—an obsession and deep emotional connection that changed the cultural heartbeat of a nation.
              </p>
            </div>
          </section>

          {/* SECTION 1: THE JERSEY NUMBER */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Visual container of whites walkout + huge 18 layering */}
              <div className="lg:col-span-5 flex justify-center relative">
                {/* Huge 18 glowing behind */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <motion.div 
                    animate={{ 
                      y: [0, -15, 0],
                      filter: ["drop-shadow(0 0 15px rgba(234,179,8,0.15))", "drop-shadow(0 0 35px rgba(234,179,8,0.3))", "drop-shadow(0 0 15px rgba(234,179,8,0.15))"]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="font-display text-[15rem] md:text-[22rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7F8]/20 via-[#D4AF37]/20 to-amber-600/10"
                  >
                    18
                  </motion.div>
                </div>

                <div className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] md:aspect-[4/5] bg-zinc-950 shadow-[0_0_50px_rgba(255,255,255,0.05)] group z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/cult/whites_walkout.jpg" 
                    alt="Virat Kohli walking out to bat in Test whites" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-15" />
                  
                  <div className="absolute bottom-6 left-6 z-20 text-left">
                    <p className="text-[10px] font-mono tracking-widest text-yellow-500 uppercase font-black">
                      The Arena Entry
                    </p>
                    <h4 className="font-display text-base uppercase text-white font-bold">
                      whites, steel & presence
                    </h4>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                  The Identity Symbol
                </span>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    THE JERSEY NUMBER
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F3F4F6]/40 font-semibold font-mono">
                    More than a digit. An identity badge.
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/75 leading-relaxed">
                  A jersey number became a national identity. Kids wear it in narrow alleyways, adults wear it in corporate spaces, and people who have never met him or never played a game of cricket wear it on their shoulders. The number 18 is no longer just a shirt digit; it is a seal of ambition, a statement of resolve, and a symbol of pride that bonds a billion dreams.
                </p>

                <div className="border-l-2 border-yellow-500 pl-4 py-1 text-left">
                  <p className="text-xs uppercase font-mono tracking-widest text-[#F3F4F6]/50">
                    "I see 18 on rickshaws, on backpacks, on tattoos. It has bypassed sport entirely."
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2: THE ROAR & EMOTION */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-blue-500/20 bg-blue-950/10 text-cyan-400 font-mono">
                  Atmosphere Shifter
                </span>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    THE STADIUM EFFECT
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F3F4F6]/40 font-semibold font-mono">
                    Chants · Camera Lenses · Expected Greatness
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/75 leading-relaxed">
                  When Virat Kohli walks down the boundary ropes and steps onto the pitch, the structural atmosphere of the stadium shifts. Every single camera lens is pointing at the crease, every spectator rises, and phone flashlights illuminate the stands. The home crowd roars with deafening expectation; the opposition crowd sinks into a quiet, nervous silence.
                </p>

                <div className="space-y-4 text-xl md:text-2xl font-display uppercase tracking-widest text-cyan-400 font-bold border-l-2 border-cyan-500 pl-4 py-1 text-left">
                  <p className="leading-none">Some players enter stadiums.</p>
                  <p className="text-white leading-none">Virat changes them.</p>
                </div>
              </div>

              {/* Right Column: Visual container */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-white/5 aspect-[3/4] md:aspect-[4/5] bg-black shadow-2xl flex items-center justify-center group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/cult/stadium_walk.jpg" 
                    alt="Virat Kohli walking in stadium surrounded by fans taking photos" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
                  
                  {/* Flashing camera spots */}
                  <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-12 p-8 opacity-60 z-20 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse" />
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-6 z-20 text-left">
                    <p className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-black">
                      Live Feed
                    </p>
                    <h4 className="font-display text-base uppercase text-white font-bold">
                      The Stadium Charge
                    </h4>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 3: RCB FOREVER */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Franchise Collage */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-red-500/10 bg-[#0a0304] aspect-[3/4] md:aspect-[4/5] shadow-2xl flex flex-col justify-between group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/rcb/rcb_collage.jpg" 
                    alt="RCB Devotion and Aura Collage" 
                    className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
                  
                  <div className="relative z-20 p-8 flex flex-col justify-between h-full text-left w-full">
                    <Award className="h-12 w-12 text-red-500/40" />
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-black">
                        Franchise Devotion
                      </span>
                      <h4 className="font-display text-2xl md:text-3xl uppercase text-white leading-none font-bold">
                        LOYALTY LOOKS LIKE THIS
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-red-500/20 bg-red-950/10 text-red-500 font-mono">
                  The Red Heartbeat
                </span>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    RCB FOREVER
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#dc2626] font-bold font-mono">
                    17 Years of Memes, Heartbreak, and Unwavering Belief
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/75 leading-relaxed">
                  Through seventeen seasons of intense pressure, playoff heartbreak, trophy-less droughts, and brutal internet memes, the loyalty of the RCB fanbase never fractured. Year after year, Chinnaswamy Stadium stayed packed. The jerseys never disappeared from the streets, and the chants of his name never faded. Virat remained their king, showing that loyalty is valued far above easy trophies.
                </p>

                <p className="text-sm text-[#F3F4F6]/60 leading-relaxed font-mono italic text-left">
                  "They laughed at the trophyless years. But they couldn't copy the connection. You can buy titles. You cannot buy Chinnaswamy on a matchnight."
                </p>
              </div>

            </div>
          </section>

          {/* SECTION 4: THE PEOPLE'S KING */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                  The Reflection
                </span>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    THE PEOPLE'S KING
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F3F4F6]/40 font-semibold font-mono">
                    Tears · Tattoos · Shared Resolve
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/75 leading-relaxed">
                  Cricketers are supported; Kohli is felt. Fans weep openly when he reaches a milestone, and they hold their heads in silence when he fails. They travel across continents just to watch him bat, wait for hours outside team hotels, and etch his name, face, or the number 18 onto their bodies. People didn't just support him; they saw their own struggles, their own fire, ambition, and refusal to quit reflected in him.
                </p>

                <div className="border-l-2 border-yellow-500 pl-4 py-1 text-left">
                  <p className="text-xs uppercase font-mono tracking-widest text-[#F3F4F6]/50">
                    "He represents the new India: unapologetic, fiercely competitive, and wearing his heart on his sleeve."
                  </p>
                </div>
              </div>

              {/* Right Column: Visual representing tattoos/tears */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-white/5 bg-[#121212] aspect-[3/4] md:aspect-[4/5] shadow-2xl flex flex-col justify-between group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/cult/tattoo_hug.jpg" 
                    alt="Virat Kohli hugging fan with back tattoo detailing his career milestones" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />

                  {/* Subtle gold glow */}
                  <motion.div 
                    style={{ opacity: goldGlowOpacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(234,179,8,0.25),_transparent_75%)] pointer-events-none z-15" 
                  />
                  
                  <div className="relative z-20 p-8 flex flex-col justify-between h-full text-left w-full">
                    <Users className="h-10 w-10 text-yellow-500/40" />
                    
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono tracking-widest text-yellow-500 uppercase font-black">
                        Belief Metric
                      </span>
                      <h4 className="font-display text-xl uppercase text-white font-bold leading-none">
                        "I wear 18 on my back so I remember to never back down."
                      </h4>
                      <p className="text-[10px] text-[#F3F4F6]/40 font-mono">
                        — Fan Tattoo Inscription
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 5: BEYOND CRICKET */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Icons and metrics */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                
                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 space-y-2">
                  <Flame className="h-6 w-6 text-yellow-500" />
                  <h4 className="font-display text-sm uppercase text-white font-bold">Fitness Legacy</h4>
                  <p className="text-[10px] text-[#F3F4F6]/50 font-mono">Dismantled traditional habits, establishing yo-yo benchmarks nationwide.</p>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 space-y-2">
                  <TrendingUp className="h-6 w-6 text-cyan-400" />
                  <h4 className="font-display text-sm uppercase text-white font-bold">Style & Culture</h4>
                  <p className="text-[10px] text-[#F3F4F6]/50 font-mono">Beard trends, undercut spikes, and casual styling adopted by millions.</p>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 space-y-2 col-span-2">
                  <Users className="h-6 w-6 text-purple-400" />
                  <h4 className="font-display text-sm uppercase text-white font-bold">Youth Mindset</h4>
                  <p className="text-[10px] text-[#F3F4F6]/50 font-mono">He taught a generation of young Indians to be vocal, confident, and unapologetic on the global stage.</p>
                </div>

              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                  The Wave
                </span>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    BEYOND CRICKET
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F3F4F6]/40 font-semibold font-mono">
                    Fitness · Fashion · Mentality
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/75 leading-relaxed">
                  His footprint expanded far beyond the cricket field. Virat Kohli changed the aesthetic standards of young India. From the styled spikes and beards replicated in thousands of local salons, to the functional fitness regimes adopted by amateur athletes, he influenced youth culture. He established a template of vocal confidence and rigorous self-discipline that defined a generation.
                </p>
              </div>

            </div>
          </section>

          {/* SECTION 6: WHEN HE FAILS */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-8">
                <span className="eyebrow border-red-500/20 bg-red-950/10 text-red-500 font-mono">
                  The Hard Proof
                </span>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                    WHEN HE FAILS
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-red-600 font-bold font-mono">
                    Silence · The Standby · 1021 Days of Devotion
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#F3F4F6]/75 leading-relaxed">
                  The true strength of a sporting connection is not measured during victory celebrations; it is measured when failures happen. When Virat got out cheaply, stadiums fell into absolute silence. Pundits questioned his place, and the century drought dragged on for years. Yet, the believers stayed. They bought the tickets, chanted his name, and waited for the return of their king.
                </p>

                <p className="text-xs uppercase tracking-widest text-[#F3F4F6]/45 font-mono border-l-2 border-red-600 pl-4">
                  "A crowd cheering a century is standard. A crowd staying in their seats, whispering words of support after a first-ball duck, is devotion."
                </p>
              </div>

              {/* Right Column: Dynamic representation of the drought's end */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] rounded-3xl overflow-hidden border border-red-500/10 bg-black aspect-[3/4] md:aspect-[4/5] shadow-2xl flex items-center justify-center group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/cult/drought_end.jpg" 
                    alt="Virat Kohli celebrating his 71st century ending the drought" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/20 z-10" />

                  {/* Subtle red spotlight glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.15),_transparent_75%)] pointer-events-none z-15" />
                  
                  <div className="relative z-20 p-8 flex flex-col justify-between h-full text-left w-full">
                    <EyeOff className="h-10 w-10 text-red-600/30 group-hover:opacity-0 transition-opacity duration-500" />
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-black">
                        The Redemption
                      </span>
                      <h4 className="font-display text-2xl md:text-3xl uppercase text-white leading-none font-bold">
                        1021 DAYS LATER
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 7: WHY INDIA LOVES HIM (SPLIT-SCREEN DISPLAY) */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="space-y-12">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="eyebrow border-yellow-500/20 bg-yellow-950/10 text-yellow-500 font-mono">
                  The Dual Self
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.1em] text-white leading-none">
                  WHY INDIA LOVES HIM
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#F3F4F6]/45 mt-3 font-semibold font-mono">
                  Aggressiveness vs. Authenticity
                </p>
              </div>

              {/* Split Screen Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10 rounded-3xl overflow-hidden bg-[#070707]">
                
                {/* Left Side: Fire */}
                <div className="p-8 md:p-12 space-y-6 border-b md:border-b-0 md:border-r border-white/10 bg-red-950/5">
                  <div className="flex items-center gap-3">
                    <Flame className="h-6 w-6 text-red-500" />
                    <h4 className="font-display text-2xl uppercase tracking-wider text-red-500 font-bold">
                      The Fire
                    </h4>
                  </div>
                  
                  <p className="text-sm text-[#F3F4F6]/60 leading-relaxed font-body">
                    Fierce aggression on the field. Kohli is intensity personified. He sledges back, celebrates wickets with absolute throat-throttling roars, sets attacking fields, and plays with an infectious competitive edge. He represents the bold, uncompromising intent of modern Indian sport.
                  </p>
                </div>

                {/* Right Side: Humanity */}
                <div className="p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-yellow-500" />
                    <h4 className="font-display text-2xl uppercase tracking-wider text-yellow-500 font-bold">
                      The Humanity
                    </h4>
                  </div>

                  <p className="text-sm text-[#F3F4F6]/70 leading-relaxed font-body">
                    A family man, spiritual seeker, and compassionate figure off-field. India saw him support Mohammed Shami against online mobs, step aside for his daughter's birth, pray at temples in quiet humility, and support teammates. He never wore a mask—showing every raw human emotion.
                  </p>
                </div>

              </div>

              <div className="text-center max-w-xl mx-auto pt-6">
                <p className="text-xs uppercase tracking-widest text-[#F3F4F6]/50 font-mono">
                  India did not love perfection. They loved authenticity. Virat never pretended, and they saw themselves in his truth.
                </p>
              </div>
            </div>
          </section>

          {/* TRAILER SUMMARY CONCLUSION */}
          <section className="relative min-h-screen py-24 flex flex-col justify-center bg-transparent z-10 px-6 w-full text-center">
            
            {/* Ambient Gold glow */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-yellow-950/10 filter blur-[150px] pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-16">
              
              {/* Cinematic text pauses */}
              <div className="space-y-8 font-display text-2xl md:text-4xl uppercase tracking-[0.25em] text-[#F3F4F6]/85">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                >
                  Some players have fans.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Some players have followers.
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 1.6 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-5xl md:text-7xl font-black text-yellow-500 leading-none tracking-[0.15em] drop-shadow-[0_0_35px_rgba(234,179,8,0.25)]"
                >
                  VIRAT KOHLI CREATED A CULTURE.
                </motion.h3>
              </div>

              {/* Central brand board frame */}
              <div className="relative h-64 w-full flex items-center justify-center overflow-hidden border border-white/5 rounded-3xl bg-black/60 backdrop-blur-sm">
                
                {/* floating particles 18 */}
                <div className="absolute inset-0 z-0">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [-10, 270],
                        x: [Math.random() * 400, Math.random() * 400],
                        opacity: [0, 0.45, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute font-mono text-[9px] text-yellow-500/20 font-black"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 10}%`
                      }}
                    >
                      18
                    </motion.div>
                  ))}
                </div>

                <div className="z-10 space-y-4">
                  <motion.h4
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase text-white tracking-[0.2em] leading-none"
                  >
                    VIRAT KOHLI
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                    viewport={{ once: true }}
                    className="font-mono text-xs uppercase tracking-[0.35em] text-yellow-500 font-black"
                  >
                    A Billion Voices. One King.
                  </motion.p>
                </div>
              </div>

            </div>
          </section>

          <ChapterNav />
        </>
      )}
    </div>
  );
}

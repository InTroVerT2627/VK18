"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX, Heart, Sparkles, Moon, Sun, ArrowRight, Star } from "lucide-react";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

// Premium Image component that prevents cropping
function TimelineImage({ src, alt, revealType }: { src: string; alt: string; revealType: string }) {
  const getRevealClass = () => {
    switch (revealType) {
      case "center":
        return "group-hover:scale-105 duration-1000";
      case "glass":
        return "group-hover:translate-x-1 group-hover:-translate-y-1 duration-700";
      case "petal":
        return "group-hover:rotate-1 group-hover:scale-[1.03] duration-1000";
      case "ray":
        return "group-hover:scale-[1.01] group-hover:brightness-110 duration-1000";
      case "blur":
        return "group-hover:blur-none group-hover:scale-[1.02] duration-700";
      case "confetti":
        return "group-hover:scale-105 group-hover:rotate-[-1deg] duration-1000";
      default:
        return "group-hover:scale-102 duration-500";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E9C5CC]/20 bg-black/60 aspect-[3/4] md:aspect-[4/5] flex items-center justify-center group w-full shadow-2xl transition-all duration-500 hover:border-[#D4AF37]/40">
      {/* Blurred background bloom */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-25 transition-transform duration-1000 group-hover:scale-125"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
      
      {/* Actual image displayed uncropped */}
      <img 
        src={src} 
        alt={alt}
        className={`relative z-10 max-h-[85%] max-w-[85%] object-contain shadow-lg rounded-lg transition-all ${getRevealClass()}`}
      />

      {/* Decorative luxury corners */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4AF37]/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D4AF37]/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D4AF37]/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4AF37]/40" />
    </div>
  );
}

// Particle field helper
function RoseGoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fade: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 20,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.8 + 0.2),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        fade: Math.random() * 0.005 + 0.002
      };
    };

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        ...createParticle(),
        y: Math.random() * height // distribute initially
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gold & Rose Gold colors
      const colors = ["#FFF7F8", "#FDECEF", "#E9C5CC", "#D4AF37"];

      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fade;

        if (p.opacity <= 0 || p.y < 0) {
          particles[idx] = createParticle();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[idx % colors.length];
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#E9C5CC";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

// Confetti & Sparks canvas for RCB section
function GoldSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#D4AF37", "#FFF7F8", "#E9C5CC", "#FAB733", "#F2C94C"];

    const spawnSpark = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // initial upward bias
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        rotation: Math.random() * Math.PI,
        rotationSpeed: Math.random() * 0.1 - 0.05
      });
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Spawn sparks periodically
    const interval = setInterval(() => {
      // Spawn at random points in the lower center
      const spawnX = width / 2 + (Math.random() * 200 - 100);
      const spawnY = height * 0.7 + (Math.random() * 100 - 50);
      for (let i = 0; i < 3; i++) {
        spawnSpark(spawnX, spawnY);
      }
    }, 120);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.04; // gravity
        s.alpha -= s.decay;
        s.rotation += s.rotationSpeed;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;

        // Draw diamond spark or circle
        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size / 2, 0);
          ctx.lineTo(0, s.size);
          ctx.lineTo(-s.size / 2, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

// 6 Chronological Story Cards
const storyTimeline = [
  {
    year: "2013",
    title: "THE FIRST MEETING",
    caption: "A chance introduction on a commercial shoot brought two different worlds together. It was the quiet beginning of a partnership that would eventually redefine him, proving there was a life and a heart far beyond the boundary ropes.",
    image: "/assets/love/first_meeting.jpg",
    revealType: "center"
  },
  {
    year: "2014-2016",
    title: "SURVIVING THE SPOTLIGHT",
    caption: "When his form dipped, she was unfairly scapegoated by millions. Instead of pulling them apart, the public criticism became the crucible of their love. He stood as her protector, and she became his ultimate anchor, shielding him from the vitriol of the nation.",
    image: "/assets/love/glamorous.jpg",
    revealType: "glass"
  },
  {
    year: "2017",
    title: "TUSCANY WEDDING",
    caption: "Under the warm Tuscan sun, far away from the roaring stadiums, flashing cameras, and expectations of a billion fans, they married. A quiet celebration of love in its absolute purest, most intimate form.",
    image: "/assets/love/wedding.jpg",
    revealType: "petal"
  },
  {
    year: "2018-2020",
    title: "SPIRITUAL JOURNEY",
    caption: "Anushka opened his eyes to empathy, mindfulness, and inner calm. Through her support, he embraced meditation, veganism, and a deeper spiritual path, learning that true growth lies in humility, gratitude, and silent peace.",
    image: "/assets/love/faith.jpg",
    revealType: "ray"
  },
  {
    year: "2021-2024",
    title: "PARENTHOOD",
    caption: "Welcoming daughter Vamika and son Akaay changed his worldview completely. The fierce, aggressive warrior on the pitch found his gentlest self at home, realizing his greatest legacy would be written in the quiet moments of fatherhood.",
    image: "/assets/love/parenthood.jpg",
    revealType: "blur"
  },
  {
    year: "2025",
    title: "THE SHARED TRIUMPH",
    caption: "Through 17 years of heartbreak, criticism, and near misses, she stood beside him as his strongest support system. When the RCB WPL and IPL titles finally arrived, the tearful video calls and warm celebrations proved who the victory truly belonged to.",
    image: "/assets/love/rcb_trophy.jpg",
    revealType: "confetti"
  }
];

// Rotating Quotes
const quotesWall = [
  "Before I met her, I was very self-centered. She made me a better human being.",
  "Her patience, love, and belief in me became my shield against the entire world.",
  "Life is much larger than cricket, and she taught me how to find peace in simplicity.",
  "When everyone blamed her for my failures, she stood by me even stronger.",
  "Becoming a father and sharing this journey with her changed my definition of success.",
  "She brought a spiritual balance that helped me handle both victory and defeat."
];

export default function ManInLovePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // Split-screen position percent
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Scroll parallax configurations
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Web Audio refs for crowd noise
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bandpassFilterRef = useRef<BiquadFilterNode | null>(null);
  const noiseSourceRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const mainGainNodeRef = useRef<GainNode | null>(null);

  // Quote rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotesWall.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Web Audio stadium rumble synthesis
  const toggleCrowdAudio = () => {
    if (audioPlaying) {
      if (mainGainNodeRef.current && audioCtxRef.current) {
        mainGainNodeRef.current.gain.setValueAtTime(mainGainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        mainGainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          try {
            noiseSourceRef.current?.disconnect();
            audioCtxRef.current?.close();
          } catch (e) {
            console.error(e);
          }
          audioCtxRef.current = null;
          noiseSourceRef.current = null;
        }, 1100);
      }
      setAudioPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Generate Brown/Pink Noise for crowd rumble
        const bufferSize = 4096;
        let lastOut = 0.0;
        const node = ctx.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Brownian noise filter
            output[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // Gain compensation
          }
        };
        noiseSourceRef.current = node;

        // Bandpass filter centered around crowd vocal frequencies (around 300Hz-800Hz)
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.Q.setValueAtTime(2.0, ctx.currentTime);
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        bandpassFilterRef.current = filter;

        // Modulator for slow cheering swells
        const cheerGain = ctx.createGain();
        cheerGain.gain.setValueAtTime(0.35, ctx.currentTime);

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.5);
        mainGainNodeRef.current = mainGain;

        // Connect noise path
        node.connect(filter);
        filter.connect(cheerGain);
        cheerGain.connect(mainGain);
        mainGain.connect(ctx.destination);

        // LFO setup to modulate filters & gain (making crowd feel active)
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // very slow rumble modulation

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(100, ctx.currentTime); // modulate frequency by 100hz

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        lfo.start();
        setAudioPlaying(true);
      } catch (err) {
        console.error("Audio initialization failed:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen theme-love text-white flex flex-col justify-between overflow-x-hidden select-none">
      <CinematicHeader />

      {/* SECTION 1: HERO (Ken Burns wedding cover, rose-gold/champagne overlay) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Slowly zooming wedding photograph */}
          <div 
            className="absolute inset-0 bg-cover bg-[center_35%] animate-[pulse_10s_infinite] scale-[1.03]"
            style={{ backgroundImage: `url('/assets/love/wedding.jpg')` }}
          />
          {/* Subtle rose/champagne gold glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1315] via-[#1c1315]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#1c1315]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#E9C5CC]/15 via-[#1c1315]/10 to-[#1c1315]" style={{ mixBlendMode: "color-dodge" }} />
        </motion.div>

        {/* Floating particles */}
        <RoseGoldParticles />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E9C5CC]/30 bg-[#FFF7F8]/5 text-xs font-mono tracking-[0.4em] uppercase text-[#E9C5CC]"
          >
            <Heart className="h-3 w-3 text-[#E9C5CC] fill-[#E9C5CC]/20 animate-pulse" />
            Turning Point
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-6xl md:text-9xl tracking-[0.15em] uppercase text-white leading-none mt-6"
          >
            MAN IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F8] via-[#E9C5CC] to-[#D4AF37]">LOVE</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8 mb-8"
          />

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] font-mono leading-relaxed text-[#FFF7F8]/80 max-w-2xl mx-auto space-y-2"
          >
            <span>Behind every record.</span><br />
            <span>Behind every comeback.</span><br />
            <span>Behind every victory.</span><br />
            <span className="text-[#D4AF37] font-semibold mt-1 block">There was someone who helped him become more than a cricketer.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#E9C5CC]/60 font-mono">Scroll to Begin</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#E9C5CC]/40 to-transparent animate-[pulse_2s_infinite]" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: STORY TIMELINE (Premium Staggered Editorial Scrapbook Layout) */}
      <section className="relative z-10 py-24 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
        <div className="border-b border-[#E9C5CC]/15 pb-8 mb-20 text-center max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold font-mono">01 // Chronology</span>
          <h2 className="font-display text-4xl uppercase tracking-wider text-white mt-1">THE LANDMARKS OF CHANGE</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#E9C5CC]/50 mt-2 font-mono">How two lives blended into one balanced journey</p>
        </div>

        <div className="space-y-36 relative">
          {storyTimeline.map((item, idx) => (
            <div 
              key={item.title} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image Container with custom aspect ratio preservation */}
              <div className={`lg:col-span-6 flex justify-center items-center ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
                <div className="w-full max-w-[400px]">
                  <TimelineImage 
                    src={item.image} 
                    alt={item.title} 
                    revealType={item.revealType}
                  />
                </div>
              </div>

              {/* Content Panel (Editorial Glass Design) */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="bg-gradient-to-b from-[#FFF7F8]/5 to-transparent border border-[#E9C5CC]/10 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle warm glow background inside cards */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#FFF7F8]/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl text-[#D4AF37]/35 tracking-tight font-extrabold">{item.year}</span>
                    <div className="h-[1px] flex-grow bg-[#E9C5CC]/15" />
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mt-6 mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#FFF7F8]/70 text-sm md:text-base leading-relaxed font-body">
                    {item.caption}
                  </p>

                  <div className="mt-6 border-t border-[#E9C5CC]/10 pt-4 flex gap-4 text-[10px] font-mono text-[#E9C5CC]/50 uppercase tracking-widest">
                    <span>Partnership</span>
                    <span>•</span>
                    <span>Growth</span>
                    <span>•</span>
                    <span>Legacy</span>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRANSFORMATIONS (Split-screen Morphing interactive panel) */}
      <section className="relative z-10 py-28 px-6 lg:px-16 max-w-[1440px] mx-auto w-full border-t border-[#E9C5CC]/10">
        <div className="mb-16 text-center max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold font-mono">02 // Morphing System</span>
          <h2 className="font-display text-4xl uppercase tracking-wider text-white mt-1">HOW LOVE CHANGED THE KING</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#E9C5CC]/50 mt-2 font-mono">Drag the slider or click buttons to explore the internal shift</p>
        </div>

        {/* Dynamic Split-Screen Module */}
        <div className="relative w-full aspect-[16/9] min-h-[350px] md:min-h-[500px] rounded-3xl overflow-hidden border border-[#E9C5CC]/10 shadow-2xl bg-black select-none">
          
          {/* Left panel: Young Virat (Dark Blue, Aggressive) */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#030616] to-[#0b1436] flex items-center justify-start p-4 sm:p-8 md:p-16">
            <div className="max-w-[75%] sm:max-w-[60%] md:max-w-[45%] z-0 space-y-4">
              <span className="inline-block px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] tracking-widest uppercase">
                2008 — 2013
              </span>
              <h4 className="font-display text-2xl sm:text-3xl md:text-6xl tracking-wide text-white">THE YOUNG KING</h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-blue-300/60 leading-relaxed font-body max-w-md">
                Driven by raw fury and extreme competitiveness. Highly defensive, aggressive, and emotional on the field. Every boundary was a statement, and every run was a battle against the world.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Aggressive", "Hot-headed", "Hyper-competitive", "Self-centered"].map((k) => (
                  <span key={k} className="text-[9px] font-mono border border-blue-500/20 bg-blue-500/5 px-2.5 py-1 rounded text-blue-300">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Mature Virat (Blush / Champagne, Balanced) */}
          <div 
            className="absolute inset-0 h-full bg-gradient-to-r from-[#180a0e] to-[#241318] flex items-center justify-end p-4 sm:p-8 md:p-16 transition-all duration-100 ease-out"
            style={{ clipPath: `polygon(${sliderPos}% 0%, 100% 0%, 100% 100%, ${sliderPos}% 100%)` }}
          >
            {/* Absolute element to handle right alignment inside clipPath */}
            <div className="absolute right-4 sm:right-8 md:right-16 max-w-[75%] sm:max-w-[60%] md:max-w-[45%] text-right space-y-4">
              <span className="inline-block px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[10px] tracking-widest uppercase">
                2014 — Present
              </span>
              <h4 className="font-display text-2xl sm:text-3xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F8] via-[#E9C5CC] to-[#D4AF37]">
                THE MATURE MAN
              </h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#E9C5CC]/60 leading-relaxed font-body max-w-md ml-auto">
                Finding peace beyond wickets. Anushka Sharma broadened his vision, introducing meditation, vegan nutrition, spiritual practices, compassion, and a balanced worldview.
              </p>
              <div className="flex flex-wrap gap-2 justify-end pt-2">
                {["Balanced", "Family man", "Spiritual", "Calm", "Compassionate"].map((k) => (
                  <span key={k} className="text-[9px] font-mono border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-2.5 py-1 rounded text-[#E9C5CC]">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Draggable vertical divider */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#FFF7F8] to-[#D4AF37] z-30 cursor-ew-resize flex justify-center items-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute h-10 w-10 rounded-full border-2 border-[#D4AF37] bg-black shadow-lg flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="h-4 w-4 animate-spin-slow" />
            </div>
          </div>

          {/* Invisible Overlay for mouse movement/touch dragging */}
          <div 
            className="absolute inset-0 z-20 cursor-ew-resize opacity-0"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
              setSliderPos(pct);
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
                setSliderPos(pct);
              }
            }}
          />
        </div>

        {/* Buttons for quick trigger */}
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={() => setSliderPos(20)}
            className="px-5 py-2 border border-blue-500/30 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 text-xs font-mono uppercase tracking-widest rounded-full transition-all"
          >
            Show Young Virat (20%)
          </button>
          <button 
            onClick={() => setSliderPos(50)}
            className="px-5 py-2 border border-[#FFF7F8]/20 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-widest rounded-full transition-all"
          >
            Equal Split (50%)
          </button>
          <button 
            onClick={() => setSliderPos(80)}
            className="px-5 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-mono uppercase tracking-widest rounded-full transition-all"
          >
            Show Mature Virat (80%)
          </button>
        </div>
      </section>

      {/* SECTION 4: EMOTIONAL QUOTE WALL (Rotating typography over blurred wedding background) */}
      <section className="relative z-10 py-32 w-full overflow-hidden border-t border-[#E9C5CC]/10">
        <div 
          className="absolute inset-0 bg-cover bg-[center_35%] opacity-10 blur-[8px] z-0 scale-[1.05]"
          style={{ backgroundImage: `url('/assets/love/wedding.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#0e0a0b]/80 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#E9C5CC] font-bold font-mono block mb-6">
            03 // Real Confessions
          </span>

          <div className="h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="font-display text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wider leading-tight max-w-3xl mx-auto">
                  "{quotesWall[activeQuote]}"
                </p>
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono font-semibold block">
                  — Virat Kohli
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {quotesWall.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveQuote(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${activeQuote === idx ? "w-6 bg-[#D4AF37]" : "w-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: RCB CHAMPIONS REDEMPTION ("THE TROPHY THAT TOOK 17 YEARS") */}
      <section className="relative z-10 py-32 px-6 lg:px-16 max-w-[1440px] mx-auto w-full border-t border-[#E9C5CC]/10">
        <GoldSparks />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[10px] tracking-widest uppercase">
              <Star className="h-3 w-3 fill-[#D4AF37]" />
              RCB Title Redemption
            </span>

            <h2 className="font-display text-4xl md:text-6xl tracking-wide uppercase text-white leading-none">
              THE TROPHY THAT TOOK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFF7F8]">17 YEARS</span>
            </h2>

            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#E9C5CC]/70 font-mono leading-relaxed">
              "The world saw a trophy. <br />
              Virat saw a journey. <br />
              Years of loyalty. <br />
              Years of heartbreak. <br />
              Years of waiting. <br />
              And beside him through it all was Anushka."
            </p>

            <p className="text-[#FFF7F8]/60 text-sm leading-relaxed font-body">
              Through the intense criticism, the IPL finals lost, and the constant jokes from rival teams, she sat in the stands. When the gold confetti finally drifted across Chinnaswamy in 2025, the release of pure relief and celebration belonged to the partnership that survived it all.
            </p>

            {/* Audio crowd rumbler toggle button */}
            <div className="pt-4">
              <button 
                onClick={toggleCrowdAudio}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
                  audioPlaying 
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10" 
                    : "border-[#E9C5CC]/20 bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {audioPlaying ? <Volume2 className="h-4 w-4 animate-bounce" /> : <VolumeX className="h-4 w-4" />}
                <span className="text-xs uppercase font-mono tracking-widest font-bold">
                  {audioPlaying ? "Mute Stadium Ambience" : "Listen to Crowd Ambience"}
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[400px]">
              <TimelineImage 
                src="/assets/love/rcb_trophy.jpg" 
                alt="Virat and Anushka celebrating RCB IPL title" 
                revealType="ray"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CHAPTER ENDING FADE-OUT */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden border-t border-[#E9C5CC]/10 bg-[#0e0a0b]">
        {/* Ambient blending background (wedding and RCB trophy) */}
        <div className="absolute inset-0 z-0 flex w-full h-full">
          <div 
            className="w-1/2 h-full bg-cover bg-[center_35%] opacity-5 filter blur-sm grayscale"
            style={{ backgroundImage: `url('/assets/love/wedding.jpg')` }}
          />
          <div 
            className="w-1/2 h-full bg-cover bg-center opacity-5 filter blur-sm grayscale"
            style={{ backgroundImage: `url('/assets/love/rcb_trophy.jpg')` }}
          />
        </div>

        <div className="relative z-10 text-center px-6 space-y-12">
          <div className="space-y-4">
            <p className="font-display text-3xl md:text-5xl uppercase tracking-[0.2em] text-[#E9C5CC]/60 leading-none">
              Some chapters create legends.
            </p>
            <p className="font-display text-4xl md:text-6xl uppercase tracking-[0.2em] text-white leading-none font-bold">
              Some chapters create men.
            </p>
          </div>

          <div className="space-y-2 pt-6">
            <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-[#D4AF37] block">
              Chapter Nine Complete
            </span>
            <h3 className="font-display text-5xl md:text-7xl uppercase tracking-[0.15em] text-[#FFF7F8]">
              Man In Love
            </h3>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#E9C5CC]/40 block pt-4 italic">
              To be continued...
            </span>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-2 border border-[#E9C5CC]/20 hover:border-[#D4AF37]/50 rounded-full text-[10px] uppercase font-mono tracking-widest text-[#E9C5CC]/60 hover:text-white transition-all duration-300"
            >
              Back To Top
            </button>
          </div>
        </div>
      </section>

      <ChapterNav />
    </main>
  );
}

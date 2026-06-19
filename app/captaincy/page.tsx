"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  Scale,
  AlertTriangle,
  Trophy,
  Flame,
  Shield,
  Star,
  ChevronDown,
  Award,
} from "lucide-react";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

// ─────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────
function useCountUp(target: number, duration = 2200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let raf: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

// ─────────────────────────────────────────────
// GOLD CONFETTI CANVAS
// ─────────────────────────────────────────────
function GoldConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let raf: number;
    const colors = ["#D4AF37", "#F2C94C", "#FFF7F8", "#E9C5CC", "#FFD700", "#C0A020", "#fff"];
    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h,
      w: 5 + Math.random() * 9,
      h: 3 + Math.random() * 5,
      vx: Math.random() * 1.4 - 0.7,
      vy: 1.2 + Math.random() * 2.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      rotS: (Math.random() - 0.5) * 0.09,
      alpha: 0.55 + Math.random() * 0.45,
    }));
    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotS;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />;
}

// ─────────────────────────────────────────────
// HEADLINE CARD (prosecution)
// ─────────────────────────────────────────────
function HeadlineCard({ text, source, delay = 0, rotate = 0 }: {
  text: string; source: string; delay?: number; rotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: rotate - 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.6 }}
      className="relative bg-[#0e0508] border border-red-900/20 rounded-xl p-6 overflow-hidden shadow-xl shadow-black/70 hover:border-red-800/40 transition-colors duration-300"
    >
      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-800 via-red-700/60 to-transparent" />
      {/* Top grain */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-red-900/20" />
      <span className="text-[9px] uppercase tracking-[0.45em] font-mono text-red-900/55 block mb-2 pl-4">
        {source}
      </span>
      <p className="text-[#c8b0b0]/80 text-[13px] font-mono leading-relaxed pl-4 italic">
        &ldquo;{text}&rdquo;
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// EVIDENCE STAT CARD
// ─────────────────────────────────────────────
type StatColor = "gold" | "blue" | "crimson";

function EvidenceCard({ number, suffix = "", label, sublabel, delay = 0, active = false, color = "blue" }: {
  number: number; suffix?: string; label: string; sublabel: string; delay?: number; active?: boolean; color?: StatColor;
}) {
  const count = useCountUp(number, 2000 + delay * 300, active);
  const palettes: Record<StatColor, { num: string; border: string; bg: string; dot: string }> = {
    gold:    { num: "text-[#D4AF37]",  border: "border-[#D4AF37]/20",  bg: "bg-[#D4AF37]/5",  dot: "bg-[#D4AF37]" },
    blue:    { num: "text-blue-300",   border: "border-blue-900/30",   bg: "bg-blue-500/5",   dot: "bg-blue-400" },
    crimson: { num: "text-red-400",    border: "border-red-900/25",    bg: "bg-red-900/5",    dot: "bg-red-500" },
  };
  const p = palettes[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.65, type: "spring", stiffness: 80 }}
      className={`relative rounded-2xl border ${p.border} ${p.bg} p-7 text-center overflow-hidden backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${p.dot} animate-pulse`} />
      <div className={`font-display text-5xl md:text-7xl font-black ${p.num} leading-none mb-2`}>
        {count}{suffix}
      </div>
      <div className="text-white/80 text-[11px] md:text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5 font-semibold">
        {label}
      </div>
      <div className="text-white/35 text-[11px] font-mono tracking-wide leading-snug">{sublabel}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const criticisms = [
  { text: "Kohli could never win an ICC trophy as captain. He is India's best batter — but not India's best captain.", source: "India Today, 2021" },
  { text: "After three (four) ICC tournaments, I was considered a failed captain.", source: "Virat Kohli — acknowledging the narrative, 2022" },
  { text: "Three ICC knockout losses under his watch. The trophy drought defines his legacy.", source: "NDTV Sports" },
  { text: "His aggression is fake. Rohit doesn't show fake aggression like Kohli.", source: "Kapil Dev" },
  { text: "Will Kohli ever win as captain? The question every fan is asking.", source: "Cricbuzz Editorial" },
  { text: "India were dominant in series. But trophies are the only true measure of captaincy.", source: "Wisden Almanack" },
];

const captaincyStats: Array<{ number: number; suffix: string; label: string; sublabel: string; color: StatColor; delay: number }> = [
  { number: 40,  suffix: "",  label: "Test Victories",    sublabel: "Most by any Indian captain in history",          color: "gold",    delay: 0    },
  { number: 58,  suffix: "%", label: "Test Win Rate",     sublabel: "Highest win% among all Indian Test captains",    color: "gold",    delay: 0.12 },
  { number: 42,  suffix: "",  label: "Months at #1",      sublabel: "India held the ICC Test top ranking",            color: "blue",    delay: 0.24 },
  { number: 68,  suffix: "%", label: "ODI Win Rate",      sublabel: "95 matches — 65 victories",                      color: "blue",    delay: 0.36 },
  { number: 18,  suffix: "",  label: "Home Series Won",   sublabel: "Never lost a single home Test series",           color: "gold",    delay: 0.48 },
  { number: 71,  suffix: "",  label: "Year Wait Ended",   sublabel: "First-ever Test series win in Australia",        color: "crimson", delay: 0.60 },
];

const beforeList = [
  "Batting-dependent. If the top order failed, India collapsed.",
  "Away Test wins were rare — never won a series in Australia.",
  "Fitness was inconsistent. No mandatory standards.",
  "Pace attack was secondary to spin bowling.",
  "Teams played for draws rather than wins abroad.",
  "The home fortress was strong — but India were strangers away.",
];

const afterList = [
  "Pace battery became world-class. Bumrah reached ICC #1.",
  "India won Test series in Australia, England, New Zealand & South Africa.",
  "Yo-Yo test mandatory. Fitness became non-negotiable.",
  "India could take 20 wickets on any pitch, anywhere.",
  "42 consecutive months as ICC #1 Test team — unprecedented.",
  "Perfect home record — never lost a single Test series at home.",
];

const verdictLines = [
  "Most successful Test captain India has ever produced.",
  "Leader of India's greatest overseas era.",
  "Architect of India's pace revolution.",
  "The man who made India believe.",
];

const monologueLines = [
  { text: "Some captains win trophies.", size: "text-2xl md:text-4xl", color: "text-white/40" },
  { text: "Some captains change teams.", size: "text-2xl md:text-4xl", color: "text-white/40" },
  { text: "Virat Kohli changed an entire cricket culture.", size: "text-3xl md:text-5xl", color: "text-white" },
  { text: "He changed how India trained.", size: "text-2xl md:text-4xl", color: "text-white/70" },
  { text: "He changed how India fought.", size: "text-2xl md:text-4xl", color: "text-white/70" },
  { text: "He changed how India believed.", size: "text-2xl md:text-4xl", color: "text-[#D4AF37]" },
  { text: "And long after scorecards are forgotten...", size: "text-xl md:text-3xl", color: "text-white/35" },
  { text: "The team he built will remain.", size: "text-3xl md:text-5xl", color: "text-white" },
];

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function CaptaincyPage() {
  const [openingPhase, setOpeningPhase] = useState(0);
  const [skipOpening, setSkipOpening] = useState(false);
  const [verdictFlash, setVerdictFlash] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const verdictRef = useRef<HTMLDivElement>(null);
  const verdictInView = useInView(verdictRef, { once: true, margin: "-160px" });

  // Opening sequence timers
  useEffect(() => {
    if (skipOpening) { setOpeningPhase(10); return; }
    const timers = [
      setTimeout(() => setOpeningPhase(1), 700),
      setTimeout(() => setOpeningPhase(2), 2200),
      setTimeout(() => setOpeningPhase(3), 3700),
      setTimeout(() => setOpeningPhase(5), 5800),
      setTimeout(() => setOpeningPhase(10), 8200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [skipOpening]);

  // Verdict flash
  useEffect(() => {
    if (!verdictInView) return;
    const t = setTimeout(() => setVerdictFlash(true), 900);
    return () => clearTimeout(t);
  }, [verdictInView]);

  const showOpening = openingPhase < 10;

  return (
    <main className="relative min-h-screen theme-captaincy text-white flex flex-col overflow-x-hidden select-none">
      <CinematicHeader />

      {/* ══════════════════════════════════════════
          OPENING SEQUENCE
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showOpening && (
          <motion.section
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Film grain */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.95) 100%)" }} />

            <div className="text-center space-y-7 max-w-2xl px-8 relative z-10">
              <AnimatePresence>
                {openingPhase >= 1 && (
                  <motion.p key="p1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="font-display text-3xl md:text-5xl text-red-500/85 tracking-[0.22em] uppercase">
                    No ICC Trophy.
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {openingPhase >= 2 && (
                  <motion.p key="p2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="font-display text-3xl md:text-5xl text-red-400/75 tracking-[0.22em] uppercase">
                    No IPL Trophy.
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {openingPhase >= 3 && (
                  <motion.p key="p3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="font-display text-4xl md:text-6xl text-white tracking-[0.15em] uppercase font-black">
                    Failed Captain.
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {openingPhase >= 5 && (
                  <motion.div key="p5" initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, type: "spring", stiffness: 90 }}
                    className="pt-6 space-y-4">
                    <p className="font-display text-6xl md:text-9xl text-white tracking-[0.06em] uppercase font-black leading-none">
                      Really?
                    </p>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: openingPhase >= 1 ? 0.5 : 0 }} whileHover={{ opacity: 1 }}
              onClick={() => setSkipOpening(true)}
              className="absolute bottom-8 right-8 text-[10px] uppercase font-mono tracking-[0.4em] text-white border border-white/15 hover:border-white/35 px-4 py-2 rounded-full transition-all"
            >
              Skip Intro
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
        {/* BG: emotional cap moment image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/captaincy/cap_moment.jpg"
            alt="Virat Kohli — emotional moment"
            className="w-full h-full object-cover object-[center_30%] opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/75 to-[#030305]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/60 via-transparent to-[#030305]/60" />
        </div>
        {/* Crimson radial */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 25%, rgba(30,0,8,0.9) 100%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 mt-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-900/40 bg-red-950/25 text-[11px] font-mono tracking-[0.4em] uppercase text-red-400/80 mb-10"
          >
            <Scale className="h-3 w-3" />
            The Verdict
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
            className="font-display text-[clamp(4rem,14vw,11rem)] tracking-[0.06em] uppercase text-white leading-none"
          >
            FAILED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-400 to-red-600">
              CAPTAIN?
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.85, duration: 0.7 }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-red-700 to-transparent mx-auto my-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
            className="font-display text-2xl md:text-4xl text-white/55 tracking-[0.25em] uppercase"
          >
            Really?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <span className="text-[9px] uppercase tracking-[0.45em] text-white/25 font-mono">Enter The Courtroom</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ChevronDown className="h-5 w-5 text-red-700/55" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 1 — THE PROSECUTION
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-red-600/75 font-mono font-bold"
          >
            <AlertTriangle className="h-3 w-3 animate-pulse" />
            01 // The Prosecution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl md:text-[clamp(3rem,6vw,5.5rem)] uppercase tracking-wider text-white mt-3 leading-none"
          >
            THE CASE<br />
            <span className="text-red-600/80">AGAINST HIM</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-red-900/55 text-[11px] uppercase tracking-[0.35em] font-mono mt-5"
          >
            Before the defense rests — let the critics speak first
          </motion.p>
        </div>

        {/* Headline cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {criticisms.map((c, i) => (
            <HeadlineCard key={i} text={c.text} source={c.source} delay={i * 0.09} rotate={i % 2 === 0 ? -0.4 : 0.4} />
          ))}
        </div>

        {/* 3 heartbreak images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {[
            { src: "/assets/captaincy/thinking.jpg",         alt: "Virat thinking",           label: "The Burden"      },
            { src: "/assets/captaincy/dugout_heartbreak.jpg",alt: "Virat heartbroken",        label: "The Heartbreak"  },
            { src: "/assets/captaincy/kane_embrace.jpg",     alt: "Consolation after WC loss",label: "The Closest Miss" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="aspect-[3/4] overflow-hidden rounded-2xl border border-red-900/20 relative group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400/80 block">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pivot moment */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="text-center border-t border-white/8 pt-24"
        >
          <p className="font-display text-2xl md:text-4xl text-white/45 uppercase tracking-[0.18em] max-w-3xl mx-auto">
            The prosecution rests.
          </p>
          <p className="font-display text-3xl md:text-5xl text-white uppercase tracking-[0.12em] max-w-3xl mx-auto mt-5">
            Now let&apos;s talk about the facts.
          </p>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-white/25 to-transparent mx-auto mt-10" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — THE COUNTERATTACK (Stats)
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-28 w-full overflow-hidden border-t border-blue-900/15 bg-[#040c1c]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#040c1c] to-[#030305]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-900/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="mb-20 text-center">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-blue-400/75 font-mono font-bold"
            >
              <Shield className="h-3 w-3" />
              02 // The Defense
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display text-4xl md:text-[clamp(3rem,6vw,5.5rem)] uppercase tracking-wider text-white mt-3 leading-none"
            >
              IF TROPHIES ARE<br />
              <span className="text-blue-400">THE ONLY MEASURE...</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-blue-300/35 text-[12px] uppercase tracking-[0.3em] font-mono mt-5 max-w-lg mx-auto"
            >
              ...then cricket history has misunderstood leadership. Let the numbers speak.
            </motion.p>
          </div>

          {/* Stat grid */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-20">
            {captaincyStats.map((s, i) => (
              <EvidenceCard
                key={i}
                number={s.number}
                suffix={s.suffix}
                label={s.label}
                sublabel={s.sublabel}
                delay={s.delay}
                active={statsInView}
                color={s.color}
              />
            ))}
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="overflow-x-auto rounded-2xl border border-blue-900/20 bg-[#040d22]/70 backdrop-blur-sm mb-20"
          >
            <div className="px-6 py-5 border-b border-blue-900/15">
              <span className="text-[10px] uppercase tracking-widest font-mono text-blue-300/55">India Test Captains — Comparison</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-900/15 bg-blue-900/8">
                  {["Captain", "Tests", "Wins", "Win %", "ICC Trophies"].map((h) => (
                    <th key={h} className="text-left p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-blue-300/55">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Virat Kohli",     tests: 68, wins: 40, pct: "58.8%", icc: 0, top: true  },
                  { name: "MS Dhoni",        tests: 60, wins: 27, pct: "45.0%", icc: 2, top: false },
                  { name: "Sourav Ganguly",  tests: 49, wins: 21, pct: "42.9%", icc: 0, top: false },
                  { name: "Rahul Dravid",    tests: 25, wins: 8,  pct: "32.0%", icc: 0, top: false },
                  { name: "Kapil Dev",       tests: 34, wins: 8,  pct: "23.5%", icc: 1, top: false },
                ].map((row) => (
                  <tr key={row.name} className={`border-b border-blue-900/10 hover:bg-blue-900/10 transition-colors ${row.top ? "bg-[#D4AF37]/5" : ""}`}>
                    <td className={`p-4 font-mono font-semibold ${row.top ? "text-[#D4AF37]" : "text-white/75"}`}>
                      {row.name}
                      {row.top && (
                        <span className="ml-3 text-[8px] bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Most Wins
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center text-white/50 font-mono">{row.tests}</td>
                    <td className="p-4 text-center text-white/50 font-mono">{row.wins}</td>
                    <td className={`p-4 text-center font-mono font-bold ${row.top ? "text-[#D4AF37]" : "text-white/50"}`}>{row.pct}</td>
                    <td className={`p-4 text-center font-mono font-semibold ${row.icc > 0 ? "text-[#D4AF37]" : "text-white/25"}`}>{row.icc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Kohli self-quote */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="font-display text-2xl md:text-4xl text-white/75 uppercase tracking-[0.14em] leading-snug italic">
              &ldquo;I never judged myself from that point of view. What we achieved as a team and as a cultural change is a matter of pride.&rdquo;
            </p>
            <span className="text-blue-300/50 text-[10px] uppercase tracking-[0.4em] font-mono block mt-5">— Virat Kohli</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — THE REVOLUTION
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-16 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/75 font-mono font-bold"
          >
            <Flame className="h-3 w-3" />
            03 // The Revolution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl md:text-[clamp(3rem,6vw,5.5rem)] uppercase tracking-wider text-white mt-3 leading-none"
          >
            HE DIDN&apos;T INHERIT<br />
            <span className="text-[#D4AF37]">A MACHINE.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-[#D4AF37]/40 text-sm uppercase tracking-[0.35em] font-mono mt-4"
          >
            He built one.
          </motion.p>
        </div>

        {/* Before vs After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-[#0f0f18] border border-white/8 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full blur-2xl" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-red-400/60 mb-4 block">Before Kohli</span>
            <h3 className="font-display text-3xl text-white/35 uppercase tracking-wide mb-7 leading-none">Pre-2015 India</h3>
            <ul className="space-y-4">
              {beforeList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-white/40 font-body leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-800/70 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-[#050f20] border border-[#D4AF37]/12 rounded-2xl p-8 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/12 rounded-full blur-2xl" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-[#D4AF37]/75 mb-4 block">The Kohli Era</span>
            <h3 className="font-display text-3xl text-[#D4AF37] uppercase tracking-wide mb-7 leading-none">2015 — 2022</h3>
            <ul className="space-y-4">
              {afterList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-white/75 font-body leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 4 pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { emoji: "🏋️", label: "Yo-Yo Standard", desc: "Mandatory fitness test — non-negotiable for every Indian player" },
            { emoji: "🎯", label: "Pace Revolution", desc: "Bumrah, Shami, Siraj — a world-class pace battery built from scratch" },
            { emoji: "🌍", label: "Away Victories", desc: "Series wins in Australia, New Zealand, England & South Africa" },
            { emoji: "🔥", label: "Aggressive Culture", desc: "India played to win — not to draw. The mindset shift that changed everything" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-[#0e0e1a] border border-[#D4AF37]/10 rounded-2xl p-6 text-center hover:border-[#D4AF37]/25 transition-colors duration-300"
            >
              <span className="text-4xl block mb-3">{item.emoji}</span>
              <h4 className="text-[#D4AF37] font-mono text-[11px] uppercase tracking-[0.25em] font-semibold mb-2">{item.label}</h4>
              <p className="text-white/40 text-[12px] font-body leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — THE AUSTRALIAN MIRACLE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full overflow-hidden border-t border-white/5 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left: text block */}
          <div className="relative z-10 flex flex-col justify-center p-10 lg:p-20 bg-[#030305]">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/75 font-mono font-bold mb-10 w-fit"
            >
              <Trophy className="h-3 w-3" />
              04 // The Australian Miracle
            </motion.span>

            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="font-display text-sm uppercase tracking-[0.4em] text-white/35 font-mono mb-3">For 71 years...</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-white leading-none mb-6">
                India had never<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F2C94C] to-[#D4AF37]">
                  conquered Australia
                </span><br />
                in Australia.
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }} className="space-y-5 max-w-md">
              <p className="text-white/55 text-[14px] font-body leading-relaxed">
                In 2018–19, under Virat Kohli's captaincy, India did the unthinkable. They won the Border-Gavaskar Trophy on Australian soil for the first time in 71 years of cricket history.
              </p>
              <p className="text-[#D4AF37]/65 text-[14px] font-body leading-relaxed">
                His fast bowlers — Bumrah, Shami, Ishant — outbowled Australia on Australian pitches. His culture. His revolution. This was the proof.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {[{ v: "2–1", l: "Series Result" }, { v: "1948", l: "India Last Tried (Failed)" }, { v: "2018", l: "History Made" }].map((s) => (
                <div key={s.l} className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded-xl px-5 py-3 text-center">
                  <div className="font-display text-2xl text-[#D4AF37] font-bold leading-none">{s.v}</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/40 font-mono mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: BGT trophy image */}
          <div className="relative min-h-[60vh] lg:min-h-full">
            <img
              src="/assets/captaincy/bgt_trophy.jpg"
              alt="Virat Kohli kissing the Border-Gavaskar Trophy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#030305] lg:to-transparent opacity-60 lg:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] to-transparent opacity-50 lg:opacity-30" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4B — Team celebration + legacy points
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 relative group"
          >
            <img
              src="/assets/captaincy/team_celebration.jpg"
              alt="India Test team celebrating a wicket"
              className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">The Culture He Built</span>
              <p className="text-white/50 text-[12px] font-body mt-1">India — aggressive, athletic, fearless</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/65 font-mono block mb-3">The Legacy</span>
              <h3 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-white leading-none">
                India — Never<br />The Same Again
              </h3>
            </div>
            <p className="text-white/55 text-[14px] font-body leading-relaxed">
              Before Kohli, India accepted draws. Under Kohli, a new template was born — pace-led, fitness-obsessed cricket that dared to win anywhere on Earth.
            </p>
            <div className="space-y-4">
              {[
                "India won Test series in New Zealand — a first in history",
                "India won Test series in Australia — 71-year wait ended",
                "India ranked #1 in Tests for 42 consecutive months",
                "Jasprit Bumrah became ICC's #1 ranked Test bowler",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-white/65 text-[13px] font-body leading-snug">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — THE HUMAN COST
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-28 w-full overflow-hidden border-t border-white/5 bg-[#08030e]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <motion.span
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="text-[10px] uppercase tracking-[0.5em] text-red-400/55 font-mono font-bold block mb-5"
                >
                  05 // The Human Cost
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                  className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white leading-tight"
                >
                  Every Defeat<br />Became<br /><span className="text-red-500/80">His Burden.</span>
                </motion.h2>
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-5">
                <p className="text-white/55 text-[14px] font-body leading-relaxed">
                  Every criticism found his name. Every trophy lost became his headline. He carried the expectations of a billion people — and the weight of every knockout defeat that was never entirely his alone.
                </p>
                <p className="text-white/35 text-[14px] font-body leading-relaxed">
                  He sat in that dugout. Alone. Thinking. The fire still burning inside — even when the crowd was turning away.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="border-l-2 border-red-700/45 pl-6"
              >
                <p className="text-white/65 text-[15px] italic font-body leading-relaxed">
                  &ldquo;On the field, aggression can sometimes be a positive emotion. It boosts performance and can lift your game. But over the years, I have learnt that restrained aggression is a better animal.&rdquo;
                </p>
                <span className="text-red-400/55 text-[10px] uppercase tracking-widest font-mono mt-3 block">— Virat Kohli</span>
              </motion.div>
            </div>

            {/* Images */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="aspect-[3/4] overflow-hidden rounded-2xl border border-red-900/20 relative"
              >
                <img src="/assets/captaincy/thinking.jpg" alt="Virat thinking" className="w-full h-full object-cover" style={{ filter: "sepia(20%) saturate(70%)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
                className="aspect-[3/4] overflow-hidden rounded-2xl border border-red-900/20 relative mt-10"
              >
                <img src="/assets/captaincy/cap_moment.jpg" alt="Virat emotional" className="w-full h-full object-cover" style={{ filter: "sepia(20%) saturate(70%)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE VERDICT
      ══════════════════════════════════════════ */}
      <section
        ref={verdictRef}
        className="relative z-10 min-h-screen w-full flex items-center justify-center overflow-hidden border-t border-white/5 bg-transparent"
      >
        {verdictFlash && <GoldConfetti />}

        {/* BG: Roar image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/captaincy/roar.jpg"
            alt="Virat Kohli roaring"
            className="w-full h-full object-cover object-[center_20%] opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        {/* White flash */}
        <AnimatePresence>
          {verdictFlash && (
            <motion.div
              key="flash"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.6 }}
              className="absolute inset-0 bg-white z-30 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto py-32">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.55em] text-white/25 font-mono block mb-12"
          >
            The Court Has Reached Its Verdict
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.7 }}
            className="font-display text-3xl md:text-5xl uppercase tracking-[0.2em] text-white/40 mb-5"
          >
            Failed Captain?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.2, type: "spring", stiffness: 70 }}
            className="font-display leading-none uppercase tracking-tight font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-[#F2C94C] to-[#C0A020]"
            style={{ fontSize: "clamp(5rem,22vw,16rem)" }}
          >
            NOT<br />GUILTY.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-14"
          />

          <div className="space-y-4 max-w-2xl mx-auto">
            {verdictLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 2 + i * 0.18, duration: 0.6 }}
                className="text-white/65 text-[14px] md:text-base font-body tracking-wide"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL MONOLOGUE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-36 w-full overflow-hidden bg-[#030305]">
        {/* Test Mace faded BG */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/captaincy/test_mace.jpg"
            alt="Virat with Test Mace"
            className="w-full h-full object-cover object-top opacity-8"
            style={{ opacity: 0.08 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/90 to-[#030305]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.55em] text-[#D4AF37]/40 font-mono block mb-16"
          >
            Final Word
          </motion.span>

          <div className="space-y-7">
            {monologueLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.75 }}
                className={`font-display uppercase tracking-[0.18em] leading-tight ${line.size} ${line.color}`}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1 }}
            className="mt-24 space-y-6"
          >
            <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent mx-auto" />
            <p className="font-display text-2xl md:text-4xl text-white/40 uppercase tracking-[0.2em]">
              History may debate his trophies.
            </p>
            <p className="font-display text-3xl md:text-5xl text-white uppercase tracking-[0.14em] font-black">
              History will never debate his impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENDING — FADE TO BLACK
      ══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen w-full flex flex-col justify-center items-center overflow-hidden theme-captaincy border-t border-white/5">
        {/* Roar image — dramatic final */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/captaincy/roar.jpg"
            alt="Virat Kohli roaring — Test victory"
            className="w-full h-full object-cover object-[center_15%] opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091228] via-[#091228]/50 to-[#091228]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#091228]/60 via-transparent to-[#091228]" />
          {/* Subtle gold vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(234,179,8,0.25) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto space-y-10 py-24">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            
            <p className="font-display uppercase font-black leading-none text-white tracking-[0.06em]" style={{ fontSize: "clamp(3.5rem,12vw,9rem)" }}>
              FAILED<br />CAPTAIN??
            </p>
            <p className="font-display uppercase font-black tracking-[0.12em] text-[#D4AF37]" style={{ fontSize: "clamp(2.5rem,9vw,7rem)" }}>
              REALLY?
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent mx-auto mb-8" />
            <p className="font-display text-3xl md:text-5xl uppercase tracking-[0.18em] text-white font-black">
              NOT GUILTY.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 border border-[#D4AF37]/25 hover:border-[#D4AF37]/55 rounded-full text-[10px] uppercase font-mono tracking-[0.45em] text-[#D4AF37]/55 hover:text-[#D4AF37] transition-all duration-300"
            >
              Back To Top
            </button>
          </motion.div>
        </div>

        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </section>

      
      <ChapterNav />
    </main>
  );
}

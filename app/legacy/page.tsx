"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const voicesOfGreatness = [
  { id: "sachin",     speaker: "Sachin Tendulkar",  role: "Master & Legend · India",          quote: "Virat has the ability to chase targets under pressure better than almost anyone I have ever seen.",         theme: "Master to Successor" },
  { id: "dhoni",      speaker: "MS Dhoni",           role: "Captain Legend · India",           quote: "Virat has the hunger to improve every single day. That is what separates him from the rest.",               theme: "Leadership" },
  { id: "abd",        speaker: "AB de Villiers",     role: "Legend & Teammate · South Africa", quote: "He is without doubt the best player of this generation. Playing alongside him changed how I see cricket.",   theme: "Brotherhood" },
  { id: "ponting",    speaker: "Ricky Ponting",      role: "Legend · Australia",               quote: "Virat Kohli is probably the best chaser the game has ever seen. He thrives when the pressure is maximum.",   theme: "Rival Respect" },
  { id: "lara",       speaker: "Brian Lara",         role: "Legend · West Indies",             quote: "Virat carries the expectations of a billion people like very few players ever could.",                       theme: "Carrying Expectations" },
  { id: "gavaskar",   speaker: "Sunil Gavaskar",     role: "Legend · India",                   quote: "The intensity he brings every single day of his career is nothing short of remarkable.",                      theme: "Unyielding Intensity" },
  { id: "williamson", speaker: "Kane Williamson",    role: "Rival Legend · New Zealand",       quote: "He is a role model for modern cricketers everywhere. His standards define what's possible.",                  theme: "Generational Role Model" },
  { id: "smith",      speaker: "Steve Smith",        role: "Rival Legend · Australia",         quote: "The consistency is incredible. Match after match, year after year — he just keeps delivering.",               theme: "Incredible Consistency" },
  { id: "rohit",      speaker: "Rohit Sharma",       role: "Teammate & Legend · India",        quote: "He changed fitness standards in Indian cricket forever. No one worked harder than Virat.",                    theme: "Fitness Revolution" },
  { id: "shastri",    speaker: "Ravi Shastri",       role: "Head Coach · India",               quote: "He transformed India from a side afraid of overseas conditions to the most feared team on the planet.",       theme: "Team Transformation" },
  { id: "anushka",    speaker: "Anushka Sharma",     role: "Life Partner",                     quote: "He is the most disciplined, passionate and driven person I have ever known. His belief is unshakeable.",      theme: "Beyond Cricket" },
  { id: "bhogle",     speaker: "Harsha Bhogle",      role: "Broadcaster & Voice · India",      quote: "Virat Kohli made intensity beautiful. He made commitment glamorous. He made effort aspirational.",            theme: "Beautiful Intensity" },
];

const legacyTimeline = [
  { year: "1988",    label: "Delhi Boy",        desc: "Born in Uttam Nagar, Delhi. A son of a lawyer who lived for cricket.", icon: "★" },
  { year: "2008",    label: "U19 Champion",     desc: "Captained India U19 to World Cup glory in Malaysia. The prophecy begins.", icon: "◆" },
  { year: "2011",    label: "World Champion",   desc: "World Cup winner on home soil. Lifted Sachin Tendulkar on his shoulders.", icon: "🏆" },
  { year: "2013",    label: "Run Machine",      desc: "ICC #1 ODI ranking. The most complete white-ball batsman on earth.", icon: "⚡" },
  { year: "2016",    label: "973",              desc: "The greatest individual IPL season in history. An entire format redefined.", icon: "∞" },
  { year: "2018",    label: "Captain",          desc: "Led India to first-ever Test series win in Australia. No.1 Test team globally.", icon: "⚔" },
  { year: "2024",    label: "Champion",         desc: "T20 World Cup winner. Retired at the peak. 76* in the final.", icon: "👑" },
  { year: "Forever", label: "Legacy",           desc: "Not a cricketer. An era. Not a player. A generation's identity.", icon: "∞" },
];

const numbersData = [
  { number: "85",      label: "International Centuries", sub: "Across all formats" },
  { number: "28,000+", label: "International Runs",      sub: "Third most in history" },
  { number: "18",      label: "Years of Dominance",      sub: "2008 — 2026" },
  { number: "100+",    label: "Man of Match Awards",     sub: "In international cricket" },
];

const generationPoints = [
  { title: "The Fitness Revolution",        desc: "Before Kohli, Indian cricketers had varying fitness standards. After Kohli, every player who entered the national side was expected to match his benchmarks. He redefined what it means to be a professional." },
  { title: "Aggressive Mentality",          desc: "India no longer plays to not lose. India plays to dominate. Kohli's uncompromising will — refusing to concede in any conditions — transferred into an entire generation's mindset." },
  { title: "The Batting Stance You Copy",   desc: "Across India, millions of young cricketers mimic his backlift, his cover drive, his pull shot. The most replicated stance in cricket. The most studied technique of his generation." },
  { title: "Belief Over Conditions",        desc: "Before 2018, India had never won a Test series in Australia. Kohli made India believe that overseas conquests were possible. The next generation inherited that belief." },
];

const beyondCricket = [
  { name: "One8",              desc: "Premium lifestyle brand built on discipline and luxury. A direct extension of his personal philosophy." },
  { name: "Wrogn",             desc: "Youth fashion brand reshaping how young Indians see style, ambition, and athletic identity." },
  { name: "SEVVAH",            desc: "Athletic performance brand — bringing elite training philosophy to everyday fitness culture." },
  { name: "Fitness Movement",  desc: "Inspired millions to adopt plant-based diets, structured training, and professional-grade recovery protocols." },
  { name: "Philanthrophy",     desc: "The Virat Kohli Foundation — supporting underprivileged children through education and sport." },
  { name: "Media & Content",   desc: "A social media presence that reaches 260M+ followers — shaping culture, trends, and youth aspirations." },
];

const kohliQuotes = [
  "Self-belief and hard work will always earn you success.",
  "Whatever you want to do, do it with full passion and make it your habit.",
  "I always dreamt of playing for India. That dream never wavered.",
  "The bat is not my identity. The mindset is.",
  "You can break records. You cannot recreate influence.",
  "The king is remembered not for the throne, but for the people he inspired.",
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function LegacyPage() {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [finalScreenOpen, setFinalScreenOpen] = useState(false);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [kohliQuoteIdx, setKohliQuoteIdx] = useState(0);

  const numbersRef = useRef<HTMLDivElement>(null);

  const activeVoice = voicesOfGreatness[activeQuoteIdx];

  // Auto-rotate Kohli quotes every 4s
  useEffect(() => {
    const t = setInterval(() => {
      setKohliQuoteIdx(prev => (prev + 1) % kohliQuotes.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Auto-rotate voices every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setActiveQuoteIdx(prev => (prev + 1) % voicesOfGreatness.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // IntersectionObserver for number reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setNumbersVisible(true); },
      { threshold: 0.3 }
    );
    if (numbersRef.current) observer.observe(numbersRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen theme-legacy text-white flex flex-col overflow-x-hidden select-none font-body bg-black">

      {/* ── Global Styles ─────────────────────────────── */}
      <style>{`
        @keyframes goldFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50%       { transform: translateY(-18px) scale(1.05); opacity: 1; }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(234,179,8,0.1); }
          50%       { box-shadow: 0 0 60px rgba(234,179,8,0.35), 0 0 120px rgba(234,179,8,0.12); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rayRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-20vh) translateX(60px); opacity: 0; }
        }
        .gold-shimmer-text {
          background: linear-gradient(90deg, #b45309 0%, #fbbf24 30%, #fde68a 50%, #fbbf24 70%, #b45309 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerSweep 4s linear infinite;
        }
        .legacy-glow { animation: goldPulse 4s ease-in-out infinite; }
        .particle { animation: particleDrift linear infinite; position: absolute; border-radius: 50%; background: rgba(234,179,8,0.6); pointer-events: none; }
        .ray { animation: rayRotate linear infinite; }
        .number-counter { font-variant-numeric: tabular-nums; }
      `}</style>

      {/* ── Gold Particles ────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${2 + (i % 4)}px`, height: `${2 + (i % 4)}px`,
            left: `${(i * 7.1) % 100}%`,
            animationDuration: `${8 + (i * 1.3) % 10}s`,
            animationDelay: `${(i * 0.7) % 6}s`,
          }} />
        ))}
      </div>

      {/* ── Ambient Glow Orbs ─────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-yellow-500/4 rounded-full blur-[180px]" />
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-yellow-600/3 rounded-full blur-[250px]" />
      </div>



      <div className="relative z-50"><CinematicHeader /></div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO OPENING
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 lg:px-20 overflow-hidden">
        {/* Large 18 watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="font-display font-black text-white leading-none" style={{ fontSize: "clamp(12rem, 40vw, 30rem)", opacity: 0.018 }}>18</span>
        </div>

        {/* Light ray ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <div className="ray w-[900px] h-[900px] rounded-full border border-yellow-500/5" style={{ animationDuration: "80s" }} />
          <div className="ray w-[600px] h-[600px] rounded-full border border-yellow-500/8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDuration: "50s", animationDirection: "reverse" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-bold font-mono block">
                Chapter 16 // The Epilogue
              </span>
              <h1 className="font-display font-black uppercase leading-none text-white" style={{ fontSize: "clamp(4rem, 14vw, 9rem)", letterSpacing: "-0.02em" }}>
                LEGACY
              </h1>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 font-semibold font-mono">
                What remains when the records fade
              </p>
            </div>

            <div className="border-l-2 border-yellow-500/50 pl-6 py-2">
              <p className="text-white/70 text-base md:text-lg italic leading-relaxed font-body">
                "Before statistics. Before trophies. Before records.<br />
                There is <span className="text-yellow-400 not-italic font-bold">respect</span>."
              </p>
            </div>

            {/* Rotating Kohli quotes */}
            <div className="bg-white/[0.02] border border-yellow-500/15 rounded-2xl p-6 min-h-[100px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={kohliQuoteIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6 }}
                  className="text-white/80 text-sm md:text-base font-body italic leading-relaxed"
                >
                  <span className="text-yellow-400 text-2xl leading-none mr-1">"</span>
                  {kohliQuotes[kohliQuoteIdx]}
                  <span className="text-yellow-400 text-2xl leading-none ml-1">"</span>
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.3em] text-yellow-500/60 font-mono">— Virat Kohli</span>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-yellow-500/20 to-transparent" />
            </div>
          </motion.div>

          {/* Portrait side */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex justify-center relative"
          >
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden border border-yellow-500/20 shadow-2xl legacy-glow group">
              <div className="absolute inset-0 bg-cover bg-top opacity-40 blur-2xl scale-110 pointer-events-none" style={{ backgroundImage: `url('/assets/legacy/hero_believe.jpg')` }} />
              <img
                src="/assets/legacy/hero_believe.jpg"
                alt="Virat Kohli – Legacy"
                className="w-full h-auto object-contain rounded-3xl relative z-10 transition-transform duration-1000 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 text-center">
                <span className="text-[9px] uppercase tracking-[0.4em] text-yellow-500 font-mono font-bold block">The Epilogue</span>
                <h2 className="font-display text-2xl uppercase tracking-wider text-white font-bold">Virat Kohli</h2>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">1988 — ∞</p>
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-black border border-yellow-500/30 rounded-2xl px-4 py-3 text-center shadow-xl"
            >
              <span className="font-display text-2xl text-yellow-400 font-black block">85</span>
              <span className="text-[8px] uppercase tracking-widest text-white/50 block">Centuries</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-4 bg-black border border-yellow-500/30 rounded-2xl px-4 py-3 text-center shadow-xl"
            >
              <span className="font-display text-2xl text-yellow-400 font-black block">18</span>
              <span className="text-[8px] uppercase tracking-widest text-white/50 block">Years</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-yellow-500/40 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — THE NUMBERS WILL BE BROKEN
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-20 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-4">Act I // The Numbers</span>
            <h2 className="font-display text-4xl md:text-7xl uppercase font-black tracking-tight text-white leading-none">
              THE NUMBERS<br /><span className="gold-shimmer-text">WILL BE BROKEN</span>
            </h2>
            <p className="text-white/40 mt-6 text-sm md:text-base font-body max-w-xl mx-auto">
              Records fade. Statistics shift. Numbers get surpassed. That was never the real story.
            </p>
          </motion.div>

          {/* Number cards */}
          <div ref={numbersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {numbersData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/[0.02] border border-yellow-500/15 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-display text-3xl md:text-5xl font-black text-white block number-counter group-hover:text-yellow-400 transition-colors duration-500">
                  {item.number}
                </span>
                <span className="text-yellow-500 text-[10px] uppercase tracking-[0.2em] font-bold font-mono block mt-3">
                  {item.label}
                </span>
                <span className="text-white/30 text-[9px] uppercase tracking-widest block mt-1">
                  {item.sub}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Transition statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center border-t border-white/5 pt-16"
          >
            <p className="text-white/30 text-lg md:text-2xl font-body italic mb-4">Records will be surpassed.</p>
            <p className="text-white/50 text-lg md:text-2xl font-body italic mb-4">Centuries will be matched.</p>
            <p className="text-white/70 text-xl md:text-3xl font-body italic mb-6">Statistics will be broken.</p>
            <p className="font-display text-3xl md:text-6xl uppercase font-black text-yellow-400 tracking-tight">
              But that was never the real story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — LEGACY TIMELINE
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-3">Act II // The Journey</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase font-black tracking-tight text-white">
              THE EVOLUTION
            </h2>
            <p className="text-white/40 mt-4 text-sm font-body max-w-lg">From a Delhi boy to a global icon — eight chapters of a life lived at full intensity.</p>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Spine line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-yellow-500/60 via-yellow-500/20 to-transparent md:-translate-x-1/2" />

            {legacyTimeline.map((item, idx) => {
              const isRight = idx % 2 === 1;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className={`relative flex items-center mb-10 last:mb-0 ${isRight ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
                >
                  {/* Card */}
                  <div className={`ml-16 md:ml-0 md:w-[45%] ${isRight ? "md:pr-0 md:pl-12" : "md:pr-12 md:pl-0"}`}>
                    <div className="bg-white/[0.02] border border-yellow-500/15 hover:border-yellow-500/40 rounded-2xl p-5 md:p-7 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-yellow-500/0 via-yellow-500/40 to-yellow-500/0" />
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-yellow-400 text-lg">{item.icon}</span>
                        <span className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest font-bold">{item.year}</span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl uppercase text-white group-hover:text-yellow-400 transition-colors tracking-wide font-bold">
                        {item.label}
                      </h3>
                      <p className="text-white/50 text-xs md:text-sm font-body leading-relaxed mt-2">{item.desc}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-2 border-yellow-500 bg-black z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — VOICES OF GREATNESS
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-20 border-t border-white/5 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-4">Act III // The Verdict</span>
            <h2 className="font-display text-4xl md:text-7xl uppercase font-black tracking-tight text-white">
              VOICES OF <span className="gold-shimmer-text">GREATNESS</span>
            </h2>
            <p className="text-white/40 mt-4 text-sm font-body">What the greatest minds in cricket said about the King.</p>
          </motion.div>

          {/* Featured quote */}
          <div className="bg-black border border-yellow-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden mb-8 shadow-2xl legacy-glow">
            {/* Decorative large quote mark */}
            <div className="absolute top-4 left-6 font-display text-[8rem] text-yellow-500/5 leading-none pointer-events-none select-none font-black">"</div>
            <div className="absolute bottom-0 right-6 font-display text-[8rem] text-yellow-500/5 leading-none pointer-events-none select-none font-black rotate-180">"</div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* Avatar */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-yellow-500/30 bg-zinc-950 flex items-center justify-center relative">
                  <span className="font-display text-4xl md:text-5xl font-black text-yellow-400/20 select-none">
                    {activeVoice.speaker.split(" ").map(w => w[0]).join("")}
                  </span>
                  <div className="absolute inset-0 rounded-full border border-yellow-500/10 animate-ping" style={{ animationDuration: "3s" }} />
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-9 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVoice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-5"
                  >
                    <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                      {activeVoice.theme}
                    </span>
                    <blockquote>
                      <p className="font-display text-xl md:text-3xl text-white italic leading-relaxed font-bold">
                        "{activeVoice.quote}"
                      </p>
                    </blockquote>
                    <div>
                      <h4 className="font-display text-lg md:text-xl uppercase tracking-wider text-white font-extrabold">{activeVoice.speaker}</h4>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">{activeVoice.role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
              <button
                onClick={() => setActiveQuoteIdx(prev => (prev - 1 + voicesOfGreatness.length) % voicesOfGreatness.length)}
                className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-yellow-500/40 transition-all"
              >←</button>
              <div className="flex gap-1.5">
                {voicesOfGreatness.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveQuoteIdx(i)}
                    className={`rounded-full transition-all duration-300 ${i === activeQuoteIdx ? "w-6 h-2 bg-yellow-500" : "w-2 h-2 bg-white/15 hover:bg-white/30"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveQuoteIdx(prev => (prev + 1) % voicesOfGreatness.length)}
                className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-yellow-500/40 transition-all"
              >→</button>
            </div>
          </div>

          {/* Mini quote grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {voicesOfGreatness.slice(0, 8).map((v, idx) => (
              <motion.button
                key={v.id}
                onClick={() => setActiveQuoteIdx(voicesOfGreatness.indexOf(v))}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${activeVoice.id === v.id ? "border-yellow-500/50 bg-yellow-500/10" : "border-white/5 bg-white/[0.01] hover:border-yellow-500/25"}`}
              >
                <span className="text-[9px] uppercase tracking-widest text-yellow-500 font-bold font-mono block mb-1">{v.theme}</span>
                <span className="text-white text-xs font-display uppercase font-bold tracking-wide leading-tight block">{v.speaker}</span>
                <span className="text-white/30 text-[9px] block mt-0.5">{v.role.split("·")[1]?.trim()}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — THE GENERATION HE INSPIRED
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-3">Act IV // The Ripple</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase font-black tracking-tight text-white leading-none">
              THE GENERATION<br /><span className="gold-shimmer-text">HE INSPIRED</span>
            </h2>
            <div className="mt-6 max-w-2xl">
              <p className="text-white/60 text-base md:text-lg font-body leading-relaxed">
                Virat Kohli didn't just score runs. He changed what Indian cricketers believed was <em className="text-white not-italic font-bold">possible</em>.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generationPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-white/[0.02] border border-yellow-500/10 hover:border-yellow-500/35 rounded-2xl p-7 md:p-9 group transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <span className="font-display text-5xl text-yellow-500/10 font-black absolute top-4 right-6 select-none">0{idx + 1}</span>
                  <h3 className="font-display text-xl md:text-2xl uppercase text-white font-bold group-hover:text-yellow-400 transition-colors tracking-wide mb-4">
                    {point.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed font-body">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/25 rounded-3xl p-8 md:p-12 text-center"
          >
            <p className="font-display text-2xl md:text-4xl uppercase font-black text-white leading-tight">
              He didn't just score runs.<br />
              <span className="text-yellow-400">He rewrote what was possible.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — BEYOND CRICKET
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-4">Act V // The Empire</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase font-black tracking-tight text-white">
              BEYOND <span className="gold-shimmer-text">CRICKET</span>
            </h2>
            <p className="text-white/40 mt-4 text-sm font-body max-w-lg mx-auto">
              The bat was the beginning. His influence extends to culture, commerce, and conscience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beyondCricket.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-zinc-950 border border-white/8 hover:border-yellow-500/35 rounded-2xl p-6 group transition-all duration-400 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center flex-shrink-0 text-yellow-400 font-mono font-bold text-sm group-hover:border-yellow-500/50 transition-colors">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-base uppercase tracking-wide text-white font-bold group-hover:text-yellow-400 transition-colors">{item.name}</h3>
                    <p className="text-white/50 text-xs font-body leading-relaxed mt-2">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — CINEMATIC QUOTE WALL
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 px-6 lg:px-20 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(234,179,8,0.06)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-4">Act VI // His Words</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase font-black tracking-tight text-white">IN HIS OWN WORDS</h2>
          </motion.div>

          <div className="space-y-6">
            {kohliQuotes.map((quote, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`relative max-w-3xl bg-white/[0.02] border rounded-2xl p-7 md:p-9 overflow-hidden group hover:border-yellow-500/30 transition-all duration-400 ${idx % 2 === 0 ? "border-yellow-500/15 rounded-tl-none" : "border-white/10 rounded-tr-none"}`}>
                  <div className="absolute top-3 left-5 font-display text-5xl text-yellow-500/8 font-black leading-none select-none">"</div>
                  <p className="font-display text-xl md:text-2xl text-white italic leading-relaxed font-bold relative z-10 pl-4">
                    {quote}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-yellow-500/40" />
                    <span className="text-[9px] uppercase tracking-widest text-yellow-500/70 font-mono font-bold">Virat Kohli</span>
                  </div>
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8 — THE FINAL SCREEN TRIGGER
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center py-24 px-6 border-t border-white/5 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.06)_0%,transparent_65%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block mb-6">Final Act // The Verdict</span>
            <blockquote className="border-t border-b border-white/10 py-12">
              <p className="font-display text-3xl md:text-6xl uppercase font-black text-white leading-tight">
                "RECORDS WILL BE BROKEN.<br />
                <span className="text-yellow-400">STANDARDS REMAIN."</span>
              </p>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-white/50 text-base md:text-lg font-body max-w-2xl mx-auto leading-relaxed">
              This is not the end of a chapter. This is the beginning of a legacy that will outlive every number, every record, and every era that follows.
            </p>

            <button
              onClick={() => setFinalScreenOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 font-mono text-xs uppercase tracking-widest hover:bg-yellow-500/20 hover:border-yellow-500/70 transition-all duration-300 font-bold mt-6 legacy-glow"
            >
              <span>WITNESS THE LEGACY</span>
              <span className="text-base">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CINEMATIC FINAL SCREEN OVERLAY
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {finalScreenOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center text-center cursor-pointer"
            onClick={() => setFinalScreenOpen(false)}
          >
            {/* Ambient gold glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/8 blur-[200px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-yellow-400/6 blur-[100px] pointer-events-none" />

            {/* Gold particles on final screen */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle" style={{
                  width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
                  left: `${(i * 5.1) % 100}%`,
                  animationDuration: `${6 + (i * 0.8) % 8}s`,
                  animationDelay: `${(i * 0.3) % 4}s`,
                  background: "rgba(234,179,8,0.8)"
                }} />
              ))}
            </div>

            <div className="space-y-8 relative z-10 px-6">
              {/* Large 18 ghost */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.06 }}
                transition={{ duration: 3, delay: 0.3, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-white pointer-events-none select-none leading-none"
                style={{ fontSize: "clamp(10rem, 35vw, 28rem)" }}
              >
                18
              </motion.div>

              {/* The tagline sequence */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-yellow-500/60 font-mono text-xs uppercase tracking-[0.5em]"
              >
                Chapter 16 — The Epilogue
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1.2 }}
                className="space-y-2"
              >
                <h1 className="font-display font-black uppercase text-white leading-none tracking-tight" style={{ fontSize: "clamp(3.5rem, 15vw, 10rem)" }}>
                  VIRAT <span className="gold-shimmer-text">KOHLI</span>
                </h1>
                <p className="text-yellow-400/80 font-mono text-sm md:text-lg uppercase tracking-[0.4em] font-bold">
                  1988 — ∞
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.5 }}
                className="py-6 border-y border-white/8 max-w-2xl mx-auto"
              >
                <p className="font-display text-xl md:text-3xl uppercase font-black text-white tracking-wide">
                  NOT JUST A CRICKETER.
                </p>
                <p className="font-display text-xl md:text-3xl uppercase font-black text-yellow-400 tracking-wide mt-1">
                  AN ERA.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 3.5 }}
                className="text-white/30 font-body text-sm md:text-base italic"
              >
                "The Legacy Lives On."
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 5 }}
                className="text-white/25 font-mono text-[9px] uppercase tracking-[0.4em] pt-8"
              >
                Click anywhere to return
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-30 bg-black border-t border-white/5">
        <ChapterNav />
      </div>
    </main>
  );
}

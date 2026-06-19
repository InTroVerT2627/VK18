"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { ParticleField } from "@/components/effects/particle-field";

// 12 Chronological chapters mapping Virat's life story
const journeyChapters = [
  {
    id: "1988",
    year: "1988",
    title: "THE FIRST SPARK",
    subtitle: "THE BEGINNING",
    quote: "A boy who would one day carry a billion dreams.",
    story: "Born on 5 November 1988 in Delhi. Neighborhood street matches became the breeding ground for a relentless drive. His family recognized the stubborn refusal to lose early on, securing his first wooden bat and launching a dream that would reshape the sport.",
    image: "/assets/timeline/1988_baby_virat.jpg",
    achievement: "The First Spark in West Delhi"
  },
  {
    id: "1995_2000",
    year: "1995–2000",
    title: "THE CONFIDENT CHILD",
    subtitle: "FOUNDATION OF BELIEF",
    quote: "Confidence arrived long before fame.",
    story: "This image already shows the attitude and confidence that later defined his career. Long before the international centuries and stadium roars, the signature stance of defiance and self-belief was already there.",
    image: "/assets/timeline/1995_confident_child.jpg",
    achievement: "Delhi Street Cricket Legend"
  },
  {
    id: "2006",
    year: "2006",
    title: "PAPA MERI JAAN",
    subtitle: "FAMILY FOUNDATION",
    quote: "My father was my biggest support.",
    story: "On 18 December 2006, Prem Kohli passed away. The next morning, 18-year-old Virat walked out to bat for Delhi in a Ranji Match, scored a match-saving 90, and then went to his father's funeral. That crucible forged his unbreakable mental strength. His father's sacrifice remains his greatest driving force.",
    image: "/assets/timeline/2006_father_support.jpg",
    achievement: "Ranji Trophy Match-Saving 90"
  },
  {
    id: "2008_u19",
    year: "2008",
    title: "U19 WORLD CUP CAPTAIN",
    subtitle: "THE LEADERSHIP EMERGES",
    quote: "Leadership begins at the absolute summit.",
    story: "Captained India U19 to a historic World Cup victory in Kuala Lumpur, Malaysia. His tactical sharpness under pressure, fierce celebration style, and infectious passion marked the arrival of a new breed of Indian cricketer.",
    image: "/assets/timeline/2008_u19.jpg",
    achievement: "U19 World Cup Gold Medalist"
  },
  {
    id: "2008_dressing",
    year: "2008",
    title: "THE DRESSING ROOM DREAM",
    subtitle: "AMONG LEGENDS",
    quote: "The boy who grew up watching legends was now sitting beside them.",
    story: "Sitting in the team dressing room alongside legends Sachin Tendulkar and MS Dhoni. The awe of sharing space with his childhood heroes quickly transformed into a quiet determination to prove he belonged on the same stage permanently.",
    image: "/assets/timeline/2008_dressing_room.jpg",
    achievement: "Senior Team Debut"
  },
  {
    id: "2011",
    year: "2011",
    title: "WORLD CUP WINNER",
    subtitle: "CHAMPION OF THE WORLD",
    quote: "Carrying the burden of the nation.",
    story: "Stabilized the final chase with a crucial 35. Carrying Sachin Tendulkar on his shoulders, Kohli uttered: 'He has carried the burden of the nation for 21 years; it was time we carried him on our shoulders.'",
    image: "/assets/timeline/2011_wc.jpg",
    achievement: "ICC Cricket World Cup Champion"
  },
  {
    id: "2013_2016",
    year: "2013–2016",
    title: "RISE OF THE CHASE MASTER",
    subtitle: "DOMINANCE & CONSISTENCY",
    quote: "Obsession with targets.",
    story: "Transforming into the ultimate run-chase anchor. Scoring the fastest ODI century by an Indian (52 balls) and amassing a record-breaking 973 runs in a single IPL season in 2016. Greatness became consistency. Fearlessness defined him.",
    image: "/assets/timeline/2016_peak.jpg",
    achievement: "973 Runs in IPL 2016"
  },
  {
    id: "2017",
    year: "2017",
    title: "BEYOND CRICKET",
    subtitle: "LOVE & PARTNERSHIP",
    quote: "The chapter of balance, peace, and partnership.",
    story: "Married Anushka Sharma in Tuscany, Italy. A partnership that brought peace, perspective, and stability, allowing him to navigate the high-pressure spotlight with grace.",
    image: "/assets/timeline/2017_wedding.jpg",
    achievement: "Stability & Personal Harmony"
  },
  {
    id: "2020_2022",
    year: "2020–2022",
    title: "THE DARK PHASE",
    subtitle: "SILENCE & PRESSURE",
    quote: "A test of faith.",
    story: "Three years without an international century. Captaincy transitions, constant media criticism, and internal struggle. A period of deep introspection and resting the mind in isolation.",
    image: "/assets/timeline/2020_dark_phase.jpg",
    achievement: "Period of Introspection & Mental Reset"
  },
  {
    id: "2022_return",
    year: "2022",
    title: "THE RETURN",
    subtitle: "71ST CENTURY & MELBOURNE",
    quote: "The wait is finally over.",
    story: "Breaking the 1021-day century drought in Dubai with 122* in the Asia Cup, followed by the legendary Melbourne Miracle weeks later, sealing his return to the pinnacle of world cricket.",
    image: "/assets/comeback/71st_century_2.jpg",
    achievement: "Asia Cup 122* & Melbourne 82*"
  },
  {
    id: "2024",
    year: "2024",
    title: "T20 WORLD CUP CHAMPION",
    subtitle: "LEGACY GROWS",
    quote: "Retired at the absolute summit.",
    story: "Guiding India to a T20 World Cup title in Barbados with a match-winning 76 in the final. Kissing the trophy, celebrating with fans, and walking away from the format at the absolute peak.",
    image: "/assets/timeline/2024_t20wc.jpg",
    achievement: "T20 World Cup Champion & Final MVP"
  },
  {
    id: "2025_rcb",
    year: "2025",
    title: "RCB – THE DREAM FULFILLED",
    subtitle: "LOYALTY REWARDED. THE WAIT FINALLY ENDED.",
    quote: "17 YEARS. ONE CROWN.",
    story: "After nearly two decades of commitment, heartbreak, and unwavering loyalty to a single franchise, Virat Kohli finally lifted the IPL trophy. It was more than a title—it was the completion of a journey that millions of fans had lived with him.",
    image: "/assets/timeline/2025_rcb.jpg",
    achievement: "IPL Champion"
  }
];

export default function LifeJourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Scrolling golden line tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="relative min-h-screen theme-journey text-white flex flex-col justify-between overflow-x-hidden select-none font-body">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Esports neon grid lines */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(234,179,8,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        {/* Soft volumetric lights */}
        <div className="aurora-blend absolute top-[15%] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] filter blur-[130px] pointer-events-none" />
        <div className="aurora-blend absolute bottom-[25%] right-[5%] h-[550px] w-[550px] rounded-full bg-yellow-500/[0.03] filter blur-[140px] pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-5 pointer-events-none">
        <ParticleField />
      </div>

      <CinematicHeader />

      {/* STAGE HEADER */}
      <section className="relative z-10 px-6 pt-36 pb-16 lg:px-16 max-w-[1440px] mx-auto w-full text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-yellow-500 font-bold font-mono">
          Origins & Milestones
        </span>
        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-[0.1em] text-white leading-none mt-4 font-black drop-shadow-md">
          LIFE JOURNEY
        </h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-blue-300 font-bold font-mono mt-3">
          The Origin Story of a Cricket Legend
        </p>
        
      </section>

      {/* TIMELINE TRACK SECTION */}
      <div ref={containerRef} className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-20">
        
        {/* CENTER TIMELINE STRAW LINE (UNDER) */}
        <div className="absolute left-[30px] md:left-1/2 md:-translate-x-[0.5px] top-4 bottom-4 w-[2px] bg-white/10 z-0" />
        
        {/* SCROLL-REACTIVE GOLDEN ENERGY LINE (OVER) */}
        {hasMounted && (
          <div className="absolute left-[30px] md:left-1/2 md:-translate-x-[0.5px] top-4 bottom-4 w-[2px] z-10 origin-top">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-yellow-500 via-amber-500 to-yellow-600 origin-top shadow-[0_0_12px_rgba(234,179,8,0.5)]"
            />
          </div>
        )}

        {/* 12 ZIG-ZAG CHAPTER MILESTONES */}
        <div className="space-y-20 md:space-y-32 relative z-20">
          {journeyChapters.map((chapter, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={chapter.id} 
                className="relative flex flex-col md:flex-row items-stretch justify-between w-full min-h-[35vh] gap-8 md:gap-16"
              >
                
                {/* TIMELINE NODE TRIGGER (GOLD CIRCLE PULSER) */}
                <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#02050f] z-30">
                  <motion.div 
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-3.5 w-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                  />
                </div>

                {/* TEXT CONTAINER SIDE */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-[45%] pl-16 md:pl-0 flex flex-col justify-center text-left ${
                    isLeft ? "md:text-right md:pr-12" : "md:order-2 md:text-left md:pl-12"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Glowing Year */}
                    <span className="font-display text-4xl md:text-6xl text-yellow-500 font-black tracking-tighter leading-none block">
                      {chapter.year}
                    </span>
                    
                    {/* Subtitle */}
                    <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase font-black block">
                      {chapter.subtitle}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider font-extrabold leading-none mt-1">
                      {chapter.title}
                    </h3>

                    {/* Quote (Excluded for 2006 as it's stylized on the polaroid card) */}
                    {chapter.id !== "2006" && chapter.quote && (
                      <p className={`text-yellow-500/80 italic text-xs uppercase tracking-wider font-bold block py-1 border-white/5 ${
                        isLeft ? "md:border-r-2 md:pr-4" : "md:border-l-2 md:pl-4"
                      }`}>
                        "{chapter.quote}"
                      </p>
                    )}

                    {/* Story paragraph */}
                    <p className="text-white/70 leading-relaxed font-body text-xs md:text-sm">
                      {chapter.story}
                    </p>

                    {/* Achievement badge */}
                    {chapter.achievement && (
                      <div className={`inline-flex items-center gap-1.5 rounded-full border border-yellow-500/25 bg-yellow-500/5 px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-yellow-400 mt-2 ${
                        isLeft ? "md:flex-row-reverse" : ""
                      }`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        <span>{chapter.achievement}</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* IMAGE CONTAINER SIDE */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className={`w-full md:w-[45%] pl-16 md:pl-0 mt-4 md:mt-0 flex items-center justify-center ${
                    isLeft ? "md:order-2 md:pl-12" : "md:pr-12"
                  }`}
                >
                  {/* Custom image layout based on chapter ID */}
                  {(() => {
                    switch (chapter.id) {
                      case "1988":
                        return (
                          <div className="w-full max-w-[360px] aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(234,179,8,0.15)] flex items-center justify-center group">
                            {/* Vintage film grain noise */}
                            <div className="absolute inset-0 z-20 pointer-events-none opacity-25" style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                            }} />
                            {/* Vintage vignette */}
                            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />
                            {/* Soft vintage sepia warm filter */}
                            <div className="absolute inset-0 z-10 bg-amber-700/5 mix-blend-color pointer-events-none" />
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain filter sepia-[0.25] contrast-[1.15] brightness-[0.85]"
                              whileInView={{ scale: [1.08, 1] }}
                              transition={{ duration: 2, ease: "easeOut" }}
                            />
                          </div>
                        );
                      case "1995_2000":
                        return (
                          <div className="w-full max-w-[360px] aspect-square relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain p-2"
                              animate={{ scale: [1, 1.03, 1] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent pointer-events-none" />
                            {/* Floating notes */}
                            <motion.div 
                              initial={{ opacity: 0, x: -25 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0, duration: 0.8 }}
                              className="absolute -left-6 top-[20%] z-20 hidden md:block max-w-[140px] text-yellow-400 font-mono text-[10px] tracking-wider leading-relaxed border-l border-yellow-500/40 pl-2 bg-[#02050f]/95 p-2 rounded-r-md shadow-lg"
                            >
                              <span className="text-[8px] font-black uppercase text-blue-400 block mb-1">STANCE</span>
                              Hands on waist. Defiance before fame.
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, x: 25 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.8, duration: 0.8 }}
                              className="absolute -right-6 bottom-[25%] z-20 hidden md:block max-w-[140px] text-yellow-400 font-mono text-[10px] tracking-wider leading-relaxed border-r border-yellow-500/40 pr-2 text-right bg-[#02050f]/95 p-2 rounded-l-md shadow-lg"
                            >
                              <span className="text-[8px] font-black uppercase text-blue-400 block mb-1">DETERMINATION</span>
                              The fire was always there.
                            </motion.div>
                          </div>
                        );
                      case "2006":
                        return (
                          <div className="w-full max-w-[360px] bg-[#fdfdfb] text-[#1c1917] p-4 pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[#e2dec9] rounded-sm transform rotate-1 hover:rotate-0 transition-all duration-500 group">
                            <div className="relative overflow-hidden aspect-square bg-stone-900 rounded-sm flex items-center justify-center">
                              <img src={chapter.image} alt={chapter.title} className="w-full h-full object-contain" />
                              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none" />
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)] pointer-events-none" />
                            </div>
                            <div className="mt-4 text-center">
                              <p className="font-serif italic text-stone-800 text-[13px] md:text-[14px] leading-relaxed tracking-wide">
                                "My father was my biggest support."
                              </p>
                              <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-stone-500 block mt-2">
                                FAMILY FOUNDATION
                              </span>
                            </div>
                          </div>
                        );
                      case "2008_u19":
                        return (
                          <div className="w-full max-w-[420px] aspect-[2/3] relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain"
                              whileInView={{ scale: [1.05, 1] }}
                              transition={{ duration: 2 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-4 right-4 bg-yellow-500/15 border border-yellow-500/40 rounded-full px-3 py-1 text-[9px] font-mono text-yellow-400 font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                <path d="M4 22h16" />
                                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                                <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
                              </svg>
                              U19 CHAMPION
                            </div>
                          </div>
                        );
                      case "2008_dressing":
                        return (
                          <div className="w-full max-w-[380px] aspect-square relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                            <img 
                              src={chapter.image} 
                              alt={chapter.title} 
                              className="w-full h-full object-contain filter brightness-[0.5] group-hover:brightness-[0.6] transition-all duration-700" 
                            />
                            {/* Spotlight Reveal - Sachin */}
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.8, duration: 0.6 }}
                              className="absolute top-[48%] left-[54%] w-[38%] h-[40%] rounded-full border border-yellow-500/60 shadow-[0_0_20px_rgba(234,179,8,0.3)] bg-yellow-500/5 backdrop-brightness-[1.8] flex items-end justify-center pb-2 z-10"
                            >
                              <span className="bg-yellow-500 text-[#02050f] font-black font-mono text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wider shadow">
                                SACHIN
                              </span>
                            </motion.div>
                            {/* Spotlight Reveal - Dhoni */}
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1.8, duration: 0.6 }}
                              className="absolute top-[40%] left-[18%] w-[38%] h-[42%] rounded-full border border-yellow-500/60 shadow-[0_0_20px_rgba(234,179,8,0.3)] bg-yellow-500/5 backdrop-brightness-[1.8] flex items-end justify-center pb-2 z-10"
                            >
                              <span className="bg-yellow-500 text-[#02050f] font-black font-mono text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wider shadow">
                                DHONI
                              </span>
                            </motion.div>
                            {/* Spotlight Reveal - Virat */}
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 2.8, duration: 0.6 }}
                              className="absolute top-[5%] left-[18%] w-[32%] h-[42%] rounded-full border border-blue-400/80 shadow-[0_0_25px_rgba(96,165,250,0.5)] bg-blue-400/10 backdrop-brightness-[2.0] flex items-end justify-center pb-2 z-20"
                            >
                              <span className="bg-blue-500 text-white font-black font-mono text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wider shadow animate-pulse">
                                VIRAT
                              </span>
                            </motion.div>
                            <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none" />
                          </div>
                        );
                      case "2011":
                        return (
                          <div className="w-full max-w-[420px] aspect-[2/3] relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain"
                              whileInView={{ scale: [1, 1.05] }}
                              transition={{ duration: 6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute inset-0 border border-yellow-500/10 rounded-2xl group-hover:border-yellow-500/30 transition-all duration-300 shadow-[inset_0_0_20px_rgba(234,179,8,0.15)] group-hover:shadow-[inset_0_0_30px_rgba(234,179,8,0.3)]" />
                          </div>
                        );
                      case "2013_2016":
                        return (
                          <div className="w-full max-w-[420px] aspect-[708/1024] relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain filter brightness-[0.7] group-hover:brightness-[0.8] transition-all duration-300"
                              whileInView={{ scale: [1.05, 1] }}
                              transition={{ duration: 2 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black/80 border border-white/5 p-2 md:p-3 rounded-lg backdrop-blur-md z-20">
                              <div className="text-left">
                                <span className="text-[7px] font-mono uppercase text-stone-400 block">IPL 2016</span>
                                <span className="text-yellow-400 font-display font-extrabold text-[10px] md:text-xs tracking-wide">973 RUNS</span>
                              </div>
                              <div className="w-[1px] h-6 bg-white/10" />
                              <div className="text-left">
                                <span className="text-[7px] font-mono uppercase text-stone-400 block">ODIs</span>
                                <span className="text-yellow-400 font-display font-extrabold text-[10px] md:text-xs tracking-wide">FASTEST 100</span>
                              </div>
                              <div className="w-[1px] h-6 bg-white/10" />
                              <div className="text-left">
                                <span className="text-[7px] font-mono uppercase text-stone-400 block">STATUS</span>
                                <span className="text-red-500 font-display font-extrabold text-[10px] md:text-xs tracking-wide animate-pulse">CHASE MASTER</span>
                              </div>
                            </div>
                          </div>
                        );
                      case "2017":
                        return (
                          <div className="w-full max-w-[360px] aspect-square relative rounded-2xl overflow-hidden border border-white/20 bg-white/[0.03] shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain filter brightness-[0.85] contrast-[1.02]"
                              whileInView={{ scale: [1, 1.05] }}
                              transition={{ duration: 7 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
                            {/* Gold particles */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                              {[...Array(12)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1.5 h-1.5 bg-yellow-400/40 rounded-full"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                  }}
                                  animate={{
                                    y: [0, -40, 0],
                                    x: [0, Math.random() * 20 - 10, 0],
                                    opacity: [0.1, 0.7, 0.1],
                                    scale: [0.6, 1.2, 0.6]
                                  }}
                                  transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: Math.random() * 5
                                  }}
                                />
                              ))}
                            </div>
                            <div className="absolute inset-1.5 border border-white/10 rounded-[14px] pointer-events-none z-20" />
                            <div className="absolute inset-0 border border-yellow-500/20 rounded-2xl pointer-events-none z-20 group-hover:border-yellow-500/40 transition-colors duration-500" />
                          </div>
                        );
                      case "2020_2022":
                        return (
                          <div className="w-full max-w-[300px] aspect-[9/16] max-h-[500px] relative rounded-2xl overflow-hidden border border-white/5 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-cover filter grayscale-[0.8] brightness-[0.35] contrast-[1.1] group-hover:grayscale-[0.2] group-hover:brightness-[0.5] transition-all duration-700"
                              whileInView={{ scale: [1.02, 1] }}
                              transition={{ duration: 4 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#02050f]/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.95)_100%)] pointer-events-none" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px] z-10 p-4">
                              <span className="text-[10px] font-mono text-zinc-400 tracking-[0.25em] uppercase font-bold text-center border-y border-zinc-500/20 py-2 px-4">
                                INTENSITY IN THE SILENCE
                              </span>
                            </div>
                          </div>
                        );
                      case "2022_return":
                        return (
                          <div className="w-full max-w-[300px] aspect-[3/5] max-h-[500px] relative rounded-2xl overflow-hidden border border-yellow-500/20 bg-[#02050f] shadow-[0_20px_50px_rgba(234,179,8,0.15)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain filter brightness-[0.85] contrast-[1.1]"
                              whileInView={{ scale: [1, 1.05] }}
                              transition={{ duration: 6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(234,179,8,0.15)_0%,_transparent_70%)] pointer-events-none animate-pulse" />
                          </div>
                        );
                      case "2024":
                        return (
                          <div className="w-full max-w-[420px] aspect-[9/16] max-h-[500px] relative rounded-2xl overflow-hidden border border-blue-500/20 bg-black/60 shadow-[0_20px_50px_rgba(59,130,246,0.15)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain"
                              whileInView={{ scale: [1.04, 1] }}
                              transition={{ duration: 3 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          </div>
                        );
                      case "2025_rcb":
                        return (
                          <div className="w-full max-w-[420px] aspect-[9/16] max-h-[500px] relative rounded-2xl overflow-hidden border border-red-500/30 bg-[#0c0303] shadow-[0_25px_60px_rgba(239,68,68,0.2)] flex items-center justify-center group">
                            <motion.img 
                              src={chapter.image} 
                              alt={chapter.title}
                              className="w-full h-full object-contain"
                              whileInView={{ scale: [1, 1.06] }}
                              transition={{ duration: 8 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-yellow-500/20 pointer-events-none z-10" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_80%)] pointer-events-none z-10" />
                            {/* Gold Confetti & Sparks System */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                              {[...Array(20)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1.5 h-1.5 rounded-sm"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * -10}%`,
                                    backgroundColor: i % 2 === 0 ? "#ef4444" : "#eab308", // Red and Gold
                                  }}
                                  animate={{
                                    y: ["0vh", "35vh"],
                                    x: ["0px", `${Math.random() * 40 - 20}px`],
                                    rotate: [0, 360],
                                    opacity: [0, 1, 1, 0]
                                  }}
                                  transition={{
                                    duration: 3 + Math.random() * 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 4
                                  }}
                                />
                              ))}
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={`spark-${i}`}
                                  className="absolute w-1 h-1 rounded-full bg-yellow-300"
                                  style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${30 + Math.random() * 50}%`,
                                  }}
                                  animate={{
                                    scale: [0, 2, 0],
                                    opacity: [0, 1, 0],
                                  }}
                                  transition={{
                                    duration: 1.5 + Math.random() * 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: Math.random() * 3
                                  }}
                                />
                              ))}
                            </div>
                            <div className="absolute inset-0 border border-yellow-500/20 rounded-2xl pointer-events-none z-30 group-hover:border-yellow-500/50 transition-colors duration-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.15)] group-hover:shadow-[inset_0_0_30px_rgba(234,179,8,0.3)]" />
                          </div>
                        );
                      default:
                        return (
                          <div className="w-full max-w-[450px] relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] aspect-[16/10] flex items-center justify-center group">
                            <motion.div
                              whileInView={{ scale: [1, 1.04] }}
                              transition={{ duration: 8, ease: "easeOut" }}
                              className="absolute inset-0 bg-cover bg-center select-none pointer-events-none filter brightness-[0.75]"
                              style={{ backgroundImage: `url(${chapter.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 pointer-events-none z-10" />
                            <div className="absolute inset-0 border border-yellow-500/10 rounded-3xl pointer-events-none z-20 group-hover:border-yellow-500/20 transition-all duration-300" />
                          </div>
                        );
                    }
                  })()}
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      <ChapterNav />
    </main>
  );
}

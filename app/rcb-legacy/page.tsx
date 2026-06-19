"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { 
  Trophy, 
  Heart, 
  Flame, 
  Sparkles, 
  Activity, 
  Calendar, 
  TrendingUp, 
  History,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { getFormatStats } from "@/services/stats";

// Section definitions for timeline
interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2008",
    title: "The Rookie Draft",
    subtitle: "Rookie pick for $50,000",
    description: "RCB drafts a 19-year-old Delhi batsman fresh off a U-19 World Cup victory. A raw talent with fiery aggression joins a franchise starting its journey."
  },
  {
    year: "2011",
    title: "The Sole Retained One",
    subtitle: "A statement of absolute trust",
    description: "Ahead of the mega auction, RCB performs a complete squad reset, retaining only one player out of the entire roster: Virat Kohli."
  },
  {
    year: "2013",
    title: "The Reins of Command",
    subtitle: "Named full-time captain at 24",
    description: "Virat takes the captaincy reins. He pledges to give his blood, sweat, and tears to the city, laying the foundation of a cultural phenomenon."
  },
  {
    year: "2016",
    title: "The Peak of Dominance",
    subtitle: "973 Runs & 4 Centuries",
    description: "Playing with 10 stitches in his hand, Virat conducts the greatest IPL season in history. Despite carrying the team to the final, victory slips away."
  },
  {
    year: "2018",
    title: "The Unbreakable Pledge",
    subtitle: "Record signing & commitment",
    description: "Virat signs a contract extension declaring: 'My heart is with RCB. I cannot think of playing for any other team. I will stay till I play.'"
  },
  {
    year: "2021",
    title: "Stepping Down, Standing Tall",
    subtitle: "Transition of leadership",
    description: "Relinquishes captaincy but re-affirms his loyalty: 'I will play for RCB until my last day in the IPL. The shirt remains crimson.'"
  },
  {
    year: "2025",
    title: "The Ultimate Glory",
    subtitle: "18 Years of Faith Rewarded",
    description: "After nearly two decades of near-misses, tears, and unyielding belief, Virat lifts the IPL trophy. The promise is finally kept."
  }
];

interface LegendComparison {
  name: string;
  teams: string;
  isConstant: boolean;
}

const legendComparisons: LegendComparison[] = [
  { name: "Virat Kohli", teams: "RCB (2008 - Present)", isConstant: true },
  { name: "M.S. Dhoni", teams: "CSK → Rising Pune Supergiant → CSK", isConstant: false },
  { name: "Rohit Sharma", teams: "Deccan Chargers → Mumbai Indians", isConstant: false },
  { name: "Hardik Pandya", teams: "MI → Gujarat Titans → MI", isConstant: false },
  { name: "AB de Villiers", teams: "Delhi Daredevils → RCB", isConstant: false },
  { name: "Chris Gayle", teams: "KKR → RCB → Punjab Kings", isConstant: false }
];

interface RecordMilestone {
  id: string;
  title: string;
  value: string;
  label: string;
  description: string;
}

export default function RcbLegacyPage() {
  const iplStats = getFormatStats("IPL");

  // State Management
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedMilestone, setSelectedMilestone] = useState<string>("runs");

  // Stats definitions
  const milestones: RecordMilestone[] = [
    {
      id: "runs",
      title: "All-Time Run Scorer",
      value: `${iplStats.runs.toLocaleString("en-IN")}+`,
      label: "IPL RUNS",
      description: "The highest aggregate run scorer in IPL history, scored entirely for one single franchise. An unmatched record of consistency."
    },
    {
      id: "centuries",
      title: "Centuries Record",
      value: `${iplStats.hundreds}`,
      label: "IPL HUNDREDS",
      description: "Most centuries scored in IPL history. Virat's tons showcase his ability to convert starts and anchor huge chases under pressure."
    },
    {
      id: "peak_season",
      title: "The Peak 2016 Season",
      value: "973",
      label: "RUNS IN 2016",
      description: "The legendary 2016 campaign. 973 runs in 16 innings, averaging 81.08 with 4 centuries. The highest runs in a single season ever."
    },
    {
      id: "matches",
      title: "Matches of Loyalty",
      value: `${iplStats.matches}`,
      label: "RCB MATCHES",
      description: "Most matches played for a single team in T20 history. A testament to physical fitness and absolute loyalty over 18 years."
    }
  ];

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    const observerOptions = {
      root: null,
      threshold: 0.25, // Triggers when section is 25% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id") || "";
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);


  return (
    <main className="relative min-h-screen bg-[#020202] text-white flex flex-col justify-between overflow-x-hidden font-body select-none scroll-smooth">
      
      {/* CSS Keyframes for custom particles & animations */}
      <style>{`
        @keyframes floatConfetti {
          0% { transform: translateY(-5vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        @keyframes redSmokeMovement {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.1; }
          50% { transform: scale(1.15) translate(30px, -20px); opacity: 0.25; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.1; }
        }
        @keyframes crowdFlash {
          0%, 100% { opacity: 0; }
          4%, 8% { opacity: 0.75; }
          6% { opacity: 0.1; }
          12%, 16% { opacity: 0.85; }
          14% { opacity: 0.2; }
          22% { opacity: 0.95; }
          24% { opacity: 0; }
        }
        @keyframes fireSparks {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.5) rotate(360deg); opacity: 0; }
        }
        .confetti-gold {
          position: absolute;
          background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
          pointer-events: none;
          animation: floatConfetti infinite linear;
          border-radius: 1px;
        }
        .fire-spark {
          position: absolute;
          background: radial-gradient(circle, #f97316 0%, #ef4444 80%, transparent 100%);
          pointer-events: none;
          animation: fireSparks infinite linear;
          border-radius: 50%;
          filter: blur(1px);
        }
        .red-smoke-glow {
          background: radial-gradient(circle, rgba(185,28,28,0.2) 0%, transparent 65%);
          filter: blur(50px);
          animation: redSmokeMovement 10s infinite ease-in-out;
        }
        .flash-overlay {
          animation: crowdFlash 2.5s infinite ease-in-out;
        }
        .rcb-gradient-text {
          background: linear-gradient(180deg, #ffffff 0%, #fca5a5 45%, #b91c1c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gold-gradient-text {
          background: linear-gradient(180deg, #ffffff 0%, #fef08a 35%, #eab308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Global Background Red Smoke Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-80">
        <div className="red-smoke-glow absolute top-[10%] left-[-10%] w-[600px] h-[600px]" style={{ animationDelay: "0s" }} />
        <div className="red-smoke-glow absolute top-[50%] right-[-10%] w-[700px] h-[700px]" style={{ animationDelay: "2.5s" }} />
        <div className="red-smoke-glow absolute bottom-[10%] left-[20%] w-[800px] h-[800px]" style={{ animationDelay: "5s" }} />
      </div>

      <CinematicHeader />

      {/* CHAPTER CONTENT CONTAINER */}
      <div className="relative z-10 w-full">
        
        {/* REDESIGNED HERO SECTION */}
        <section
          id="hero"
          data-section
          className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5"
        >
          {/* Cinematic heavy vignette & background layout */}
          <div className="absolute inset-0 bg-[#020202]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.12)_0%,transparent_65%)] z-0 pointer-events-none" />

          {/* Glowing background light beam lines */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/75 to-transparent z-10 pointer-events-none" />

          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
            
            {/* Left Column: Typographic intro */}
            <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
              <span className="bg-red-500/10 border border-red-500/25 text-red-500 text-[10px] uppercase tracking-[0.3em] font-mono font-bold px-3 py-1 rounded-full inline-block">
                RCB Legacy · The Story of Loyalty
              </span>
              
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                LOYALTY <br />
                <span className="rcb-gradient-text">HAS A JERSEY</span>
              </h1>

              <p className="font-display text-lg sm:text-xl text-yellow-500 uppercase tracking-widest font-semibold leading-relaxed">
                18 Years. One Club. One Promise.
              </p>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl font-body">
                Faith. Gratitude. Passion. Heartbreak. Seventeen years, one franchise, one heart. The relationship between Virat Kohli and Royal Challengers Bangalore is not just a sports contract; it is a covenant built under the heavy pressure of a city's hopes.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <a
                  href="#beginning"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-red-500/30 bg-red-500/10 text-white text-xs uppercase tracking-widest font-bold hover:bg-red-600 hover:border-red-600 transition-all"
                >
                  Explore Story
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Image Panel (Resized & Contained) */}
            <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-3xl border border-red-500/10 shadow-[0_20px_60px_rgba(220,38,38,0.2)] max-w-[340px] lg:max-w-none w-full aspect-[3/4] bg-zinc-950 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/rcb/photo2.jpg"
                  alt="Virat Kohli celebrating with bat raise"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-85 pointer-events-none" />
                <div className="absolute bottom-5 inset-x-5 text-left space-y-0.5 pointer-events-none">
                  <span className="text-yellow-400 block text-[9px] font-mono tracking-widest uppercase font-bold">THE COVENANT</span>
                  <span className="text-xs sm:text-sm text-white font-display font-black uppercase tracking-wider block">Virat Kohli & RCB</span>
                </div>
              </div>
            </div>

          </div>
        </section>
        
        {/* SECTION 1: THE BEGINNING (2008) */}
        <section
          id="beginning"
          data-section
          className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5 bg-[#020202]"
        >
          <div className="absolute top-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Storytelling text */}
            <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-red-600" />
                <span className="text-red-500 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                  Section 1 · The Beginning
                </span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
                A Rookie, <br className="hidden sm:inline" />
                <span className="rcb-gradient-text">A Dream Begins</span>
              </h2>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed font-body">
                In 2008, a young, firebrand batsman from Delhi, fresh off a historic Under-19 World Cup victory, walked into a newly formed franchise. Bangalore was a city of technology and tradition; Virat was a storm of raw aggression and unmatched hunger.
              </p>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-body">
                Nobody knew how the IPL would evolve, and nobody knew that this rookie, drafted for a modest U-19 contract, would go on to define the identity of the entire club. This was the birth of an era.
              </p>

              <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 mt-4">
                <span className="text-[9px] text-yellow-500 font-mono uppercase block mb-1 tracking-widest font-bold">CHINNASWAMY VIBE</span>
                <p className="text-xs text-white/50 italic leading-relaxed">
                  "Under the glowing floodlights, the Bangalore crowd caught their first glimpse of the boy who would become their King."
                </p>
              </div>
            </div>

            {/* Right Column: Visual photo with floodlights effect (Resized) */}
            <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-3xl border border-red-500/10 shadow-[0_25px_60px_rgba(220,38,38,0.15)] max-w-[380px] lg:max-w-none w-full aspect-square bg-zinc-950 group">
                
                {/* Rookie images fade-in */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src="/assets/timeline/2008_u19.jpg"
                  alt="Young Virat Kohli in 2008"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 pointer-events-none"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                />

                {/* Stadium Light Ray Sweep Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                {/* Simulated Floodlight Beam */}
                <div 
                  className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.35)_0%,transparent_60%)] pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-85 pointer-events-none" />
                <div className="absolute bottom-5 inset-x-5 text-left space-y-0.5 pointer-events-none">
                  <span className="text-red-500 block text-[9px] font-mono tracking-widest uppercase font-bold">ESTABLISHED 2008</span>
                  <span className="text-xs sm:text-sm text-white font-display font-black uppercase tracking-wider block">The Inaugural Campaign</span>
                </div>
              </div>
            </div>

          </div>
        </section>

          {/* SECTION 2: THE LOYALTY STORY (2008 → 2025) */}
          <section
            id="timeline"
            data-section
            className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5 bg-[#040404]/40"
          >
            <div className="max-w-5xl mx-auto w-full text-center mb-16">
              <span className="text-red-500 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                Section 2 · The Covenant
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-2 leading-none">
                THE MAN WHO NEVER LEFT
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed max-w-xl mx-auto">
                Seventeen years of auctions, transfers, and mega-deals. One constant remains.
              </p>
            </div>

            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Timeline list (Scroll trigger cards) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-widest text-red-500 font-mono font-bold block mb-1">
                  Timeline of The Covenant
                </span>
                
                <div className="relative border-l-2 border-red-600/20 pl-6 ml-2 space-y-8 py-2">
                  {timelineData.map((item, idx) => (
                    <motion.div
                      key={item.year}
                      className="relative bg-zinc-950/40 border border-white/5 hover:border-red-500/20 p-5 rounded-2xl transition duration-300 group"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-7 h-4 w-4 rounded-full bg-zinc-900 border-2 border-red-600 group-hover:scale-125 transition-transform" />

                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <span className="font-display text-lg font-black text-red-500">
                          {item.year}
                        </span>
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider font-bold">
                          {item.subtitle}
                        </span>
                      </div>
                      
                      <h4 className="font-display text-base text-white uppercase tracking-wider mt-1.5 font-bold">
                        {item.title}
                      </h4>
                      
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed mt-2 font-body">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Loyalty Comparison Table */}
              <div className="lg:col-span-5 sticky top-28 bg-[#070707]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-red-500 font-mono font-bold block">
                    The Ultimate Loyalty Index
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider font-extrabold mt-1">
                    Loyalty Comparison
                  </h3>
                  <p className="text-white/50 text-[11px] font-mono mt-1 uppercase leading-relaxed">
                    How other legends moved teams vs the one constant
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {legendComparisons.map((item, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center text-xs">
                      <div>
                        <span className={`block font-bold ${item.isConstant ? "text-yellow-500 font-display text-sm tracking-wide font-extrabold" : "text-white/80"}`}>
                          {item.name}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono mt-0.5 block">{item.teams}</span>
                      </div>
                      
                      {item.isConstant ? (
                        <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-full tracking-widest animate-pulse">
                          18 Seasons Constant
                        </span>
                      ) : (
                        <span className="bg-white/5 text-white/30 text-[8px] font-mono uppercase px-2 py-0.5 rounded">
                          Transferred
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-red-500/20 pt-4 bg-red-500/[0.01] rounded-b-2xl">
                  <p className="text-center font-display text-xs italic text-red-400 font-medium leading-relaxed">
                    "Loyalty isn't just about refusing transfers. It's about absorbing the heartbreak of a city and remaining their shield."
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 3: 2016 – THE PEAK (THE GREATEST IPL SEASON EVER) */}
          <section
            id="peak2016"
            data-section
            className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5 overflow-hidden bg-black"
          >
            {/* Fire sparks visual effect */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {Array.from({ length: 25 }).map((_, i) => {
                const size = 2 + Math.random() * 4;
                const left = Math.random() * 100;
                const duration = 4 + Math.random() * 4;
                const delay = Math.random() * 3;
                return (
                  <div
                    key={i}
                    className="fire-spark"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `${left}%`,
                      bottom: "-20px",
                      animationDuration: `${duration}s`,
                      animationDelay: `${delay}s`
                    }}
                  />
                );
              })}
            </div>

            {/* Radiant glow highlights */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06)_0%,transparent_65%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto w-full text-center relative z-20 space-y-12">
              <span className="text-red-500 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                Section 3 · The Peak
              </span>

              {/* Giant 973 Header with glow blur */}
              <div className="relative flex justify-center items-center select-none py-4">
                <motion.h1
                  className="font-display text-[26vw] sm:text-[18vw] md:text-[16vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-red-500 to-yellow-500 leading-none tracking-tighter drop-shadow-[0_15px_50px_rgba(239,68,68,0.25)]"
                  initial={{ scale: 0.92, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                >
                  973
                </motion.h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 via-orange-500/10 to-yellow-500/10 blur-3xl pointer-events-none opacity-40 z-0" />
              </div>

              {/* Scroll Reveal Description */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4 max-w-2xl mx-auto"
              >
                <h3 className="font-display text-xl sm:text-3xl text-white uppercase tracking-wider font-black leading-tight">
                  The greatest individual IPL season ever played.
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed font-body">
                  In 2016, Virat Kohli transcended standard athletic limits. Stitching split skin webbings in his hand, ignoring physical pain, he carried RCB on a historic charge. Four centuries in a single T20 league campaign—a record that still stands as an impossible monument.
                </p>
              </motion.div>

              {/* Animated Cinematic Records Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-4">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-zinc-950/80 border border-red-500/25 rounded-2xl p-6 text-center shadow-2xl group hover:border-yellow-500/30 transition duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500" />
                  <span className="block font-display text-4xl sm:text-5xl text-yellow-500 font-black">973</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/50 block mt-2 font-mono">Runs Aggregate</span>
                  <span className="text-[7px] text-white/30 block mt-1 font-mono uppercase">IPL RECORD SEASON</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-zinc-950/80 border border-red-500/25 rounded-2xl p-6 text-center shadow-2xl group hover:border-yellow-500/30 transition duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-500" />
                  <span className="block font-display text-4xl sm:text-5xl text-yellow-500 font-black">4</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/50 block mt-2 font-mono">Centuries</span>
                  <span className="text-[7px] text-white/30 block mt-1 font-mono uppercase">IN A SINGLE LEAGUE</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-zinc-950/80 border border-red-500/25 rounded-2xl p-6 text-center shadow-2xl group hover:border-yellow-500/30 transition duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-yellow-500 to-red-500" />
                  <span className="block font-display text-4xl sm:text-5xl text-yellow-500 font-black">7</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/50 block mt-2 font-mono">Half-Centuries</span>
                  <span className="text-[7px] text-white/30 block mt-1 font-mono uppercase">CLUTCH STRIKES</span>
                </motion.div>

              </div>

              {/* Photo Showcase of 2016 Century celebration (Resized) */}
              <div className="max-w-2xl mx-auto w-full pt-8 flex justify-center">
                <div className="relative overflow-hidden rounded-3xl border border-red-500/10 shadow-[0_20px_50px_rgba(220,38,38,0.2)] max-w-[620px] md:max-w-[680px] w-full aspect-[16/9] bg-zinc-950 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/rcb/photo_2016.jpg"
                    alt="Virat Kohli in Green jersey celebrating 2016 century"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-85 pointer-events-none" />
                  
                  <div className="absolute bottom-5 inset-x-5 text-left space-y-0.5 pointer-events-none">
                    <span className="text-yellow-400 block text-[9px] font-mono tracking-widest uppercase font-bold">THE IMMORTAL SEASON</span>
                    <span className="text-xs sm:text-sm text-white font-display font-black uppercase tracking-wider block">Even without the trophy, 2016 became immortal.</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4: THE YEARS OF HEARTBREAK */}
          <section
            id="heartbreak"
            data-section
            className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5 bg-black"
          >
            {/* Deep red spotlight overlay simulating dark heartbreak atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto w-full text-center mb-16 space-y-3">
              <span className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full inline-block">
                Section 4 · The Crucible
              </span>
              
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                THE YEARS OF HEARTBREAK
              </h2>
              
              <p className="text-red-500 font-display text-xs sm:text-sm uppercase tracking-widest font-semibold leading-relaxed">
                FAITH OVER FAILURE · THE CRUSHING BURDEN OF THE DOCK
              </p>
            </div>

            {/* Heartbreak Grid (Resized & Contained) */}
            <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Photo 1: Grayscale to Crimson interactive card */}
              <div className="bg-[#070707]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group transition duration-500 hover:border-red-500/20">
                <div className="relative aspect-[3/2] overflow-hidden bg-zinc-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/rcb/photo1.jpg"
                    alt="Virat Kohli looking disappointed"
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-red-950/20 group-hover:bg-transparent transition duration-700 pointer-events-none" />
                </div>
                
                <div className="p-4 space-y-2">
                  <span className="text-[8px] font-mono text-red-500 uppercase tracking-widest font-bold">2016 FINAL DEFEAT</span>
                  <h4 className="font-display text-sm text-white uppercase tracking-wider font-bold">8 Runs Short of Glory</h4>
                  <p className="text-white/60 text-[11px] leading-relaxed font-body">
                    After a magical run, RCB falls exactly 8 runs short of the title in their home ground. A silent Chinnaswamy stadium watches Virat lift the runner-up medal.
                  </p>
                </div>
              </div>

              {/* Photo 2: Dugout Solitude */}
              <div className="bg-[#070707]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group transition duration-500 hover:border-red-500/20">
                <div className="relative aspect-[3/2] overflow-hidden bg-zinc-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/rcb/photo_2016.jpg"
                    alt="Virat Kohli in green jersey"
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-red-950/20 group-hover:bg-transparent transition duration-700 pointer-events-none" />
                </div>
                
                <div className="p-4 space-y-2">
                  <span className="text-[8px] font-mono text-red-500 uppercase tracking-widest font-bold">THE SINGLE CARRIES</span>
                  <h4 className="font-display text-sm text-white uppercase tracking-wider font-bold">Weight of Expectation</h4>
                  <p className="text-white/60 text-[11px] leading-relaxed font-body">
                    Stitching split webbings and scoring centuries, yet the crown slips. Sitting alone on the bench, head buried in hands, the burden of a city's destiny grows.
                  </p>
                </div>
              </div>

              {/* Photo 3: Shaking hands with winners */}
              <div className="bg-[#070707]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group transition duration-500 hover:border-red-500/20">
                <div className="relative aspect-[3/2] overflow-hidden bg-zinc-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/rcb/photo2.jpg"
                    alt="Virat Kohli looking on"
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-red-950/20 group-hover:bg-transparent transition duration-700 pointer-events-none" />
                </div>
                
                <div className="p-4 space-y-2">
                  <span className="text-[8px] font-mono text-red-500 uppercase tracking-widest font-bold">THE ELUSIVE CUP</span>
                  <h4 className="font-display text-sm text-white uppercase tracking-wider font-bold">Years of Heartbreak</h4>
                  <p className="text-white/60 text-[11px] leading-relaxed font-body">
                    Bottom table finishes, critiques questioning leadership, empty stares under opposition celebrations. Yet, Virat never asks to be released.
                  </p>
                </div>
              </div>

            </div>

            <div className="max-w-3xl mx-auto w-full text-center mt-12 border-l-2 border-red-600/30 pl-4 py-1.5 bg-red-950/5">
              <p className="text-white/70 italic text-sm leading-relaxed font-body">
                "It's easy to stand with a winner. True loyalty is when you stand in the rubble of a lost campaign, look the fans in the eye, and say: 'We will try again next year.'"
              </p>
              <span className="text-[9px] font-mono text-yellow-500 uppercase block tracking-wider mt-2 font-bold">— Virat Kohli</span>
            </div>
          </section>

          {/* SECTION 5: THE CULT OF RCB */}
          <section
            id="cult"
            data-section
            className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5 overflow-hidden"
          >
            {/* Parallax stadium backdrop copy */}
            <div className="absolute inset-0 z-0 opacity-15 select-none pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/timeline/2011_wc.jpg"
                alt="Chinnaswamy Crowd"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />
            </div>

            <div className="max-w-4xl mx-auto w-full text-center space-y-6 relative z-20">
              <span className="text-red-500 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                Section 5 · The Congregation
              </span>
              
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
                MORE THAN A TEAM <br />
                <span className="rcb-gradient-text">A RELIGION FOR MILLIONS</span>
              </h2>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-body">
                The Chinnaswamy crowd does not cheer for RCB; they worship them. Through the worst seasons, through the bottom table finishes, the stadium screams a single promise: <span className="text-yellow-500 font-extrabold font-display">"EE SALA CUP NAMDE"</span> (This year, the cup is ours).
              </p>
            </div>
          </section>

          {/* SECTION 6: KING OF BANGALORE */}
          <section
            id="king"
            data-section
            className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 border-b border-white/5 bg-[#030303]"
          >
            <div className="max-w-4xl mx-auto w-full text-center mb-16">
              <span className="text-red-500 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                Section 6 · The Dominance
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-2 leading-none">
                THE EMPEROR OF BANGALORE
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
                The statistical pillars of the greatest batting dynasty in IPL history.
              </p>
            </div>

            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Record Selector Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {milestones.map((ms) => {
                  const isSelected = selectedMilestone === ms.id;
                  return (
                    <button
                      key={ms.id}
                      onClick={() => setSelectedMilestone(ms.id)}
                      className={`text-left border p-5 rounded-2xl transition duration-300 flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                        isSelected 
                          ? "bg-red-950/20 border-red-500/40 shadow-xl" 
                          : "bg-zinc-950/30 border-white/5 hover:border-white/10"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600" />
                      )}

                      <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                        {ms.label}
                      </span>
                      
                      <div>
                        <span className={`font-display text-3xl font-black block leading-none ${isSelected ? "text-yellow-500" : "text-white"}`}>
                          {ms.value}
                        </span>
                        
                        <span className="text-[10px] text-white/80 uppercase font-bold block tracking-wider mt-1.5 font-display">
                          {ms.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic record stats display */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-[#070707]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                
                <div className="space-y-4">
                  <span className="text-[9px] uppercase tracking-widest text-red-500 font-mono font-bold block">
                    Record Profile Breakdown
                  </span>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedMilestone}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="font-display text-2xl uppercase tracking-wider text-yellow-500 font-extrabold">
                        {milestones.find((ms) => ms.id === selectedMilestone)?.title}
                      </h3>
                      
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed font-body">
                        {milestones.find((ms) => ms.id === selectedMilestone)?.description}
                      </p>

                      {/* Display a progress-style bar visualization */}
                      <div className="border-t border-white/5 pt-5 mt-4 space-y-2">
                        <span className="text-[8px] text-white/40 font-mono uppercase block">Historical Metric Scaling</span>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            key={selectedMilestone}
                            className="h-full bg-red-600"
                            initial={{ width: "0%" }}
                            animate={{ 
                              width: selectedMilestone === "runs" ? "100%" : selectedMilestone === "centuries" ? "88%" : selectedMilestone === "peak_season" ? "95%" : "78%"
                            }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        <div className="flex justify-between text-[7px] text-white/30 font-mono uppercase">
                          <span>BASE STANDARD</span>
                          <span>LEGEND LEVEL</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] uppercase tracking-widest text-white/30 font-mono text-center mt-6">
                  Select a milestone block on the left to inspect records
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 7: 2025 THE PROMISE FULFILLED */}
          <section
            id="trophy"
            data-section
            className="min-h-screen relative flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 bg-black border-b border-white/5"
          >
            {/* Climax ambient visual: Gold rays and particle drift */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.06)_0%,transparent_75%)] pointer-events-none" />

            {/* Render 35 floating gold particles dynamically */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {Array.from({ length: 35 }).map((_, idx) => {
                const sizeWidth = 3 + Math.random() * 5;
                const sizeHeight = 5 + Math.random() * 6;
                const leftPos = Math.random() * 100;
                const duration = 5 + Math.random() * 6;
                const delay = Math.random() * 4;
                return (
                  <div
                    key={idx}
                    className="confetti-gold"
                    style={{
                      width: `${sizeWidth}px`,
                      height: `${sizeHeight}px`,
                      left: `${leftPos}%`,
                      top: "-20px",
                      animationDuration: `${duration}s`,
                      animationDelay: `${delay}s`
                    }}
                  />
                );
              })}
            </div>

            <div className="max-w-4xl mx-auto w-full text-center space-y-4 mb-16">
              <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] uppercase tracking-[0.3em] font-bold px-4 py-1.5 rounded-full inline-block animate-pulse">
                Section 7 · The Coronation
              </span>
              
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
                THE PROMISE FULFILLED <br />
                <span className="gold-gradient-text">18 YEARS FOR GOLD</span>
              </h2>

              <p className="text-white/40 text-xs sm:text-sm font-mono mt-3 uppercase tracking-wider">
                LOVED BY MILLIONS · CROWNED IN GLORY (2025)
              </p>
            </div>

            <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Image bento grid */}
              <div className="lg:col-span-6 flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 w-full sm:aspect-[1.2/1] max-w-[480px] sm:max-w-none">
                  
                  {/* Image 1: Kissing the trophy (Featured - Tall on desktop) */}
                  <div className="relative overflow-hidden rounded-3xl border border-yellow-500/10 shadow-2xl bg-zinc-950 group aspect-[16/10] sm:aspect-auto sm:col-span-1 sm:row-span-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/rcb/photo5.jpg"
                      alt="Virat Kohli kissing trophy"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-85 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-left space-y-0.5 pointer-events-none">
                      <span className="text-[8px] sm:text-[9px] uppercase font-mono text-yellow-400 tracking-widest block font-bold">THE REWARD</span>
                      <span className="text-xs sm:text-sm text-white font-display font-black uppercase tracking-wider block">Kissing the Gold</span>
                    </div>
                  </div>

                  {/* Image 2: Celebration with ABD/Gayle (Supporting) */}
                  <div className="relative overflow-hidden rounded-3xl border border-yellow-500/10 shadow-2xl bg-zinc-950 group aspect-[16/10] sm:aspect-auto sm:col-span-1 sm:row-span-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/rcb/photo4.jpg"
                      alt="Virat celebration with legends"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-85 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-left space-y-0.5 pointer-events-none">
                      <span className="text-[8px] sm:text-[9px] uppercase font-mono text-yellow-400 tracking-widest block font-bold">THE RETROSPECT</span>
                      <span className="text-xs sm:text-sm text-white font-display font-black uppercase tracking-wider block">Shared With Legends</span>
                    </div>
                  </div>

                  {/* Image 3: Team photo celebration (Supporting) */}
                  <div className="relative overflow-hidden rounded-3xl border border-yellow-500/10 shadow-2xl bg-zinc-950 group aspect-[16/10] sm:aspect-auto sm:col-span-1 sm:row-span-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/rcb/photo3.jpg"
                      alt="RCB Team celebration photo"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-85 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-left space-y-0.5 pointer-events-none">
                      <span className="text-[8px] sm:text-[9px] uppercase font-mono text-yellow-400 tracking-widest block font-bold">THE CHAMPIONS</span>
                      <span className="text-xs sm:text-sm text-white font-display font-black uppercase tracking-wider block">Defending the Legacy</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Climax narrative details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-yellow-500" />
                  <span className="text-yellow-500 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                    The Promise Fulfilled
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wider font-extrabold leading-none">
                  THE Wait WAS WORTH IT
                </h3>

                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-body">
                  Seventeen years of near-misses, criticisms, bottom-table listings, and heartbreak were wiped clean under a rain of golden confetti.
                </p>

                <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-body">
                  Standing under the Chinnaswamy floodlights, holding the gold trophy close with closed eyes, Virat Kohli finally closed the book on the wait. A testament to absolute persistence and a love letter to the fans who never left.
                </p>

                <div className="border-l-2 border-yellow-500 pl-4 py-2 bg-yellow-500/[0.02]">
                  <p className="text-yellow-500 text-xs italic font-medium font-body leading-relaxed">
                    "This is for the people who stayed. Who walked with us through the darkest seasons. Loyalty is rewarded in gold."
                  </p>
                  <span className="text-[8px] font-mono text-white/40 block mt-2 uppercase tracking-widest font-bold">— Virat Kohli</span>
                </div>
              </div>

            </div>
          </section>

        </div>

      {/* FOOTER NAV COMPONENT */}
      <div className="relative z-30 bg-transparent backdrop-blur-md border-t border-white/5">
        <ChapterNav />
      </div>
      
    </main>
  );
}

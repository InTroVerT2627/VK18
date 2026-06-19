"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { Award, Zap, Shield, Eye, Flame, Compass, Brain, Activity, Play } from "lucide-react";

// Types & Data Definitions
type ChasePhase = "observe" | "absorb" | "accelerate" | "finish";
type CoverDriveAspect = "aesthetic" | "evolution" | "impact";
type StancePillar = "lift" | "balance" | "head";
type MentalAspect = "visualization" | "focus";
type RunScenario = "mohali" | "mcg" | "odi";

// Section 5: Chase simulator states
const chaseData: Record<ChasePhase, {
  title: string;
  overs: string;
  score: string;
  reqRate: string;
  curRate: string;
  description: string;
  telemetry: string;
  chartPath: string;
}> = {
  observe: {
    title: "Observe & Calibrate",
    overs: "1 - 15",
    score: "72/2",
    reqRate: "7.08",
    curRate: "4.80",
    description: "Virat maps visual reference lines, tests pitch bounce, and assesses ball movement. Boundaries are avoided; he works exclusively in low-risk zones to baseline the conditions.",
    telemetry: "EYE TRACKING ACTIVE · SEAM MEASUREMENT ON · BOUNDARY RISK: LOW",
    chartPath: "M 0 100 Q 25 90 50 85 T 100 80"
  },
  absorb: {
    title: "Absorb & Accumulate",
    overs: "16 - 35",
    score: "178/3",
    reqRate: "7.27",
    curRate: "5.08",
    description: "The engine room of the chase. Virat converts singles into hard-run doubles. By placing maximum physical pressure on fielders, he triggers errors without playing a single lofted shot.",
    telemetry: "VO2 MAX TARGETED · ZONE 2 RUNNING ACTIVATED · FIELD STRAIN: CRITICAL",
    chartPath: "M 0 100 Q 25 85 50 70 T 100 55"
  },
  accelerate: {
    title: "Target & Accelerate",
    overs: "36 - 45",
    score: "258/4",
    reqRate: "7.50",
    curRate: "5.73",
    description: "The tactical surge. Virat targets specific bowlers and shifts his visual scoring arcs. Power is replaced by timing and wrist deflection, bisecting inner ring fielders with absolute precision.",
    telemetry: "WRIST TORQUE MAXIMIZED · TARGET LOCK ON DEEP COVER · OVER RATE: +8.5",
    chartPath: "M 0 100 Q 25 80 50 50 T 100 25"
  },
  finish: {
    title: "Conquer & Seal",
    overs: "46 - 50",
    score: "321/4 (Target 320)",
    reqRate: "0.00",
    curRate: "6.42",
    description: "The clinical conclusion. Mindset matches execution. Anticipating the bowler's defensive lengths, he executes with high-leverage strokes to seal the chase.",
    telemetry: "TARGET ACHIEVED · STRESS INDEX: 0.12 · DECISION COMPLETION: 100%",
    chartPath: "M 0 100 Q 25 60 50 30 T 100 0"
  }
};

// Section 4: Cover Drive aspects
const coverDriveAspects: Record<CoverDriveAspect, {
  label: string;
  title: string;
  subtitle: string;
  detail: string;
  quote: string;
}> = {
  aesthetic: {
    label: "The Visual Poetry",
    title: "An Unmistakable Silhouette",
    subtitle: "A study in balance and kinetic timing",
    detail: "The signature Kohli cover drive is a study in perfect balance. As the bat flows through a high-elbow exit, the body forms a straight, vertical line. There is no violence in the stroke—only timing, extension, and a completely still head.",
    quote: "A painting in motion. He doesn't hit it, he caresses it to the boundary."
  },
  evolution: {
    label: "The Technical Rebirth",
    title: "The 2014 England Correction",
    subtitle: "How a historic failure redefined his greatest weapon",
    detail: "Following a disastrous 2014 tour of England where he was repeatedly caught behind off the swing, Virat completely refactored his approach to the cover drive. He widened his stance, stood slightly outside crease, and learned to play the ball directly under his eyes with soft hands. This change turned a high-risk gamble into a low-risk run accumulator.",
    quote: "To master a shot, you must first learn when not to play it."
  },
  impact: {
    label: "The Psychological Force",
    title: "Asserting Immediate Dominance",
    subtitle: "A silent statement of intent to the opposition",
    detail: "Early in an innings, a crisp cover drive is more than just four runs; it is a psychological blow to the bowler's rhythm. By turning a good-length ball on the fourth stump line into a boundary, Virat forces the bowler to change their lengths, creating scoring opportunities elsewhere.",
    quote: "When Kohli plays the cover drive in the first over, the chase is already won."
  }
};

// Section 3: Stance Mechanics aspects
const stanceData: Record<StancePillar, {
  label: string;
  title: string;
  detail: string;
  technicalKey: string;
}> = {
  lift: {
    label: "Bat Lift & Swing Path",
    title: "Slip-Aligned Pickup",
    detail: "Lifting the bat straight toward second slip keeps his hands close to his back hip, creating a linear, vertical swing path directly through the release plane. This completely eliminates lateral slicing.",
    technicalKey: "Keep your wrists soft and avoid locking them at peak lift to prevent early bat face closure."
  },
  balance: {
    label: "Balance & Knee Flexion",
    title: "Active Center of Gravity",
    detail: "By keeping the knees flexed and weight loaded on the balls of his feet, Virat maintains a dynamic pre-loaded stance. This allows explosive weight transfer in any direction at the split second of release.",
    technicalKey: "Do not over-stride; keep your hips under your shoulders to maintain balance and adjust to late seam changes."
  },
  head: {
    label: "Head Stability & Gaze",
    title: "Locked Eyes & Level Gaze",
    detail: "Tucking the chin against the lead shoulder keeps the head completely still and eyes parallel to the turf. This is the foundation of his depth perception and trajectory tracking.",
    technicalKey: "Lead with your head, not your hands, and force your weight through your front knee."
  }
};

// Section 2: Mental Framework aspects
const mentalData: Record<MentalAspect, {
  label: string;
  title: string;
  detail: string;
  quote: string;
}> = {
  visualization: {
    label: "Visualization Reps",
    title: "Pre-Game Visual Mapping",
    detail: "Virat spends hours mentally simulating the opposition bowlers' release points, pitch variances, and boundary dimensions. By the time he walks onto the turf, the environment feels already conquered.",
    quote: "I see the ball hitting the gap in my mind before I even guard my crease."
  },
  focus: {
    label: "Unyielding Focus",
    title: "The Silent Tunnel Vision",
    detail: "Under extreme pressure, Virat locks out crowd noise, scoreboard stress, and physical fatigue, narrowing his focus purely to the release index of the next delivery.",
    quote: "When you're in the zone, everything slows down. The noise becomes absolute silence."
  }
};

// Section 6: Running Scenarios
const runningScenarios: Record<RunScenario, {
  title: string;
  match: string;
  speed: string;
  turnaround: string;
  vo2: string;
  noise: string;
  pressure: string;
  analysis: string;
}> = {
  mohali: {
    title: "Stealing Doubles (Mohali)",
    match: "vs Australia, T20 WC 2016",
    speed: "31.8 km/h",
    turnaround: "1.78s",
    vo2: "95%",
    noise: "105 dB",
    pressure: "98%",
    analysis: "In extreme heat, Virat ran 24 runs purely in double-sprints. This forced fielders to creep inwards, opening up gaps that he exposed for match-winning boundaries."
  },
  mcg: {
    title: "The Exhaustion Run (MCG)",
    match: "vs Pakistan, T20 WC 2022",
    speed: "32.4 km/h",
    turnaround: "1.82s",
    vo2: "98%",
    noise: "110 dB",
    pressure: "99%",
    analysis: "Under absolute muscle exhaustion in the final overs, Virat ran a critical three. This visual pressure loading disrupted the bowler's pacing and execution."
  },
  odi: {
    title: "Standard Chase Rotation",
    match: "Typical ODI Middle-Overs",
    speed: "29.5 km/h",
    turnaround: "1.95s",
    vo2: "82%",
    noise: "88 dB",
    pressure: "85%",
    analysis: "By converting simple singles into high-speed pressure runs, Virat consistently forces fielders to rush throws, causing overthrows and mental breakdown."
  }
};

export default function MasterclassPage() {
  // Simulator & selector states
  const [activeChasePhase, setActiveChasePhase] = useState<ChasePhase>("observe");
  const [activeAspect, setActiveAspect] = useState<CoverDriveAspect>("aesthetic");
  const [activeStancePillar, setActiveStancePillar] = useState<StancePillar>("head");
  const [activeRunScenario, setActiveRunScenario] = useState<RunScenario>("mohali");
  const [telemetryTick, setTelemetryTick] = useState(false);

  // Scorecard states
  const [patience, setPatience] = useState<number>(5);
  const [fitness, setFitness] = useState<number>(5);
  const [shotSelection, setShotSelection] = useState<number>(5);
  const [discipline, setDiscipline] = useState<number>(5);
  const [mentalStrength, setMentalStrength] = useState<number>(5);
  const [runningSpeed, setRunningSpeed] = useState<number>(5);
  const [calculatedIndex, setCalculatedIndex] = useState<number | null>(null);
  const [archetype, setArchetype] = useState<{ title: string; desc: string } | null>(null);

  // Scorecard calculation
  const calculateViratIndex = () => {
    const total = patience + fitness + shotSelection + discipline + mentalStrength + runningSpeed;
    const maxPossible = 60;
    const index = Math.round((total / maxPossible) * 100);
    setCalculatedIndex(index);

    if (index >= 90) {
      setArchetype({
        title: "The Sovereign Legend",
        desc: "You possess absolute Virat-like qualities. An elite athlete with iron-clad mental focus, blistering speed between the wickets, and a highly analytical approach to chases. You dominate bowlers and command the field."
      });
    } else if (index >= 75) {
      setArchetype({
        title: "The Calculated Chase-Master",
        desc: "Your tactical awareness is your weapon. You manage targets mathematically, work hard on strike rotation, and refuse high-risk options. Push your physical fitness limits to reach ultimate legend status."
      });
    } else if (index >= 60) {
      setArchetype({
        title: "The Aggressive Dominator",
        desc: "You have natural power, flair, and competitive passion. However, your impatience can lead to early wickets. Refine your shot selection and concentrate on turning ones into hard-run doubles."
      });
    } else {
      setArchetype({
        title: "The Raw Prodigy",
        desc: "Incredible potential but lacking structured discipline and mental visual mapping. Refine your basic techniques, work on daily conditioning, and study match scenarios to anchor your game."
      });
    }
  };

  // Telemetry tick effect for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick((prev) => !prev);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex flex-col justify-between overflow-x-hidden select-none font-body scroll-smooth">
      {/* GLOBAL BACKGROUND EFFECTS */}
      <style>{`
        @keyframes floatingDust {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
          100% { transform: translateY(0px) rotate(360deg); opacity: 0.1; }
        }
        .dust-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #eab308;
          border-radius: 50%;
          pointer-events: none;
          animation: floatingDust 12s infinite ease-in-out;
        }
        .stadium-beam-wide {
          background: radial-gradient(circle at top, rgba(234,179,8,0.06) 0%, transparent 60%);
        }
        .stadium-beam-gold {
          background: radial-gradient(circle at center, rgba(234, 179, 8, 0.12) 0%, transparent 70%);
        }
      `}</style>

      {/* Floating Particles Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="dust-particle top-[15%] left-[20%]" style={{ animationDelay: "0s" }} />
        <div className="dust-particle top-[35%] left-[75%]" style={{ animationDelay: "2.5s" }} />
        <div className="dust-particle top-[65%] left-[12%]" style={{ animationDelay: "5s" }} />
        <div className="dust-particle top-[85%] left-[80%]" style={{ animationDelay: "1s" }} />
        <div className="dust-particle top-[45%] left-[45%]" style={{ animationDelay: "4s" }} />
      </div>

      <CinematicHeader />

      {/* HERO SECTION */}
      <section className="relative z-10 px-4 pt-28 pb-10 sm:pt-36 sm:pb-16 max-w-[1440px] mx-auto w-full text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full inline-block animate-pulse">
            Chapter 07 · The Formula
          </span>
          <h1 className="font-display text-[9.5vw] xs:text-[9vw] sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] break-words">
            The Masterclass
          </h1>
          <p className="text-[9px] sm:text-xs uppercase tracking-[0.25em] text-white/50 font-mono font-bold leading-normal">
            Mindset · Mechanical Precision · Game Theory
          </p>
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto pt-2" />
        </div>
      </section>

      {/* FLOW 1: THE SCIENCE OF CONSISTENCY */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-yellow-400 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">SECTION 1</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            The Science of Consistency
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
            Constructing a highly repeatable runs engine
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#070e1e]/40 border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden space-y-6 sm:space-y-8">
          <div className="absolute inset-0 stadium-beam-wide pointer-events-none" />
          
          <div className="border-l-2 border-yellow-500/40 pl-4 py-2 bg-yellow-500/[0.02] rounded-r-xl">
            <p className="text-white/90 font-display text-lg sm:text-2xl italic font-medium leading-relaxed">
              "Millions can hold a bat. Very few can control an innings. Virat learned to control both."
            </p>
          </div>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-body">
            Virat Kohli's batting dominance is not built on high-risk innovations, but on the mechanical perfection of basic strokes. By eliminating extraneous movements and visual distractions, he created a repeatable batting system that functions under extreme physical and psychological strain.
          </p>
        </div>
      </section>

      {/* FLOW 2: MENTAL FRAMEWORK */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-yellow-400 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">SECTION 2</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            Mental Framework
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
            The quiet preparation before the storm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {(Object.keys(mentalData) as MentalAspect[]).map((aspect) => (
            <div
              key={aspect}
              className="bg-[#070e1e]/60 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-yellow-500/25 hover:bg-[#070e1e]/80 transition duration-300 relative overflow-hidden group min-h-[220px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                  {aspect === "visualization" ? <Brain className="h-5.5 w-5.5" /> : <Eye className="h-5.5 w-5.5" />}
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-white uppercase tracking-wide">
                    {mentalData[aspect].title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed font-body">
                    {mentalData[aspect].detail}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-4 border-t border-white/5">
                <p className="text-yellow-400/80 text-xs italic font-medium">
                  "{mentalData[aspect].quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLOW 3: STANCE MECHANICS */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-yellow-400 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">SECTION 3</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            Stance Mechanics
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
            The physical base of absolute balance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Stance Image panel - Stacks on top on mobile */}
          <div className="lg:col-span-5 flex justify-center items-center relative aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-square w-full max-w-[480px] mx-auto border border-white/10 rounded-2xl bg-black overflow-hidden group shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/test/photo1.jpg"
              alt="Virat Kohli batting stance setup"
              className="w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <span className="text-yellow-400 block text-[9px] font-mono tracking-widest uppercase">STABILIZED SETUP</span>
              <span className="text-white text-xs font-semibold">Ready and loaded for ball release</span>
            </div>
          </div>

          {/* Interactive controls and explanation panel */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-mono font-bold block">Setup Geometry</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                The Three Geometric Pillars
              </h3>

              {/* Selector Tabs - Mobile friendly wrapping */}
              <div className="flex flex-wrap gap-2 pb-4 border-b border-white/5">
                {(Object.keys(stanceData) as StancePillar[]).map((pillar) => {
                  const isSelected = activeStancePillar === pillar;
                  return (
                    <button
                      key={pillar}
                      onClick={() => setActiveStancePillar(pillar)}
                      className={`px-3 py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all min-h-[44px] ${
                        isSelected
                          ? "bg-yellow-400 text-black shadow-lg"
                          : "bg-white/[0.02] border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {stanceData[pillar].label.split(" & ")[0]}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic explanations */}
              <div className="min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStancePillar}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <h4 className="font-display text-lg text-yellow-400 uppercase tracking-wide font-bold">
                      {stanceData[activeStancePillar].title}
                    </h4>
                    <p className="text-white/75 text-sm leading-relaxed font-body">
                      {stanceData[activeStancePillar].detail}
                    </p>
                    <div className="border-t border-white/5 pt-3.5 mt-3.5">
                      <span className="text-[8px] text-green-400 font-mono uppercase block mb-1">COACHING RULE</span>
                      <p className="text-white/60 text-xs italic">
                        "{stanceData[activeStancePillar].technicalKey}"
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 text-[9px] uppercase tracking-widest text-white/30 font-mono text-center">
              Select a pillar above to inspect setup mechanics
            </div>
          </div>
        </div>
      </section>

      {/* FLOW 4: COVER DRIVE BREAKDOWN */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-yellow-400 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">SECTION 4</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            Cover Drive Breakdown
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
            How the signature stroke became a statement of legacy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Cover Drive Image - Stacks on top on mobile */}
          <div className="lg:col-span-6 flex flex-col justify-between relative aspect-[4/3] sm:aspect-square max-w-[480px] mx-auto w-full border border-white/10 rounded-2xl bg-black overflow-hidden shadow-xl group">
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/t20/photo3.jpg"
                alt="Virat Kohli cover drive shot execution"
                className="w-full h-full object-cover opacity-85 transition-transform duration-1000 group-hover:scale-103"
              />
              <div className="absolute inset-0 stadium-beam-gold pointer-events-none mix-blend-screen opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            </div>

            {/* Top info badge */}
            <div className="relative z-10 p-4 font-mono text-[9px] text-yellow-400/70 tracking-widest">
              STILL_FRAME: SIGNATURE_STROKE.RAW
            </div>

            {/* Quote Overlay */}
            <div className="relative z-10 p-5 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAspect}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg italic font-medium font-display leading-snug text-left border-l-2 border-yellow-500 pl-3 bg-yellow-500/[0.02] py-1.5 rounded-r-md">
                    "{coverDriveAspects[activeAspect].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right panel: Selector cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-mono font-bold block">Artistry & Storytelling</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                Anatomy of an Icon
              </h3>

              {/* Selector accordion */}
              <div className="flex flex-col gap-3">
                {(Object.keys(coverDriveAspects) as CoverDriveAspect[]).map((aspect) => {
                  const isSelected = activeAspect === aspect;
                  return (
                    <button
                      key={aspect}
                      onClick={() => setActiveAspect(aspect)}
                      className={`text-left border rounded-2xl p-4 sm:p-5 transition-all duration-300 min-h-[50px] ${
                        isSelected
                          ? "bg-white/[0.04] border-yellow-500/35 shadow-lg"
                          : "bg-white/[0.01] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-display text-sm uppercase tracking-wider transition-colors ${isSelected ? "text-yellow-400 font-extrabold" : "text-white/80"}`}>
                          {coverDriveAspects[aspect].label}
                        </span>
                        <span className={`font-mono text-[8px] uppercase px-2 py-0.5 rounded-full ${isSelected ? "bg-yellow-400/10 text-yellow-400" : "bg-white/5 text-white/40"}`}>
                          {aspect}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden mt-3"
                          >
                            <h4 className="font-display text-md text-white font-bold uppercase mt-1">
                              {coverDriveAspects[aspect].title}
                            </h4>
                            <p className="text-white/45 text-[10px] uppercase font-mono tracking-wider mt-0.5">
                              {coverDriveAspects[aspect].subtitle}
                            </p>
                            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-2.5 font-body">
                              {coverDriveAspects[aspect].detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 text-[9px] uppercase tracking-widest text-white/30 font-mono text-center">
              Select an aspect above to inspect the stroke profile
            </div>
          </div>
        </div>
      </section>

      {/* FLOW 5: CHASE PSYCHOLOGY */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-yellow-400 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">SECTION 5</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            Chase Psychology
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
            The Chase Formula: Math and nerves defeating targets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Scoreboard panel - Stacks on top on mobile */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-black/85 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden min-h-[380px]">
            <div className="absolute inset-0 bg-hero-grid opacity-[0.02] pointer-events-none" />
            <div className="absolute top-3 right-3 font-mono text-[8px] text-yellow-400/30">
              SYS_TELEMETRY: ACTIVE
            </div>

            <div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-white/40 block">Scenarios Index</span>
                  <span className="font-display text-base font-bold text-white">ODI PRESSURE CHASE</span>
                </div>
                <div className="bg-red-500/15 border border-red-500/25 text-red-500 text-[8px] font-mono uppercase px-2 py-0.5 rounded">
                  HIGH PRESSURE
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 font-mono text-center">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 block uppercase">Target Runs</span>
                  <span className="text-2xl text-yellow-400 font-bold block mt-0.5">320</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 block uppercase">Live Score</span>
                  <span className="text-2xl text-white font-bold block mt-0.5">
                    {chaseData[activeChasePhase].score.split(" ")[0]}
                  </span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 block uppercase">Overs Phase</span>
                  <span className="text-2xl text-white font-bold block mt-0.5">
                    {chaseData[activeChasePhase].overs}
                  </span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 block uppercase">Req. Run Rate</span>
                  <span className="text-2xl text-red-400 font-bold block mt-0.5">
                    {chaseData[activeChasePhase].reqRate}
                  </span>
                </div>
              </div>

              {/* SVG run rate projection */}
              <div className="mt-5 border border-white/10 rounded-xl p-3 bg-zinc-950/90">
                <span className="text-[8px] text-white/40 block uppercase font-mono mb-1.5">RUN RATE ACCELERATION</span>
                <div className="relative h-16 w-full bg-black/40 rounded overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full stroke-yellow-400/40" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                    <line x1="0" y1="80" strokeWidth="0.2" strokeDasharray="1 1" />
                    <line x1="0" y1="50" strokeWidth="0.2" strokeDasharray="1 1" />
                    <line x1="0" y1="20" strokeWidth="0.2" strokeDasharray="1 1" />
                    <motion.path
                      key={activeChasePhase}
                      d={chaseData[activeChasePhase].chartPath}
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/5 text-[8px] font-mono text-yellow-400/60 tracking-wider">
              {chaseData[activeChasePhase].telemetry}
            </div>
          </div>

          {/* Stepper details */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#070e1e]/40 border border-white/5 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-mono font-bold block mb-1">Chasing Dynamics</span>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white">
                  Four-Phase Chase Protocol
                </h3>
              </div>

              {/* Mobile friendly selector buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4 border-b border-white/10">
                {(Object.keys(chaseData) as ChasePhase[]).map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setActiveChasePhase(phase)}
                    className={`px-2.5 py-3 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all min-h-[44px] ${
                      activeChasePhase === phase
                        ? "bg-yellow-400 text-black shadow-md font-black"
                        : "bg-white/[0.02] border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>

              {/* Explanations */}
              <div className="min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChasePhase}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <h4 className="font-display text-lg text-yellow-400 uppercase tracking-wider font-extrabold">
                      {chaseData[activeChasePhase].title}
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-body">
                      {chaseData[activeChasePhase].description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-[9px] font-mono text-white/50 uppercase">
                      <div>
                        <span className="block text-white/30 text-[7px]">Phase Run Rate</span>
                        <span className="font-semibold text-white mt-0.5 block">{chaseData[activeChasePhase].curRate} RPO</span>
                      </div>
                      <div>
                        <span className="block text-white/30 text-[7px]">Target Strategy</span>
                        <span className="font-semibold text-white mt-0.5 block truncate">
                          {activeChasePhase === "observe" ? "Visual calibration" : activeChasePhase === "absorb" ? "VO2 pressure accumulation" : activeChasePhase === "accelerate" ? "De-escalated torque" : "Closing conviction"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 text-[8px] uppercase tracking-widest text-white/20 font-mono text-center relative z-10">
              Select a phase above to analyze tactical adjustments
            </div>
          </div>
        </div>
      </section>

      {/* FLOW 6: TRAINING PHILOSOPHY */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-yellow-400 font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">SECTION 6</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            Training Philosophy
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 mt-3 font-mono leading-relaxed">
            The daily conditioning, nutrition, and physiological pacing
          </p>
        </div>

        {/* Part 1: Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Card 1: Conditioning */}
          <div className="bg-[#070e1e]/60 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-yellow-500/25 hover:bg-[#070e1e]/80 transition duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 mb-4 group-hover:bg-yellow-500/20 transition-colors">
                <Flame className="h-5.5 w-5.5" />
              </div>
              <h4 className="font-display text-lg text-white uppercase tracking-wide">Strict Conditioning</h4>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed font-body">
                6 days a week training routines, focusing on core strength, VO2 max capacity, and quick recovery loops. Elite beep tests set the standard.
              </p>
            </div>
            <span className="text-[8px] font-mono text-white/20 mt-6 block uppercase">FITNESS & TRAINING</span>
          </div>

          {/* Card 2: Diet */}
          <div className="bg-[#070e1e]/60 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-yellow-500/25 hover:bg-[#070e1e]/80 transition duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 mb-4 group-hover:bg-yellow-500/20 transition-colors">
                <Shield className="h-5.5 w-5.5" />
              </div>
              <h4 className="font-display text-lg text-white uppercase tracking-wide">Clean Diet Protocol</h4>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed font-body">
                High-discipline nutrition structure. Virat switched to a strict plant-forward diet in 2018, completely eliminating gluten and processed sugars to aid fast recovery.
              </p>
            </div>
            <span className="text-[8px] font-mono text-white/20 mt-6 block uppercase">NUTRITION</span>
          </div>
        </div>

        {/* Part 2: Running Between Wickets Telemetry */}
        <div className="text-center max-w-2xl mx-auto mb-10 mt-16">
          <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white">
            Running Between Wickets HUD
          </h3>
          <p className="text-xs text-white/40 font-mono mt-1.5 uppercase tracking-wider">
            Physiological pacing and pressure loading
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Telemetry Dashboard - Stacks on top on mobile */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-black/90 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden min-h-[360px]">
            <div className="absolute inset-0 bg-hero-grid opacity-[0.02] pointer-events-none" />
            <div className="absolute top-3 left-3 text-[8px] font-mono text-yellow-400/40 uppercase tracking-widest animate-pulse">
              HUD STATE // RUNNING_TELEMETRY
            </div>

            <div className="space-y-5 mt-6">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 uppercase font-mono block">Peak Velocity</span>
                  <span className="text-xl font-mono text-white font-bold block mt-0.5">
                    {runningScenarios[activeRunScenario].speed}
                  </span>
                  <span className="text-[6px] text-yellow-400/60 font-mono mt-1 block">VELOCITY RANGE</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 uppercase font-mono block">Crease Turn</span>
                  <span className="text-xl font-mono text-white font-bold block mt-0.5">
                    {runningScenarios[activeRunScenario].turnaround}
                  </span>
                  <span className="text-[6px] text-yellow-400/60 font-mono mt-1 block">DECEL VECTOR</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 uppercase font-mono block">VO2 Max Strain</span>
                  <span className="text-xl font-mono text-white font-bold block mt-0.5">
                    {runningScenarios[activeRunScenario].vo2}
                  </span>
                  <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      key={activeRunScenario}
                      className="bg-red-500 h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: runningScenarios[activeRunScenario].vo2 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <span className="text-[8px] text-white/40 uppercase font-mono block">Field Panic</span>
                  <span className="text-xl font-mono text-yellow-400 font-bold block mt-0.5">
                    {runningScenarios[activeRunScenario].pressure}
                  </span>
                  <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      key={activeRunScenario}
                      className="bg-yellow-400 h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: runningScenarios[activeRunScenario].pressure }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[8px] font-mono">
              <span className="text-white/40 font-bold">LOGGER: OK</span>
              <span className="text-yellow-400 animate-pulse flex items-center gap-1.5 font-bold">
                <span className="h-1 w-1 rounded-full bg-yellow-400" />
                LIVE UPDATE FEED {telemetryTick ? "A" : "B"}
              </span>
            </div>
          </div>

          {/* Scenario selectors */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#070e1e]/40 border border-white/5 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-mono font-bold block">Scenario Logs</span>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white">
                  Telemetry Scenarios
                </h3>
              </div>

              {/* Selector buttons */}
              <div className="flex flex-col sm:flex-row gap-2 border-b border-white/10 pb-4">
                {(Object.keys(runningScenarios) as RunScenario[]).map((scen) => (
                  <button
                    key={scen}
                    onClick={() => setActiveRunScenario(scen)}
                    className={`flex-grow px-3 py-3 rounded-xl border text-[10px] font-mono uppercase tracking-wider font-bold transition-all min-h-[44px] ${
                      activeRunScenario === scen
                        ? "bg-yellow-400 border-yellow-400 text-black shadow-md"
                        : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {runningScenarios[scen].title.split(" ")[0]} {runningScenarios[scen].title.includes("(") ? runningScenarios[scen].title.substring(runningScenarios[scen].title.indexOf("(")) : ""}
                  </button>
                ))}
              </div>

              {/* Scenario description logs */}
              <div className="min-h-[120px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRunScenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h4 className="font-display text-md text-white uppercase tracking-wide font-bold">
                        {runningScenarios[activeRunScenario].title}
                      </h4>
                      <span className="text-[9px] font-mono text-yellow-400/80 font-bold">
                        {runningScenarios[activeRunScenario].match}
                      </span>
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-body">
                      {runningScenarios[activeRunScenario].analysis}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 text-[9px] uppercase tracking-widest text-white/20 font-mono text-center z-10 mt-6">
              Select a scenario above to inspect physiological strain
            </div>
          </div>
        </div>
      </section>

      {/* FLOW 7: MASTERCLASS SUMMARY */}
      <section className="relative z-10 px-4 py-12 sm:py-20 max-w-[1000px] mx-auto w-full border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full inline-block">
            Interactive Summary
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white mt-2 leading-[1.1]">
            Can You Bat Like Virat?
          </h2>
          <p className="text-[10px] sm:text-xs text-white/40 font-mono mt-3 uppercase tracking-wider leading-relaxed">
            Rate your attributes to compute your Virat Index percentage and character archetype
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#070e1e] to-black border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input sliders */}
            <div className="space-y-6">
              {/* Sliders list */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">Patience & Game Awareness</span>
                  <span className="text-yellow-400 font-bold">{patience}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={patience}
                  onChange={(e) => setPatience(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none min-h-[22px]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">Physical Fitness / VO2 Max</span>
                  <span className="text-yellow-400 font-bold">{fitness}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={fitness}
                  onChange={(e) => setFitness(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none min-h-[22px]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">Calculated Shot Selection</span>
                  <span className="text-yellow-400 font-bold">{shotSelection}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={shotSelection}
                  onChange={(e) => setShotSelection(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none min-h-[22px]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">Training & Diet Discipline</span>
                  <span className="text-yellow-400 font-bold">{discipline}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={discipline}
                  onChange={(e) => setDiscipline(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none min-h-[22px]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">Mental Strength Under Pressure</span>
                  <span className="text-yellow-400 font-bold">{mentalStrength}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={mentalStrength}
                  onChange={(e) => setMentalStrength(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none min-h-[22px]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">Running Speed Between Wickets</span>
                  <span className="text-yellow-400 font-bold">{runningSpeed}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={runningSpeed}
                  onChange={(e) => setRunningSpeed(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none min-h-[22px]"
                />
              </div>

              <button
                onClick={calculateViratIndex}
                className="w-full mt-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-display font-black uppercase text-xs tracking-widest shadow-lg transition-all min-h-[44px]"
              >
                Calculate Virat Index
              </button>
            </div>

            {/* Results Panel */}
            <div className="bg-black/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center min-h-[280px]">
              {calculatedIndex !== null && archetype ? (
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative flex items-center justify-center">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                      <motion.circle
                        cx="56" cy="56" r="48" stroke="#f59e0b" strokeWidth="6" fill="transparent"
                        strokeDasharray={301.6}
                        initial={{ strokeDashoffset: 301.6 }}
                        animate={{ strokeDashoffset: 301.6 - (301.6 * calculatedIndex) / 100 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute font-display text-3xl font-black text-white">
                      {calculatedIndex}%
                    </span>
                  </div>

                  <div>
                    <span className="text-yellow-400 block font-display text-lg uppercase tracking-wider font-extrabold">
                      {archetype.title}
                    </span>
                    <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed max-w-sm mx-auto font-body">
                      {archetype.desc}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <Award className="h-10 w-10 text-white/20 mx-auto" />
                  <p className="text-white/40 text-xs uppercase font-mono tracking-wider max-w-xs mx-auto leading-relaxed">
                    Awaiting self-assessment input parameters...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 bg-[#020617] border-t border-white/5">
        <ChapterNav />
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";

// Custom animated counter component
function AnimatedCounter({ endValue, suffix = "", duration = 1.2 }: { endValue: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalSteps = 40;
    const stepTime = (duration * 1000) / totalSteps;
    const timer = setInterval(() => {
      start += 1;
      const progress = start / totalSteps;
      const current = Math.floor(endValue * progress);
      if (start >= totalSteps) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// Reusable Photo Presentation System Component
function PremiumImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 aspect-[3/4] md:aspect-[4/5] flex items-center justify-center group ${className}`}>
      {/* Blurred ambient background reflection */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-35 transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      {/* Contained foreground image */}
      <img 
        src={src} 
        alt={alt}
        className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}

// 6 Transformation topics
const transformationTopics = [
  {
    title: "Early Career Lifestyle",
    subtitle: "Raw Talent & Subcontinental Habits",
    detail: "Biryanis, fast foods, late-night sweets, and carbonated beverages. Virat Kohli entered international cricket with immense natural talent but standard subcontinental physical habits. He was raw, slightly chubby, and relied solely on hand-eye coordination, unaware of how physical conditioning caps athletic longevity."
  },
  {
    title: "The Turning Point",
    subtitle: "The Mirror Confrontation (2012)",
    detail: "Following a disappointing IPL 2012 campaign, Kohli looked in the mirror and decided his physical standards were unacceptable. He realized that to compete at the absolute highest level and maintain multi-format dominance, his body had to become a machine. That night, he transformed his diet and lifestyle overnight."
  },
  {
    title: "Nutrition Discipline",
    subtitle: "Biochemical Fueling",
    detail: "Clean, plant-forward, gluten-free, and absolutely zero processed sugars or dairy. Kohli's nutritional regime is a masterclass in strict athletic fueling. Every calorie is measured, every meal serves muscle repair, and cheat meals do not exist. He built a lean, highly efficient metabolic system."
  },
  {
    title: "Training Obsession",
    subtitle: "Cricket-Specific Conditioning",
    detail: "Training 6 days a week, functional athletic movements replaced standard vanity lifting. Kohli combined Olympic lifts, power cleans, core stabilization, and explosive short sprints. Gym work was designed for lateral agility, running between wickets, and maintaining cardiovascular output under heavy heat."
  },
  {
    title: "Recovery Systems",
    subtitle: "The Science of Rest",
    detail: "Rest is treated as a professional obligation rather than leisure. Utilizing compression therapy, ice baths, structural stretching, and maintaining rigid sleep cycles (8+ hours), Virat ensures that his muscles are repaired and ready to perform under maximum load tour after tour."
  },
  {
    title: "Professional Standards",
    subtitle: "No Compromise Baseline",
    detail: "He established an uncompromising standard of physical readiness. Fitness was no longer secondary—it became the primary foundation. He proved that high physical conditioning directly translates into mental resilience and decision-making clarity in high-pressure match situations."
  }
];

// Cultural impact blocks
const culturalImpacts = [
  {
    title: "Young Cricketers",
    desc: "An entire generation of young players entered academies knowing they had to be elite athletes first. Kohli dismantled the myth that skill alone was sufficient, inspiring millions of kids to hit the gym and treat their bodies with professional respect."
  },
  {
    title: "Indian Team Culture",
    desc: "He made the Yo-Yo test a mandatory selection benchmark. Fitness became a team culture because one player refused to compromise. Players who couldn't match the athletic speed and stamina were left behind, creating the most agile Indian fielding unit in history."
  },
  {
    title: "Modern Cricket Fitness",
    desc: "Reshaping the global landscape. Kohli's physical longevity and speed forced other nations to elevate their conditioning. He showed that athletic speed turns ones into twos, saves boundaries, and directly wins matches, redefining modern multi-format standards."
  }
];

export default function FitnessPage() {
  const [activeTopic, setActiveTopic] = useState<number>(0);

  return (
    <main className="relative min-h-screen theme-fitness text-white flex flex-col justify-between overflow-x-hidden select-none">
      <CinematicHeader />

      {/* Hero Header */}
      <div className="relative z-10 px-6 pt-32 pb-16 lg:px-16 max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow mb-3 border-emerald-500/30 bg-emerald-500/5 text-emerald-400">Athletic Revolution</span>
          <h1 className="font-display text-4xl md:text-7xl uppercase tracking-[0.1em] text-white leading-none">Fitness Evolution</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/60 mt-3 font-semibold font-mono">The transformation that changed Indian cricket forever</p>
          <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed font-body">
            Virat Kohli didn't just transform himself. He transformed expectations. This is the narrative of a cultural shift that raised the physical baseline of an entire nation's sport.
          </p>
          
        </div>
      </div>

      {/* SECTION 1: PHOTO SHOWCASE & STATS */}
      <section className="relative z-10 px-6 py-12 lg:px-16 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Images Presentation Panel (Photo Presentation System) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center items-center">
              <PremiumImage 
                src="/assets/fitness/photo1.jpg" 
                alt="Virat Kohli Horizontal Field Training" 
                className="w-full max-w-[320px] shadow-2xl"
              />
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono mt-3 text-center">
                Horizontal athletic extension & speed drills
              </span>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <PremiumImage 
                src="/assets/fitness/photo2.jpg" 
                alt="Virat Kohli Shredded Body Transformation" 
                className="w-full max-w-[320px] shadow-2xl"
              />
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono mt-3 text-center">
                Absolute core definition & physical maturity
              </span>
            </div>
          </div>

          {/* Animated Stats Counters */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 flex flex-col justify-center min-h-[140px] hover:border-emerald-500/20 transition-all duration-300">
              <span className="font-display text-3xl md:text-4xl text-emerald-400 font-bold block mb-1">
                <AnimatedCounter endValue={8} suffix="-10%" />
              </span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Body Fat Average</span>
            </div>
            
            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 flex flex-col justify-center min-h-[140px] hover:border-emerald-500/20 transition-all duration-300">
              <span className="font-display text-3xl md:text-4xl text-emerald-400 font-bold block mb-1">
                <AnimatedCounter endValue={17} suffix=".2+" />
              </span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Yo-Yo Test Score</span>
            </div>

            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 flex flex-col justify-center min-h-[140px] hover:border-emerald-500/20 transition-all duration-300">
              <span className="font-display text-3xl md:text-4xl text-emerald-400 font-bold block mb-1">
                <AnimatedCounter endValue={6} suffix=" Days" />
              </span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Weekly Training Schedule</span>
            </div>

            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 flex flex-col justify-center min-h-[140px] hover:border-emerald-500/20 transition-all duration-300">
              <span className="font-display text-3xl md:text-4xl text-emerald-400 font-bold block mb-1">
                <AnimatedCounter endValue={14} suffix=" Years" />
              </span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Continuous Peak Shape</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 6 TRANSFORMATION TOPICS */}
      <section className="relative z-10 px-6 py-16 lg:px-16 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="border-b border-white/10 pb-6 mb-12">
          
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-1">Transformation Chapters</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive selector */}
          <div className="lg:col-span-5 flex flex-col justify-start gap-3">
            {transformationTopics.map((topic, index) => (
              <button
                key={topic.title}
                onClick={() => setActiveTopic(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col ${
                  activeTopic === index
                    ? "bg-zinc-900 border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                    : "border-white/5 hover:bg-white/[0.02]"
                }`}
              >
                
                <span className="font-display text-base text-white uppercase tracking-wide">{topic.title}</span>
              </button>
            ))}
          </div>

          {/* Right: Technical Explanation Card */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-center shadow-inner relative overflow-hidden">

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-xs uppercase tracking-widest font-mono font-semibold text-emerald-400 block mb-1">
                    {transformationTopics[activeTopic].subtitle}
                  </span>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-6">
                    {transformationTopics[activeTopic].title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-body">
                    {transformationTopics[activeTopic].detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CULTURAL IMPACT */}
      <section className="relative z-10 px-6 py-20 lg:px-16 max-w-[1440px] mx-auto w-full border-t border-white/5">
        <div className="border-b border-white/10 pb-6 mb-12 text-center max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold font-mono">Cultural Shift</span>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-1">Cultural Legacies</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2 font-mono">Fitness became a culture because one player refused to compromise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {culturalImpacts.map((impact, idx) => (
            <div 
              key={impact.title}
              className="bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 rounded-2xl p-6 transition-all duration-300"
            >
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono font-bold block mb-2">Impact // 0{idx + 1}</span>
              <h4 className="font-display text-lg text-white uppercase tracking-wide mb-3">{impact.title}</h4>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed font-body">
                {impact.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ChapterNav />
    </main>
  );
}

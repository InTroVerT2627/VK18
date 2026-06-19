"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { 
  TrendingUp, Landmark, Shield, Sparkles, Award, 
  ArrowUpRight, DollarSign, BarChart2, Globe, Heart, 
  Activity, Circle, Zap, Dumbbell, Star
} from "lucide-react";

// Portfolio Data
const portfolio = [
  { 
    id: "godigit", 
    name: "Go Digit", 
    type: "FinTech & Insurance", 
    desc: "A pre-IPO investment that turned into a massive public listing. Virat backed the insurtech giant early, aligning with its mission to simplify insurance.", 
    logoText: "GD", 
    valuation: "₹30,000+ Cr IPO",
    highlight: "Early Backer"
  },
  { 
    id: "bluetribe", 
    name: "Blue Tribe", 
    type: "Sustainable Nutrition", 
    desc: "A conscious bet on plant-based meat substitutes. Along with Anushka, Virat backed Blue Tribe to promote cruelty-free, sustainable dietary alternatives.", 
    logoText: "BT", 
    valuation: "Eco-Conscious Future",
    highlight: "Co-Investor"
  },
  { 
    id: "ragecoffee", 
    name: "Rage Coffee", 
    type: "FMCG Coffee", 
    desc: "An investment in a high-octane functional food brand. Virat aligned with Rage's aggressive, innovative market approach to energy and nutrition.", 
    logoText: "RC", 
    valuation: "High-Growth FMCG",
    highlight: "Growth Investor"
  },
  { 
    id: "hyperice", 
    name: "Hyperice", 
    type: "Recovery Tech", 
    desc: "Investing alongside global icons like LeBron James and Patrick Mahomes, Virat joined Hyperice as an investor and ambassador to revolutionize athlete recovery.", 
    logoText: "HI", 
    valuation: "Global Tech Portfolio",
    highlight: "Strategic Partner"
  },
  { 
    id: "mpl", 
    name: "MPL", 
    type: "Gaming & Esports", 
    desc: "Early backing for one of India's biggest mobile gaming platforms, showcasing Virat's foresight in India's digital gaming boom.", 
    logoText: "MPL", 
    valuation: "Unicorn Status",
    highlight: "Series D Investor"
  },
  { 
    id: "duroflex", 
    name: "Duroflex", 
    type: "Sleep Wellness", 
    desc: "Backing mattress and sleep wellness leader Duroflex, reinforcing Virat's stance that proper recovery is as vital as active training.", 
    logoText: "DF", 
    valuation: "Premium Lifestyle",
    highlight: "Recovery Investor"
  },
  { 
    id: "wbl", 
    name: "World Bowling League", 
    type: "Global Sports League", 
    desc: "Acquiring a stake in the global professional bowling league, expanding Virat's franchise network beyond traditional cricket boundaries.", 
    logoText: "WBL", 
    valuation: "Global Franchise",
    highlight: "Founding Stakeholder"
  }
];

export default function GlobalIconPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>("godigit");
  const [currentBrand, setCurrentBrand] = useState<number>(0);

  // Scroll logic for premium indicators
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Brands rotation for brand wall
  const brandList = [
    { name: "Puma", quote: "Backed One8 independently after rejecting a ₹300Cr renewal deal.", category: "Athleisure" },
    { name: "MRF", quote: "The iconic red bat sticker that became a global symbol of batting excellence.", category: "Sports Gear" },
    { name: "Audi", quote: "The face of luxury German engineering in India for over a decade.", category: "Automotive" },
    { name: "Tissot", quote: "Precision, luxury, and timeless heritage on the wrist.", category: "Watches" },
    { name: "Manyavar", quote: "Shaping traditional cultural wear and setting wedding style benchmarks.", category: "Apparel" },
    { name: "Hero", quote: "Connecting with the masses, powering daily commutes of a nation.", category: "Two-Wheelers" },
    { name: "Boost", quote: "Joining the legends who defined childhood energy and nutrition.", category: "Beverage" },
    { name: "Philips", quote: "Representing grooming, styling, and premium lifestyle tech.", category: "Electronics" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBrand((prev) => (prev + 1) % brandList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen theme-global text-[#e2e8f0] flex flex-col justify-between overflow-x-hidden font-body selection:bg-[#D4AF37] selection:text-black"
    >
      <CinematicHeader />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#0A1424] z-50 origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* INTRO COVER BLOCK */}
      <div className="relative z-10 px-6 pt-32 pb-10 lg:px-16 max-w-[1440px] mx-auto w-full">
        <div className="border-t border-b border-[#D4AF37]/20 py-4 mb-16 flex justify-between items-center text-[10px] tracking-[0.3em] font-mono text-white/50 uppercase">
          <span>FORBES EDITORIAL</span>
          <span className="hidden md:inline">BEYOND CRICKET // THE BUSINESS SHOWCASE</span>
          <span>NETFLIX DOCUMENTARY EDITION</span>
        </div>
      </div>

      {/* SECTION 1: HERO / THE BUSINESS EMPIRE */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 lg:px-16 overflow-hidden pb-24">
        {/* Background Graphic */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#D4AF37] to-transparent rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#0A1424] to-transparent rounded-full filter blur-[180px]" />
        </div>

        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">

            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-8xl uppercase tracking-tight text-white leading-none font-extrabold"
            >
              VIRAT BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-white">
                CRICKET
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-white/70 font-light tracking-wide max-w-xl"
            >
              "From superstar athlete to business empire."
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8 border-t border-[#D4AF37]/20 flex flex-col md:flex-row gap-8"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-white/40 tracking-wider">Net Worth / Valuation</span>
                <div className="text-4xl md:text-5xl font-display font-extrabold text-[#D4AF37] tracking-tight">
                  ₹1000+ CRORE
                </div>
                <p className="text-xs text-white/50">India's most valuable athlete commercial empire.</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-white/40 tracking-wider">Brand Influence</span>
                <div className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
                  380M+
                </div>
                <p className="text-xs text-white/50">Global combined digital audience footprint.</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[420px] aspect-[736/442] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <img 
                src="/assets/global-superstar/media__1780669193290.jpg" 
                alt="Virat Kohli in Suit" 
                className="w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/60 px-2.5 py-1 rounded-full border border-[#D4AF37]/20 backdrop-blur-sm inline-block">
                  Executive Suite
                </span>
                <h3 className="text-lg font-display uppercase tracking-wider text-white font-bold">The Athlete-CEO</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ONE8 */}
      <section className="relative py-32 bg-transparent border-y border-[#D4AF37]/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full filter blur-[120px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="w-32 py-2 border-b border-[#D4AF37]/30">
                  <img 
                    src="/assets/global-superstar/media__1780669193289.jpg" 
                    alt="one8 Logo" 
                    className="w-full h-auto brightness-200 contrast-125"
                  />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase block">
                  FLAGSHIP INDEPENDENT BRAND
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
                  FROM ENDORSING BRANDS<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                    TO BUILDING ONE
                  </span>
                </h2>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/70 text-sm md:text-base leading-relaxed font-light"
              >
                In April 2025, Virat Kohli made a defining business maneuver. He rejected a massive, secure ₹300 crore renewal offer from global giant Puma. Instead, he chose to invest in athletic tech startup Agilitas and back his brand, <strong>one8</strong>, entirely independently. This marked his transition from a traditional paid brand ambassador to a true equity builder and brand proprietor.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-6 pt-6 border-t border-[#D4AF37]/10"
              >
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider">One8 Commune</h4>
                  <p className="text-xs text-white/50 mt-1">Premium culinary restobar spaces globally including Kolkata, Delhi, Pune, and Mumbai.</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider">One8 Footwear & Wear</h4>
                  <p className="text-xs text-white/50 mt-1">High-end athleisure lifestyle fashion and sports gear built for youth energy.</p>
                </div>
              </motion.div>
            </div>

            {/* Right Media Grid (Images of Commune) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-[682/1024] md:aspect-[3/4]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                <img 
                  src="/assets/global-superstar/media__1780669193242.jpg" 
                  alt="One8 Commune Interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase">Vibe & Style</span>
                  <h4 className="text-md font-display uppercase tracking-wider text-white font-bold">COMMUNE INTERIOR</h4>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-[682/1024] md:aspect-[3/4] md:translate-y-10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                <img 
                  src="/assets/global-superstar/media__1780669163781.jpg" 
                  alt="One8 Food Spread" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase">Gastronomy</span>
                  <h4 className="text-md font-display uppercase tracking-wider text-white font-bold">COMMUNE EXPERIENCE</h4>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: THE FASHION ICON */}
      <section className="relative py-32 bg-transparent overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold font-mono">
              YOUTH CULTURE DEFINE
            </span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mt-3 mb-6 font-extrabold">
              THE FASHION ICON
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Layout left text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-mono font-bold block">
                // WROGN CO-OWNED SPREAD
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wider font-extrabold">
                BREAKING CONVENTIONS
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                Co-owned by Virat Kohli, <strong>WROGN</strong> is a youth-focused brand designed for those who reject the status quo. Offering eclectic, eccentric styles, it captured the attention of Indian millennials by breaking traditional fashion guidelines. From bold graphic tees to statement plaid jackets, Wrogn represents Virat's rebellious yet structured street style.
              </p>
              <div className="border-l-2 border-[#D4AF37] pl-4 py-2 italic text-white/50 text-xs">
                "Wrogn is not about following rules. It is about believing in your own vision, even when it looks wrong to others."
              </div>
            </div>

            {/* Asymmetric magazine photo layout */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-950 p-4 flex flex-col justify-between shadow-2xl"
              >
                <div className="aspect-[736/920] rounded-lg overflow-hidden mb-4">
                  <img 
                    src="/assets/global-superstar/media__1780669163771.jpg" 
                    alt="Wrogn Maroon Style" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center text-left">
                  <div>
                    <h4 className="text-sm font-display font-bold uppercase tracking-wider text-white">Maroon Collection</h4>
                    <span className="text-[10px] text-white/40 font-mono">Urban Lifestyle</span>
                  </div>
                  <span className="text-xs text-[#D4AF37] font-bold">WROGN</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-950 p-4 flex flex-col justify-between shadow-2xl md:translate-y-8"
              >
                <div className="aspect-[720/900] rounded-lg overflow-hidden mb-4">
                  <img 
                    src="/assets/global-superstar/media__1780669163837.jpg" 
                    alt="Wrogn Plaid Jacket Style" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center text-left">
                  <div>
                    <h4 className="text-sm font-display font-bold uppercase tracking-wider text-white">Classic Plaid</h4>
                    <span className="text-[10px] text-white/40 font-mono">Statement Outerwear</span>
                  </div>
                  <span className="text-xs text-[#D4AF37] font-bold">WROGN</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE FITNESS REVOLUTIONARY */}
      <section className="relative py-32 bg-transparent text-white border-y border-[#D4AF37]/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full filter blur-[150px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold font-mono flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#D4AF37]" /> ATHLETIC RECONSTRUCTION
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase text-white leading-none tracking-tight">
                HE DIDN'T JUST <br />
                TRANSFORM HIMSELF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-white">
                  HE TRANSFORMED A GENERATION
                </span>
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                Before Virat Kohli, fitness in cricket was considered secondary to skill. By pioneering high-intensity weight lifting, rigid body fat control, and making the Yo-Yo test non-negotiable for selection, he created a brand new standard. Through <strong>Chisel Fitness</strong>, his fitness center startup, he commercialized functional training, changing how the youth values active living.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6 text-left">
                <div className="border-l border-[#D4AF37]/30 pl-4">
                  <span className="block text-2xl font-display font-extrabold text-[#D4AF37]">8-10%</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Body Fat Range</span>
                </div>
                <div className="border-l border-[#D4AF37]/30 pl-4">
                  <span className="block text-2xl font-display font-extrabold text-white">Yo-Yo</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Mandatory Index</span>
                </div>
                <div className="border-l border-[#D4AF37]/30 pl-4">
                  <span className="block text-2xl font-display font-extrabold text-white">Vegan</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Diet Base</span>
                </div>
              </div>
            </div>

            {/* Workout visualization collage */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 p-6 flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4">
                  <Activity className="w-8 h-8 text-[#D4AF37] animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">CHISEL FITNESS INC</span>
                  <h3 className="text-xl font-display font-extrabold text-white uppercase mt-1">THE TRAINING ETHIC</h3>
                </div>
                <div className="space-y-4 my-6">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60">Conditioning Centers</span>
                    <span className="text-[#D4AF37] font-mono">PAN-INDIA</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60">Training Ethos</span>
                    <span className="text-[#D4AF37] font-mono">FUNCTIONAL REPAIR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60">Youth Influence</span>
                    <span className="text-[#D4AF37] font-mono">ATHLETIC REDESIGN</span>
                  </div>
                </div>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-3 text-left">
                  <p className="text-[11px] text-[#F3E5AB] leading-relaxed">
                    "I wanted players to be feared in the final hour of a Test match. That only happens when physical stamina is locked into place."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: THE INVESTOR */}
      <section className="relative py-32 bg-transparent overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold font-mono">
              VENTURE VENTURES & PORTFOLIO
            </span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mt-3 mb-6 font-extrabold">
              THE INVESTOR
            </h2>
            <p className="text-white/60 max-w-xl text-xs md:text-sm">
              An interactive look at the futuristic investment network created by Virat Kohli. Click on any node to view details of the portfolio companies.
            </p>
          </div>

          {/* Interactive Network Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Graph Visual Panel */}
            <div className="lg:col-span-7 bg-[#050b14] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-12 min-h-[480px] flex flex-col justify-center items-center relative overflow-hidden">
              
              {/* SVG Network Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Center Node coordinates in SVG percents */}
                {/* 50% 50% */}
                {/* Line to GoDigit (15% 20%) */}
                <line x1="50%" y1="50%" x2="18%" y2="22%" stroke={activeNode === "godigit" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "godigit" ? "2" : "1"} />
                {/* Line to BlueTribe (15% 50%) */}
                <line x1="50%" y1="50%" x2="18%" y2="50%" stroke={activeNode === "bluetribe" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "bluetribe" ? "2" : "1"} />
                {/* Line to Rage Coffee (20% 80%) */}
                <line x1="50%" y1="50%" x2="22%" y2="78%" stroke={activeNode === "ragecoffee" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "ragecoffee" ? "2" : "1"} />
                {/* Line to Hyperice (85% 20%) */}
                <line x1="50%" y1="50%" x2="82%" y2="22%" stroke={activeNode === "hyperice" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "hyperice" ? "2" : "1"} />
                {/* Line to MPL (85% 50%) */}
                <line x1="50%" y1="50%" x2="82%" y2="50%" stroke={activeNode === "mpl" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "mpl" ? "2" : "1"} />
                {/* Line to Duroflex (80% 80%) */}
                <line x1="50%" y1="50%" x2="78%" y2="78%" stroke={activeNode === "duroflex" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "duroflex" ? "2" : "1"} />
                {/* Line to WBL (50% 85%) */}
                <line x1="50%" y1="50%" x2="50%" y2="85%" stroke={activeNode === "wbl" ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"} strokeWidth={activeNode === "wbl" ? "2" : "1"} />
              </svg>

              {/* CENTRAL NODE */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] p-0.5 shadow-2xl flex justify-center items-center select-none">
                <div className="w-full h-full rounded-full bg-black flex flex-col justify-center items-center">
                  <Star className="w-5 h-5 text-[#D4AF37] animate-spin" style={{ animationDuration: "12s" }} />
                  <span className="text-[10px] font-mono text-white tracking-widest mt-1 uppercase font-bold">KOHLI</span>
                  <span className="text-[8px] text-[#D4AF37]/70 font-mono">PORTFOLIO</span>
                </div>
              </div>

              {/* NODE 1: Go Digit (Top Left) */}
              <button 
                onClick={() => setActiveNode("godigit")}
                className={`absolute left-[10%] top-[14%] md:left-[14%] md:top-[18%] z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "godigit" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">GD</div>
              </button>

              {/* NODE 2: Blue Tribe (Middle Left) */}
              <button 
                onClick={() => setActiveNode("bluetribe")}
                className={`absolute left-[8%] top-[45%] md:left-[12%] md:top-[46%] z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "bluetribe" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">BT</div>
              </button>

              {/* NODE 3: Rage Coffee (Bottom Left) */}
              <button 
                onClick={() => setActiveNode("ragecoffee")}
                className={`absolute left-[12%] bottom-[12%] md:left-[18%] md:bottom-[16%] z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "ragecoffee" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">RC</div>
              </button>

              {/* NODE 4: Hyperice (Top Right) */}
              <button 
                onClick={() => setActiveNode("hyperice")}
                className={`absolute right-[10%] top-[14%] md:right-[14%] md:top-[18%] z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "hyperice" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">HI</div>
              </button>

              {/* NODE 5: MPL (Middle Right) */}
              <button 
                onClick={() => setActiveNode("mpl")}
                className={`absolute right-[8%] top-[45%] md:right-[12%] md:top-[46%] z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "mpl" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">MPL</div>
              </button>

              {/* NODE 6: Duroflex (Bottom Right) */}
              <button 
                onClick={() => setActiveNode("duroflex")}
                className={`absolute right-[12%] bottom-[12%] md:right-[18%] md:bottom-[16%] z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "duroflex" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">DF</div>
              </button>

              {/* NODE 7: WBL (Bottom Center) */}
              <button 
                onClick={() => setActiveNode("wbl")}
                className={`absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10 p-2 md:p-3 rounded-full border transition-all duration-300 ${
                  activeNode === "wbl" 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-110" 
                    : "bg-black/80 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-display font-black text-xs">WBL</div>
              </button>

            </div>

            {/* Graph Detail Panel */}
            <div className="lg:col-span-5 text-left h-full flex flex-col justify-between">
              <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl relative min-h-[360px] flex flex-col justify-between">
                
                {/* Node details */}
                {portfolio.map((node) => {
                  if (node.id !== activeNode) return null;
                  return (
                    <div key={node.id} className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                            {node.highlight}
                          </span>
                          <h3 className="text-3xl font-display uppercase tracking-wider text-white font-extrabold mt-2">
                            {node.name}
                          </h3>
                          <span className="text-xs text-white/50">{node.type}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-white/10 flex items-center justify-center font-display font-black text-black text-md">
                          {node.logoText}
                        </div>
                      </div>

                      <p className="text-white/80 text-sm leading-relaxed font-light">
                        {node.desc}
                      </p>

                      <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                        <span className="text-white/40 uppercase tracking-wider font-mono">Current Status</span>
                        <span className="text-white font-bold">{node.valuation}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Footnote instruction */}
                <div className="text-[10px] text-white/30 border-t border-white/5 pt-4 font-mono flex items-center gap-1.5 mt-8">
                  <Circle className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>Interactive Node Selected: {activeNode.toUpperCase()}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: THE SPORTS OWNER */}
      <section className="relative py-32 bg-transparent border-y border-[#D4AF37]/10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Owner Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[420px] aspect-[735/660] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                <img 
                  src="/assets/global-superstar/media__1780669163767.jpg" 
                  alt="FC Goa Owner Virat Kohli" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/60 px-2 py-0.5 rounded-full border border-[#D4AF37]/20 inline-block">
                    Indian Super League
                  </span>
                  <h3 className="text-md font-display uppercase tracking-wider text-white font-bold">FC GOA FRANCHISE</h3>
                </div>
              </motion.div>
            </div>

            {/* Owner details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold font-mono">
                SPORT EMPIRE EXPANSION
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
                BUILDING THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                  FUTURE OF SPORT
                </span>
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                Virat's sporting investment portfolio goes deep. Beyond playing, he owns stakes in <strong>FC Goa</strong> in the Indian Super League (ISL), backing football development in India from the grass roots. Furthermore, he joined the UIM E1 World Electric Powerboat Series as the team owner of <strong>Team Blue Rising</strong>, indicating his focus on future-ready, eco-friendly competitive sports leagues.
              </p>
              
              <div className="border-t border-[#D4AF37]/20 pt-6 grid grid-cols-2 gap-6 text-xs text-white/50">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">E1 WORLD SERIES</h4>
                  <p>Co-owning Team Blue Rising alongside international conglomerates, leading green yachting competition.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">FOOTBALL & MORE</h4>
                  <p>Stakes in Pro Wrestling League and Tennis Premier League, backing multi-sport ecosystems.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: THE PHILANTHROPIST */}
      <section className="relative py-32 bg-transparent overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Philanthropy Details */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold font-mono flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D4AF37]" /> PURPOSE-DRIVEN LEGACY
              </span>
              
              <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
                SUCCESS MEANS <br />
                NOTHING IF IT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-white">
                  ISN'T SHARED
                </span>
              </h2>

              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                True empire is defined by what you give back. Through the <strong>SeVVA Foundation</strong> (amalgamating Virat and Anushka's philanthropic visions) and the <strong>Athlete Development Programme (ADP)</strong>, Virat Kohli is investing heavily in the future. The ADP provides financial support, elite training, and recovery gear to promising young athletes from underprivileged backgrounds, while his community foundations focus on children welfare, healthcare access, and animal welfare.
              </p>

              <div className="border-l-4 border-[#D4AF37] pl-6 py-2 italic text-white/60 text-sm">
                "We must nurture the next generation. Not just cricketers, but young kids who want to represent the country in any track, field, or court."
              </div>

              <div className="flex gap-8 pt-4">
                <div className="text-left">
                  <span className="block text-3xl font-display font-extrabold text-[#D4AF37]">ADP</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Athlete Support</span>
                </div>
                <div className="text-left">
                  <span className="block text-3xl font-display font-extrabold text-white">SeVVA</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Philanthropic Union</span>
                </div>
              </div>
            </div>

            {/* Philanthropy Media */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[420px] aspect-[678/1024] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-10" />
                <img 
                  src="/assets/global-superstar/media__1780669163764.jpg" 
                  alt="Virat Kohli Philanthropic Event" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">Community Foundation</span>
                  <h3 className="text-md font-display uppercase tracking-wider text-white font-bold">GIVING BACK</h3>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: THE POWER COUPLE IMPACT */}
      <section className="relative py-32 bg-transparent border-y border-[#D4AF37]/10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Couple Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[420px] aspect-[736/920] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                <img 
                  src="/assets/global-superstar/media__1780669193295.jpg" 
                  alt="Virat & Anushka" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/60 px-2 py-0.5 rounded-full border border-white/10 inline-block">
                    Cultural Synergy
                  </span>
                  <h3 className="text-md font-display uppercase tracking-wider text-white font-bold">VIRAT + ANUSHKA</h3>
                </div>
              </motion.div>
            </div>

            {/* Couple narrative */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold font-mono">
                VIRUSHKA BRAND RESIDENCY
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
                THE POWER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                  COUPLE IMPACT
                </span>
              </h2>
              
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                As a unit, Virat Kohli and Anushka Sharma represent a unique paradigm of branding and culture. Their shared commitment to ethical living, animal protection, and health has translated into cohesive joint investments like Blue Tribe. Together, they command a combined brand equity that stands as one of the most powerful, purpose-driven commercial forces in the region, bridging cinema, sport, lifestyle, and philanthropy.
              </p>

              <div className="border-t border-[#D4AF37]/20 pt-6 space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5" />
                  <p className="text-xs text-white/50"><strong className="text-white">Shared Foundations:</strong> Unified family assets under SeVVA to drive structured social improvement programs.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5" />
                  <p className="text-xs text-white/50"><strong className="text-white">Cultural Footprint:</strong> Grounded lifestyle representation, balancing public glare with private sanity.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: THE BRAND KING */}
      <section className="relative py-32 bg-transparent overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold font-mono">
              COMMERCIAL AMBASSADORS
            </span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mt-3 mb-6 font-extrabold">
              THE BRAND KING
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive/Animated logo ticker */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-mono font-bold block">
                // ANCHORING GLOBAL GIANTS
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wider font-extrabold leading-tight">
                INDIA'S MOST MARKETABLE ATHLETE
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                Charging premium rates of ₹7.5–10 Crore per endorsement, Virat Kohli's portfolio spans 40+ brands. He remains the most-endorsed figure in India, representing blue-chip multinationals and legacy firms. His alignment goes beyond simple commercials; he shapes marketing narratives, lifestyle choices, and consumer belief systems.
              </p>

              {/* Active Brand Details Card */}
              <div className="bg-[#050b14] border border-[#D4AF37]/20 rounded-2xl p-6 relative overflow-hidden">
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                  Active Brand Spotlight
                </span>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentBrand}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <h4 className="text-2xl font-display uppercase tracking-wider text-white font-extrabold">
                      {brandList[currentBrand].name}
                    </h4>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono block">
                      Category: {brandList[currentBrand].category}
                    </span>
                    <p className="text-xs text-white/70 leading-relaxed italic mt-2">
                      "{brandList[currentBrand].quote}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Brand Logo Grid Wall */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandList.map((brand, idx) => (
                <button 
                  key={brand.name}
                  onClick={() => setCurrentBrand(idx)}
                  className={`border rounded-xl p-6 flex flex-col justify-center items-center h-28 text-center transition-all ${
                    currentBrand === idx 
                      ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white" 
                      : "bg-[#050b14]/50 border-white/5 text-white/40 hover:border-white/20"
                  }`}
                >
                  <span className="font-display text-lg tracking-widest uppercase font-extrabold">
                    {brand.name}
                  </span>
                  <span className="text-[8px] tracking-wider font-mono opacity-60 mt-1 uppercase">
                    {brand.category}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FINAL SECTION: THE EMPIRE CONVERGENCE */}
      <section className="relative min-h-screen bg-transparent flex flex-col justify-center items-center px-6 py-24 overflow-hidden border-t border-[#D4AF37]/10">
        
        {/* Convergence background sparks */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-[1000px] w-full text-center relative z-10 space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-semibold font-mono block">
              THE CONVERGENCE
            </span>
            <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tight text-white font-extrabold leading-none">
              ATHLETE. OWNER.<br />
              INVESTOR. ICON.
            </h2>
          </div>

          {/* Scrolling Convergence Marquee/Row */}
          <div className="border-y border-white/10 py-6 max-w-2xl mx-auto overflow-hidden">
            <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 text-xs font-mono tracking-widest uppercase text-white/50">
              <span>one8 commune</span>
              <span className="text-[#D4AF37]">•</span>
              <span>wrogn fashion</span>
              <span className="text-[#D4AF37]">•</span>
              <span>chisel fitness</span>
              <span className="text-[#D4AF37]">•</span>
              <span>go digit</span>
              <span className="text-[#D4AF37]">•</span>
              <span>fc goa</span>
              <span className="text-[#D4AF37]">•</span>
              <span>sevva philanthropy</span>
              <span className="text-[#D4AF37]">•</span>
              <span>blue rising e1</span>
            </div>
          </div>

          <div className="space-y-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-display font-light uppercase tracking-[0.2em] text-[#F3E5AB]"
            >
              HE STARTED AS A CRICKETER.
            </motion.h3>

            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-display font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F3E5AB] to-[#D4AF37]"
            >
              HE BECAME AN EMPIRE.
            </motion.h2>
          </div>

          {/* Final Credits Frame */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-16 border-t border-[#D4AF37]/20 max-w-md mx-auto grid grid-cols-2 gap-y-6 text-left"
          >
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">Principal Subject</span>
              <span className="text-sm font-display uppercase font-bold text-white tracking-widest">VIRAT KOHLI</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">Valuation Baseline</span>
              <span className="text-sm font-display uppercase font-bold text-[#D4AF37] tracking-widest">₹1000+ CRORE</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">Commercial Brands</span>
              <span className="text-sm font-display uppercase font-bold text-white tracking-widest">40+ PARTNERS</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">Primary Ventures</span>
              <span className="text-sm font-display uppercase font-bold text-[#D4AF37] tracking-widest">ONE8 & WROGN</span>
            </div>
          </motion.div>

        </div>
      </section>

      <ChapterNav />
    </main>
  );
}

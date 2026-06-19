"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { testExperience } from "@/lib/kohli-data";
import { OfficialMediaFrame } from "@/components/media/official-media-frame";
import { getFormatStats } from "@/services/stats";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Award, Trophy, Star, Quote, Heart, Crown, Medal } from "lucide-react";

const galleryPhotos = [
  {
    src: "/assets/test/photo1.jpg",
    title: "The Examination",
    subtitle: "Ultimate character test",
    desc: "Standing tall in pristine whites, contemplating the ultimate five-day battle of patience and character."
  },
  {
    src: "/assets/test/photo2.jpg",
    title: "The Roar",
    subtitle: "Edgbaston Resilience",
    desc: "Celebrating a hard-fought century in English swing conditions, establishing absolute red-ball dominance."
  },
  {
    src: "/assets/test/photo3.jpg",
    title: "The Conquest",
    subtitle: "Border-Gavaskar Trophy",
    desc: "Kissing the trophy after leading India to a historic, first-ever Test series victory in Australia."
  },
  {
    src: "/assets/test/photo4.jpg",
    title: "The Command",
    subtitle: "Aggressive Captaincy",
    desc: "Unleashing the fast bowling unit that would command world cricket and retain the ICC mace for five years."
  },
  {
    src: "/assets/test/photo5.jpg",
    title: "The Return",
    subtitle: "Century in Whites",
    desc: "Virat Kohli raising his bat and helmet in Test whites, celebrating a historic Test century in front of a roaring stadium crowd."
  }
];

export default function TestCricketPage() {
  const test = getFormatStats("Test");
  const [hoveredGalleryIndex, setHoveredGalleryIndex] = useState<number | null>(null);
  
  const metrics = [
    { label: "Test Runs", value: test.runs.toLocaleString("en-IN") },
    { label: "Hundreds", value: `${test.hundreds}` },
    { label: "Average", value: `${test.average}` },
    { label: "Double Hundreds", value: `${test.doubleHundreds}` },
    { label: "Home Runs", value: test.homeAwayRuns.home.toLocaleString("en-IN") },
    { label: "Away Runs", value: test.homeAwayRuns.away.toLocaleString("en-IN") }
  ];

  // Colors mapping: Red Ball Cherry Red, WTC Deep Blue, Silver, Slate, Light Gray
  const colors = ["#991b1b", "#1e3a8a", "#475569", "#64748b", "#94a3b8"];

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between overflow-x-hidden selection:bg-red-800/10 selection:text-red-900">
      
      {/* Dark overlay for Header container to guarantee readability */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-40 pointer-events-none" />
      <div className="relative z-50">
        <CinematicHeader />
      </div>

      {/* PHOTO 1: Hero Full-Screen (100vh) Background with Dark Overlay */}
      <div className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/test/photo1.jpg"
            alt="Virat Kohli Test Hero"
            className="h-full w-full object-cover scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-950/80" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          
          <h1 className="font-display text-5xl md:text-8xl text-white uppercase tracking-[0.08em] leading-none mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Test Cricket
          </h1>
          <p className="font-display text-lg md:text-2xl text-yellow-400 uppercase tracking-[0.24em] font-bold leading-snug max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            THE ULTIMATE EXAMINATION OF CHARACTER
          </p>
          
        </div>

        {/* Cinematic scroll down cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">Scroll to Enter</span>
          <div className="h-8 w-[1.5px] bg-gradient-to-b from-red-600 to-transparent animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 px-6 py-20 lg:px-16 max-w-[1440px] mx-auto w-full space-y-24">
        
        {/* Core Stats Overview with Red Ball Accents */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="stat-card border-slate-200 bg-white/70 hover:bg-white hover:border-red-500/40 hover:shadow-[0_12px_30px_rgba(153,27,27,0.06)] transition-all duration-300 group"
            >
              <span className="stat-value text-slate-900 flex items-baseline justify-center gap-0.5">
                {metric.value}
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
              </span>
              <span className="stat-label text-slate-500 font-semibold">{metric.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Charts & Overseas Dominance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Recharts BarChart with Silver/Cherry Red coloring */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-white/70 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <h3 className="font-display text-2xl uppercase tracking-wider text-slate-900">Country-Wise Runs</h3>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={test.countryRuns} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="team" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", fontFamily: "var(--font-inter)", fontSize: "11px" }}
                    itemStyle={{ color: "#991b1b" }}
                  />
                  <Bar dataKey="runs" radius={[4, 4, 0, 0]}>
                    {test.countryRuns.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overseas Authority Panel */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-white/50 border border-slate-200 rounded-2xl p-6 md:p-8">
            <span className="text-red-600 font-display text-xs uppercase tracking-widest font-semibold block mb-1">Lord's & WTC Atmosphere</span>
            <h2 className="font-display text-3xl uppercase tracking-wider text-slate-900 mb-4">Overseas Authority</h2>
            <p className="text-slate-600 leading-relaxed font-body text-sm mb-6">
              Kohli's legacy was built on testing grounds like Adelaide, Centurion, and Birmingham. Under his captaincy, India valued winning overseas above all else.
            </p>
            <div className="space-y-3 mb-6">
              {testExperience.overseas.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{item.country}</span>
                  <span className="text-xs text-slate-500 font-medium">{item.venue}</span>
                  <span className="font-display text-base text-red-800 font-bold">{item.centuries} Tons (Best: {item.bestScore})</span>
                </div>
              ))}
            </div>

            {/* CONQUERING AUSTRALIA Section */}
            <div className="mt-6 border-t border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 items-center bg-white/40 p-4 rounded-xl">
              <div className="w-20 h-28 rounded-lg overflow-hidden border border-slate-200 bg-zinc-950 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/trophies/border_gavaskar_2018.jpg" alt="Border-Gavaskar Trophy" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-red-700 font-display text-[10px] uppercase tracking-widest font-bold block mb-1">Conquering Australia</span>
                <h4 className="font-display text-lg text-slate-900 uppercase font-bold tracking-wide">Historic Border-Gavaskar Victory</h4>
                <p className="text-xs text-slate-600 mt-1 font-body leading-relaxed">
                  Leading India to their first-ever Test series triumph down under (2-1 victory in 2018-19). A monumental milestone of overseas resilience and tactical superiority.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO 4: Test Mastery Section (Movie Poster Style - Rebuilt for Mace Integration) */}
        <div className="relative min-h-[75vh] rounded-3xl overflow-hidden border border-white/10 group flex flex-col md:flex-row items-stretch shadow-2xl bg-zinc-950 text-white">
          <div className="md:w-[65%] w-full h-[40vh] md:h-auto relative overflow-hidden z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/test/photo4.jpg"
              alt="Test Mastery - Aggressive Leadership"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          {/* KING OF THE LONG FORMAT (Test Mace) Section */}
          <div className="md:w-[35%] w-full bg-zinc-950 p-6 md:p-8 flex flex-col justify-between z-10 border-t md:border-t-0 md:border-l border-white/10">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.38em] text-red-500 font-bold block mb-1">King of the Long Format</span>
                <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider font-extrabold leading-tight">
                  ICC Test Mace Dominance
                </h3>
                <p className="text-xs text-white/60 font-body leading-relaxed mt-2">
                  Virat Kohli revolutionized red-ball cricket in India. Prioritizing pace, hostile bowling, and elite fitness standards, India retained the No.1 ICC Test ranking for 5 consecutive years.
                </p>
              </div>
              
              <div className="flex gap-4 items-center bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <div className="w-14 h-24 rounded-lg overflow-hidden border border-white/10 bg-zinc-950 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/trophies/test_mace_2018.jpg" alt="ICC Test Mace" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-yellow-400 font-display text-[9px] uppercase tracking-widest font-bold block">ICC Trophy Cabinet</span>
                  <span className="font-display text-sm text-white font-bold block mt-0.5">Test Championship Mace</span>
                  <p className="text-[10px] text-white/50 leading-relaxed font-body mt-0.5">42 Months at the absolute summit of red-ball cricket.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 text-[9px] uppercase tracking-[0.25em] text-white/40">
              Aggressive Captaincy Era (2016 - 2021)
            </div>
          </div>
        </div>

        {/* Greatest Test Innings (Monuments) */}
        <div className="bg-white/50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <h3 className="font-display text-2xl uppercase tracking-wider text-slate-900">Iconic Test Monuments</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testExperience.innings.map((inn, i) => {
              const splitChar = inn.includes(" — ") ? " — " : inn.includes(" â€” ") ? " â€” " : " - ";
              const parts = inn.split(splitChar);
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-red-500/30 hover:shadow-md transition-all duration-300 flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-600 mt-2 flex-shrink-0 animate-pulse" />
                  <div>
                    <h4 className="font-display text-base text-slate-800 uppercase tracking-wide leading-tight">{parts[0]}</h4>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mt-1">{parts[1] || "Test Match"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* THE INTERACTIVE TEST GALLERY (Exhibition Showcase of All 5 Photos) */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden my-24 py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-white/10 text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-12">
              <span className="eyebrow border-red-500/40 bg-red-500/10 text-red-400 mb-3">Interactive Exhibition</span>
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider">Test Cricket Galleries</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-medium">Five Authentic Chronicles of the Red Ball Era</p>
            </div>

            {/* Flex Accordion Container */}
            <div className="hidden lg:flex lg:flex-row h-[75vh] w-full gap-4 mt-8 rounded-3xl overflow-hidden">
              {galleryPhotos.map((photo, index) => {
                const isHovered = hoveredGalleryIndex === index;
                const isNoneHovered = hoveredGalleryIndex === null;
                
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredGalleryIndex(index)}
                    onMouseLeave={() => setHoveredGalleryIndex(null)}
                    className={`relative h-full transition-all duration-700 ease-out cursor-pointer overflow-hidden border border-white/5 group ${
                      isHovered 
                        ? "flex-[3.5] lg:flex-[3.5]" 
                        : !isNoneHovered 
                          ? "flex-[0.5] lg:flex-[0.5] opacity-40" 
                          : "flex-[1] lg:flex-[1]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className={`absolute inset-0 bg-red-900/10 mix-blend-color-burn transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">

                      <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider leading-none mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-yellow-400 font-medium mb-3">
                        {photo.subtitle}
                      </p>
                      
                      {/* Description reveal with smooth transition */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isHovered ? "max-h-[150px] opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform translate-y-4"
                      }`}>
                        <p className="text-xs md:text-sm text-white/70 leading-relaxed font-body max-w-md">
                          {photo.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipeable Gallery */}
            <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 timeline-strip w-full mt-8">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative snap-center shrink-0 w-[85%] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col justify-end p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                  <div className="relative z-10 text-left">

                    <h3 className="font-display text-xl text-white uppercase tracking-wider leading-none mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-yellow-400 font-medium mb-2">
                      {photo.subtitle}
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed font-body">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHOTO 5: Test Legacy Section (Large Emotional Conclusion) */}
        <div className="relative min-h-[60vh] rounded-3xl overflow-hidden border border-white/10 group flex items-center p-8 md:p-16 shadow-2xl">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/test/photo5.jpg"
              alt="Test Legacy - Redefining Greatness"
              className="h-full w-full object-cover object-[center_15%] transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/65 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <div className="relative z-10 max-w-xl text-left">
            <span className="text-[10px] uppercase tracking-[0.38em] text-red-500 font-bold block mb-2">The Legacy Endures</span>
            <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-wider leading-none mb-4">
              Test Cricket Legacy
            </h2>
            <p className="text-white/80 leading-relaxed font-body text-xs md:text-sm mb-6">
              Virat Kohli took over a transitioning Test side and built a fast-bowling force that conquered Australia twice, stood tall in England, and held the ICC Test Championship mace for 5 consecutive years. His emotional connection to the red ball redefined Indian cricket forever.
            </p>
            <div className="inline-block border border-yellow-400/30 bg-yellow-400/5 rounded-full px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-yellow-400 font-bold">
              Sir Garfield Sobers Awardee
            </div>
          </div>
        </div>

      </div>

      {/* FAREWELL EPILOGUE: THE UNFINISHED 10,000 */}
      <section className="relative z-10 bg-gradient-to-b from-slate-50 via-white to-blue-50/20 border-t border-slate-200 py-24 px-6 lg:px-16 w-full">
        <div className="max-w-[1440px] mx-auto">
          {/* Eyebrow and Headline */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              <Award className="w-3.5 h-3.5" />
              The Farewell Test Cricket Never Deserved
            </span>
            <h2 className="font-display text-4xl md:text-7xl text-slate-900 uppercase tracking-wider leading-none mb-3">
              The Unfinished 10,000
            </h2>
            <p className="font-display text-lg md:text-xl text-slate-500 uppercase tracking-widest font-medium">
              The 770 Runs That Never Came
            </p>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-6 rounded-full" />
          </div>

          {/* Storytelling Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start max-w-4xl mx-auto">
            <div className="space-y-6 text-slate-600 font-body text-base leading-relaxed">
              <p>
                In the golden pages of Test cricket history, milestones often define the player. The figure of 10,000 runs stands as the ultimate benchmark of longevity, patience, and absolute class. When Virat Kohli walked away from the longest format, he finished with <strong className="text-slate-900 font-semibold">9,230 runs</strong>—leaving him just <strong className="text-blue-600 font-semibold">770 runs short</strong> of that historic five-figure milestone.
              </p>
              <p>
                To many, crossing that line was a foregone conclusion. A couple of typical Test seasons would have easily seen him breeze past the mark, cementing his name in that exclusive club. Yet, in typical Kohli fashion, he chose not to wait. He chose to walk away entirely on his own terms, refusing to let his career be dictated by statistical benchmarks.
              </p>
            </div>
            <div className="space-y-6 text-slate-600 font-body text-base leading-relaxed">
              <p>
                For Virat Kohli, Test cricket was never about the pursuit of personal landmarks. It was a sacred arena. It was the purest form of battle, a format where every run had to be earned with sweat, grit, and steel. The focus was never on the destination of 10k; it was on the grueling journey itself.
              </p>
              <p className="italic text-slate-500 border-l-2 border-blue-500 pl-4 py-2">
                "Some players chase records. Some players become the standard. Kohli chose the latter, leaving behind a legacy where the numbers tell only half the story."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEST CRICKET & VIRAT: THE CULTURE AND THE LEGACY */}
      <section className="relative z-10 bg-white border-t border-slate-100 py-24 px-6 lg:px-16 w-full">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* The Pillars of Test Cricket & Virat */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-blue-600 font-bold block mb-1">
                  The White Clothing & The Red Ball
                </span>
                <h3 className="font-display text-3xl md:text-5xl text-slate-900 uppercase tracking-wider font-extrabold leading-tight">
                  A Love Affair with the Longest Format
                </h3>
                <p className="text-sm text-slate-500 mt-2 font-body max-w-xl">
                  Virat Kohli’s captaincy era transformed India’s Test culture, instilling a ruthless overseas winning mindset, elite fitness standards, and a fast-bowling revolution.
                </p>
              </div>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">01</span>
                  <h4 className="font-display text-lg text-slate-900 uppercase font-bold tracking-wide">The Passion for Whites</h4>
                  <p className="text-xs text-slate-600 mt-1 font-body leading-relaxed">
                    Always believing that Test cricket was the ultimate examination of a cricketer's character, patience, and technique.
                  </p>
                </div>

                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">02</span>
                  <h4 className="font-display text-lg text-slate-900 uppercase font-bold tracking-wide">Ruthless Intensity</h4>
                  <p className="text-xs text-slate-600 mt-1 font-body leading-relaxed">
                    Brought a fiery, relentless energy to every single session of play, redefining how India played five-day cricket.
                  </p>
                </div>

                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">03</span>
                  <h4 className="font-display text-lg text-slate-900 uppercase font-bold tracking-wide">Fitness Revolution</h4>
                  <p className="text-xs text-slate-600 mt-1 font-body leading-relaxed">
                    Pioneered the Yo-Yo test and peak athletic benchmarks, demanding that his team match the world's best in physical endurance.
                  </p>
                </div>

                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">04</span>
                  <h4 className="font-display text-lg text-slate-900 uppercase font-bold tracking-wide">Fast Bowling Engine</h4>
                  <p className="text-xs text-slate-600 mt-1 font-body leading-relaxed">
                    Nurtured a fearsome, hostile four-pronged pace attack capable of taking 20 wickets in any condition worldwide.
                  </p>
                </div>
              </div>

              {/* Memorable Quote */}
              <div className="p-6 border border-blue-100 bg-blue-50/40 rounded-3xl relative overflow-hidden">
                <Quote className="absolute right-6 bottom-4 w-24 h-24 text-blue-500/5 pointer-events-none" />
                <p className="font-display text-base text-slate-800 italic leading-relaxed">
                  "For me, Test cricket is not a format, it is the ultimate test of a human being. If you want to be remembered, you have to stand tall in whites."
                </p>
                <span className="text-[10px] uppercase tracking-widest text-blue-600 font-bold block mt-3">— Virat Kohli</span>
              </div>
            </div>

            {/* Museum Exhibit: The Legacy in Whites */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-blue-50/30 border border-slate-200 rounded-3xl p-6 md:p-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-bold block mb-1">
                Luxury Statistics Showcase
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-slate-900 uppercase tracking-wider font-extrabold mb-6 pb-4 border-b border-slate-200 flex items-center gap-2">
                <Crown className="w-5 h-5 text-blue-600" />
                The Legacy in Whites
              </h3>

              {/* Museum Stats Grid */}
              <div className="space-y-4">
                {[
                  { label: "Test Matches", val: "123", desc: "A career of steel spanning over a decade" },
                  { label: "Test Runs", val: "9,230", desc: "Leaving behind an indelible run aggregate" },
                  { label: "Test Centuries", val: "30", desc: "Crafting iconic monuments of resilience" },
                  { label: "Double Centuries", val: "7", desc: "Most double hundreds as an Indian skipper" },
                  { label: "Wins as Captain", val: "40", desc: "India's most successful Test captain in history" },
                  { label: "Overseas Victories", val: "16", desc: "Leading victories in AUS, ENG, SA, and WI" },
                  { label: "ICC Ranking peak", val: "937", desc: "Peak points rating; 42 months holding world No. 1" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-200/60 pb-3 hover:bg-white/40 p-2 rounded-xl transition-all duration-200">
                    <div>
                      <span className="font-display text-sm text-slate-900 font-bold block uppercase tracking-wide">{stat.label}</span>
                      <span className="text-[10px] text-slate-500 font-body">{stat.desc}</span>
                    </div>
                    <span className="font-display text-2xl text-blue-700 font-black tracking-tighter">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE TRIBUTE: FAN GALLERY */}
      <section className="relative z-10 bg-gradient-to-b from-white via-red-50/15 to-white border-t border-slate-100 py-24 px-6 lg:px-16 w-full">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-xs font-semibold text-red-600 uppercase tracking-widest mb-4">
              <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              The Tribute
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-slate-900 uppercase tracking-wider leading-none mb-3">
              A Nation's Gratitude
            </h2>
            <p className="font-display text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold max-w-xl mx-auto">
              How the fans and the Royal Challengers Bengaluru family honored a lifetime of red-ball devotion.
            </p>
            <div className="h-1 w-20 bg-red-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Tribute Text & RCB fans emphasis */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-red-600 font-bold block mb-1">
                One Franchise. Eternal Loyalty.
              </span>
              <h3 className="font-display text-2xl md:text-4xl text-slate-900 uppercase tracking-wider font-extrabold leading-tight">
                RCB Fans Honour the King
              </h3>
              <p className="text-sm text-slate-600 font-body leading-relaxed">
                For Royal Challengers Bengaluru fans, Virat's Test career was the ultimate source of pride. The same fierce loyalty and dedication he showed to RCB was his signature in Test whites. 
              </p>
              <p className="text-sm text-slate-600 font-body leading-relaxed">
                Stadiums across India filled with banners, fan-made shirts carrying the number 18, and echoing chants of *"Kohli, Kohli"*. RCB fans considered his Test journey the standard-setting emblem of cricket's soul—proving that true kings are defined not by local franchises, but by their dominance in the sport's ultimate arena.
              </p>

              {/* Fan Messages block */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="p-4 border border-red-100/55 bg-red-50/20 rounded-2xl">
                  <p className="text-xs font-body text-slate-600 italic">"Played as the G.O.A.T, Ruled as the King. We'll miss the Kohli-styled bangers in Red Ball cricket."</p>
                  <span className="text-[10px] uppercase text-red-500 font-bold block mt-2">— Chinnaswamy Stadium Banner</span>
                </div>
                <div className="p-4 border border-red-100/55 bg-red-50/20 rounded-2xl">
                  <p className="text-xs font-body text-slate-600 italic">"Thank you Virat for making Test cricket exciting again. Every single one of us loves you."</p>
                  <span className="text-[10px] uppercase text-red-500 font-bold block mt-2">— Fan Tribute</span>
                </div>
              </div>
            </div>

            {/* The Image Gallery Case */}
            <div className="lg:col-span-7">
              <div className="p-3 bg-white border border-red-100 rounded-3xl shadow-[0_20px_50px_rgba(239,68,68,0.06)] group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/test/fan_tribute_collage.jpg"
                    alt="RCB Fans Tribute Collage"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-red-600/90 text-white font-display text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    RCB Fans Tribute Gallery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL QUOTE WALL & WALKAWAY */}
      <section className="relative z-10 bg-slate-50 border-t border-slate-200 pt-24 pb-20 w-full overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center">
          
          {/* Quote Wall */}
          <div className="max-w-3xl mx-auto space-y-6 mb-16">
            <h3 className="font-display text-3xl md:text-6xl text-blue-900 uppercase font-black tracking-tight leading-none">
              "770 runs short of 10,000.<br/>A legacy beyond numbers."
            </h3>
            <p className="font-display text-lg md:text-2xl text-slate-600 italic max-w-2xl mx-auto">
              "Some players chase records.<br/>Some players become the standard."
            </p>
            <div className="pt-6">
              <span className="font-display text-xl md:text-2xl text-slate-900 uppercase tracking-widest font-extrabold block">
                Virat Kohli
              </span>
              <span className="text-xs text-blue-600 uppercase tracking-widest font-semibold block mt-1">
                9230 Test Runs • A Lifetime of Excellence
              </span>
            </div>
          </div>

          {/* Cinematic Ending Image (Waving Goodbye walking away) */}
          <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-[9/16] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/test/test_farewell_walkaway.jpg"
              alt="Virat Kohli Test Retirement Tribute"
              className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105"
            />
            {/* Gradient vignette fading to dark at the bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 text-slate-800 font-display text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-[0.25em] font-bold px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-md whitespace-nowrap">
              Walking Away on His Own Terms
            </div>
          </div>

        </div>
      </section>

      <div className="text-slate-900 border-t border-slate-200 bg-white/90 relative z-10">
        <ChapterNav />
      </div>
    </main>
  );
}


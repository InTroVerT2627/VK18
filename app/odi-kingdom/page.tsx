"use client";

import { motion } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { odiExperience, chaseTimeline } from "@/lib/kohli-data";
import { OfficialMediaFrame } from "@/components/media/official-media-frame";
import { getFormatStats } from "@/services/stats";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

// Official 5 ODI photos with metadata and storytelling contexts from our analysis
const odiGallery = [
  {
    src: "/assets/odi/photo1.jpg",
    photoNum: "Photo 01",
    title: "Spiritual Elevation",
    subtitle: "The 50th ODI Century",
    stat: "54 ODI Tons",
    detail: "Reaching the absolute pinnacle of white-ball cricket. Kohli surpassed Sachin Tendulkar's record of 49 ODI centuries in a high-pressure World Cup semi-final vs New Zealand, falling to his knees in pure gratitude to the Wankhede crowd."
  },
  {
    src: "/assets/odi/photo2.jpg",
    photoNum: "Photo 02",
    title: "The Silhouette of Victory",
    subtitle: "Jersey 18 Legacy",
    stat: "72% Chase Success",
    detail: "Walking off after executing a perfect run chase. Captured from behind, this profile shows the high-contrast 'VIRAT 18' jersey facing the roaring stadium stands—the definitive posture of the Chase Master."
  },
  {
    src: "/assets/odi/photo3.jpg",
    photoNum: "Photo 03",
    title: "Crucifix of Triumph",
    subtitle: "World Cup Intensity",
    stat: "14,797 ODI Runs",
    detail: "Virat roaring to the crowd with arms spread wide, MRF bat raised like a scepter. It captures the raw passion, fire, and theatrical domination that redefined limited-overs pacing."
  },
  {
    src: "/assets/odi/photo4.jpg",
    photoNum: "Photo 04",
    title: "Kinetic Eruption",
    subtitle: "Mid-Air Ecstasy",
    stat: "58.72 Average",
    detail: "Leaping high in the air with fists pumped after executing a critical boundary. This high-velocity action photo represents the unparalleled athletic intensity Kohli brought to India's blue jersey."
  },
  {
    src: "/assets/odi/photo5.jpg",
    photoNum: "Photo 05",
    title: "The Silver Kiss",
    subtitle: "Global Silverware",
    stat: "4 World Cup Medals",
    detail: "Holding and kissing the ICC trophy with closed eyes. Emphasizes the ultimate emotional satisfaction and validator of global tournament victories throughout his ODI kingdom."
  }
];

export default function OdiKingdomPage() {
  const odi = getFormatStats("ODI");
  
  // Stats mapping for the cinematic reveal hero section
  const heroStats = [
    { label: "ODI Runs", value: odi.runs.toLocaleString("en-IN") },
    { label: "ODI Centuries", value: `${odi.hundreds}` },
    { label: "ODI Average", value: `${odi.average}` },
    { label: "World Cup Runs", value: `${odi.worldCupRuns}` },
    { label: "Chase Average", value: `${odi.chaseAverage}` }
  ];

  return (
    <main className="relative min-h-screen theme-odi text-white flex flex-col justify-between overflow-x-hidden selection:bg-blue-600/20 selection:text-blue-200">
      
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/85 to-transparent z-40 pointer-events-none" />
      <div className="relative z-50">
        <CinematicHeader />
      </div>

      {/* ODI HERO SECTION: Full Screen 100vh utilizing Photo 1 */}
      <div className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/odi/photo1.jpg"
            alt="Virat Kohli Wankhede 50th Century"
            className="h-full w-full object-cover object-[50%_15%] scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-950/20 to-black/60" />
          <div className="absolute inset-0 bg-blue-950/10 mix-blend-color" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 px-6 max-w-5xl mx-auto flex flex-col items-center">
          
          
          <h1 className="font-display text-5xl md:text-8xl text-white uppercase tracking-[0.06em] leading-none mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            THE CHASE MASTER
          </h1>
          <p className="font-display text-xs md:text-lg text-yellow-400 uppercase tracking-[0.3em] font-bold mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            The Greatest ODI Chaser Of The Modern Era
          </p>

          {/* Animated Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16 max-w-4xl w-full">
            {heroStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className="backdrop-blur-md border border-white/10 bg-white/5 rounded-2xl p-4 flex flex-col justify-center shadow-lg relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-display text-xl md:text-2xl text-yellow-400 font-extrabold tracking-wide mb-1">
                  {stat.value}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">Scroll to Enter</span>
          <div className="h-8 w-[1.5px] bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 px-6 py-20 lg:px-16 max-w-[1440px] mx-auto w-full space-y-24">

        {/* THE CHASE MASTER STORYTELLING SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left stats description cards */}
          <div className="lg:col-span-4 backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />
            <div>
              <span className="text-yellow-400 font-display text-[10px] uppercase tracking-widest block mb-1">Surgical Precision</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-4">Virat's Chasing Legacy</h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 font-body">
                Kohli restructured ODI targets into simple mathematical calculations. The second innings is his canvas, setting records that may stand forever.
              </p>
            </div>
            
            <div className="space-y-4 border-t border-white/10 pt-4 text-xs">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Total Runs in Chases</span>
                <span className="font-semibold text-white">7,700+</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Chase Success Rate</span>
                <span className="font-semibold text-green-400">{odiExperience.chaseRecord.successRate}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 uppercase tracking-widest">Chase Centuries</span>
                <span className="font-semibold text-yellow-400">{odiExperience.chaseRecord.centuriesInChases}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 uppercase tracking-widest">Highest Chase Score</span>
                <span className="font-semibold text-white">{odiExperience.chaseRecord.highestChase}</span>
              </div>
            </div>
          </div>

          {/* Chase pressure Recharts Area Chart */}
          <div className="lg:col-span-8 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-yellow-600/5 to-transparent pointer-events-none" />
            <div>
              <span className="text-blue-400 font-display text-[10px] uppercase tracking-widest block mb-0.5">Statistical Analysis</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-2">Chase Pressure Index</h3>
              <p className="text-slate-400 text-xs font-body mb-6">Historical index of target pressure in Kohli's greatest chase wins.</p>
            </div>
            
            <div className="h-[280px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chaseTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOdiPressure" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "12px", fontFamily: "var(--font-inter)", fontSize: "11px", color: "#f8fafc" }}
                  />
                  <Area type="monotone" dataKey="pressure" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOdiPressure)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[9px] uppercase tracking-wider text-slate-400">
              {chaseTimeline.map((item, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 rounded-lg p-2 hover:border-blue-500/35 transition-all">
                  <span className="block text-yellow-400 font-bold font-display text-xs">{item.year}</span>
                  <span className="block text-white/80 truncate mt-0.5">{item.innings.split(" vs ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ICC Champions Trophy Showcase */}
        <div className="relative bg-gradient-to-br from-blue-950/20 to-black/60 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
          <div className="w-full md:w-44 md:h-56 rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/trophies/champions_trophy_2013.jpg" alt="ICC Champions Trophy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="flex-grow text-left space-y-4">
            <span className="text-blue-400 font-display text-[10px] uppercase tracking-widest font-bold block">ICC Champions Trophy</span>
            <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider font-extrabold leading-none">
              Conquering the Champions Trophy
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-body">
              In 2013, India dominated the ICC Champions Trophy in England under rain-soaked skies. Virat Kohli anchored the middle order and top-scored in the final with a gritty 43 runs, securing the silverware and reinforcing India's global ODI dominance.
            </p>
            <div className="inline-flex items-center gap-2 border border-yellow-500/20 bg-yellow-500/5 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-yellow-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span>Champions of 2013</span>
            </div>
          </div>
        </div>

        {/* APPLE-STYLE SCROLLING DOCUMENTARY GALLERY */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-blue-950/20 backdrop-blur-md border-y border-white/5 py-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 space-y-32">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow border-blue-500/40 bg-blue-500/10 text-blue-400 mb-3">The ODI Gallery</span>
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider">Cinematic Chapters</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-medium">As users scroll: large scenes slide in, statistics animate, and stories unfold.</p>
            </div>            {/* Documentary split gallery */}
            <div className="space-y-36">
              {odiGallery.map((photo, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div 
                    key={i} 
                    className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full ${isEven ? "" : "lg:flex-row-reverse"}`}
                  >
                    
                    {/* 60% width Image Panel using the Photo Presentation System */}
                    <div className="w-full lg:w-[60%] h-[55vh] md:h-[70vh] lg:h-[75vh] relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)] border border-blue-900/25 bg-slate-950/90 group flex items-center justify-center">
                      
                      {/* Ambient Blurred Background reflection copy to fill empty canvas space */}
                      <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.src}
                          alt=""
                          className="w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/80" />
                      </div>

                      {/* Main Contained image, keeping Virat's face & elements fully visible */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 md:p-10 lg:p-12">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                          src={photo.src}
                          alt={photo.title}
                          className="max-h-full max-w-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10"
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>

                      {/* Glossy light sweep overlay effect */}
                      <motion.div
                        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                        animate={{ x: ["0%", "200%"] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
                      />

                      {/* Radial Dark Vignette for depth */}
                      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.7)_100%)]" />


                    </div>

                    {/* 40% width Story Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full lg:w-[40%] text-left space-y-6 px-2 lg:px-4"
                    >
                      <div className="space-y-1">
                        <span className="text-yellow-400 font-display text-sm font-semibold uppercase tracking-[0.25em]">{photo.subtitle}</span>
                        <h3 className="font-display text-3xl md:text-5xl text-white uppercase tracking-wider leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                          {photo.title}
                        </h3>
                      </div>

                      <p className="text-slate-300 leading-relaxed font-body text-sm md:text-base border-l-2 border-yellow-500/30 pl-4 py-1">
                        {photo.detail}
                      </p>

                      <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 rounded-full px-5 py-2 text-xs uppercase tracking-widest text-blue-300 font-bold shadow-lg shadow-blue-900/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span>{photo.stat}</span>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* Chapters Navigation */}
      <div className="text-slate-900 border-t border-white/5 bg-transparent backdrop-blur-md relative z-10">
        <ChapterNav />
      </div>
    </main>
  );
}



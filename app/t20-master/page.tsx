"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { t20Experience, careerProgression } from "@/lib/kohli-data";
import { OfficialMediaFrame } from "@/components/media/official-media-frame";
import { getFormatStats } from "@/services/stats";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

// Official 5 T20I photos with analysis metadata
const t20Gallery = [
  {
    src: "/assets/t20/photo2.jpg",
    photoNum: "Photo 01",
    title: "Melbourne Defiance",
    subtitle: "The Melbourne Chase (Melbourne 2022)",
    stat: "82* off 53 Balls",
    detail: "Virat Kohli flexing his right bicep and roaring in triumph at the MCG. Rescuing India from a dire 31/4 under extreme format pressure, this moment captures the raw aggression and focus of the greatest chase in T20I history."
  },
  {
    src: "/assets/t20/photo4.jpg",
    photoNum: "Photo 02",
    title: "Look to the Skies",
    subtitle: "MCG Emotional Release (Melbourne 2022)",
    stat: "97% Win Prob Shift",
    detail: "Throwing both arms wide, bat and helmet raised, looking up to the sky with closed eyes in pure ecstasy. Symbolic of climbing the ultimate pressure summit, this frame captures the deep emotional release of completing a miracle."
  },
  {
    src: "/assets/t20/photo5.jpg",
    photoNum: "Photo 03",
    title: "The Outfield Triumph",
    subtitle: "Crowned World Champion (Barbados 2024)",
    stat: "World Cup Winner",
    detail: "Holding the T20 World Cup trophy on the outfield, smiling directly at the camera with the Indian flag draped behind him. The ultimate realization of a childhood dream for a veteran leader."
  },
  {
    src: "/assets/t20/photo1.jpg",
    photoNum: "Photo 04",
    title: "Brothers in Arms",
    subtitle: " Barbados Outfield Ceremony (Barbados 2024)",
    stat: "125 T20I Matches",
    detail: "Standing shoulder-to-shoulder with captain Rohit Sharma, holding the T20 World Cup trophy under the Barbados sky. Draped in the flag, it marks the end of an era as both legends retired from the format on the same night."
  },
  {
    src: "/assets/t20/photo3.jpg",
    photoNum: "Photo 05",
    title: "The Championship Pull",
    subtitle: "T20 World Cup Final (Barbados 2024)",
    stat: "76 off 59 Balls",
    detail: "Virat Kohli executing a crucial pull shot during the T20 World Cup 2024 Final. Anchoring the innings under immense pressure to set a winning total, this knock defined his format farewell and sealed his T20I legacy."
  }
];

export default function T20MasterPage() {
  const t20 = getFormatStats("T20I");
  const t20Progression = careerProgression.filter(d => d.t20i > 0 || d.year === 2011);

  // Hero Stats using light blue / sky blue themes
  const heroStats = [
    { label: "T20I Runs", value: t20.runs.toLocaleString("en-IN") },
    { label: "Strike Rate", value: `${t20.strikeRate}` },
    { label: "World Cup Runs", value: `${t20.worldCupRuns}` },
    { label: "50+ Scores", value: `${t20.fifties + t20.hundreds}` },
    { label: "Format Champion", value: "T20 WC '24" }
  ];

  return (
    <main className="relative min-h-screen theme-t20 text-white flex flex-col justify-between overflow-x-hidden selection:bg-cyan-600/20 selection:text-cyan-200">
      
      {/* Cinematic Header overlay */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/85 to-transparent z-40 pointer-events-none" />
      <div className="relative z-50">
        <CinematicHeader />
      </div>

      {/* T20 HERO SECTION: Full Screen 100vh utilizing Photo 2 */}
      <div className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/t20/photo2.jpg"
            alt="Virat Kohli Melbourne Defiance"
            className="h-full w-full object-cover object-[50%_15%] scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-950/20 to-black/60" />
          <div className="absolute inset-0 bg-cyan-950/10 mix-blend-color" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 px-6 max-w-5xl mx-auto flex flex-col items-center">
          
          
          <h1 className="font-display text-5xl md:text-8xl text-white uppercase tracking-[0.06em] leading-none mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            T20 Master
          </h1>
          <p className="font-display text-xs md:text-lg text-cyan-400 uppercase tracking-[0.3em] font-bold mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            THE MODERN ART OF PRESSURE CRICKET
          </p>

          {/* Animated Statistics in Sky Blue & Silver */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16 max-w-4xl w-full">
            {heroStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className="backdrop-blur-md border border-white/10 bg-white/5 rounded-2xl p-4 flex flex-col justify-center shadow-lg relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-display text-xl md:text-2xl text-cyan-400 font-extrabold tracking-wide mb-1">
                  {stat.value}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          
        </div>

        {/* Scroll down cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">Scroll to Enter</span>
          <div className="h-8 w-[1.5px] bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 px-6 py-20 lg:px-16 max-w-[1440px] mx-auto w-full space-y-24">

        {/* T20 WORLD CUP EXPERIENCE SUBSECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* T20I Runs Progression Line Chart */}
          <div className="lg:col-span-7 backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent pointer-events-none" />
            <div>
              <span className="text-cyan-400 font-display text-[10px] uppercase tracking-widest block mb-0.5">Statistical Progression</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-2">T20I Runs Progression</h3>
              <p className="text-slate-400 text-xs font-body mb-6">Runs aggregated over key international T20 years.</p>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={t20Progression} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#020617", borderColor: "#0891b2", borderRadius: "12px", fontFamily: "var(--font-inter)", fontSize: "11px", color: "#ffffff" }}
                  />
                  <Line type="monotone" dataKey="t20i" stroke="#06b6d4" strokeWidth={3} dot={{ fill: "#fbbf24", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* World Cup Journey summary card */}
          <div className="lg:col-span-5 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-yellow-600/5 to-transparent pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-yellow-500" />
            
            <div>
              <span className="text-yellow-400 font-display text-[10px] uppercase tracking-widest block mb-1">Modern Art of pressure</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-4">World Cup Farewell · T20 WC 2024</h3>
              <p className="text-slate-300 leading-relaxed font-body text-xs md:text-sm">
                The absolute pinnacle of his T20 international career. Kohli guided India to the 2024 T20 World Cup victory and walked away with the format fully completed.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs md:text-sm mt-6 border-t border-white/10 pt-4">
              <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                <span className="text-cyan-400 uppercase font-bold tracking-wider text-[9px] block mb-0.5">Runs in Final</span>
                <span className="text-white text-base font-bold">76 runs</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                <span className="text-cyan-400 uppercase font-bold tracking-wider text-[9px] block mb-0.5">WC Final Result</span>
                <span className="text-white text-base font-bold">Champions</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 col-span-2">
                <span className="text-cyan-400 uppercase font-bold tracking-wider text-[9px] block mb-0.5">Farewell Moment</span>
                <span className="text-white text-xs font-semibold">{t20Experience.worldCup2024.finalMoment}</span>
              </div>
            </div>
          </div>
        </div>

        {/* APPLE-STYLE SCROLL STORYTELLING GALLERY */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-slate-900/60 border-y border-white/5 py-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 space-y-32">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow border-cyan-500/40 bg-cyan-500/10 text-cyan-400 mb-3">T20I Documentary</span>
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider">Cinematic Scenes</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-medium">As users scroll: large scenes slide in, statistics animate, and stories unfold.</p>
            </div>
            {/* Documentary split gallery */}
            <div className="space-y-36">
              {t20Gallery.map((photo, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div 
                    key={i} 
                    className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full ${isEven ? "" : "lg:flex-row-reverse"}`}
                  >
                    
                    {/* 60% width Image Panel using the Photo Presentation System */}
                    <div className="w-full lg:w-[60%] h-[60vh] md:h-[70vh] lg:h-[75vh] relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)] border border-cyan-900/25 bg-slate-950/90 group flex items-center justify-center">
                      
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

                      <p className="text-slate-300 leading-relaxed font-body text-sm md:text-base border-l-2 border-cyan-500/30 pl-4 py-1">
                        {photo.detail}
                      </p>

                      <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 rounded-full px-5 py-2 text-xs uppercase tracking-widest text-cyan-300 font-bold shadow-lg shadow-cyan-900/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>{photo.stat}</span>
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Final Chapter: MISSION COMPLETE (T20 World Cup 2024 Full-Screen Contained Rebuild) */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-screen py-16 flex flex-col justify-center items-center text-center border-t border-white/10 bg-transparent backdrop-blur-md">
          
          {/* Ambient Blurred Background reflection copy */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/t20/photo5.jpg"
              alt=""
              className="w-full h-full object-cover blur-3xl opacity-30 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-950/20 to-black/60" />
            <div className="absolute inset-0 bg-cyan-950/10 mix-blend-color" />
          </div>

          <div className="relative z-10 px-6 max-w-5xl mx-auto flex flex-col items-center gap-10">
            
            {/* Contained Hero Image Container (guaranteeing Virat, Flag, Trophy are completely visible) */}
            <div className="w-full max-w-2xl h-[50vh] md:h-[55vh] relative rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.95)] border border-cyan-500/25 bg-slate-950/40 flex items-center justify-center p-4">
              {/* Glossy shine sweep effect */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                animate={{ x: ["0%", "200%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
              />
              
              {/* Main image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/t20/photo5.jpg"
                alt="T20 World Cup 2024 Triumph Outfield"
                className="max-h-full max-w-full object-contain rounded-xl relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] border border-white/5 transition-transform duration-[4000ms] hover:scale-105"
              />
              
              <div className="absolute inset-0 z-15 pointer-events-none bg-radial-vignette opacity-15" />
            </div>

            {/* Typography and details below */}
            <div className="max-w-2xl flex flex-col items-center">
              <span className="eyebrow mb-3 border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-bold uppercase tracking-widest text-[9px]">
                Barbados 2024
              </span>
              <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-[0.08em] leading-none mb-3 font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                Mission Complete
              </h2>
              <p className="font-display text-xs md:text-lg text-yellow-400 uppercase tracking-[0.25em] font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-4">
                T20 WORLD CUP CHAMPION
              </p>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl font-body leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                After a decade of formatting records, pressure-cooker chases, and near misses, the circle is completed. Draped in the Indian flag on the Barbados outfield, holding the T20 World Cup, Virat Kohli announced his retirement from T20 internationals on the podium. Legacy sealed. 
              </p>
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



"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { eras } from "@/lib/kohli-data";

// Era styling details
const eraDetails: Record<number, {
  hairstyle: string;
  beardStyle: string;
  jersey: string;
  ranking: string;
  sponsor: string;
  awards: string;
  famousInnings: string;
  image: string;
  themeColor: string;
  textColor: string;
  badge: string;
  mood: string;
  quote: string;
  storyTitle: string;
  storyDesc: string;
}> = {
  2008: {
    hairstyle: "Spiked Raw Crop",
    beardStyle: "Clean Shaven",
    jersey: "India U19 Sky Blue",
    ranking: "Prodigy",
    sponsor: "Reebok",
    awards: "Under-19 World Cup Champion",
    famousInnings: "100 vs West Indies U19",
    image: "/assets/timeline/2008_u19.jpg",
    themeColor: "from-sky-400 to-blue-500",
    textColor: "text-sky-400",
    badge: "U19 World Cup Winner",
    mood: "Hope · Potential · Raw Talent",
    quote: "Leadership arrived before superstardom.",
    storyTitle: "THE BOY WHO DREAMED",
    storyDesc: "Under-19 World Cup Champion. Future Indian Superstar. A clean-shaven youth leading India under rain-soaked skies in Malaysia, announcing the beginning of raw greatness."
  },
  2011: {
    hairstyle: "Classic Short Crop",
    beardStyle: "Light Stubble",
    jersey: "India World Cup Blue",
    ranking: "ICC ODI Top 5",
    sponsor: "Nike",
    awards: "ICC Cricket World Cup Winner",
    famousInnings: "35 vs Sri Lanka (WC Final)",
    image: "/assets/timeline/2011_wc.jpg",
    themeColor: "from-blue-600 to-amber-500",
    textColor: "text-amber-500",
    badge: "ODI World Cup Winner",
    mood: "National Pride · Historic Moment",
    quote: "Carrying the legend Tendulkar on his shoulders.",
    storyTitle: "THE DREAM COMES TRUE",
    storyDesc: "Part of India's World Cup winning squad. Carrying Sachin Tendulkar on his shoulders in front of a roaring Wankhede crowd, declaring: 'He has carried the burden of the nation for 21 years; it is time we carried him on our shoulders.'"
  },
  2014: {
    hairstyle: "Undercut Spike",
    beardStyle: "Medium Styled Beard",
    jersey: "RCB Red & Black",
    ranking: "No. 1 ODI, Top 3 Test",
    sponsor: "MRF",
    awards: "Test Captaincy Debut",
    famousInnings: "141 vs Australia (Adelaide)",
    image: "/assets/timeline/2014_rise.jpg",
    themeColor: "from-red-600 to-yellow-500",
    textColor: "text-yellow-500",
    badge: "Future Captain",
    mood: "Confidence · Dominance",
    quote: "Asserting his throne in red and gold.",
    storyTitle: "RISE OF THE KING",
    storyDesc: "Becoming the face of Indian cricket. The rise of a modern icon, pointing his MRF bat with confidence and dominance, carrying RCB's hopes under the floodlights."
  },
  2016: {
    hairstyle: "Textured Fade",
    beardStyle: "Full Trimmed Beard",
    jersey: "RCB Red & Black",
    ranking: "Undisputed No. 1 Batter",
    sponsor: "MRF Genius",
    awards: "IPL MVP (973 Runs) & 4 Centuries",
    famousInnings: "113 vs Kings XI Punjab",
    image: "/assets/timeline/2016_peak.jpg",
    themeColor: "from-red-600 via-orange-500 to-yellow-500",
    textColor: "text-red-500",
    badge: "Peak Dominance Era",
    mood: "Aggression · Greatness · Authority",
    quote: "The greatest individual IPL season in history.",
    storyTitle: "PEAK DOMINANCE",
    storyDesc: "Peak individual dominance. Scoring 973 runs with 4 centuries through a split webbing, stitching his hand back together to mount a carry job that has never been repeated."
  },
  2018: {
    hairstyle: "Classic Undercut",
    beardStyle: "Thick Well-Groomed Beard",
    jersey: "India Test Whites",
    ranking: "No. 1 Test, No. 1 ODI",
    sponsor: "MRF Genius",
    awards: "ICC Test Mace / Border-Gavaskar Trophy",
    famousInnings: "149 vs England (Edgbaston Test)",
    image: "/assets/timeline/2018_test.jpg",
    themeColor: "from-blue-600 via-zinc-100 to-zinc-400",
    textColor: "text-blue-400",
    badge: "King of World Cricket",
    mood: "Test Dominance · Legacy · Steel",
    quote: "Aggression and steel in overseas conquests.",
    storyTitle: "THE KING OF WORLD CRICKET",
    storyDesc: "Dominated all formats. Led India to their first-ever Test series victory on Australian soil in 71 years. Reaching the absolute summit of red-ball cricket and holding the ICC Mace for 5 consecutive years."
  },
  2024: {
    hairstyle: "Buzz Cut Fade",
    beardStyle: "Salt & Pepper Beard",
    jersey: "India T20 WC Orange-Blue",
    ranking: "Legend Era Champion",
    sponsor: "MRF Genius",
    awards: "ICC T20 World Cup Champion",
    famousInnings: "76 vs South Africa (T20 WC Final)",
    image: "/assets/timeline/2024_t20wc.jpg",
    themeColor: "from-orange-500 to-blue-600",
    textColor: "text-orange-500",
    badge: "T20 World Cup Champion",
    mood: "Achievement · Legacy · Fulfillment",
    quote: "Mission complete. The T20 international farewell.",
    storyTitle: "MISSION COMPLETE",
    storyDesc: "T20 World Cup Champion. Anchoring the final with 76 runs under intense pressure, lifting the trophy draped in the Indian flag, and announcing his retirement from T20Is on the podium."
  },
  2025: {
    hairstyle: "Short Slick Back",
    beardStyle: "Full Executive Beard",
    jersey: "RCB Red & Gold",
    ranking: "All-Format Living Legend",
    sponsor: "MRF / Puma",
    awards: "IPL 2025 Champion",
    famousInnings: "100* vs CSK (IPL Playoffs)",
    image: "/assets/timeline/2025_rcb.jpg",
    themeColor: "from-red-600 to-yellow-600",
    textColor: "text-red-500",
    badge: "IPL 2025 Champion",
    mood: "Loyalty · Breakthrough · Redemption",
    quote: "Breaking the 17-year franchise curse.",
    storyTitle: "THE WAIT IS OVER",
    storyDesc: "Finally lifts the IPL trophy with RCB after 17 years of loyalty and heartbreak. Guiding the franchise to their first title breakthrough under the floodlights in front of his home crowd."
  },
  2026: {
    hairstyle: "Sleek Modern Fade",
    beardStyle: "Full Styled Executive",
    jersey: "RCB Red & Gold",
    ranking: "Immortal Franchise Icon",
    sponsor: "MRF / Puma",
    awards: "IPL 2026 Defending Champion",
    famousInnings: "85* vs MI (IPL 2026 Final)",
    image: "/assets/timeline/2026_rcb.jpg",
    themeColor: "from-yellow-500 to-zinc-950",
    textColor: "text-yellow-500",
    badge: "IPL 2026 Champion",
    mood: "Fulfillment · Completion · Royalty",
    quote: "Double Champions. The dream completed.",
    storyTitle: "LEGACY COMPLETE",
    storyDesc: "Successfully defends the IPL title. Lying on the grass, smiling next to the silverware with his teammates. A complete legend's franchise journey fully completed."
  }
};

// Year-specific canvas particle rendering component
function EraParticles({ year }: { year: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Rain (2008)
    const initRain = () => {
      particles = Array.from({ length: 80 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * -height,
        vy: 8 + Math.random() * 6,
        length: 15 + Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.3,
      }));
    };

    // Fireworks (2011)
    const fireworks: any[] = [];
    const spawnFirework = () => {
      const targetX = Math.random() * width;
      const targetY = 100 + Math.random() * (height - 300);
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
      const count = 50 + Math.random() * 40;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        fireworks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.02,
        });
      }
    };

    // Spotlights (2014 / 2018)
    let spotlightAngle = 0;

    // Red Ball dust (2016)
    const initRedDust = () => {
      particles = Array.from({ length: 40 }).map(() => ({
        x: Math.random() * width,
        y: height + Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.5 - Math.random() * 1.5,
        radius: 2 + Math.random() * 5,
        color: Math.random() > 0.4 ? "rgba(153, 27, 27, 0.25)" : "rgba(220, 38, 38, 0.15)",
        opacity: 0.2 + Math.random() * 0.5,
      }));
    };

    // Confetti (2024 / 2025)
    const initConfetti = (colorsList: string[]) => {
      particles = Array.from({ length: 60 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * -height,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 3,
        w: 6 + Math.random() * 6,
        h: 12 + Math.random() * 8,
        r: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colorsList[Math.floor(Math.random() * colorsList.length)],
      }));
    };

    // Sparks (2026)
    const initSparks = () => {
      particles = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * width,
        y: height + Math.random() * 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1.5 - Math.random() * 3,
        size: 1 + Math.random() * 2.5,
        opacity: 0.6 + Math.random() * 0.4,
        decay: 0.008 + Math.random() * 0.015,
      }));
    };

    // Initialize systems
    if (year === 2008) initRain();
    else if (year === 2016) initRedDust();
    else if (year === 2024) initConfetti(["#ffedd5", "#f97316", "#3b82f6", "#ffffff"]);
    else if (year === 2025) initConfetti(["#ef4444", "#fbbf24", "#09090b", "#d97706"]);
    else if (year === 2026) initSparks();

    let fireworkTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rain render (2008)
      if (year === 2008) {
        ctx.strokeStyle = "rgba(186, 230, 253, 0.4)";
        ctx.lineWidth = 1;
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vy * 0.15, p.y + p.length);
          ctx.stroke();

          p.y += p.vy;
          if (p.y > height) {
            p.y = -30;
            p.x = Math.random() * width;
          }
        });
      }

      // Fireworks render (2011)
      else if (year === 2011) {
        fireworkTimer++;
        if (fireworkTimer % 45 === 0) spawnFirework();

        for (let i = fireworks.length - 1; i >= 0; i--) {
          const f = fireworks[i];
          ctx.save();
          ctx.globalAlpha = f.alpha;
          ctx.fillStyle = f.color;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          f.x += f.vx;
          f.y += f.vy;
          f.vy += 0.04;
          f.alpha -= f.decay;

          if (f.alpha <= 0) {
            fireworks.splice(i, 1);
          }
        }
      }

      // Spotlights render (2014 & 2018)
      else if (year === 2014 || year === 2018) {
        spotlightAngle += 0.005;
        const x1 = width * 0.25 + Math.sin(spotlightAngle) * 120;
        const x2 = width * 0.75 + Math.cos(spotlightAngle * 0.8) * 120;

        // Spot 1
        let grad = ctx.createRadialGradient(x1, height, 15, width * 0.35, 0, width * 0.5);
        if (year === 2018) {
          grad.addColorStop(0, "rgba(30, 58, 138, 0.22)"); // Blue
        } else {
          grad.addColorStop(0, "rgba(220, 38, 38, 0.18)"); // RCB Red
        }
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x1 - 60, height);
        ctx.lineTo(0, 0);
        ctx.lineTo(width * 0.6, 0);
        ctx.closePath();
        ctx.fill();

        // Spot 2
        grad = ctx.createRadialGradient(x2, height, 15, width * 0.65, 0, width * 0.5);
        if (year === 2018) {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.18)"); // Silver/White
        } else {
          grad.addColorStop(0, "rgba(217, 119, 6, 0.15)"); // RCB Gold
        }
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x2 + 60, height);
        ctx.lineTo(width * 0.4, 0);
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();
      }

      // Red dust render (2016)
      else if (year === 2016) {
        particles.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          p.y += p.vy;
          p.x += p.vx;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        });
      }

      // Confetti render (2024 / 2025)
      else if (year === 2024 || year === 2025) {
        particles.forEach((p) => {
          ctx.save();
          ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
          ctx.rotate((p.r * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();

          p.y += p.vy;
          p.x += p.vx;
          p.r += p.rotationSpeed;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        });
      }

      // Sparks render (2026)
      else if (year === 2026) {
        particles.forEach((p, idx) => {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = "#fbbf24";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#d97706";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          p.y += p.vy;
          p.x += p.vx;
          p.opacity -= p.decay;

          if (p.opacity <= 0) {
            particles[idx] = {
              x: Math.random() * width,
              y: height + 10,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -1.5 - Math.random() * 3,
              size: 1 + Math.random() * 2.5,
              opacity: 0.6 + Math.random() * 0.4,
              decay: 0.008 + Math.random() * 0.015,
            };
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [year]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

export default function ThroughTheYearsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const activeEra = eras[activeIndex];
  const details = eraDetails[activeEra.year];

  const direction = activeIndex >= prevIndex ? 1 : -1;

  const handleSetActiveIndex = (newIdx: number) => {
    setPrevIndex(activeIndex);
    setActiveIndex(newIdx);
  };

  // Set visual focus class for theme changes
  const getThemeClass = (y: number) => {
    switch (y) {
      case 2008: return "theme-youth";
      case 2011: return "theme-worldcup";
      case 2014: return "theme-superstar";
      case 2016: return "theme-test-peak";
      case 2018: return "theme-test-mace";
      case 2024: return "theme-t20wc";
      case 2025: return "theme-rcb-champion";
      case 2026: return "theme-rcb-immortal";
      default: return "theme-home";
    }
  };

  return (
    <main className={`relative min-h-screen lg:overflow-hidden overflow-x-hidden flex flex-col justify-between transition-colors duration-1000 bg-zinc-950 text-white select-none ${getThemeClass(activeEra.year)}`}>
      
      {/* Cinematic Top Vignette */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/90 to-transparent z-40 pointer-events-none" />
      <div className="relative z-50">
        <CinematicHeader />
      </div>

      {/* Dynamic Background Particle System */}
      <EraParticles year={activeEra.year} />

      {/* 60/40 Split Documentary Layout */}
      <div className="relative z-20 flex-grow flex flex-col lg:flex-row lg:h-screen lg:max-h-screen lg:overflow-hidden h-auto overflow-visible">
        
        {/* LEFT SIDE (60%): Dedicated image panel. Show the ENTIRE photo (object-contain) */}
        <div className="lg:w-[60%] w-full h-[60vh] sm:h-[65vh] lg:h-full relative overflow-hidden bg-black/60 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 group">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeEra.year}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full flex flex-col lg:block"
            >
              {/* Blurred background copy for rich depth */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={details.image}
                alt="Cinematic backdrop"
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-105 pointer-events-none select-none"
              />

              {/* Edge-to-edge dark shadows and gradients inside left panel for Netflix Poster Style */}
              <div className="absolute bottom-0 inset-x-0 h-24 lg:h-48 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-25 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-20 lg:h-32 bg-gradient-to-b from-zinc-950/80 to-transparent z-25 pointer-events-none" />
              <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-zinc-950 via-zinc-950/30 to-transparent z-25 pointer-events-none hidden lg:block" />
              <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-zinc-950/40 to-transparent z-25 pointer-events-none hidden lg:block" />
              
              <div className="absolute inset-0 bg-zinc-950/10 z-10 pointer-events-none" />

              {/* Contained main image with slow Ken Burns floating effect to prevent any facial cropping */}
              <div className="relative w-full h-[65%] lg:h-full flex items-center justify-center p-4 z-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={details.image}
                  alt={`${activeEra.year} — ${activeEra.title}`}
                  className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] pointer-events-none select-none"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                />
              </div>

              {/* Cinematic Netflix-style Title Card Overlay (adapted beautifully for mobile stacking) */}
              <div className="relative h-[35%] lg:h-auto px-6 pb-6 lg:p-0 z-30 select-none text-left pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] lg:absolute lg:bottom-8 lg:left-8 lg:right-8 flex flex-col justify-end">
                <p className="text-red-500 text-[10px] tracking-[0.45em] font-black uppercase mb-2">
                  A DIGITAL MUSEUM ORIGINAL
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white">
                    {activeEra.year}
                  </h1>
                  <div className="sm:border-l sm:border-white/20 sm:pl-4">
                    <p className="text-[9px] text-white/50 font-display uppercase tracking-widest font-bold">
                      Chapter {activeIndex + 1}
                    </p>
                    <p className="font-display text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-yellow-400">
                      {details.storyTitle}
                    </p>
                  </div>
                </div>
                <p className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold mt-2">
                  Theme: {details.mood}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE (40%): Narrative details, achievements, and quote */}
        <div className="lg:w-[40%] w-full h-auto lg:h-full bg-zinc-950 flex flex-col justify-between lg:overflow-y-auto overflow-visible px-6 py-6 lg:px-10 lg:py-24 z-20 backdrop-blur-md relative border-t lg:border-t-0 border-white/5">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEra.year}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 flex-grow"
            >
              <div>
                <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-0.5 rounded-full inline-block mb-3">
                  {details.mood}
                </span>
                
                <span className="text-[10px] text-white/40 font-display block uppercase tracking-widest font-semibold">
                  Chapter: {activeEra.year === 2008 ? "THE BEGINNING" : activeEra.year === 2011 ? "WORLD CHAMPION" : activeEra.year === 2014 ? "RISE OF THE KING" : activeEra.year === 2016 ? "PEAK DOMINANCE" : activeEra.year === 2018 ? "KING OF WORLD CRICKET" : activeEra.year === 2024 ? "MISSION COMPLETE" : activeEra.year === 2025 ? "THE WAIT IS OVER" : "LEGACY COMPLETE"}
                </span>
                
                <h2 className="font-display text-2xl lg:text-4xl text-white uppercase tracking-wider font-extrabold leading-tight mt-1">
                  <span className="lg:hidden">{activeEra.year} — </span>{details.storyTitle}
                </h2>
              </div>

              {/* Documentary Quote */}
              <div className="border-l-2 border-yellow-500/40 pl-4 py-0.5">
                <p className="text-xs italic text-white/50 leading-relaxed font-body">
                  "{details.quote}"
                </p>
              </div>

              {/* Story Narrative */}
              <p className="text-white/80 font-body text-xs lg:text-sm leading-relaxed">
                {details.storyDesc}
              </p>

              {/* Minimalist Stats Panel (keeping visual focus dominant) */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-[9px] mb-3">Milestone Metrics</h4>
                <div className="space-y-2.5 text-[10px] text-white uppercase font-body">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-white/40 tracking-wider text-[8px] font-bold">Innings Highlight</span>
                    <span className="font-semibold text-right max-w-[70%] truncate">{details.famousInnings}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-white/40 tracking-wider text-[8px] font-bold">Jersey Style</span>
                    <span className="font-semibold text-right max-w-[70%] truncate">{details.jersey}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-white/40 tracking-wider text-[8px] font-bold">Bat Sponsor</span>
                    <span className="font-semibold">{details.sponsor}</span>
                  </div>
                </div>
              </div>

              {/* Visual Achievements strip */}
              <div className="bg-gradient-to-r from-yellow-400/5 to-transparent border-l-2 border-yellow-400/60 p-4 rounded-r-xl">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <span className="text-yellow-400 block font-bold text-[8px] uppercase tracking-wider">Achievement Badge</span>
                    <span className="font-display text-xs lg:text-sm text-white font-bold block mt-0.5">{details.badge}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-400 block font-bold text-[8px] uppercase tracking-wider">Accolade / Tons</span>
                    <span className="font-display text-xs lg:text-sm text-white font-bold block mt-0.5">{activeEra.statLine.centuries} Tons</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Navigation Timeline controls */}
          <div className="border-t border-white/10 pt-4 mt-6 space-y-4">
            
            <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest font-semibold">
              <span>Inspect Evolving Journey</span>
              <span className="text-yellow-400 font-bold">{activeEra.year} Era</span>
            </div>
            
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max={eras.length - 1}
                value={activeIndex}
                onChange={(e) => handleSetActiveIndex(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none"
              />
            </div>

            {/* Horizontal timeline bar with image previews */}
            <div className="flex justify-between gap-1.5 overflow-x-auto py-1 timeline-strip select-none">
              {eras.map((era, i) => {
                const isSelected = i === activeIndex;
                const eraImg = eraDetails[era.year]?.image;
                return (
                  <button
                    key={era.year}
                    onClick={() => handleSetActiveIndex(i)}
                    className="flex-shrink-0 group relative focus:outline-none"
                  >
                    <div className={`h-10 w-10 rounded-lg overflow-hidden border transition-all duration-300 ${
                      isSelected 
                        ? "border-yellow-400 scale-108 shadow-lg ring-1 ring-yellow-400" 
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={eraImg} alt={`${era.year}`} className="w-full h-full object-cover" />
                    </div>
                    <span className={`block text-[9px] font-display font-semibold mt-1 text-center ${
                      isSelected ? "text-yellow-400 font-bold" : "text-white/50 group-hover:text-white"
                    }`}>
                      {era.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Vertical Journey Line Axis (F1 timeline style sidebar) */}
        <div className="absolute left-6 lg:left-12 top-[35%] -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none bg-black/45 backdrop-blur-md py-4 px-3 rounded-full border border-white/5">
          <div className="h-72 w-[1px] bg-gradient-to-b from-blue-500 via-yellow-500 to-red-500 relative flex flex-col justify-between items-center py-2">
            {eras.map((era, i) => {
              const isActive = i <= activeIndex;
              const isSelected = i === activeIndex;
              return (
                <button
                  key={era.year}
                  onClick={() => handleSetActiveIndex(i)}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center relative group ${
                    isSelected 
                      ? "bg-yellow-400 border-yellow-400 scale-125 ring-2 ring-yellow-400/20" 
                      : isActive 
                        ? "bg-white border-white" 
                        : "bg-zinc-950 border-white/20 hover:border-white/50"
                  }`}
                >
                  <span className="absolute left-6 whitespace-nowrap bg-black/95 border border-white/10 text-white px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {era.year} - {eraDetails[era.year]?.storyTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-30 bg-zinc-950 border-t border-white/5">
        <ChapterNav />
      </div>
    </main>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { 
  Volume2, 
  VolumeX, 
  Zap, 
  Sparkles, 
  Heart, 
  Award, 
  Gauge, 
  FileText, 
  Play, 
  Compass, 
  Flame,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// The finalized 10 greatest knocks details
type Knock = {
  rank: number;
  title: string;
  opponent: string;
  venue: string;
  year: string;
  format: string;
  score: string;
  headline: string;
  situation: string;
  whyItMatters: string;
  result: string;
  quote: string;
  pressure: number; // out of 10
  legacy: number;   // out of 10
  imageSrc: string | null;
  galleryImages?: string[];
  country: "Pakistan" | "Australia" | "England" | "South Africa" | "Bangladesh";
};

const top10Knocks: Knock[] = [
  {
    rank: 1,
    title: "183 vs Pakistan",
    opponent: "Pakistan",
    venue: "Mirpur, Dhaka",
    year: "2012",
    format: "ODI",
    score: "183 (148)",
    headline: "The Chase That Created A King",
    situation: "Chasing a massive 330 in a must-win Asia Cup group match. Gautam Gambhir fell for a duck in the first over. Virat walked in at number three and forged a 133-run stand with Sachin Tendulkar, followed by an aggressive 172-run partnership with Rohit Sharma.",
    whyItMatters: "Kohli's highest individual ODI score and the definitive innings that established him as the King of Chases. Contemporary observers hailed his grandmaster-like game sense.",
    result: "Virat Delivered (India won by 6 wickets)",
    quote: "He played with the game sense of a grandmaster, scything down the required run rate without panic.",
    pressure: 10,
    legacy: 10,
    imageSrc: "/assets/odi/innings_183_pak.jpg",
    country: "Pakistan"
  },
  {
    rank: 2,
    title: "82* vs Pakistan",
    opponent: "Pakistan",
    venue: "MCG, Melbourne",
    year: "2022",
    format: "T20I",
    score: "82* (53)",
    headline: "When India Had 1% Hope",
    situation: "Chasing 160 under the lights at a packed MCG. India collapsed to 31/4. The required rate climbed past 15 runs per over, leaving India needing 28 runs from the final 8 deliveries against Pakistan's elite pace attack.",
    whyItMatters: "Hit two legendary back-to-back sixes off Haris Rauf that defied physics. Swung the win probability from less than 1% to a historic victory. Regarded as one of the greatest T20I knocks ever.",
    result: "Virat Delivered (India won by 4 wickets)",
    quote: "A demonstration of pure belief. He took a game that was mathematically lost and willed India to victory.",
    pressure: 10,
    legacy: 10,
    imageSrc: "/assets/odi/innings_82_pak.jpg",
    country: "Pakistan"
  },
  {
    rank: 3,
    title: "82* vs Australia",
    opponent: "Australia",
    venue: "Mohali",
    year: "2016",
    format: "T20I",
    score: "82* (51)",
    headline: "The Chase of Supreme Control",
    situation: "Virtual quarter-final of the T20 World Cup. Australia posted 160. India slumped to 94/4 in the 14th over, leaving Kohli to anchor and execute the chase under climbing required run rates.",
    whyItMatters: "One of the greatest, most calculated run-chases ever played in T20 history. Kohli executed the chase with clinical precision, running like a machine and picking gaps with masterclass calculation.",
    result: "Virat Delivered (India won by 6 wickets)",
    quote: "A masterclass in run-chasing. He controlled the risk, farmed the strike, and ran like an absolute machine.",
    pressure: 10,
    legacy: 10,
    imageSrc: "/assets/t20/innings_82_aus.jpg",
    country: "Australia"
  },
  {
    rank: 4,
    title: "72* vs South Africa",
    opponent: "South Africa",
    venue: "Mirpur, Dhaka",
    year: "2014",
    format: "T20I",
    score: "72* (44)",
    headline: "The Night He Carried India",
    situation: "T20 World Cup Semi-Final. India needed 173 to qualify for the final. The pitch was dry, spinning, and slowing down, with South Africa's Dale Steyn and Imran Tahir operating at peak intensity.",
    whyItMatters: "Single-handedly carried India into the final. Observers praised his steely wrists and ability to control the chase rate like a dial.",
    result: "Virat Delivered (India won by 6 wickets)",
    quote: "Steely wrists and an iron will. He controlled the rate like a dial, accelerating when others crumbled.",
    pressure: 9,
    legacy: 9,
    imageSrc: "/images/innings/72-vs-south-africa.jpg",
    country: "South Africa"
  },
  {
    rank: 5,
    title: "96* vs Bangladesh",
    opponent: "Bangladesh",
    venue: "Edgbaston, Birmingham",
    year: "2017",
    format: "ODI",
    score: "96* (78)",
    headline: "The Calm Before The Final",
    situation: "Champions Trophy Semi-Final. Bangladesh set a target of 265 on a flattening pitch. India lost early momentum, requiring a stable anchor to secure their final berth.",
    whyItMatters: "Kohli was completely flawless. He formed a record-breaking 226-run stand with Rohit Sharma and became the fastest batsman to cross 8,000 ODI runs.",
    result: "Virat Delivered (India won by 9 wickets)",
    quote: "Flawless and clinical. An exhibition of risk-free run scoring that completely demoralized the opposition.",
    pressure: 9,
    legacy: 9,
    imageSrc: "/assets/odi/innings_96_bang.jpg",
    country: "Bangladesh"
  },
  {
    rank: 6,
    title: "55* vs Pakistan",
    opponent: "Pakistan",
    venue: "Eden Gardens, Kolkata",
    year: "2016",
    format: "T20I",
    score: "55* (37)",
    headline: "Silencing Pakistan Again",
    situation: "World T20 group stage. Chasing 119 in a rain-curtailed match on a damp, massive turn-inducing minefield of a pitch. India collapsed to 23/3 early against Amir and Sami.",
    whyItMatters: "Negotiated a highly hostile bowling spell on an extremely difficult wicket. Reached fifty and bowed to Sachin Tendulkar in the stands in a moment of pure class.",
    result: "Virat Delivered (India won by 6 wickets)",
    quote: "On a spinning minefield where others could not survive, his bat looked broader than the gates of Eden Gardens.",
    pressure: 9,
    legacy: 9,
    imageSrc: "/assets/t20/innings_55_pak.jpg",
    country: "Pakistan"
  },
  {
    rank: 7,
    title: "115 & 141 vs Australia",
    opponent: "Australia",
    venue: "Adelaide Oval",
    year: "2014",
    format: "Test",
    score: "115 & 141",
    headline: "The Captain Arrives",
    situation: "Captaining India for the first time in Tests. Chasing 364 on a deteriorating Day 5 pitch. India was 129/4 when Kohli decided to reject a safe draw and launch a counterattack.",
    whyItMatters: "Scored twin centuries on Test captaincy debut, signaling the start of a fearless, victory-first Indian team culture under his leadership.",
    result: "India lost by 48 runs (Counterattack fell short)",
    quote: "I told the boys we are going for the win. No draws. We play to win, no matter the consequences.",
    pressure: 9,
    legacy: 9,
    imageSrc: "/assets/captaincy/adelaide_bat.jpg",
    country: "Australia"
  },
  {
    rank: 8,
    title: "235 vs England",
    opponent: "England",
    venue: "Wankhede Stadium, Mumbai",
    year: "2016",
    format: "Test",
    score: "235 (340)",
    headline: "The Emperor Of Home Tests",
    situation: "England posted 400. India required a massive first-innings response on a dry, dust-churning Mumbai wicket taking sharp spin from Moeen Ali and Adil Rashid.",
    whyItMatters: "Kohli batted for nearly nine hours, mastering the English spin threat and securing the series victory. Set the benchmark for long-form concentration.",
    result: "Virat Delivered (India won by an innings & 36 runs)",
    quote: "Nine hours of batting perfection. He masterfully wore down the spinners and sealed the series in style.",
    pressure: 8,
    legacy: 10,
    imageSrc: "/images/innings/235-vs-england.jpg",
    country: "England"
  },
  {
    rank: 9,
    title: "149 vs England",
    opponent: "England",
    venue: "Edgbaston, Birmingham",
    year: "2018",
    format: "Test",
    score: "149 (225)",
    headline: "The Ghosts Of England Buried",
    situation: "Tour opener. Facing heavy media scrutiny over his technical struggles during the 2014 tour. India collapsed to 100/5 against Anderson and Broad swing.",
    whyItMatters: "Silenced all critics by compiling a masterful 149 with the tail. Single-handedly kept India in the game and proved his class in swing conditions.",
    result: "India lost by 31 runs (Fightback fell short)",
    quote: "A one-man army against swing. He played with unmatched patience and farmed the tail to bury the ghosts of 2014.",
    pressure: 8,
    legacy: 9,
    imageSrc: "/assets/test/innings_149_eng.jpg",
    galleryImages: [
      "/assets/test/innings_149_eng.jpg",
      "/assets/test/innings_149_eng_bat_glove.jpg",
      "/assets/test/innings_149_eng_walk.jpg",
      "/assets/test/photo2.jpg"
    ],
    country: "England"
  },
  {
    rank: 10,
    title: "254* vs South Africa",
    opponent: "South Africa",
    venue: "Pune",
    year: "2019",
    format: "Test",
    score: "254* (336)",
    headline: "The Perfect Test Masterpiece",
    situation: "Pivotal series decider. South Africa's bowlers were finding early cracks. Kohli anchored with supreme defensive alignment over eight hours.",
    whyItMatters: "Kohli's highest individual Test score. Dismantled Rabada and Philander with clean drives. Became the fastest Indian to score 7 double centuries.",
    result: "Virat Delivered (India won by an innings & 137 runs)",
    quote: "Supreme control and flawless defense. He paced his knock over eight hours without offering a single chance.",
    pressure: 8,
    legacy: 10,
    imageSrc: "/images/innings/254-vs-south-africa.jpg",
    country: "South Africa"
  }
];

export default function IconicInningsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHeartbeatPlaying, setIsHeartbeatPlaying] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [crowdRoaring, setCrowdRoaring] = useState(false);
  const [activeGalleryIndices, setActiveGalleryIndices] = useState<Record<number, number>>({});
  
  // Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const heartbeatIntervalRef = useRef<any>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Setup Web Audio Context safely
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const startHeartbeat = () => {
    if (typeof window === "undefined") return;
    if (heartbeatIntervalRef.current) return;

    try {
      const ctx = getAudioContext();

      const playPulse = () => {
        if (!ctx || ctx.state === "closed") return;
        
        // Pulse 1
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(45, ctx.currentTime); // Deep thump
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      };

      // Heartbeat double thuds
      heartbeatIntervalRef.current = setInterval(() => {
        playPulse();
        setTimeout(() => playPulse(), 250);
      }, 1000);

      setIsHeartbeatPlaying(true);
    } catch (e) {
      console.error("Audio Context Failed:", e);
    }
  };

  const stopHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    setIsHeartbeatPlaying(false);
  };

  const synthesizeCrowdRoar = (duration = 3.0) => {
    if (typeof window === "undefined") return;
    try {
      const ctx = getAudioContext();
      
      // Synthesize noise
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      // Bandpass filter to model acoustic crowd resonance
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      // Sweep filter frequency to make it sound like a rising/falling wave of cheers
      filter.frequency.linearRampToValueAtTime(750, ctx.currentTime + 0.8);
      filter.frequency.linearRampToValueAtTime(250, ctx.currentTime + duration);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseNode.start();
    } catch (e) {
      console.error("Failed to play crowd synth:", e);
    }
  };

  const triggerRaufSixesFlash = () => {
    setIsFlashing(true);
    setCrowdRoaring(true);
    synthesizeCrowdRoar(3.5);
    
    // Add extra bass thud for the hit
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(65, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch (e) {}

    setTimeout(() => {
      setIsFlashing(false);
      setCrowdRoaring(false);
    }, 1500);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Track active innings on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let currentActive = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const ref = sectionRefs.current[i];
        if (ref && ref.offsetTop <= scrollPosition) {
          currentActive = i;
        }
      }
      
      if (currentActive !== activeIndex) {
        setActiveIndex(currentActive);
        
        // Trigger heartbeat automatically for the MCG knock (index 1)
        if (currentActive === 1) {
          startHeartbeat();
        } else {
          stopHeartbeat();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  // Opponent gradient class generator
  const getBackgroundTheme = (country: string) => {
    switch (country) {
      case "Pakistan":
        return "bg-gradient-to-b from-[#041d0c]/40 via-[#020617] to-[#020617]";
      case "South Africa":
        return "bg-gradient-to-b from-[#2b1704]/40 via-[#020617] to-[#020617]";
      case "England":
        return "bg-gradient-to-b from-[#1b2330]/40 via-[#020617] to-[#020617]";
      case "Australia":
        return "bg-gradient-to-b from-[#2a1d04]/40 via-[#020617] to-[#020617]";
      case "Bangladesh":
        return "bg-gradient-to-b from-[#041c22]/40 via-[#020617] to-[#020617]";
      default:
        return "bg-gradient-to-b from-yellow-950/30 via-[#020617] to-[#020617]";
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex flex-col justify-between overflow-x-hidden font-body select-none transition-colors duration-1000">
      
      {/* Dynamic Background Overlays & Global animations */}
      <style>{`
        @keyframes drift {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { opacity: 0.25; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
        .dust-particle {
          position: absolute;
          background: rgba(234, 179, 8, 0.4);
          border-radius: 50%;
          pointer-events: none;
          animation: drift 10s infinite linear;
        }
        .stadium-beam {
          background: linear-gradient(to bottom, rgba(234, 179, 8, 0.06) 0%, transparent 80%);
          clip-path: polygon(45% 0, 55% 0, 100% 100%, 0 100%);
        }
      `}</style>

      {/* Screen flash overlay for MCG sixes trigger */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-white mix-blend-screen pointer-events-none"
          />
        )}
      </AnimatePresence>

      <CinematicHeader />

      {/* INTRODUCTION HEADER */}
      <div className="relative z-10 px-6 pt-32 pb-16 lg:px-16 max-w-[1440px] mx-auto w-full text-center">
        <span className="eyebrow mb-3 border-yellow-500/30 bg-yellow-500/5 text-yellow-400">
          The Art of Pressure
        </span>
        <h1 className="font-display text-4xl md:text-7xl uppercase tracking-[0.1em] text-white leading-none font-black">
          Iconic Innings
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-yellow-500 mt-3 font-semibold font-mono">
          Top 10 Greatest Knocks Under Hostile Conditions
        </p>
        <p className="mt-6 text-sm md:text-base text-slate-400 leading-relaxed font-body max-w-2xl mx-auto">
          These are the matches where expectation was immense, pitches were challenging, and the math was impossible. The story of Virat Kohli's legendary pressure-cooker masterclasses.
        </p>

        {/* Floating dust particles in header */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="dust-particle h-1 w-1 top-[20%] left-[30%]" style={{ animationDelay: "1s" }} />
          <div className="dust-particle h-1.5 w-1.5 top-[40%] left-[70%]" style={{ animationDelay: "3s" }} />
          <div className="dust-particle h-1 w-1 top-[60%] left-[20%]" style={{ animationDelay: "5s" }} />
        </div>
      </div>

      {/* SCROLLING INNINGS SECTIONS */}
      <div className="w-full flex flex-col relative">
        {top10Knocks.map((knock, index) => {
          const isActive = index === activeIndex;
          const bgTheme = getBackgroundTheme(knock.country);
          const currentImgSrc = (knock.galleryImages && knock.galleryImages.length > 0)
            ? knock.galleryImages[activeGalleryIndices[knock.rank] || 0]
            : knock.imageSrc;

          return (
            <div
              key={knock.rank}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className={`min-h-screen w-full flex flex-col lg:flex-row items-center border-b border-white/5 relative py-24 lg:py-0 transition-colors duration-1000 ${bgTheme}`}
            >
              {/* Stadium Light Beams and floating details */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 h-[500px] w-[200px] stadium-beam opacity-30 transform -rotate-12" />
                <div className="absolute top-0 right-1/4 h-[500px] w-[200px] stadium-beam opacity-25 transform rotate-12" />

                {/* Floating Big watermark Score */}
                <div className="absolute bottom-10 left-10 font-display text-[15vw] font-black text-white/[0.012] select-none font-mono">
                  {knock.score.split(" ")[0]}
                </div>
              </div>

              {/* LEFT SIDE: Poster Photo Area */}
              <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex items-center justify-center p-6 lg:p-16 relative z-10">
                {currentImgSrc ? (
                  <div className="relative w-full h-full max-w-[500px] max-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-zinc-950/45">
                    {/* Ambient backdrop glow */}
                    <div className="absolute inset-0 z-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentImgSrc}
                        alt=""
                        className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                      />
                    </div>
                    {/* Contained image */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <motion.img
                        key={currentImgSrc}
                        src={currentImgSrc}
                        alt={knock.title}
                        className="max-h-full max-w-full object-contain rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.85)] border border-white/5"
                        animate={isActive ? { scale: [1, 1.03, 1] } : {}}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    {/* Shadow overlays */}
                    <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Gallery Navigation Controls */}
                    {knock.galleryImages && knock.galleryImages.length > 1 && (
                      <>
                        {/* Left Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIdx = activeGalleryIndices[knock.rank] || 0;
                            const prevIdx = (currentIdx - 1 + knock.galleryImages!.length) % knock.galleryImages!.length;
                            setActiveGalleryIndices(prev => ({ ...prev, [knock.rank]: prevIdx }));
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                          title="Previous Moment"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        {/* Right Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIdx = activeGalleryIndices[knock.rank] || 0;
                            const nextIdx = (currentIdx + 1) % knock.galleryImages!.length;
                            setActiveGalleryIndices(prev => ({ ...prev, [knock.rank]: nextIdx }));
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                          title="Next Moment"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          {knock.galleryImages.map((_, imgIndex) => {
                            const isCurrent = (activeGalleryIndices[knock.rank] || 0) === imgIndex;
                            return (
                              <button
                                key={imgIndex}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveGalleryIndices(prev => ({ ...prev, [knock.rank]: imgIndex }));
                                }}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                  isCurrent ? "bg-yellow-500 scale-125 shadow-[0_0_8px_#eab308]" : "bg-white/40 hover:bg-white/70"
                                }`}
                                title={`Frame ${imgIndex + 1}`}
                              />
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Premium glassmorphic placeholder */
                  <div className="w-full h-full max-w-[420px] aspect-square rounded-3xl border border-yellow-500/15 bg-slate-950/65 backdrop-blur-md p-8 flex flex-col justify-between items-center shadow-inner relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    <div className="w-full flex justify-between items-center z-10">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Match Exhibition</span>
                      <Sparkles className="h-4 w-4 text-yellow-500/40" />
                    </div>

                    <div className="text-center z-10 space-y-4">
                      <div className="h-16 w-16 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center mx-auto shadow-lg">
                        <Award className="h-6 w-6 text-yellow-500/50" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg uppercase text-white font-black tracking-wider leading-none">
                          {knock.title}
                        </h4>
                        <span className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-[0.2em] block mt-1">
                          {knock.format} · vs {knock.opponent}
                        </span>
                      </div>
                    </div>

                    <div className="z-10 text-center space-y-1">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-yellow-500/80 uppercase font-bold block">
                        Official Match Image Pending
                      </span>
                      <span className="text-[8px] font-mono text-slate-600 uppercase">
                        BCCI historical database archive ref
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Storytelling Details */}
              <div className="w-full lg:w-1/2 h-auto lg:h-screen flex flex-col justify-center px-6 lg:px-16 py-8 lg:py-0 relative z-10 select-text">
                <div className="space-y-6 max-w-xl">
                  
                  {/* Innings badge header */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] uppercase tracking-[0.2em] font-black px-3.5 py-1 rounded-full font-mono">
                      Knock #{knock.rank}
                    </span>
                    <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">
                      {knock.year} · {knock.venue}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div className="space-y-2">
                    <h2 className="font-display text-4xl lg:text-6xl text-white uppercase tracking-wider leading-none font-extrabold">
                      {knock.title}
                    </h2>
                    <p className="font-display text-lg lg:text-xl text-yellow-500 uppercase tracking-widest font-semibold">
                      "{knock.headline}"
                    </p>
                  </div>

                  {/* Situation & Details */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold block mb-1">Match Situation</span>
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-body">
                        {knock.situation}
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold block mb-1">Why It Matters</span>
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-body border-l border-yellow-500/20 pl-4">
                        {knock.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Interactive Features for MCG (Index 1) */}
                  {index === 1 && (
                    <motion.div 
                      className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4.5 space-y-3.5 relative overflow-hidden"
                      initial={{ scale: 0.98 }}
                      animate={isActive ? { scale: 1 } : {}}
                    >
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider">
                          <Heart className={`h-4 w-4 text-red-500 ${isHeartbeatPlaying ? "animate-pulse" : ""}`} /> 
                          MCG Atmospheric Synth Active
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={isHeartbeatPlaying ? stopHeartbeat : startHeartbeat}
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-[10px] font-mono uppercase tracking-wider font-bold"
                          >
                            {isHeartbeatPlaying ? <VolumeX className="h-3.5 w-3.5 inline mr-1" /> : <Volume2 className="h-3.5 w-3.5 inline mr-1" />}
                            Heartbeat
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-yellow-500/10 pt-3">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Interactive Sequence</span>
                        <button
                          onClick={triggerRaufSixesFlash}
                          className="px-4 py-1.5 rounded-full bg-yellow-500 text-black font-mono text-[10px] uppercase font-black tracking-widest hover:bg-yellow-400 transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-yellow-500/10"
                        >
                          <Zap className="h-3.5 w-3.5 fill-black" />
                          Simulate Rauf Sixes
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Impact and expectation meters */}
                  <div className="space-y-3 bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-[10px] font-mono font-bold uppercase text-slate-400">
                        <span>Pressure Scale</span>
                        <span className="text-red-500 font-black">{knock.pressure}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-600 to-red-500"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${knock.pressure * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 text-[10px] font-mono font-bold uppercase text-slate-400">
                        <span>Legacy Impact</span>
                        <span className="text-yellow-500 font-black">{knock.legacy}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-yellow-500 to-amber-400"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${knock.legacy * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Impact Result</span>
                      <span className="text-yellow-500 font-display font-black text-xs uppercase tracking-widest animate-pulse">
                        {knock.result}
                      </span>
                    </div>
                  </div>

                  {/* Iconic Quote */}
                  <div className="border-l-2 border-yellow-500 pl-4 py-1.5 text-left bg-yellow-500/[0.02] pr-4 rounded-r-xl">
                    <p className="text-slate-400 text-xs md:text-sm italic font-body leading-relaxed">
                      "{knock.quote}"
                    </p>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRAND FINALE: HALL OF FAME ENDING */}
      <section className="relative min-h-screen py-32 flex flex-col justify-center items-center text-center bg-[#020617] z-10 px-6 border-t border-white/5">
        
        {/* Collage Background zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <motion.div
            initial={{ scale: 1.15, opacity: 0.04 }}
            whileInView={{ scale: 1.05, opacity: 0.08 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/test/fan_tribute_collage.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>

        {/* Stadium golden beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[350px] stadium-beam opacity-45" style={{ background: "linear-gradient(to bottom, rgba(234,179,8,0.08) 0%, transparent 100%)" }} />
          <div className="dust-particle h-1.5 w-1.5 top-[30%] left-[20%]" style={{ animationDelay: "2s" }} />
          <div className="dust-particle h-1 w-1 top-[50%] left-[80%]" style={{ animationDelay: "4s" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl space-y-12 select-text">
          <span className="text-xs uppercase tracking-[0.45em] text-yellow-500 font-mono font-bold block mb-4">
            The Legend complete
          </span>
          
          <div className="space-y-4">
            <h2 className="font-display text-5xl md:text-8xl text-white uppercase tracking-[0.1em] leading-none font-black">
              THE ART OF <span className="text-yellow-500">PRESSURE</span>
            </h2>
            <p className="font-display text-lg md:text-2xl text-yellow-400/90 uppercase tracking-[0.16em] font-bold mt-4 max-w-xl mx-auto border-y border-white/10 py-6">
              "Some players score runs. <br />
              Some players win matches. <br />
              Virat Kohli created belief."
            </p>
          </div>


        </div>
      </section>

      <ChapterNav />
    </main>
  );
}

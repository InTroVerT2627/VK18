"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeader } from "@/components/navigation/cinematic-header";
import { ChapterNav } from "@/components/navigation/chapter-nav";
import { ParticleField } from "@/components/effects/particle-field";
import trophiesData from "@/data/trophies.json";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Calendar,
  Star,
  Zap,
  Flame,
  Shield,
  Heart,
  Quote,
  TrendingUp,
  MapPin,
  Clock,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Extra detailed dataset for Team Trophies Modal
const trophyExtraDetails: Record<string, {
  matchContext: string;
  contribution: string;
  statistics: string;
  legacyImpact: string;
  venue: string;
  opponent: string;
  finalScore: string;
}> = {
  "u19_2008": {
    "matchContext": "Final against South Africa U19 at Kinrara Academy Oval, Kuala Lumpur. Defending a DLS-adjusted target under rain delays.",
    "contribution": "Captained dynamically, scored 235 runs in the tournament (including a match-winning century vs West Indies), and took key wickets.",
    "statistics": "6 Matches · 235 Runs · Average 47.0 · 1 Century",
    "legacyImpact": "Established Kohli as the future of Indian cricket and initiated his captaincy mythology.",
    "venue": "Kinrara Academy Oval, Kuala Lumpur",
    "opponent": "South Africa U19",
    "finalScore": "India U19 159 & South Africa U19 103 (DLS)"
  },
  "world_cup_2011": {
    "matchContext": "Final vs Sri Lanka at Wankhede Stadium, Mumbai. Chasing 275 under extreme pressure after both openers fell early.",
    "contribution": "Walked in at 31/2. Built a crucial 83-run partnership with Gautam Gambhir, scoring 35 runs to absorb the Sri Lankan spin attack.",
    "statistics": "9 Matches · 282 Runs · 1 Century (100* vs Bangladesh)",
    "legacyImpact": "World Champion at age 22. Lifted Sachin Tendulkar on his shoulders, declaring he carried the nation for 21 years.",
    "venue": "Wankhede Stadium, Mumbai",
    "opponent": "Sri Lanka",
    "finalScore": "Sri Lanka 274/6 vs India 277/4 (India won by 6 wickets)"
  },
  "champions_trophy_2013": {
    "matchContext": "Final vs England at Edgbaston, Birmingham. Reduced to a 20-over shootout due to rain.",
    "contribution": "Top-scored for India with a vital 43 off 34 balls, helping set a defendable total of 129 on a sticky wicket.",
    "statistics": "5 Matches · 144 Runs · Highest Score 58*",
    "legacyImpact": "Cemented India's dominance in overseas conditions and proved his big-match temperament.",
    "venue": "Edgbaston, Birmingham",
    "opponent": "England",
    "finalScore": "India 129/7 vs England 124/8 (India won by 5 runs)"
  },
  "test_mace_2018": {
    "matchContext": "A 5-year era of dominance (2016-2021) in red-ball cricket, conquering conditions in South Africa, England, and Australia.",
    "contribution": "Built a relentless pace-bowling arsenal, elevated fitness benchmarks, and scored double hundreds globally.",
    "statistics": "No.1 Test Team for 42 Consecutive Months · 40 Test Wins as Captain",
    "legacyImpact": "Transformed India into the most feared overseas Test side of the 21st century.",
    "venue": "Global Venues",
    "opponent": "All Test Playing Nations",
    "finalScore": "Ranked No. 1 Test Side in the World"
  },
  "border_gavaskar_2018": {
    "matchContext": "Historic Test Series vs Australia (2018-19). The ultimate frontier of Indian cricket.",
    "contribution": "Captained with tactical aggression, and scored a gritty century (123) on a green pitch at Perth.",
    "statistics": "4 Tests · 282 Runs · 1 Century · 2-1 Historic Series Win",
    "legacyImpact": "First-ever Test series victory in Australia in 71 years of trying.",
    "venue": "Adelaide, Perth, Melbourne, Sydney",
    "opponent": "Australia",
    "finalScore": "India won series 2-1"
  },
  "t20_world_cup_2024": {
    "matchContext": "Final vs South Africa at Kensington Oval, Barbados. India was reeling at 34/3 early on.",
    "contribution": "Anchored the innings with a brilliant 76 off 59 balls, securing a competitive 176 total, winning Player of the Match.",
    "statistics": "8 Matches · 151 Runs · Final MVP 76 (59)",
    "legacyImpact": "Secured the long-awaited ICC trophy and retired from T20Is on the podium at the absolute peak.",
    "venue": "Kensington Oval, Barbados",
    "opponent": "South Africa",
    "finalScore": "India 176/7 vs South Africa 169/8 (India won by 7 runs)"
  },
  "champions_trophy_2025": {
    "matchContext": "Final of the ICC Champions Trophy 2025. Played under lights to secure another global ODI title.",
    "contribution": "Constructed a flawless, anchor half-century to direct a clinical run chase, keeping the scoreboard moving under high-pressure middle overs.",
    "statistics": "5 Matches · 210 Runs · Average 52.5 · 1 Champions Trophy Medal",
    "legacyImpact": "Lifting his second Champions Trophy, 12 years after his first in 2013, proving his enduring all-format dominance.",
    "venue": "Neutral Venue",
    "opponent": "Finalist",
    "finalScore": "India won by 5 wickets"
  },
  "rcb_trophy": {
    "matchContext": "IPL 2025 and 2026 Finals under lights, completing a 17-year campaign of loyalty and near-misses.",
    "contribution": "Finished as the team's highest run scorer, anchoring chases, leading with fierce passion.",
    "statistics": "2 Consecutive IPL Titles (2025, 2026) · 9,600+ All-Time Runs",
    "legacyImpact": "Broke the ultimate franchise curse and cemented his eternal legacy as Bengaluru's greatest sporting icon.",
    "venue": "Chinnaswamy Stadium & Neutral Venues",
    "opponent": "IPL Finalists",
    "finalScore": "RCB Back-to-Back IPL Champions"
  }
};

const trophiesList = [
  { key: "u19_2008", img: "/assets/trophies/u19_2008.jpg", order: 1 },
  { key: "world_cup_2011", img: "/assets/trophies/world_cup_2011.jpg", order: 2 },
  { key: "champions_trophy_2013", img: "/assets/trophies/champions_trophy_2013.jpg", order: 3 },
  { key: "test_mace_2018", img: "/assets/trophies/test_mace_2018.jpg", order: 4 },
  { key: "border_gavaskar_2018", img: "/assets/trophies/border_gavaskar_2018.jpg", order: 5 },
  { key: "t20_world_cup_2024", img: "/assets/trophies/t20_world_cup_2024.jpg", order: 6 },
  { key: "champions_trophy_2025", img: "/assets/trophies/champions_trophy_2025.jpg", order: 7 },
  { key: "rcb_trophy", img: "/assets/trophies/rcb_trophy.jpg", order: 8 }
];

// Stats Dashboard dataset (Section 1)
const statsDashboard = [
  { label: "Matches", value: "559", category: "International", icon: Target },
  { label: "Runs", value: "28,215", category: "Career Total", icon: Zap },
  { label: "Centuries", value: "85", category: "Across Formats", icon: Trophy },
  { label: "Half Centuries", value: "146", category: "International", icon: Medal },
  { label: "Wickets", value: "13", category: "International", icon: Flame },
  { label: "ICC Rankings", value: "No. 1", category: "Test, ODI, T20I", icon: Crown },
  { label: "Years at No. 1", value: "5+", category: "Test Batsman / Team", icon: Calendar },
  { label: "Total Awards", value: "100+", category: "ICC, Wisden, BCCI", icon: Award },
  { label: "Total Trophies", value: "8", category: "National & Franchise", icon: Shield },
  { label: "Total Records", value: "50+", category: "World Milestones", icon: Sparkles }
];

// Man of the Match dataset (Section 2)
const momStats = {
  total: 93,
  odi: 45,
  test: 10,
  t20i: 16,
  ipl: 22,
  highlights: [
    {
      title: "82* vs Australia",
      venue: "Mohali (2016 T20 WC)",
      performance: "82* off 51 balls",
      desc: "An incredible chase under pressure, single-handedly carrying India to the semi-finals in what Kohli calls his greatest T20I innings.",
      tag: "Chase Masterpiece"
    },
    {
      title: "183 vs Pakistan",
      venue: "Mirpur (2012 Asia Cup)",
      performance: "183 off 148 balls",
      desc: "Chased down a mammoth 330 in hostile conditions, establishing him as the ultimate white-ball successor.",
      tag: "Highest ODI Score"
    },
    {
      title: "76 vs South Africa",
      venue: "Barbados (2024 T20 WC Final)",
      performance: "76 off 59 balls",
      desc: "Anchored the innings in a high-pressure final after early wickets, winning the Player of the Match and lifting the World Cup.",
      tag: "Championship Anchor"
    },
    {
      title: "133* vs Sri Lanka",
      venue: "Hobart (2012 CB Series)",
      performance: "133* off 86 balls",
      desc: "Smashed Sri Lanka's defense, chasing 320 in just 36.4 overs with surgical precision to keep India alive in the series.",
      tag: "Gear Shift Clinic"
    }
  ]
};

// Player of the Series dataset (Section 3)
const seriesAwards = [
  { name: "ICC Under-19 World Cup", year: "2008", format: "ODI", reason: "Led India U19 to victory in Malaysia, scored 235 runs, establishing his early authority.", highlight: true },
  { name: "ACC Asia Cup T20", year: "2016", format: "T20", reason: "Scored 176 runs at an average of 88.00, orchestrating flawless run-chases in Bangladesh.", highlight: true },
  { name: "India vs New Zealand ODI Series", year: "2026", format: "ODI", reason: "Scored 340+ runs in a 3-0 clean sweep, proving his longevity and dominant run-making.", highlight: false },
  { name: "India vs Sri Lanka ODI Series", year: "2025", format: "ODI", reason: "Scored back-to-back centuries to anchor a historic bilateral home sweep.", highlight: false },
  { name: "India vs South Africa ODI Series", year: "2013", format: "ODI", reason: "Scored crucial runs in hostile away pitches, asserting himself as India's best batsman.", highlight: false },
  { name: "India vs New Zealand ODI Series", year: "2016", format: "ODI", reason: "Aggregated 358 runs including a legendary 154* at Mohali.", highlight: false }
];

// ICC Decade/Individual Awards dataset (Section 4)
const iccAwards = [
  { title: "ICC Men's Cricketer of the Decade", subtitle: "Sir Garfield Sobers Award", years: "2011–2020", desc: "Awarded to the overall most dominant player of the decade, scoring 20,396 international runs.", icon: Crown },
  { title: "ICC Men's ODI Cricketer of the Decade", subtitle: "Limited Overs Pinnacle", years: "2011–2020", desc: "Recognized as the defining ODI player of the generation with 39 centuries in the decade.", icon: Award },
  { title: "Sir Garfield Sobers Trophy", subtitle: "ICC Cricketer of the Year", years: "2017, 2018", desc: "Back-to-back global honors for all-format batting and leadership excellence.", icon: Trophy },
  { title: "ICC ODI Player of the Year", subtitle: "ODI King", years: "2012, 2017, 2018, 2023", desc: "A record 4-time winner showcasing ultimate mastery in the 50-over format.", icon: Medal },
  { title: "ICC Test Player of the Year", subtitle: "Red-Ball Dominance", years: "2018", desc: "Led India to overseas victories and finished as the top run-scorer in Test cricket.", icon: Shield },
  { title: "ICC Spirit of Cricket Award", subtitle: "Sportsmanship Honor", years: "2019", desc: "Honored for asking the Wankhede crowd to applaud Steve Smith instead of booing him.", icon: Heart }
];

// World No. 1 Era dataset (Section 5)
const reignEra = {
  stats: [
    { label: "Days at No. 1 (ODI)", value: "1,258", desc: "Consecutive days as ODI King" },
    { label: "Peak ODI Rating", value: "911", desc: "One of the highest ratings in history" },
    { label: "Consecutive Months (Test Team No. 1)", value: "42", desc: "Led India to ultimate red-ball glory" },
    { label: "Peak Test Rating", value: "937", desc: "Highest ever rating by an Indian batsman" },
    { label: "Peak T20I Rating", value: "897", desc: "Dominating shortest format (2014)" }
  ],
  periods: [
    { format: "ODI Kingdom", duration: "2017 – 2021", details: "Maintained a continuous grip on the No. 1 ranking, weathering all challenges with a 60+ average." },
    { format: "Test Dominance", duration: "2016 – 2020", details: "India held the ICC Test Championship Mace under his captaincy, undefeated in home series." },
    { format: "T20I Peak", duration: "2014 – 2016", details: "Two consecutive Player of the Tournament awards in ICC T20 World Cups while ranked No. 1 globally." }
  ]
};

// Records Vault dataset (Section 6)
const recordVault = [
  { title: "Fastest to 10k, 11k, 12k, 13k ODI Runs", desc: "Shattered every speed milestone in ODI history by innings played.", record: "Fastest in History" },
  { title: "Most ODI Centuries in Run Chases", desc: "Compiled 27 centuries while chasing, with 18 of them leading to victory.", record: "27 Chase Centuries" },
  { title: "Most Centuries in ODI History", desc: "Passed Sachin Tendulkar's long-standing record of 49 centuries, reaching 54.", record: "54 ODI Centuries" },
  { title: "Fastest to 20k and 25k International Runs", desc: "Reached the all-format milestones in fewer innings than any player in history.", record: "All-Format Speed King" },
  { title: "Most Runs in a Single IPL Season", desc: "Smashed 973 runs in the 2016 season, including 4 centuries, a record that stands alone.", record: "973 Runs (2016)" },
  { title: "Most Double Hundreds as Test Captain", desc: "Hit 7 double-centuries while leading the Indian Test side, setting a captaincy record.", record: "7 Double Tons" },
  { title: "Most Runs in ICC Tournaments", desc: "The highest aggregate run-scorer across ODI & T20 World Cups and Champions Trophies.", record: "Global Tournament MVP" }
];

// RCB Legacy dataset (Section 8)
const rcbLegacy = {
  debut: "2008",
  runs: "9,336+",
  centuries: "9",
  orangeCaps: "2 (2016, 2024)",
  championships: "2 (2025, 2026)",
  highlights: [
    { title: "17+ Years of Unwavering Loyalty", text: "The only player in IPL history to play for a single franchise for 19 consecutive seasons." },
    { title: "The Captaincy Era (2013-2021)", text: "Led the franchise with fierce passion, elevating RCB into a global sporting brand." },
    { title: "Back-to-Back Championships", text: "Guided RCB to its first-ever IPL titles in 2025 and 2026, fulfilling his promise to Bengaluru." }
  ]
};

// National Honours dataset (Section 9)
const nationalHonours = [
  { name: "Arjuna Award", year: "2013", desc: "Awarded by the Government of India for outstanding achievement in National sports.", prestige: "State Sporting Honor" },
  { name: "Padma Shri", year: "2017", desc: "India's fourth highest civilian award, recognizing his contributions to cricket and nationhood.", prestige: "Civilian Honor" },
  { name: "Major Dhyan Chand Khel Ratna", year: "2018", desc: "India's highest sporting honor, presented at the Rashtrapati Bhavan.", prestige: "Highest Sporting Honor" }
];

export default function TrophyRoomPage() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null);

  const selectedTrophy = selectedKey ? (trophiesData as any)[selectedKey] : null;
  const selectedExtra = selectedKey ? trophyExtraDetails[selectedKey] : null;

  return (
    <main className="relative min-h-screen theme-trophy text-white flex flex-col justify-between overflow-x-hidden font-body select-none">
      
      {/* Global CSS for Sweep Lines and Highlights */}
      <style>{`
        @keyframes sweepLine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .animate-sweep {
          animation: sweepLine 6s ease-in-out infinite;
        }
        .gold-glow {
          box-shadow: 0 0 40px rgba(234, 179, 8, 0.1), 0 0 100px rgba(234, 179, 8, 0.05);
        }
        .red-gold-glow {
          box-shadow: 0 0 40px rgba(220, 38, 38, 0.15), 0 0 100px rgba(234, 179, 8, 0.1);
        }
        .glass-premium {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(234, 179, 8, 0.12);
          backdrop-filter: blur(20px);
        }
        .glass-premium:hover {
          border-color: rgba(234, 179, 8, 0.3);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
        }
        .timeline-line {
          background: linear-gradient(180deg, rgba(234, 179, 8, 0.6) 0%, rgba(234, 179, 8, 0.1) 100%);
        }
        /* Mobile Trophy Room */
        @keyframes mobileGoldPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(234,179,8,0.15); }
          50% { box-shadow: 0 0 28px rgba(234,179,8,0.35); }
        }
        @keyframes mobileShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .mobile-trophy-glow {
          animation: mobileGoldPulse 3s ease-in-out infinite;
        }
        .mobile-shimmer-text {
          background: linear-gradient(90deg, #f59e0b 0%, #fde68a 40%, #f59e0b 60%, #b45309 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: mobileShimmer 3s linear infinite;
        }
      `}</style>

      {/* Luxury lighting background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[220px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleField />
      </div>

      <div className="relative z-50">
        <CinematicHeader />
      </div>

      {/* ============================================================
           MOBILE-ONLY TROPHY ROOM (hidden on md+)
           ============================================================ */}
      <div className="block md:hidden relative z-10 flex-grow px-4 pt-24 pb-16 w-full">

        {/* Mobile Hero */}
        <section className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full uppercase text-[9px] tracking-[0.3em] font-bold mb-4">
              <Crown className="w-3 h-3" /> Career Exhibition
            </span>
            <h1 className="font-display text-4xl uppercase tracking-[0.12em] text-white leading-none mt-3">
              TROPHY <span className="text-yellow-400">ROOM</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-500/90 font-bold mt-2">The Legacy of Virat Kohli</p>

            {/* Portrait Card */}
            <div className="mt-6 mx-auto w-48 h-60 rounded-2xl overflow-hidden border border-yellow-500/30 relative mobile-trophy-glow">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero/trophy-room-portrait.jpg')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h3 className="font-display text-base uppercase tracking-wider text-white">Virat Kohli</h3>
                <p className="text-[8px] uppercase tracking-widest text-white/50">The King of the Modern Era</p>
              </div>
            </div>

            <p className="text-white/50 text-xs leading-relaxed mt-5 px-2">
              A curated gallery of records, accolades, and team honors that define one of cricket's immortal careers.
            </p>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent mb-10" />

        {/* MOBILE: Career Stats Grid */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 01 // METRIC SYSTEM</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">Career At A Glance</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {statsDashboard.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-zinc-900/60 border border-yellow-500/15 rounded-xl p-4 flex flex-col items-center text-center"
                >
                  <div className="h-8 w-8 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center mb-2">
                    <Icon className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <span className="text-2xl font-display text-white font-bold uppercase tracking-tight block">{stat.value}</span>
                  <span className="text-[9px] uppercase tracking-widest text-yellow-500 font-bold block mt-1">{stat.label}</span>
                  <span className="text-[8px] uppercase tracking-widest text-white/35 block mt-0.5">{stat.category}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: Man of the Match */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 02 // MATCH WINNER ARCHIVE</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">Man of the Match</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>

          {/* Format totals */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[{label: "ODI Awards", val: momStats.odi}, {label: "Test Awards", val: momStats.test}, {label: "T20I Awards", val: momStats.t20i}, {label: "IPL Awards", val: momStats.ipl}].map((item, i) => (
              <div key={i} className="bg-zinc-900/60 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-2xl font-display text-white font-bold block">{item.val}</span>
                <span className="text-[9px] uppercase tracking-widest text-yellow-400/80 block mt-1">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/25 rounded-xl p-4 text-center mb-6">
            <span className="text-[9px] uppercase tracking-[0.2em] text-yellow-400 block font-bold">Combined Total</span>
            <span className="text-4xl font-display font-extrabold text-white block mt-1">{momStats.total} Awards</span>
          </div>

          {/* Highlight cards - vertical */}
          <div className="space-y-4">
            {momStats.highlights.map((h, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-zinc-900/40 border border-yellow-500/15 rounded-2xl p-5"
              >
                <span className="bg-yellow-500/10 border border-yellow-500/20 text-[8px] uppercase tracking-widest font-bold text-yellow-400 px-2 py-0.5 rounded-full inline-block mb-2">{h.tag}</span>
                <h4 className="font-display text-lg uppercase text-white">{h.title}</h4>
                <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-bold">{h.venue} · {h.performance}</p>
                <p className="text-xs text-white/60 leading-relaxed font-body mt-3">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: Player of the Series */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 03 // SERIES DOMINATOR</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">Player of the Series</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>
          <div className="space-y-4">
            {seriesAwards.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`border rounded-2xl p-5 relative ${
                  s.highlight
                    ? "bg-gradient-to-b from-yellow-500/10 to-zinc-950 border-yellow-500/40"
                    : "bg-zinc-900/40 border-white/10"
                }`}
              >
                {s.highlight && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[8px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">Featured</div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500 font-semibold">{s.year}</span>
                  <span className="text-[8px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-white/50">{s.format}</span>
                </div>
                <h3 className="font-display text-base uppercase tracking-wider text-white">{s.name}</h3>
                <p className="text-xs text-white/60 font-body leading-relaxed mt-2">{s.reason}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: ICC Crown Jewels */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 04 // ICC CROWN JEWELS</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">The ICC Crown Jewels</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>
          <div className="space-y-4">
            {iccAwards.map((award, idx) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-gradient-to-b from-zinc-900/60 to-black border border-yellow-500/20 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-full border border-yellow-500/30 bg-zinc-950 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-yellow-500 font-bold block">{award.years} Triumph</span>
                    <h3 className="font-display text-sm uppercase tracking-wide text-white mt-0.5 leading-tight">{award.title}</h3>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 block mt-0.5">{award.subtitle}</span>
                    <p className="text-[11px] text-white/60 leading-relaxed font-body mt-2">{award.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: World No.1 Era */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 05 // THE REIGN TIMELINE</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">The World No. 1 Era</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>
          <div className="bg-zinc-900/60 border border-yellow-500/20 rounded-2xl p-5 mb-4">
            <div className="space-y-3">
              {reignEra.stats.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <div>
                    <span className="text-white font-bold text-xs block">{s.label}</span>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">{s.desc}</span>
                  </div>
                  <span className="text-lg font-display text-yellow-400 font-bold ml-3">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {reignEra.periods.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-zinc-900/30 border border-white/10 rounded-xl p-4 flex gap-3"
              >
                <div className="h-8 w-8 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center font-display text-sm text-yellow-400 font-bold flex-shrink-0">0{idx+1}</div>
                <div className="flex-1">
                  <h4 className="font-display text-sm uppercase text-white">{p.format}</h4>
                  <span className="text-[9px] font-mono text-yellow-400 uppercase tracking-widest font-bold">{p.duration}</span>
                  <p className="text-[11px] text-white/50 font-body mt-1">{p.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: World Record Vault */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 06 // WORLD RECORDS</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">The Record Vault</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>
          <div className="space-y-3">
            {recordVault.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-yellow-500/20 rounded-xl p-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600" />
                <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-bold block font-mono mb-1">Official World Record</span>
                <h4 className="font-display text-sm uppercase tracking-wide text-white">{rec.title}</h4>
                <p className="text-[11px] text-white/60 leading-relaxed font-body mt-2">{rec.desc}</p>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-white/40">Vault Registration</span>
                  <span className="bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-mono font-bold text-yellow-400 px-2 py-0.5 rounded">{rec.record}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: Team Trophies – Premium Trophy Gallery */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 07 // TEAM CHAMPIONSHIPS</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">The Championships</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
            <p className="text-white/50 text-xs mt-3 px-2">Tap any trophy to inspect match details, venues, and Kohli's final contributions.</p>
          </div>

          {/* Mobile Trophy Timeline - vertical */}
          <div className="relative pl-6 before:content-[''] before:absolute before:left-3 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-yellow-500/60 before:via-yellow-500/20 before:to-transparent">
            {trophiesList.map((t, idx) => {
              const trophy = (trophiesData as any)[t.key];
              return (
                <motion.div
                  key={t.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="relative mb-6 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[21px] top-5 w-3.5 h-3.5 rounded-full border-2 border-yellow-500 bg-black" />
                  <button
                    onClick={() => setSelectedKey(t.key)}
                    className="w-full text-left bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-yellow-500/20 hover:border-yellow-500/50 rounded-2xl p-4 transition-all duration-300 flex gap-4 items-center mobile-trophy-glow"
                  >
                    {/* Trophy image thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.img} alt={trophy.trophyName} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-yellow-500/5 mix-blend-color-burn" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest block">{trophy.year}</span>
                      <h3 className="font-display text-sm uppercase tracking-wide text-white mt-0.5 leading-tight">{trophy.trophyName}</h3>
                      <span className="text-[9px] uppercase tracking-widest text-white/40 block mt-1">{trophy.careerStage}</span>
                      <p className="text-[10px] text-white/55 leading-relaxed font-body mt-1.5 line-clamp-2">{trophy.historicalImportance}</p>
                      <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-bold mt-2 block">Tap to inspect →</span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-10" />

        {/* MOBILE: RCB Legacy */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-red-500 uppercase font-bold">EXHIBIT 08 // CHINNASWAMY HEARTBEAT</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">One Franchise. One King.</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-3" />
          </div>
          <div className="bg-zinc-950 border border-red-500/25 rounded-2xl p-5 mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 font-display text-5xl text-red-500/5 font-extrabold select-none">RCB</div>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {[
                {label: "Debut Season", val: rcbLegacy.debut, color: "text-red-400"},
                {label: "All-Time Runs", val: rcbLegacy.runs, color: "text-red-400"},
                {label: "Centuries", val: rcbLegacy.centuries, color: "text-red-400"},
                {label: "Orange Caps", val: rcbLegacy.orangeCaps, color: "text-red-400"},
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <span className={`text-xl font-display font-bold block ${item.color}`}>{item.val}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block mt-0.5">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {rcbLegacy.highlights.map((h, idx) => (
              <div key={idx} className="bg-zinc-900/30 border border-white/5 hover:border-red-500/30 rounded-xl p-4 flex gap-3">
                <div className="h-8 w-8 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center font-display text-sm text-red-400 font-bold flex-shrink-0">{idx+1}</div>
                <div>
                  <h4 className="font-display text-sm uppercase tracking-wider text-white">{h.title}</h4>
                  <p className="text-[11px] text-white/60 leading-relaxed font-body mt-1">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* MOBILE: National Honours */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-yellow-500 uppercase font-bold">EXHIBIT 09 // STATE HONOURS</span>
            <h2 className="font-display text-2xl uppercase tracking-wider text-white mt-1">The Nation Salutes</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3" />
          </div>
          <div className="space-y-4">
            {nationalHonours.map((n, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-zinc-950 border border-yellow-500/25 rounded-2xl p-5 flex gap-4 items-center"
              >
                <div className="w-14 h-14 rounded-full border-2 border-yellow-500/40 bg-zinc-950 flex items-center justify-center flex-shrink-0">
                  <Medal className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <span className="text-[8px] uppercase tracking-widest text-yellow-500 font-bold block">{n.prestige}</span>
                  <h3 className="font-display text-lg uppercase text-white mt-0.5">{n.name}</h3>
                  <span className="text-[9px] font-mono text-white/40 block">Year Awarded: {n.year}</span>
                  <p className="text-[11px] text-white/60 leading-relaxed font-body mt-1.5">{n.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MOBILE: Legacy Wall */}
        <section className="py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.06)_0%,_transparent_60%)] pointer-events-none" />
          <span className="text-[9px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold block">FINAL FRAME</span>
          <h3 className="font-display text-2xl uppercase tracking-[0.2em] text-white mt-2">The King of the Modern Era</h3>
          <div className="py-6">
            <h2 className="font-display text-5xl uppercase font-black tracking-[0.08em] text-white leading-none">
              VIRAT <span className="text-yellow-400">KOHLI</span>
            </h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-yellow-500 mt-3 font-bold">Champion. Run Machine. Chase Master. King.</p>
          </div>
          <div className="max-w-xs mx-auto py-5 border-y border-white/10">
            <p className="text-base text-white/80 font-body italic leading-relaxed">"Records may be broken. Legacies live forever."</p>
          </div>
          <p className="text-white/30 text-[9px] uppercase tracking-widest pt-4 block">Virat Kohli Exhibition Museum · 2008 – 2026</p>
        </section>

      </div>

      {/* ============================================================
           DESKTOP-ONLY TROPHY ROOM (hidden below md)
           ============================================================ */}
      {/* Main Chapter Content Container */}
      <div className="hidden md:block relative z-10 flex-grow px-6 py-28 lg:px-16 max-w-[1440px] mx-auto w-full">
        
        {/* ==========================================================
            OPENING SECTION (HERO)
           ========================================================== */}
        <section className="min-h-[90vh] flex flex-col justify-center items-center py-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Title / Quote Side */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 px-4 py-1.5 rounded-full uppercase text-[10px] tracking-[0.3em] font-bold">
                <Crown className="w-3.5 h-3.5" /> Career Exhibition
              </div>
              
              <div className="space-y-4">
                <h1 className="font-display text-5xl md:text-8xl uppercase tracking-[0.15em] text-white leading-none">
                  TROPHY <span className="text-yellow-400">ROOM</span>
                </h1>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-yellow-500/90 font-bold">
                  The Legacy of Virat Kohli
                </p>
              </div>

              {/* Luxury Quote Display */}
              <div className="relative pl-8 border-l border-yellow-500/40 py-4 max-w-xl">
                <Quote className="absolute top-2 left-2 w-8 h-8 text-yellow-500/10 -z-10" />
                <p className="text-lg md:text-xl text-white/80 font-body italic leading-relaxed">
                  "They remember champions for a season. They remember legends for generations."
                </p>
              </div>

              <p className="text-white/60 font-body text-sm md:text-base leading-relaxed max-w-2xl">
                Step into a curated gallery of records, accolades, and team honors that define one of cricket's immortal careers. A tribute in gold and steel to the Chase Master, the Leader, and the King.
              </p>
            </div>

            {/* Premium Kohli Portrait Side */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="relative w-80 h-[420px] rounded-3xl overflow-hidden border border-yellow-500/30 p-2 bg-gradient-to-b from-yellow-500/10 to-transparent gold-glow animate-float"
              >
                <div className="absolute inset-0 z-0 bg-cover bg-center brightness-90" style={{ backgroundImage: "url('/images/hero/trophy-room-portrait.jpg')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                
                {/* Frame border highlight lines */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/5 rounded-2xl z-20 pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 z-30 text-left">

                  <h3 className="font-display text-xl uppercase tracking-wider text-white">Virat Kohli</h3>
                  <p className="text-[9px] uppercase tracking-widest text-white/50">The King of the Modern Era</p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ==========================================================
            SECTION 1 – CAREER AT A GLANCE
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 01 // METRIC SYSTEM</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              Career At A Glance
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {statsDashboard.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="glass-premium p-6 rounded-2xl flex flex-col justify-between items-center text-center group transition-all duration-300 hover:shadow-[0_10px_30px_rgba(234,179,8,0.08)]"
                >
                  <div className="h-10 w-10 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center mb-4 group-hover:border-yellow-500/50 transition-colors">
                    <Icon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-display text-white group-hover:text-yellow-400 transition-colors font-bold uppercase tracking-tight block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-yellow-500 font-bold block mt-2">
                      {stat.label}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 block mt-1">
                      {stat.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================
            SECTION 2 – MAN OF THE MATCH COLLECTION
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 02 // MATCH WINNER ARCHIVE</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              Man of the Match Collection
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* The Trophy Shelf Display */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                  The Silverware Vault
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Virat Kohli's match-winning capabilities are recorded in a vast array of individual awards. With {momStats.total} total player of the match awards, he sits among the absolute elite.
                </p>
              </div>

              {/* Cabinet shelves */}
              <div className="space-y-4 bg-zinc-950 border border-yellow-500/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none" />
                
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs uppercase tracking-widest text-white/50">Format Shelf</span>
                  <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">Silver Pedestals</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-display text-white font-bold block">{momStats.odi}</span>
                    <span className="text-[9px] uppercase tracking-widest text-yellow-400/80 block mt-1">ODI Awards</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-display text-white font-bold block">{momStats.test}</span>
                    <span className="text-[9px] uppercase tracking-widest text-yellow-400/80 block mt-1">Test Awards</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-display text-white font-bold block">{momStats.t20i}</span>
                    <span className="text-[9px] uppercase tracking-widest text-yellow-400/80 block mt-1">T20I Awards</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-display text-white font-bold block">{momStats.ipl}</span>
                    <span className="text-[9px] uppercase tracking-widest text-yellow-400/80 block mt-1">IPL Awards</span>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center mt-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-yellow-400 block font-bold">Combined Total</span>
                  <span className="text-4xl font-display font-extrabold text-white block mt-1">{momStats.total} Awards</span>
                </div>
              </div>
            </div>

            {/* Highlights Gallery */}
            <div className="lg:col-span-7 flex overflow-x-auto gap-6 md:grid md:grid-cols-2 pb-4 timeline-strip select-none items-stretch">
              {momStats.highlights.map((h, idx) => (
                <div 
                  key={idx}
                  className="bg-zinc-900/30 border border-yellow-500/15 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-500/30 transition-all duration-300 relative group overflow-hidden flex-shrink-0 w-[285px] md:w-auto"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-yellow-500/20 font-bold select-none uppercase">
                    COLLECTIBLE
                  </div>
                  
                  <div>
                    <span className="bg-yellow-500/10 border border-yellow-500/20 text-[8px] uppercase tracking-widest font-bold text-yellow-400 px-2 py-0.5 rounded-full inline-block mb-3">
                      {h.tag}
                    </span>
                    <h4 className="font-display text-xl uppercase text-white group-hover:text-yellow-400 transition-colors">
                      {h.title}
                    </h4>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-bold">
                      {h.venue} · {h.performance}
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed font-body mt-4">
                      {h.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-[8px] uppercase tracking-wider text-yellow-400 font-bold">
                    <span>Museum Registered Entry</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================================
            SECTION 3 – PLAYER OF THE SERIES COLLECTION
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 03 // SERIES DOMINATOR</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              Player of the Series Awards
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="flex overflow-x-auto gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 pb-4 timeline-strip select-none items-stretch">
            {seriesAwards.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`border p-6 rounded-2xl relative flex flex-col justify-between overflow-hidden group flex-shrink-0 w-[285px] md:w-auto ${
                  s.highlight 
                    ? "bg-gradient-to-b from-yellow-500/10 to-zinc-950 border-yellow-500/40 gold-glow" 
                    : "bg-zinc-950 border-white/10 hover:border-yellow-500/30"
                }`}
              >
                {s.highlight && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[8px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                    Featured
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500 font-semibold">{s.year}</span>
                    <span className="text-[8px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-white/50">{s.format}</span>
                  </div>

                  <h3 className="font-display text-lg uppercase tracking-wider text-white group-hover:text-yellow-400 transition-colors">
                    {s.name}
                  </h3>
                  
                  <p className="text-xs text-white/60 font-body leading-relaxed mt-4">
                    {s.reason}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between text-[8px] uppercase tracking-widest text-white/40">
                  <span>Certificate ID: POS-{s.year}-{idx}</span>
                  <Medal className="w-3.5 h-3.5 text-yellow-500/60" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            SECTION 4 – ICC HALL OF FAME ACHIEVEMENTS
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 04 // THE ICC CROWN JEWELS</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              The ICC Crown Jewels
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="flex overflow-x-auto gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 pb-4 timeline-strip select-none items-stretch">
            {iccAwards.map((award, idx) => {
              const Icon = award.icon;
              return (
                <div 
                  key={idx}
                  className="bg-gradient-to-b from-zinc-900/60 to-black border border-yellow-500/20 rounded-3xl p-8 flex flex-col justify-between items-center text-center hover:border-yellow-500/50 transition-all duration-300 relative group overflow-hidden shadow-2xl flex-shrink-0 w-[285px] md:w-auto"
                >
                  {/* Spotlight ray reflection */}
                  <div className="absolute top-0 inset-x-0 h-[80px] bg-gradient-to-b from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Casing visual frame */}
                  <div className="absolute inset-4 border border-yellow-500/5 rounded-2xl pointer-events-none group-hover:border-yellow-500/10 transition-colors" />

                  <div className="space-y-6">
                    {/* Glowing Crown Holder Pedestal */}
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-yellow-500/15 transition-all" />
                      <div className="w-16 h-16 rounded-full border border-yellow-500/30 bg-zinc-950 flex items-center justify-center relative z-10 group-hover:border-yellow-500 transition-colors">
                        <Icon className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="absolute bottom-0 w-12 h-1 bg-yellow-500/40 rounded-full blur-[2px]" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500 font-bold block">
                        {award.years} Triumph
                      </span>
                      <h3 className="font-display text-xl uppercase tracking-wider text-white">
                        {award.title}
                      </h3>
                      <span className="text-[9px] uppercase tracking-widest text-white/50 block">
                        {award.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed font-body px-2">
                      {award.desc}
                    </p>
                  </div>

                  <div className="mt-8 text-[8px] uppercase tracking-widest text-yellow-500 font-bold border-t border-yellow-500/10 pt-4 w-full">
                    Official ICC Legend Showcase
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================
            SECTION 5 – WORLD NUMBER 1 ERA
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 05 // THE REIGN TIMELINE</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              The World Number 1 Era
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Summary details panel */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-zinc-950 border border-yellow-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 font-display text-5xl text-yellow-500/5 font-extrabold select-none uppercase">
                REIGN
              </div>

              <div className="space-y-6">
                <span className="eyebrow border-yellow-500/20 bg-yellow-500/5 text-yellow-400">Summit Dominance</span>
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                  The King's Era
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  For multiple years, Virat Kohli occupied the peak of the ICC Player Rankings across formats. In the 50-over kingdom, his reign was almost unchallenged.
                </p>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/5">
                {reignEra.stats.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-white font-bold block">{s.label}</span>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest">{s.desc}</span>
                    </div>
                    <span className="text-base font-display text-yellow-400 font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* King's timeline layout */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
              {reignEra.periods.map((p, idx) => (
                <div 
                  key={idx}
                  className="bg-zinc-900/30 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center font-display text-lg text-yellow-400 font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-display text-lg uppercase text-white group-hover:text-yellow-400 transition-colors">
                        {p.format}
                      </h4>
                      <p className="text-xs text-white/50 font-body">
                        {p.details}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:text-right">
                    <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-bold block">
                      Reign Period
                    </span>
                    <span className="text-base font-display text-white font-bold block">
                      {p.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================================
            SECTION 6 – WORLD RECORD VAULT
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 06 // GUINNESS & HISTORICAL ARCHIVES</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              The World Record Vault
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordVault.map((rec, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setExpandedRecord(expandedRecord === idx ? null : idx);
                }}
                className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-yellow-500/20 hover:border-yellow-500/40 rounded-2xl p-6 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between cursor-pointer md:cursor-default"
              >
                {/* Plaque golden sheen */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600" />
                <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:animate-sweep pointer-events-none" />

                <div className="space-y-4">
                  <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-bold block font-mono">
                    Official World Record
                  </span>
                  <h4 className="font-display text-lg uppercase tracking-wider text-white group-hover:text-yellow-400 transition-colors">
                    {rec.title}
                  </h4>
                  <p className={`text-xs text-white/60 leading-relaxed font-body transition-all duration-300 ${
                    expandedRecord === idx ? "block mt-3" : "hidden md:block mt-3"
                  }`}>
                    {rec.desc}
                  </p>
                  <div className="md:hidden pt-1">
                    <span className="text-[9px] uppercase tracking-wider text-yellow-500/80 font-bold block">
                      {expandedRecord === idx ? "Collapse Details ×" : "Tap to Expand →"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-white/40">Vault Registration</span>
                  <span className="bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-mono font-bold text-yellow-400 px-2.5 py-0.5 rounded">
                    {rec.record}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            SECTION 7 – TEAM TROPHIES (THE CHAMPIONSHIPS)
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 07 // TEAM CHAMPIONSHIPS</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              The Championships
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
            <p className="text-white/60 font-body text-xs md:text-sm mt-4 max-w-2xl mx-auto">
              Inspect the glass stands below representing the titles Virat Kohli has clinched globally. Click any showcase pedestal to inspect match scorelines, venues, and his key final contributions.
            </p>
          </div>

          {/* Chronological Timeline: THE ROAD TO GREATNESS */}
          <div className="mb-16 bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-display text-4xl text-yellow-500/5 select-none font-extrabold uppercase">
              Timeline
            </div>
            <h3 className="font-display text-xl uppercase tracking-widest text-yellow-400 mb-6 text-center md:text-left">
              The Road to Greatness
            </h3>
            
            {/* Timeline Nodes container */}
            <div className="flex overflow-x-auto gap-4 pb-4 timeline-strip select-none items-center">
              {trophiesList.map((t, idx) => {
                const trophy = (trophiesData as any)[t.key];
                return (
                  <div key={t.key} className="flex items-center flex-shrink-0">
                    <button
                      onClick={() => setSelectedKey(t.key)}
                      className="text-left group focus:outline-none flex flex-col items-center bg-black/40 hover:bg-black/60 border border-white/10 hover:border-yellow-400/40 rounded-2xl p-4 transition-all duration-300 w-44 hover:shadow-[0_12px_24px_rgba(251,191,36,0.08)]"
                    >
                      <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest block mb-2">{trophy.year}</span>
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/5 bg-zinc-950 mb-3 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.img} alt={trophy.trophyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-yellow-500/5 mix-blend-color-burn opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="font-display text-xs text-white uppercase font-bold tracking-wider text-center line-clamp-2 w-full group-hover:text-yellow-400 transition-colors">
                        {trophy.trophyName}
                      </span>
                    </button>

                    {idx < trophiesList.length - 1 && (
                      <div className="w-8 h-[2px] bg-gradient-to-r from-yellow-500 to-amber-600 opacity-30 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Glass Display Stands Showcase */}
          <div className="flex overflow-x-auto gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 pb-6 timeline-strip select-none items-stretch">
            {trophiesList.map((t, idx) => {
              const trophy = (trophiesData as any)[t.key];
              return (
                <motion.div
                  key={t.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => setSelectedKey(t.key)}
                  className="relative bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 border border-white/10 hover:border-yellow-400/40 rounded-3xl p-6 flex flex-col justify-between items-center text-center cursor-pointer shadow-xl hover:shadow-[0_24px_50px_rgba(251,191,36,0.12)] hover:-translate-y-3 transition-all duration-500 group overflow-hidden flex-shrink-0 w-[290px] md:w-auto"
                >
                  {/* Spotlight ray reflection effect */}
                  <div className="absolute top-0 inset-x-0 h-[80px] bg-gradient-to-b from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none" />

                  <div className="w-full">
                    <div className="flex justify-between items-center w-full mb-6 text-[10px] uppercase font-bold text-white/40 tracking-widest">
                      <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-2.5 py-0.5 rounded-full">
                        {trophy.year}
                      </span>
                      <span>Cabinet {idx + 1}</span>
                    </div>

                    {/* 3D Glass pedestal stand */}
                    <div className="relative w-44 h-52 mx-auto mb-6 flex justify-center items-end">
                      {/* The Trophy Floating Image */}
                      <div className="absolute bottom-6 w-36 h-44 rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-black/60 z-20 group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.img} alt={trophy.trophyName} className="w-full h-full object-cover" />
                      </div>

                      {/* Pedestal Stand Base */}
                      <div className="w-32 h-6 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/20 rounded-lg shadow-inner z-10 animate-pulse" />
                      {/* Glass cylindrical casing reflection overlay */}
                      <div className="absolute inset-x-4 top-2 bottom-0 border-x border-t border-white/5 bg-gradient-to-r from-white/0 via-white/3 to-white/0 rounded-t-3xl z-30 pointer-events-none" />
                    </div>

                    <h3 className="font-display text-lg lg:text-xl text-white uppercase tracking-wider font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                      {trophy.trophyName}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-500 font-bold block mb-4">
                      {trophy.careerStage}
                    </span>
                    <p className="text-white/60 font-body text-xs leading-relaxed line-clamp-3 px-2">
                      {trophy.historicalImportance}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/5 pt-4 w-full flex items-center justify-center gap-1 text-[9px] uppercase tracking-[0.25em] text-yellow-400 font-bold">
                    Inspect Display Case <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================
            SECTION 8 – RCB LEGACY
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-red-500 uppercase font-bold">EXHIBIT 08 // THE CHINNASWAMY HEARTBEAT</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              One Franchise. One King.
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Visual Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950 border border-red-500/25 rounded-3xl p-8 relative overflow-hidden red-gold-glow">
              <div className="absolute top-0 right-0 p-4 font-display text-6xl text-red-500/5 font-extrabold select-none uppercase">
                RCB
              </div>

              <div className="space-y-6 relative z-10">
                <span className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full uppercase text-[10px] tracking-[0.3em] font-bold">
                  <Flame className="w-3.5 h-3.5" /> RCB Legend Wall
                </span>
                
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                  The Loyalty Chronicle
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  For 19 consecutive seasons, Virat Kohli wore only one colors in the IPL—RCB. Through the years of near-misses and loyalty, the fairy tale finally reached completion with back-to-back championship titles.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5 relative z-10">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Debut Season</span>
                  <span className="text-xl font-display text-red-400 font-bold block">{rcbLegacy.debut}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">All-time runs</span>
                  <span className="text-xl font-display text-red-400 font-bold block">{rcbLegacy.runs}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Centuries</span>
                  <span className="text-xl font-display text-red-400 font-bold block">{rcbLegacy.centuries}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Orange Caps</span>
                  <span className="text-xl font-display text-red-400 font-bold block">{rcbLegacy.orangeCaps}</span>
                </div>
              </div>
            </div>

            {/* Timeline Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              {rcbLegacy.highlights.map((h, idx) => (
                <div 
                  key={idx}
                  className="bg-zinc-900/20 border border-white/5 hover:border-red-500/30 rounded-2xl p-6 transition-all duration-300 flex gap-4"
                >
                  <div className="h-10 w-10 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center font-display text-lg text-red-400 font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase tracking-wider text-white">
                      {h.title}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed font-body mt-2">
                      {h.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================================
            SECTION 9 – NATIONAL HONOURS
           ========================================================== */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase font-bold">EXHIBIT 09 // STATE HONOURS & CIVIC MEDALS</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-white mt-2">
              The Nation Salutes
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nationalHonours.map((n, idx) => (
              <div 
                key={idx}
                className="bg-zinc-950 border border-yellow-500/25 rounded-3xl p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300"
              >
                {/* Felt lined box texture background */}
                <div className="absolute inset-2 border border-yellow-500/5 rounded-2xl bg-zinc-900/40 pointer-events-none" />

                <div className="space-y-6 relative z-10 w-full">
                  <span className="text-[9px] uppercase tracking-widest text-yellow-500 font-bold block font-mono">
                    {n.prestige}
                  </span>
                  
                  {/* Medal Icon/Visual */}
                  <div className="w-20 h-20 rounded-full border-2 border-yellow-500/40 bg-zinc-950 flex items-center justify-center mx-auto shadow-2xl relative">
                    <Medal className="w-10 h-10 text-yellow-500" />
                    <div className="absolute inset-0 border border-yellow-500/10 rounded-full animate-ping pointer-events-none" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-2xl uppercase text-white">
                      {n.name}
                    </h3>
                    <span className="text-xs font-mono text-white/50 block">
                      Year Awarded: {n.year}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed font-body px-4">
                    {n.desc}
                  </p>
                </div>

                <div className="mt-8 text-[8px] uppercase tracking-widest text-white/30 relative z-10 w-full border-t border-white/5 pt-4">
                  Presidential Sports Registry
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            SECTION 10 – LEGACY WALL
           ========================================================== */}
        <section className="py-24 border-t border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh] text-center">
          
          {/* Subtle gold ray particles glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.08)_0%,_transparent_60%)] pointer-events-none" />

          <div className="space-y-8 max-w-4xl relative z-10">
            <span className="text-[10px] font-mono tracking-[0.5em] text-yellow-500 uppercase font-bold block">
              FINAL FRAME // THE MODERN ERA IMMORTALITY
            </span>
            
            <h3 className="font-display text-4xl uppercase tracking-[0.25em] text-white">
              The King of the Modern Era
            </h3>

            {/* Massive Century Title */}
            <div className="py-8">
              <h1 className="font-display text-7xl md:text-9xl uppercase font-black tracking-[0.1em] text-white leading-none">
                VIRAT <span className="text-yellow-400">KOHLI</span>
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-yellow-500 mt-4 font-bold">
                Champion. Run Machine. Chase Master. King.
              </p>
            </div>

            {/* Ending Quote Display */}
            <div className="max-w-2xl mx-auto py-6 border-y border-white/10">
              <p className="text-xl md:text-2xl text-white/80 font-body italic leading-relaxed">
                "Records may be broken. Legacies live forever."
              </p>
            </div>

            <p className="text-white/40 text-xs uppercase tracking-widest pt-4 block">
              Virat Kohli Exhibition Museum Archives · 2008 – 2026
            </p>
          </div>
        </section>

      </div>

      {/* Cinematic Glass Case Modal Overlay */}
      <AnimatePresence>
        {selectedKey && selectedTrophy && selectedExtra && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedKey(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-black border border-yellow-400/20 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(251,191,36,0.12)] flex flex-col md:flex-row items-stretch"
            >
              <button
                onClick={() => setSelectedKey(null)}
                className="absolute top-4 right-4 z-50 h-9 w-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-105"
              >
                ×
              </button>

              {/* Modal Left Side */}
              <div className="md:w-[45%] w-full h-[30vh] md:h-auto relative overflow-hidden bg-black flex items-center justify-center group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trophiesList.find(t => t.key === selectedKey)?.img}
                  alt={selectedTrophy.trophyName}
                  className="w-full h-full object-cover scale-102 group-hover:scale-108 transition-transform duration-[8000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-zinc-950/80 z-10 hidden md:block" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent md:hidden z-10" />
                
                {/* Spot lighting reflect overlay */}
                <div className="absolute inset-0 bg-yellow-400/5 mix-blend-color-burn z-10 pointer-events-none" />
              </div>

              {/* Modal Right Side */}
              <div className="md:w-[55%] w-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-none text-left">
                <div className="space-y-5">
                  <div>
                    <span className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block mb-2">
                      {selectedTrophy.year} Champion Triumph
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider font-bold leading-tight">
                      {selectedTrophy.trophyName}
                    </h2>
                    <p className="text-yellow-400/80 uppercase tracking-widest text-[9px] font-bold mt-1">
                      {selectedTrophy.competition} · {selectedTrophy.careerStage}
                    </p>
                  </div>

                  {/* Match Info Grid */}
                  <div className="grid grid-cols-2 gap-3 bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] text-white/80">
                    <div>
                      <span className="text-yellow-400 font-bold block uppercase tracking-wider text-[8px]">Venue</span>
                      <span>{selectedExtra.venue}</span>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-bold block uppercase tracking-wider text-[8px]">Opponent</span>
                      <span>{selectedExtra.opponent}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/5">
                      <span className="text-yellow-400 font-bold block uppercase tracking-wider text-[8px]">Final Score</span>
                      <span>{selectedExtra.finalScore}</span>
                    </div>
                  </div>

                  {/* Statistics strip */}
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 text-xs">
                    <span className="text-yellow-400 font-bold block uppercase tracking-wider text-[8px] mb-1">Key Statistics</span>
                    <p className="text-white leading-normal font-medium">{selectedExtra.statistics}</p>
                  </div>

                  {/* Story descriptions */}
                  <div className="space-y-3 font-body text-xs md:text-sm text-white/70 leading-relaxed">
                    <div>
                      <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Match Context</h4>
                      <p>{selectedExtra.matchContext}</p>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Virat's Contribution</h4>
                      <p>{selectedExtra.contribution}</p>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Emotional Impact</h4>
                      <p className="italic text-white/80">"{selectedTrophy.emotionalImpact}"</p>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Legacy Impact</h4>
                      <p>{selectedExtra.legacyImpact}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 text-[9px] uppercase tracking-widest text-white/40">
                  Virat Kohli Official Museum Archives
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-30 bg-black border-t border-white/5">
        <ChapterNav />
      </div>
    </main>
  );
}

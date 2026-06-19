export type Era = {
  year: number;
  title: string;
  look: string;
  age: string;
  achievement: string;
  ranking: string;
  sponsor: string;
  fitness: string;
  innings: string;
  statLine: {
    centuries: string;
    runs: string;
    awards: string;
  };
};

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  theme: string;
  number: string;
};

export const chapters: Chapter[] = [
  { id: "home", title: "Home", subtitle: "The King Awaits", href: "/", theme: "theme-home", number: "00" },
  { id: "through-the-years", title: "Through The Years", subtitle: "2008 — 2026", href: "/through-the-years", theme: "theme-home", number: "01" },
  { id: "life-journey", title: "Life Journey", subtitle: "The Story Before The Legend", href: "/life-journey", theme: "theme-home", number: "02" },
  { id: "test-cricket", title: "Test Cricket", subtitle: "Whites, Steel & Patience", href: "/test-cricket", theme: "theme-test", number: "03" },
  { id: "odi-kingdom", title: "ODI Kingdom", subtitle: "The Chase Master", href: "/odi-kingdom", theme: "theme-odi", number: "04" },
  { id: "t20-master", title: "T20 Master", subtitle: "Electric Under Pressure", href: "/t20-master", theme: "theme-t20", number: "05" },
  { id: "rcb-legacy", title: "RCB Legacy", subtitle: "The Chinnaswamy Heartbeat", href: "/rcb-legacy", theme: "theme-rcb", number: "06" },
  { id: "masterclass", title: "The Masterclass", subtitle: "Technique · Timing · Mindset", href: "/masterclass", theme: "theme-masterclass", number: "07" },
  { id: "fitness", title: "Fitness Revolution", subtitle: "The Athletic Transformation", href: "/fitness", theme: "theme-fitness", number: "08" },
  { id: "man-in-love", title: "Man In Love", subtitle: "The Power of Partnership", href: "/man-in-love", theme: "theme-love", number: "09" },
  { id: "price-of-greatness", title: "The Price of Greatness", subtitle: "When the cheers disappeared, the expectations remained.", href: "/price-of-greatness", theme: "theme-darkness", number: "10" },
  { id: "comeback", title: "The Comeback", subtitle: "The Return of the King", href: "/comeback", theme: "theme-comeback", number: "11" },
  { id: "iconic-innings", title: "Iconic Innings", subtitle: "Mini Documentaries", href: "/iconic-innings", theme: "theme-home", number: "12" },
  { id: "captaincy", title: "Failed Captain?? Really?", subtitle: "The Verdict", href: "/captaincy", theme: "theme-captaincy", number: "13" },
  { id: "trophy-room", title: "Trophy Room", subtitle: "A Virtual Museum", href: "/trophy-room", theme: "theme-trophy", number: "14" },
  { id: "global-superstar", title: "Virat Beyond Cricket", subtitle: "From superstar athlete to business empire.", href: "/global-superstar", theme: "theme-global", number: "15" },
  { id: "legacy", title: "Legacy", subtitle: "The Final Frame", href: "/legacy", theme: "theme-legacy", number: "16" },
  { id: "cult", title: "The Cult of Virat Kohli", subtitle: "More than a cricketer. More than a superstar. A phenomenon.", href: "/cult", theme: "theme-cult", number: "17" },
  { id: "unknown-future", title: "18", subtitle: "", href: "/unknown-future", theme: "theme-darkness", number: "18" },
];

export const heroStats = [
  { value: "85+", label: "International Centuries" },
  { value: "14000+", label: "ODI Runs" },
  { value: "1", label: "Cricketer Of The Decade" },
  { value: "Billion+", label: "Global Fan Following" }
];

export const eras: Era[] = [
  {
    year: 2008,
    title: "The Boy Who Dreamed",
    look: "Clean face, raw crop hair, Under-19 captain jersey.",
    age: "19",
    achievement: "Under-19 World Cup Champion. Future Indian Superstar.",
    ranking: "Prodigy",
    sponsor: "Reebok",
    fitness: "Natural talent starting to meet professional standards.",
    innings: "100 vs West Indies U19 at Malaysia.",
    statLine: { centuries: "1 (U19)", runs: "235 runs", awards: "U19 WC Gold" }
  },
  {
    year: 2011,
    title: "The Dream Comes True",
    look: "Short crop, light stubble, India World Cup blue.",
    age: "22",
    achievement: "Part of India's World Cup winning squad. Carrying Sachin Tendulkar.",
    ranking: "ICC ODI Top 5",
    sponsor: "Nike",
    fitness: "Transitioning to daily professional athletic discipline.",
    innings: "35 vs Sri Lanka (WC Final, crucial stabilization).",
    statLine: { centuries: "8", runs: "1,771 runs", awards: "World Cup Gold" }
  },
  {
    year: 2014,
    title: "Rise Of The King",
    look: "Undercut spike, medium styled beard, RCB Red & Black.",
    age: "25",
    achievement: "Becoming the face of Indian cricket and the heart of RCB.",
    ranking: "No. 1 ODI, Top 3 Test",
    sponsor: "MRF",
    fitness: "Gym transformation complete. Redefining running between wickets.",
    innings: "141 vs Australia (Adelaide Test captaincy debut).",
    statLine: { centuries: "21", runs: "6,000+ runs", awards: "Test Captaincy" }
  },
  {
    year: 2016,
    title: "Peak Dominance",
    look: "Textured fade, full trimmed beard, India Test whites.",
    age: "27",
    achievement: "Test captain. Century machine. Peak Virat era across formats.",
    ranking: "No. 1 Test, No. 1 ODI",
    sponsor: "MRF Genius",
    fitness: "Standard-setter of global cricket fitness standards.",
    innings: "235 vs England (Mumbai), 4 IPL Centuries (973 runs).",
    statLine: { centuries: "28 Test/ODI", runs: "973 IPL Runs", awards: "IPL 2016 MVP" }
  },
  {
    year: 2018,
    title: "King Of World Cricket",
    look: "Classic undercut, thick groomed beard, India Test whites / Dark Blue.",
    age: "29",
    achievement: "Dominated all formats. No.1 Test Batter. No.1 ODI Batter. Global Superstar. Peak Fitness Era.",
    ranking: "No. 1 Test, No. 1 ODI",
    sponsor: "MRF Genius",
    fitness: "Setting standard-setting beep test and Yo-Yo benchmarks.",
    innings: "149 vs England (Edgbaston), 153 vs South Africa (Centurion).",
    statLine: { centuries: "35+", runs: "10,000+ ODI runs", awards: "Sir Garfield Sobers Award" }
  },
  {
    year: 2024,
    title: "Mission Complete",
    look: "Buzz cut fade, salt-and-pepper beard, T20 World Cup kit.",
    age: "35",
    achievement: "T20 World Cup Champion. The crowning limited-overs legacy.",
    ranking: "Legend Era",
    sponsor: "MRF Genius",
    fitness: "Age-defying endurance and workload management.",
    innings: "76 off 59 vs South Africa (T20 WC Final match-winning knock).",
    statLine: { centuries: "80+", runs: "14,797 ODI runs", awards: "T20 WC Winner" }
  },
  {
    year: 2025,
    title: "The Wait Is Over",
    look: "Short slick back, full styled beard, RCB Red-Gold.",
    age: "36",
    achievement: "Finally lifts the IPL trophy with RCB after 17 years of loyalty and heartbreak.",
    ranking: "All-Format Legend",
    sponsor: "MRF / Puma",
    fitness: "Elite conditioning driving consistent high-altitude performances.",
    innings: "100* vs CSK (IPL playoffs qualification match).",
    statLine: { centuries: "85+", runs: "9,000+ IPL runs", awards: "IPL 2025 Gold" }
  },
  {
    year: 2026,
    title: "Legacy Complete",
    look: "Sleek modern fade, styled executive beard, RCB Champions kit.",
    age: "37",
    achievement: "Successfully defends the IPL title, securing back-to-back championships for RCB.",
    ranking: "Immortal Status",
    sponsor: "MRF / Puma",
    fitness: "Absolute baseline standard for international athletes.",
    innings: "85* vs MI (IPL 2026 Final chase masterclass).",
    statLine: { centuries: "85+", runs: "9,600+ IPL runs", awards: "Back-to-Back Champ" }
  }
];

export const lifeJourney = [
  {
    date: "1988",
    title: "Childhood",
    quote: "The story starts in West Delhi, with stubbornness, support, and a bat always within reach.",
    story:
      "Born on 5 November 1988, Kohli's childhood was shaped by family sacrifice, neighborhood cricket, and the relentless belief that his game deserved a bigger stage.",
    image: "/assets/timeline/childhood.jpg",
    achievement: "Early determination & Delhi Cricket Club induction"
  },
  {
    date: "2008",
    title: "U19 World Cup",
    quote: "Leadership arrived before superstardom.",
    story:
      "Captaining India to the Under-19 World Cup in Malaysia revealed the two traits that would define him: authority under pressure and a refusal to shrink from the spotlight.",
    image: "/assets/timeline/u19.jpg",
    achievement: "Led India U19 to World Cup victory in Malaysia"
  },
  {
    date: "2008",
    title: "India Debut",
    quote: "The first India cap was not the finish line. It was the opening frame.",
    story:
      "His ODI debut against Sri Lanka on 18 August 2008 started a progression from prospect to unavoidable selection, then from run-maker to central figure.",
    image: "/assets/timeline/debut.jpg",
    achievement: "International debut at age 19 vs Sri Lanka"
  },
  {
    date: "2011",
    title: "THE DREAM BEGINS",
    quote: "Lifting the World Cup on home soil.",
    story:
      "A young Virat Kohli carrying Sachin Tendulkar on his shoulders, celebrating the historic 2011 World Cup win at Wankhede. A moment of pure elation and national pride that marked the beginning of his greatness.",
    image: "/assets/trophies/world_cup_2011.jpg",
    achievement: "ICC Cricket World Cup Winner"
  },
  {
    date: "2012",
    title: "Rise To Stardom",
    quote: "Establishing authority against the world's best.",
    story:
      "His legendary 133* at Hobart and 183 vs Pakistan in the Asia Cup cemented Virat as the premiere white-ball masterclass compiler and the ultimate run-chase anchor.",
    image: "/assets/odi/photo4.jpg",
    achievement: "Hobart 133* and Asia Cup 183"
  },
  {
    date: "2014",
    title: "Captaincy",
    quote: "Intensity became a leadership language.",
    story:
      "Taking over the Test captaincy in Australia, Kohli reshaped India's identity with a premium on pace bowling, physical fitness standards, and a refusal to back down.",
    image: "/assets/timeline/captaincy.jpg",
    achievement: "Historic Test Captaincy era begins"
  },
  {
    date: "2018",
    title: "Test Dominance",
    quote: "Cinematic story of overseas conquest and steel.",
    story:
      "He became the batter every format bent around. Mastered English conditions, conquered South Africa and Australia, leading India to historic overseas series wins.",
    image: "/assets/test/photo3.jpg",
    achievement: "First Indian Captain to win a Test Series in Australia"
  },
  {
    date: "2023",
    title: "World Cup Success",
    quote: "Peak limited-overs mastery and the 50th century.",
    story:
      "A golden campaign in the 2023 World Cup where he emerged as the leading run-scorer and surpassed Sachin Tendulkar's long-standing record of 49 ODI centuries.",
    image: "/assets/odi/photo1.jpg",
    achievement: "Most runs in a single World Cup (765) & 50th ODI Century"
  },
  {
    date: "2025-2026",
    title: "Legacy",
    quote: "Redefining a generation of modern cricket.",
    story:
      "A complete legend in motion, holding multiple world records, IPL trophies, and leaving an indelible impact on cricket's global landscape and athletic standards.",
    image: "/assets/odi/photo5.jpg",
    achievement: "All-format legend & standard-setter of modern cricket"
  }
];

export const testExperience = {
  intro:
    "A white-and-silver chapter built around red-ball patience, overseas authority, and a captaincy era that changed India's self-image in Test cricket.",
  metrics: [
    { label: "Test Runs", value: "9,230" },
    { label: "Hundreds", value: "30" },
    { label: "Average", value: "46.85" },
    { label: "Double Hundreds", value: "7" },
    { label: "Overseas Tons", value: "13" },
    { label: "Captaincy Wins", value: "40" }
  ],
  innings: [
    "149 at Edgbaston against England — 2018",
    "153 at Centurion against South Africa — 2018",
    "141 and 115 at Adelaide — 2014",
    "254* against South Africa in Pune — 2019",
    "235 vs England at Mumbai — 2016",
    "213 vs Sri Lanka at Nagpur — 2017"
  ],
  overseas: [
    { country: "Australia", centuries: 6, bestScore: "169", venue: "Melbourne, Adelaide, Perth" },
    { country: "England", centuries: 2, bestScore: "149", venue: "Edgbaston, Nottingham" },
    { country: "South Africa", centuries: 3, bestScore: "153", venue: "Centurion, Johannesburg" },
    { country: "West Indies", centuries: 2, bestScore: "200", venue: "Antigua, North Sound" }
  ]
};

export const odiExperience = {
  intro:
    "Royal blue, gold, velocity, and pressure. This is the chase engine, the place where Kohli became the defining ODI finisher of his era. 50 ODI centuries. Nobody else has more than 49.",
  metrics: [
    { label: "ODI Hundreds", value: "54" },
    { label: "ODI Runs", value: "14,797" },
    { label: "Chase Average", value: "64.5" },
    { label: "World Cup Peak", value: "765 in 2023" }
  ],
  chaseRecord: {
    totalChases: "200+",
    successRate: "72%",
    centuriesInChases: "28",
    highestChase: "183 vs Pakistan"
  }
};

export const t20Experience = {
  intro:
    "Electric energy, neon lights, and innings that bent the T20 format through control rather than chaos. The 2024 T20 World Cup crowned his legacy.",
  metrics: [
    { label: "T20I Runs", value: "4,188" },
    { label: "Strike Rate", value: "137.05" },
    { label: "50+ Scores", value: "39" },
    { label: "T20 WC 2024", value: "Champion" }
  ],
  worldCup2024: {
    runs: "151",
    matches: "8",
    award: "Player of the Tournament",
    finalMoment: "Lifted the trophy, retired from T20Is"
  }
};

export const iplExperience = {
  intro:
    "Red, black, gold, crowd noise, and emotion. This section is about belonging, loyalty, and Chinnaswamy mythology. 17 years with one franchise. One heart.",
  metrics: [
    { label: "IPL Runs", value: "9,336+" },
    { label: "IPL Hundreds", value: "9" },
    { label: "2016 Season", value: "973 runs" },
    { label: "Orange Caps", value: "2" }
  ],
  moments: [
    "2016: 973 runs — the greatest individual IPL season in history",
    "RCB mainstay through every era of the franchise — 2008 to present",
    "Opening partnerships with Faf du Plessis that changed powerplay pacing",
    "The emotional center of every Chinnaswamy night for 17 years",
    "2025: Finally lifts the IPL trophy with RCB — the fairy tale ending"
  ],
  seasons: [
    { year: 2008, runs: 165, highlight: "Debut season — raw talent emerges" },
    { year: 2011, runs: 557, highlight: "First big IPL season, RCB reaches final" },
    { year: 2013, runs: 634, highlight: "Consistency rises, captaincy grows" },
    { year: 2016, runs: 973, highlight: "GOAT season — 4 centuries, 7 fifties, 973 runs" },
    { year: 2018, runs: 530, highlight: "International form mirrors IPL brilliance" },
    { year: 2023, runs: 639, highlight: "Return to form, vintage Kohli" },
    { year: 2024, runs: 741, highlight: "Another dominant season, Orange Cap" },
    { year: 2025, runs: 600, highlight: "IPL CHAMPION — RCB wins the title" }
  ],
  partnerships: [
    { partner: "AB de Villiers", runs: "3000+", matches: "100+", description: "The greatest IPL partnership ever. Two geniuses batting together." },
    { partner: "Faf du Plessis", runs: "1500+", matches: "50+", description: "The opening combination that powered RCB's title charge." },
    { partner: "Chris Gayle", runs: "2000+", matches: "70+", description: "Universe Boss and King Kohli — the most feared top order in IPL." }
  ]
};

export const careerProgression = [
  { year: 2008, test: 0, odi: 159, t20i: 0, ipl: 165 },
  { year: 2011, test: 202, odi: 1771, t20i: 147, ipl: 557 },
  { year: 2014, test: 847, odi: 1054, t20i: 692, ipl: 359 },
  { year: 2016, test: 1215, odi: 739, t20i: 641, ipl: 973 },
  { year: 2018, test: 1322, odi: 1202, t20i: 211, ipl: 530 },
  { year: 2023, test: 671, odi: 1377, t20i: 0, ipl: 639 },
  { year: 2024, test: 0, odi: 0, t20i: 151, ipl: 741 }
];

export const countryDominance = [
  { team: "Sri Lanka", odi: 2652, test: 1991, t20i: 339 },
  { team: "Australia", odi: 2544, test: 2232, t20i: 794 },
  { team: "England", odi: 2095, test: 1991, t20i: 639 },
  { team: "South Africa", odi: 1878, test: 1408, t20i: 394 },
  { team: "New Zealand", odi: 1645, test: 959, t20i: 311 }
];

export const chaseTimeline = [
  { year: "2012", innings: "183 vs Pakistan", pressure: 95 },
  { year: "2012", innings: "133* vs Sri Lanka", pressure: 98 },
  { year: "2013", innings: "115 vs Australia", pressure: 90 },
  { year: "2016", innings: "82* vs Australia (T20 WC)", pressure: 97 },
  { year: "2022", innings: "82* vs Pakistan (T20 WC)", pressure: 100 },
  { year: "2023", innings: "95 vs New Zealand (WC)", pressure: 88 }
];

export const stanceHotspots = [
  { id: "head", label: "Head Position", angle: "-12deg", detail: "Eyes level, chin quiet, and a remarkably stable line through release. This is why he tracks the ball so late." },
  { id: "grip", label: "Grip", angle: "18deg", detail: "Firm enough for punch, relaxed enough for touch and late deflection. The grip adapts per delivery." },
  { id: "backlift", label: "Backlift", angle: "8deg", detail: "Compact pickup keeps the swing path efficient and repeatable. No wasted movement." },
  { id: "trigger", label: "Trigger Movement", angle: "-6deg", detail: "A subtle press forward loads rhythm without sacrificing reaction time. The secret to his footwork." },
  { id: "front-foot", label: "Front Foot", angle: "4deg", detail: "Precise stride length gives him both reach and balance. Gets to the pitch of the ball consistently." },
  { id: "balance", label: "Balance", angle: "0deg", detail: "Hips, head, and shoulders stay stacked so power never feels wild. Complete body alignment." }
];

export const techniqueReasons = [
  "Weight transfer stays connected from base to bat path — power flows through the kinetic chain.",
  "The bat meets the ball late enough to keep field access wide — this is why he finds gaps.",
  "His setup shortens reaction complexity against pace and swing — fewer moving parts means more time.",
  "Balance preserves the shape of the cover drive and straight drive under any pressure.",
  "The stance supports quick changes between front-foot and back-foot play — adaptive mastery."
];

export const scoringMap = [
  { shot: "Cover Drive", zones: ["extra cover", "mid-off", "point"], frequency: "Very High", success: "92%" },
  { shot: "Straight Drive", zones: ["mid-off", "mid-on"], frequency: "High", success: "89%" },
  { shot: "Flick", zones: ["midwicket", "fine leg", "square leg"], frequency: "Elite", success: "94%" },
  { shot: "Pull", zones: ["midwicket", "square leg"], frequency: "High", success: "84%" },
  { shot: "Cut", zones: ["point", "third man"], frequency: "High", success: "86%" },
  { shot: "Sweep", zones: ["square leg", "fine leg"], frequency: "Situational", success: "78%" }
];

export const trophyRoom = [
  {
    name: "ICC Cricket World Cup 2011",
    year: "2011",
    story: "The first global title. India lifted the World Cup on home soil at Wankhede Stadium. Kohli played a crucial role, and the iconic image of him carrying Sachin Tendulkar on his shoulders became immortal.",
    role: "Key middle-order contributor"
  },
  {
    name: "ICC Champions Trophy 2013",
    year: "2013",
    story: "India defended their Champions Trophy title in England. Kohli anchored the middle order with match-defining contributions throughout the tournament.",
    role: "Tournament anchor"
  },
  {
    name: "ICC T20 World Cup 2024",
    year: "2024",
    story: "The crown jewel. Player of the Tournament. India finally won the T20 World Cup, and Kohli retired from T20Is with the trophy in his hands. The perfect farewell.",
    role: "Player of the Tournament"
  },
  {
    name: "IPL 2025 Champion",
    year: "2025",
    story: "After 17 years of loyalty, heartbreak, and near-misses, Kohli finally lifted the IPL trophy with Royal Challengers Bengaluru. Chinnaswamy Stadium shook. A fairy tale complete.",
    role: "Captain and emotional leader"
  },
  {
    name: "ICC Cricketer Of The Decade",
    year: "2020",
    story: "A decade-spanning verdict on run volume, pressure quality, and cultural weight. The 2010s belonged to Virat Kohli more than any other cricketer on Earth.",
    role: "Decade's defining cricketer"
  },
  {
    name: "National Honours",
    year: "Multiple",
    story: "Arjuna Award (2013), Rajiv Gandhi Khel Ratna (2018), Padma Shri (2017) — positioned him as a national sporting symbol, not just a cricketer. India's pride.",
    role: "India's sporting icon"
  }
];

export const iconicInnings = [
  {
    title: "183 vs Pakistan",
    context: "Asia Cup 2012 chase — target of 330. Pakistan posted a massive total. India needed the greatest ODI chase innings. Kohli delivered.",
    opposition: "Pakistan",
    score: "183 off 148",
    venue: "Mirpur, Bangladesh",
    format: "ODI",
    commentary: "A chase that turned pressure into rhythm and then rhythm into inevitability. The greatest ODI innings of all time.",
    win: 96,
    fours: 22,
    sixes: 1
  },
  {
    title: "82* vs Pakistan",
    context: "T20 World Cup 2022 — Melbourne. India chasing 160. At 31/4, the game was lost. Then Kohli happened.",
    opposition: "Pakistan",
    score: "82* off 53",
    venue: "MCG, Melbourne",
    format: "T20I",
    commentary: "Two sixes off Haris Rauf. The greatest T20 innings ever played. 100,000 people witnessed a miracle.",
    win: 100,
    fours: 6,
    sixes: 4
  },
  {
    title: "133* vs Sri Lanka",
    context: "ODI in Hobart. A must-win chase completed with brutal precision. 133 not out off just 86 balls.",
    opposition: "Sri Lanka",
    score: "133* off 86",
    venue: "Hobart",
    format: "ODI",
    commentary: "An innings that looked less like effort and more like execution software. Absolute domination.",
    win: 99,
    fours: 18,
    sixes: 2
  },
  {
    title: "254* vs South Africa",
    context: "Test match in Pune. A red-ball monument to patience and domination. His highest Test score.",
    opposition: "South Africa",
    score: "254*",
    venue: "Pune",
    format: "Test",
    commentary: "The innings that made endurance feel theatrical. Nine hours of batting perfection.",
    win: 88,
    fours: 33,
    sixes: 2
  },
  {
    title: "149 at Edgbaston",
    context: "First Test vs England 2018. India chasing 194. Nobody else could survive. Kohli alone scored 149.",
    opposition: "England",
    score: "149 off 225",
    venue: "Edgbaston",
    format: "Test",
    commentary: "A one-man war against James Anderson, Stuart Broad, and English conditions. Pure class.",
    win: 72,
    fours: 21,
    sixes: 0
  },
  {
    title: "50th ODI Century",
    context: "World Cup 2023 vs New Zealand. The record-breaking fifty centuries in ODIs. Sachin's record finally surpassed.",
    opposition: "New Zealand",
    score: "117 off 113",
    venue: "Wankhede, Mumbai",
    format: "ODI",
    commentary: "At Sachin's home ground. The master passed the baton. Wankhede roared. History was made.",
    win: 95,
    fours: 10,
    sixes: 1
  }
];

export const fitnessPillars = [
  {
    title: "Diet",
    copy: "High-discipline nutrition, repeatable meal structure, hydration, and clean recovery inputs. He eliminated processed foods and transformed his body composition entirely.",
    stats: ["Zero junk food since 2012", "Plant-forward diet", "Disciplined hydration protocol"]
  },
  {
    title: "Workout",
    copy: "Strength, mobility, sprint work, trunk control, and movement efficiency rather than empty bulk. Every gym session targets match-specific athleticism.",
    stats: ["6 days/week training", "90-minute sessions", "Cricket-specific conditioning"]
  },
  {
    title: "Recovery",
    copy: "Sleep, load management, and routine became as important as the nets or the gym. Science-based recovery drives his longevity.",
    stats: ["8+ hours sleep", "Ice bath protocols", "Load monitoring tech"]
  },
  {
    title: "Transformation",
    copy: "He changed not only his body but also what Indian cricket thought a world-class body should look like. The standard he set reshaped Indian cricket fitness culture.",
    stats: ["Body fat: 8-10%", "Yo-yo test benchmark", "Industry-leading beep test scores"]
  }
];

export const globalReach = [
  { label: "Instagram Followers", value: "271M+" },
  { label: "Brand Value", value: "₹1000Cr+" },
  { label: "Global Endorsements", value: "20+" },
  { label: "Business Ventures", value: "Multiple" },
  { label: "Foundation Work", value: "Virat Kohli Foundation" },
  { label: "Fashion Brand", value: "WROGN" }
];

export const worldFootprint = [
  { country: "India", x: "67%", y: "55%", detail: "Home base. Delhi boy turned national icon." },
  { country: "Australia", x: "84%", y: "76%", detail: "6 Test centuries. Conquered the toughest away tour." },
  { country: "England", x: "47%", y: "32%", detail: "149 at Edgbaston. Mastered swing bowling." },
  { country: "South Africa", x: "51%", y: "75%", detail: "153 at Centurion. Dominated the Proteas." },
  { country: "New Zealand", x: "92%", y: "84%", detail: "WTC journey. Consistently excellent." },
  { country: "UAE", x: "58%", y: "52%", detail: "IPL base. Asia Cup heroics." },
  { country: "Bangladesh", x: "71%", y: "52%", detail: "183 vs Pakistan at Mirpur." },
  { country: "West Indies", x: "25%", y: "53%", detail: "200 in Antigua. Caribbean conquest." }
];

export const legacyQuotes = [
  { speaker: "Sachin Tendulkar", quote: "His hunger and his ability to absorb pressure put him in the rarest air. He carried the weight of a billion expectations and made it look effortless." },
  { speaker: "AB de Villiers", quote: "He made intensity look like beauty, especially when the game tightened. Playing alongside him was the greatest privilege of my IPL career." },
  { speaker: "Ricky Ponting", quote: "There are great batters, and then there are players who dominate entire white-ball eras. Kohli dominated the 2010s like nobody else." },
  { speaker: "Michael Vaughan", quote: "You could feel his influence on the game long before the scoreboard fully showed it. He changed the culture of Indian cricket." },
  { speaker: "MS Dhoni", quote: "He grew into a finisher, then a leader, then a standard everybody had to chase. I always knew he'd be special." }
];

export const sectionSearch = [
  ["Home", "/"],
  ["Through The Years", "/through-the-years"],
  ["Life Journey", "/life-journey"],
  ["Test Cricket", "/test-cricket"],
  ["ODI Kingdom", "/odi-kingdom"],
  ["T20 Master", "/t20-master"],
  ["RCB Legacy", "/rcb-legacy"],
  ["The Masterclass", "/masterclass"],
  ["Fitness Revolution", "/fitness"],
  ["Man In Love", "/man-in-love"],
  ["The Price of Greatness", "/price-of-greatness"],
  ["Iconic Innings", "/iconic-innings"],
  ["Failed Captain?? Really?", "/captaincy"],
  ["Trophy Room", "/trophy-room"],
  ["Global Superstar", "/global-superstar"],
  ["Legacy", "/legacy"],
  ["The Cult of Virat Kohli", "/cult"]
] as const;

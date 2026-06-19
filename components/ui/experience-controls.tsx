"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { audioEngine, MOODS, AudioStyle } from "@/lib/audio-engine";

/* ─── Preference keys ─────────────────────────── */
const LS_AUDIO    = "vk18_audio_enabled";
const LS_VOLUME   = "vk18_audio_volume";
const LS_ANIM     = "vk18_anim_intensity";
const LS_PARTICLE = "vk18_particles";
const LS_CONTRAST = "vk18_high_contrast";

export type AnimIntensity = "full" | "reduced" | "off";

/* ─── Audio Bars Visualizer ────────────────────── */
function AudioBars({ active }: { active: boolean }) {
  const bars = [0.5, 0.9, 0.6, 1.0, 0.7, 0.8, 0.4, 0.95, 0.65, 0.75];
  return (
    <div className="flex items-end gap-[2px] h-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className={`w-[2px] rounded-full ${active ? "bg-yellow-400" : "bg-white/20"}`}
          animate={active
            ? { scaleY: [h * 0.4, h, h * 0.6, h * 0.85, h * 0.5], opacity: 1 }
            : { scaleY: 0.15, opacity: 0.3 }
          }
          transition={active
            ? { duration: 0.6 + i * 0.07, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.05 }
            : { duration: 0.4 }
          }
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ───────────────────────────── */
export function ExperienceControls() {
  const pathname = usePathname();

  /* Viewport check state */
  const [isMobile, setIsMobile] = useState(false);

  /* Preferences state */
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [volume, setVolume]             = useState(0.30); // Soft 30% default volume
  const [animIntensity, setAnimIntensity] = useState<AnimIntensity>("full");
  const [particles, setParticles]       = useState(true);
  const [audioStyle, setAudioStyle]     = useState<AudioStyle>("blend");
  const [highContrast, setHighContrast] = useState(false);
  const [panelOpen, setPanelOpen]       = useState(false);
  const [showTooltip, setShowTooltip]   = useState(false);
  const [currentMood, setCurrentMood]   = useState(MOODS["/"] ?? MOODS[Object.keys(MOODS)[0]]);

  /* Check mobile viewport */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ── Load preferences from localStorage ─── */
  useEffect(() => {
    const savedAudio    = localStorage.getItem(LS_AUDIO);
    const savedVolume   = localStorage.getItem(LS_VOLUME);
    const savedAnim     = localStorage.getItem(LS_ANIM) as AnimIntensity | null;
    const savedParticle = localStorage.getItem(LS_PARTICLE);
    const savedStyle    = localStorage.getItem("vk18_audio_style") as AudioStyle | null;
    const savedContrast = localStorage.getItem(LS_CONTRAST);

    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    } else {
      setVolume(0.30); // Default to a soft 30%
    }

    if (savedAnim)     setAnimIntensity(savedAnim);
    if (savedParticle) setParticles(savedParticle === "true");

    if (savedContrast) {
      setHighContrast(savedContrast === "true");
      document.documentElement.setAttribute("data-high-contrast", savedContrast);
    }

    if (savedStyle) {
      setAudioStyle(savedStyle);
      setAudioEnabled(savedStyle !== "mute");
    } else {
      setAudioStyle("blend");
      setAudioEnabled(savedAudio === "true");
    }

    // Show tooltip if first visit
    if (!savedAudio && !savedStyle) {
      setTimeout(() => setShowTooltip(true), 2500);
      setTimeout(() => setShowTooltip(false), 7000);
    }
  }, []);

  /* ── Persist preferences ─── */
  useEffect(() => { localStorage.setItem(LS_AUDIO, String(audioEnabled)); }, [audioEnabled]);
  useEffect(() => { localStorage.setItem(LS_VOLUME, String(volume)); audioEngine.setVolume(volume); }, [volume]);
  useEffect(() => { localStorage.setItem(LS_ANIM, animIntensity); applyAnimClass(animIntensity); }, [animIntensity]);
  useEffect(() => { localStorage.setItem(LS_PARTICLE, String(particles)); applyParticleAttr(particles); }, [particles]);

  /* ── Apply animation intensity as a CSS data attribute ─── */
  const applyAnimClass = (level: AnimIntensity) => {
    document.documentElement.setAttribute("data-anim", level);
  };
  const applyParticleAttr = (enabled: boolean) => {
    document.documentElement.setAttribute("data-particles", String(enabled));
  };

  /* ── Resolve silent status ─── */
  const allowedRoots = [
    "/",
    "/through-the-years",
    "/life-journey",
    "/rcb-legacy",
    "/man-in-love",
    "/price-of-greatness",
    "/legacy"
  ];
  const matchedKey = pathname
    ? allowedRoots.find(p => {
        if (p === "/") return pathname === "/";
        return pathname === p || pathname.startsWith(p + "/");
      })
    : "/";
  const isPageSilent = !matchedKey;

  /* ── Update mood when pathname changes ─── */
  useEffect(() => {
    if (!pathname) return;
    const key = Object.keys(MOODS).find(k => pathname === k || (k !== "/" && pathname.startsWith(k + "/"))) ?? "/";
    setCurrentMood(MOODS[key] ?? MOODS["/"]);

    if (audioEnabled) {
      audioEngine.play(pathname);
    }
  }, [pathname, audioEnabled]);

  /* ── Toggle audio ─── */
  const toggleAudio = useCallback(async () => {
    if (audioEnabled) {
      audioEngine.stop();
      setAudioEnabled(false);
      setAudioStyle("mute");
    } else {
      setAudioEnabled(true);
      const targetStyle = audioStyle === "mute" ? "blend" : audioStyle;
      setAudioStyle(targetStyle);
      await audioEngine.setStyle(targetStyle);
      await audioEngine.play(pathname);
    }
    setShowTooltip(false);
  }, [audioEnabled, audioStyle, pathname]);

  /* ── Change soundtrack style ─── */
  const handleStyleChange = async (style: AudioStyle) => {
    setAudioStyle(style);
    if (style === "mute") {
      setAudioEnabled(false);
      audioEngine.stop();
    } else {
      setAudioEnabled(true);
      await audioEngine.setStyle(style);
      await audioEngine.play(pathname);
    }
  };

  /* ── Volume change ─── */
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  /* ── High Contrast toggle ─── */
  const toggleContrast = () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    localStorage.setItem(LS_CONTRAST, String(nextVal));
    document.documentElement.setAttribute("data-high-contrast", String(nextVal));
  };

  const isVisualizerActive = audioEnabled && !isPageSilent;

  return (
    <>
      {/* ─── First-visit Tooltip ─────────────────── */}
      <AnimatePresence>
        {showTooltip && !panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed top-20 right-20 z-[60] bg-black/90 border border-yellow-500/30 rounded-2xl px-4 py-3 max-w-[220px] text-left backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-yellow-400 font-bold font-mono">DOCUMENTARY SCORE</span>
            </div>
            <p className="text-white/70 text-[10px] leading-relaxed">Activate the emotional documentary score. Toggle between piano and string arrangements.</p>
            <div className="absolute -top-1.5 right-8 w-3 h-3 rotate-45 border-t border-l border-yellow-500/30 bg-black/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Trigger Button ───────────────────────── */}
      <div className="relative">
        <motion.button
          id="experience-controls-btn"
          onClick={() => { setPanelOpen(o => !o); setShowTooltip(false); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 h-10 rounded-full border px-3 backdrop-blur-xl transition-all duration-300 ${
            audioEnabled
              ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400 shadow-[0_0_16px_rgba(234,179,8,0.25)]"
              : "border-white/15 bg-black/40 text-white/50 hover:border-white/30 hover:text-white"
          }`}
          aria-label="Open experience controls"
          title="Cinematic Experience Controls"
        >
          <AudioBars active={isVisualizerActive} />
          <span className="hidden sm:block text-[8px] uppercase tracking-[0.25em] font-bold font-mono">
            {audioEnabled ? "LIVE SCORE" : "EXPERIENCE"}
          </span>
        </motion.button>

        {/* ─── Control Panel ───────────────────────── */}
        <AnimatePresence>
          {panelOpen && (
            <>
              {/* Backdrop click to close */}
              <div
                className={`fixed inset-0 z-[58] ${isMobile ? "bg-black/65 backdrop-blur-sm" : ""}`}
                onClick={() => setPanelOpen(false)}
              />
              <motion.div
                initial={isMobile ? { y: "100%" } : { opacity: 0, y: -12, scale: 0.96 }}
                animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                exit={isMobile ? { y: "100%" } : { opacity: 0, y: -12, scale: 0.96 }}
                transition={isMobile ? { type: "spring", damping: 26, stiffness: 220 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={isMobile
                  ? "fixed bottom-0 left-0 right-0 z-[59] w-full bg-neutral-950/98 border-t border-yellow-500/25 rounded-t-[20px] shadow-2xl backdrop-blur-3xl overflow-hidden max-h-[80vh] flex flex-col pb-6"
                  : "absolute top-14 right-0 z-[59] w-[320px] bg-black/95 border border-yellow-500/20 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden"
                }
              >
                {/* Mobile Drag Handle */}
                {isMobile && (
                  <div className="flex justify-center py-2.5 border-b border-white/5">
                    <div className="w-12 h-1 rounded-full bg-white/20" />
                  </div>
                )}

                {/* Panel top bar */}
                <div className="px-5 py-4 border-b border-white/5 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${isVisualizerActive ? "bg-yellow-400 animate-pulse" : "bg-white/20"}`} />
                      <span className="text-[9px] uppercase tracking-[0.35em] text-yellow-500 font-bold font-mono">
                        EXPERIENCE CONTROLS
                      </span>
                    </div>
                    <button
                      onClick={() => setPanelOpen(false)}
                      className="text-white/30 hover:text-white text-lg leading-none transition-colors px-2 py-1"
                    >×</button>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-5 space-y-5" style={{ WebkitOverflowScrolling: "touch" }}>

                  {/* ── Now Playing ─────────────────── */}
                  <div className={`rounded-xl p-4 border transition-all duration-500 ${
                    isVisualizerActive
                      ? "bg-yellow-500/8 border-yellow-500/25"
                      : "bg-white/[0.02] border-white/5"
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-mono">DOCUMENTARY SCORE</span>
                      <AudioBars active={isVisualizerActive} />
                    </div>
                    {audioEnabled ? (
                      !isPageSilent ? (
                        <>
                          <p className="text-white font-display text-base uppercase tracking-wide font-bold leading-tight">
                            {currentMood.name}
                          </p>
                          <p className="text-white/50 text-[10px] font-body mt-1 leading-relaxed">
                            {currentMood.description}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-white font-display text-base uppercase tracking-wide font-bold leading-tight">
                            Focus Silence
                          </p>
                          <p className="text-white/40 text-[10px] font-body mt-1 leading-relaxed">
                            Silence can be more powerful. This chapter is intentionally silent to allow deep reading.
                          </p>
                        </>
                      )
                    ) : (
                      <p className="text-white/30 text-[11px] font-body italic">
                        Enable live score below to enhance the emotion.
                      </p>
                    )}
                  </div>

                  {/* ── Audio Toggle ─────────────────── */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white text-xs font-bold block">🎵 Cinematic Soundtrack</span>
                      <span className="text-white/35 text-[9px] block mt-0.5">Chapter-specific scores</span>
                    </div>
                    <button
                      onClick={toggleAudio}
                      className={`relative w-12 h-6 rounded-full border transition-all duration-300 ${
                        audioEnabled
                          ? "bg-yellow-500 border-yellow-400"
                          : "bg-zinc-800 border-white/10"
                      }`}
                    >
                      <motion.div
                        animate={{ x: audioEnabled ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                  </div>

                  {/* ── Soundtrack Style ──────────── */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-xs font-bold">🎹 Soundtrack Style</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { id: "piano", label: "Piano" },
                        { id: "strings", label: "Strings" },
                        { id: "blend", label: "Full Blend" }
                      ] as { id: AudioStyle; label: string }[]).map(item => {
                        const isSelected = audioStyle === item.id && audioEnabled;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleStyleChange(item.id)}
                            className={`py-2 px-1 rounded-lg text-[9px] uppercase tracking-wider font-bold border transition-all duration-200 ${
                              isSelected
                                ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-400 font-extrabold shadow-[0_0_10px_rgba(234,179,8,0.15)]"
                                : "border-white/5 bg-white/[0.01] text-white/30 hover:text-white/60 hover:border-white/10"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Volume Slider ────────────────── */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-xs font-bold">🎚️ Volume</span>
                      <span className="text-yellow-400 text-[9px] font-mono">{Math.round(volume * 100)}%</span>
                    </div>
                    <div className="relative h-1.5 bg-white/10 rounded-full">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all"
                        style={{ width: `${volume * 100}%` }}
                      />
                      <input
                        type="range"
                        min="0" max="1" step="0.01"
                        value={volume}
                        onChange={handleVolume}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                        aria-label="Volume"
                      />
                    </div>
                  </div>

                  {/* ── Divider ─────────────────────── */}
                  <div className="border-t border-white/5" />

                  {/* ── Animation Intensity ──────────── */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-white/70 text-xs font-bold">✨ Animation Intensity</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(["full", "reduced", "off"] as AnimIntensity[]).map(level => (
                        <button
                          key={level}
                          onClick={() => setAnimIntensity(level)}
                          className={`py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-bold border transition-all duration-200 ${
                            animIntensity === level
                              ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-400"
                              : "border-white/8 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/15"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Particles Toggle ─────────────── */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/70 text-xs font-bold">✦ Particle Effects</span>
                      <span className="text-white/25 text-[9px] block mt-0.5">Gold particle field</span>
                    </div>
                    <button
                      onClick={() => setParticles(p => !p)}
                      className={`relative w-12 h-6 rounded-full border transition-all duration-300 ${
                        particles
                          ? "bg-yellow-500 border-yellow-400"
                          : "bg-zinc-800 border-white/10"
                      }`}
                    >
                      <motion.div
                        animate={{ x: particles ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                  </div>

                  {/* ── Divider ─────────────────────── */}
                  <div className="border-t border-white/5" />

                  {/* ── Accessibility ───────────────── */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/70 text-xs font-bold">👁️ High Contrast Text</span>
                      <span className="text-white/25 text-[9px] block mt-0.5">Increases text readability</span>
                    </div>
                    <button
                      onClick={toggleContrast}
                      className={`relative w-12 h-6 rounded-full border transition-all duration-300 ${
                        highContrast
                          ? "bg-yellow-500 border-yellow-400"
                          : "bg-zinc-800 border-white/10"
                      }`}
                    >
                      <motion.div
                        animate={{ x: highContrast ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                  </div>

                  {/* ── Mood Map ─────────────────────── */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/25 font-mono block mb-3">CHAPTER SOUNDTRACK MAP</span>
                    <div className="grid grid-cols-2 gap-1 max-h-[150px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                      {Object.entries(MOODS).map(([path, mood]) => {
                        const isActive = (pathname === path) || (path !== "/" && pathname.startsWith(path + "/")) || (path === "/" && pathname === "/");
                        const isSilent = !allowedRoots.includes(path);
                        return (
                          <div
                            key={path}
                            className={`text-[9px] px-2 py-1.5 rounded-lg border transition-all ${
                              isActive
                                ? "border-yellow-500/30 bg-yellow-500/8 text-yellow-400 font-semibold"
                                : "border-transparent text-white/25"
                            }`}
                          >
                            <span className="font-mono leading-tight block truncate">
                              {isSilent ? `${mood.name} (Silent)` : mood.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Footer ──────────────────────── */}
                  <div className="text-center text-[8px] uppercase tracking-[0.3em] text-white/15 font-mono pt-2">
                    Virat Kohli Museum • Experience Controls
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

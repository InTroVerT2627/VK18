"use client";

/* ─────────────────────────────────────────────────────────────
   TYPES & SCHEMAS
   ───────────────────────────────────────────────────────────── */

export interface MoodProfile {
  name: string;
  description: string;
  chords: string[][];
  bpm?: number;
  hasHeartbeat?: boolean;
  hasAmbience?: boolean;
  intensity?: number;
}

export const MOODS: Record<string, MoodProfile> = {
  "/": {
    name: "The Arrival",
    description: "Slow rising strings · an era begins",
    chords: [["A2", "E3", "A3", "C#4"], ["D3", "A3", "D4", "F#4"], ["E3", "B3", "E4", "G#4"]],
    hasAmbience: true,
  },
  "/through-the-years": {
    name: "Through The Years",
    description: "Nostalgic piano · childhood strings",
    chords: [["G2", "D3", "G3", "B3"], ["C3", "G3", "C4", "E4"], ["E3", "B3", "E4", "G#4"]],
    hasAmbience: false,
  },
  "/life-journey": {
    name: "Nostalgia & Dreams",
    description: "Emotional piano · warm strings",
    chords: [["D3", "A3", "D4", "F#4"], ["A2", "E3", "A3", "C#4"], ["B2", "F#3", "B3", "D4"], ["G2", "D3", "G3", "B3"]],
    hasAmbience: false,
  },
  "/test-cricket": {
    name: "The Red-Ball War",
    description: "Dark tense strings · heartbeat thuds",
    chords: [["D2", "A2", "D3", "F3"], ["G2", "D3", "G3", "Bb3"], ["Bb2", "F3", "Bb3", "D4"], ["A2", "E3", "A3", "C#4"]],
    hasHeartbeat: true,
    bpm: 54,
  },
  "/odi-kingdom": {
    name: "Royal Consistency",
    description: "Elegant arpeggios · royal orchestra",
    chords: [["C3", "G3", "C4", "E4"], ["F3", "C4", "F4", "A4"], ["A2", "E3", "A3", "C#4"], ["G2", "D3", "G3", "B3"]],
    hasAmbience: true,
  },
  "/t20-master": {
    name: "Electric Energy",
    description: "Fast pulse · stadium cheers",
    chords: [["E2", "B2", "E3", "G3"], ["C3", "G3", "C4", "E4"], ["D3", "A3", "D4", "F#4"], ["B2", "F#3", "B3", "D4"]],
    hasAmbience: true,
    bpm: 112,
  },
  "/rcb-legacy": {
    name: "Chinnaswamy Passion",
    description: "Loyalty · heartbreak · crowd roar",
    chords: [["F2", "C3", "F3", "A3"], ["C3", "G3", "C4", "E4"], ["D2", "A2", "D3", "F3"], ["Bb2", "F3", "Bb3", "D4"]],
    hasAmbience: true,
    bpm: 65,
  },
  "/masterclass": {
    name: "Precision & Genius",
    description: "Minimal piano · surgical focus",
    chords: [["E3", "B3", "E4", "G4"], ["B2", "F#3", "B3", "D4"], ["C3", "G3", "C4", "E4"], ["G2", "D3", "G3", "B3"]],
    hasAmbience: false,
  },
  "/fitness": {
    name: "Iron Discipline",
    description: "Relentless strings · driving heartbeat",
    chords: [["A2", "E3", "A3", "C4"], ["F2", "C3", "F3", "A3"], ["G2", "D3", "G3", "B3"], ["E2", "B2", "E3", "G3"]],
    hasHeartbeat: true,
    bpm: 78,
  },
  "/man-in-love": {
    name: "Warmth & Romance",
    description: "Beautiful melody · soft strings",
    chords: [["E3", "B3", "E4", "G#4"], ["C#3", "G#3", "C#4", "E4"], ["A2", "E3", "A3", "C#4"], ["B2", "F#3", "B3", "D#4"]],
    hasAmbience: false,
  },
  "/price-of-greatness": {
    name: "The Dark Side",
    description: "Isolated minor piano · low tension drone",
    chords: [["C#2", "G#2", "C#3", "E3"], ["A2", "E3", "A3", "C#4"], ["F#2", "C#3", "F#3", "A3"], ["G#2", "D#3", "G#3", "B#3"]],
    hasHeartbeat: true,
    bpm: 46,
  },
  "/comeback": {
    name: "The Triumphant Return",
    description: "Rising string crescendo · defiance",
    chords: [["D2", "A2", "D3", "F3"], ["F2", "C3", "F3", "A3"], ["C2", "G2", "C3", "E3"], ["G2", "D3", "G3", "B3"]],
    hasAmbience: true,
  },
  "/iconic-innings": {
    name: "Stadium Heroics",
    description: "Tense piano chords · rising swells",
    chords: [["G2", "D3", "G3", "Bb3"], ["Eb3", "Bb3", "Eb4", "G4"], ["F2", "C3", "F3", "A3"], ["D2", "A2", "D3", "F3"]],
    hasAmbience: true,
    bpm: 60,
  },
  "/captaincy": {
    name: "Executive Defiance",
    description: "Commanding strings · bold authority",
    chords: [["F2", "C3", "F3", "Ab3"], ["Db3", "Ab3", "Db4", "F4"], ["Eb2", "Bb2", "Eb3", "G3"], ["C2", "G2", "C3", "Eb3"]],
    hasHeartbeat: true,
    bpm: 50,
  },
  "/trophy-room": {
    name: "Hall of Champions",
    description: "Majestic string swells · gold triumph",
    chords: [["D3", "A3", "D4", "F#4"], ["G2", "D3", "G3", "B3"], ["A2", "E3", "A3", "C#4"], ["D3", "A3", "D4", "F#4"]],
    hasAmbience: true,
  },
  "/global-superstar": {
    name: "Global Superstar",
    description: "Warm Rhodes piano · luxury ambience",
    chords: [["F3", "C4", "F4", "A4"], ["D3", "A3", "D4", "F#4"], ["G2", "D3", "G3", "B3"], ["C3", "G3", "C4", "E4"]],
    hasAmbience: true,
  },
  "/legacy": {
    name: "Immortal Legacy",
    description: "Sparse piano arpeggios · silence",
    chords: [["D2", "A2", "D3", "F#3"], ["A2", "E3", "A3", "C#4"], ["B2", "F#3", "B3", "D4"], ["G2", "D3", "G3", "B3"]],
    hasAmbience: false,
  },
  "/cult": {
    name: "The Devotion",
    description: "Choir-like vocal pads · crowd breath",
    chords: [["A2", "E3", "A3", "C#4"], ["F#2", "C#3", "F#3", "A3"], ["D2", "A2", "D3", "F#3"], ["E2", "B2", "E3", "G#3"]],
    hasAmbience: true,
  },
  "/unknown-future": {
    name: "The Unknown Future",
    description: "Sparse piano · mysterious atmosphere",
    chords: [["F#2", "C#3", "F#3"], ["D2", "A2", "D3"]],
    hasAmbience: false,
  },
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

const NOTE_MAP: Record<string, number> = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11, "B#": 12
};

function noteToFreq(noteStr: string): number {
  const match = noteStr.trim().match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) return 440;
  const name = match[1];
  const octave = parseInt(match[2], 10);
  const semitones = NOTE_MAP[name];
  const keyNumber = semitones + (octave - 4) * 12;
  return 440 * Math.pow(2, (keyNumber - 9) / 12);
}

/* ─────────────────────────────────────────────────────────────
   AUDIO ENGINE CLASS
   ───────────────────────────────────────────────────────────── */

export type AudioStyle = "blend" | "piano" | "strings" | "mute";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  
  // Reverb node (Feedback Delay Network)
  private reverbInput: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  private delayFilter: BiquadFilterNode | null = null;

  // Active playing sound structures
  private currentChannelGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private activeGainNodes: GainNode[] = [];
  
  // Stadium noise nodes
  private noiseSource: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseLFO1: OscillatorNode | null = null;
  private noiseLFO2: OscillatorNode | null = null;

  // Rhythmic timers
  private schedulerInterval: any = null;
  private heartbeatInterval: any = null;
  
  // State
  private currentMoodKey: string | null = null;
  private _isPlaying = false;
  private _volume = 0.30; // Soft 30% default volume
  private _style: AudioStyle = "blend"; // blend, piano, strings, mute

  get isPlaying() { return this._isPlaying; }
  get volume() { return this._volume; }
  get style() { return this._style; }
  get currentMoodKey_() { return this.currentMoodKey; }

  get currentMood() {
    return this.currentMoodKey ? (MOODS[this.currentMoodKey] ?? null) : null;
  }

  /** Lazy-initialize AudioContext on first user gesture */
  private ensureContext() {
    if (this.ctx) return;
    const CtxClass = typeof window !== "undefined"
      ? (window.AudioContext || (window as any).webkitAudioContext)
      : null;
    if (!CtxClass) return;
    this.ctx = new CtxClass();

    // Master Compressor to prevent clipping
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(15, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.20, this.ctx.currentTime);

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this._volume, this.ctx.currentTime);

    // Connections
    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.ctx.destination);

    // Build delay-based reverb loop
    this.buildDelayReverb();
  }

  /** Build a lush, warm delay-based reverberator */
  private buildDelayReverb() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    this.reverbInput = ctx.createGain();
    this.delayNode = ctx.createDelay(1.5);
    this.delayGain = ctx.createGain();
    this.delayFilter = ctx.createBiquadFilter();

    // Delay parameters for lush space
    this.delayNode.delayTime.setValueAtTime(0.38, ctx.currentTime); // 380ms delay
    this.delayGain.gain.setValueAtTime(0.42, ctx.currentTime);     // feedback gain
    this.delayFilter.type = "lowpass";
    this.delayFilter.frequency.setValueAtTime(800, ctx.currentTime); // warm filters

    // Delay Feedback Loop
    this.reverbInput.connect(this.delayNode);
    this.delayNode.connect(this.delayFilter);
    this.delayFilter.connect(this.delayGain);
    this.delayGain.connect(this.delayNode); // loop back
    
    // Connect wet reverb signal to master output
    this.delayGain.connect(this.masterGain);
  }

  /** Play a warm arpeggiated piano note */
  private playPianoNote(noteStr: string, timeOffset: number, velocity = 0.15) {
    if (!this.ctx || !this.currentChannelGain || !this.reverbInput) return;
    const ctx = this.ctx;
    const now = ctx.currentTime + timeOffset;
    const freq = noteToFreq(noteStr);

    // Fundamental Triangle wave (gives the wood hammer strike body)
    const oscTri = ctx.createOscillator();
    const gainTri = ctx.createGain();
    oscTri.type = "triangle";
    oscTri.frequency.setValueAtTime(freq, now);

    // Harmonic Sine wave (smooths the transients)
    const oscSine = ctx.createOscillator();
    const gainSine = ctx.createGain();
    oscSine.type = "sine";
    oscSine.frequency.setValueAtTime(freq * 2, now);

    // Attack hammer strike transient (filtered click)
    const oscClick = ctx.createOscillator();
    const gainClick = ctx.createGain();
    oscClick.type = "triangle";
    oscClick.frequency.setValueAtTime(freq * 4.5, now);

    // Lowpass filter to damp high frequencies exponentially (like real strings damping)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 2.5);

    // Envelopes
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.005); // immediate attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8); // 3.8s ringout

    gainTri.gain.setValueAtTime(0.85, now);
    gainSine.gain.setValueAtTime(0.20, now);
    
    // click burst transient
    gainClick.gain.setValueAtTime(0.12, now);
    gainClick.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

    // Connections
    oscTri.connect(gainTri);
    oscSine.connect(gainSine);
    oscClick.connect(gainClick);

    gainTri.connect(filter);
    gainSine.connect(filter);
    gainClick.connect(filter);

    filter.connect(noteGain);

    // Connect both dry output and wet reverb input
    noteGain.connect(this.currentChannelGain);
    noteGain.connect(this.reverbInput);

    // Start
    oscTri.start(now);
    oscSine.start(now);
    oscClick.start(now);

    // Cleanup oscillators and gain nodes
    oscTri.stop(now + 4.0);
    oscSine.stop(now + 4.0);
    oscClick.stop(now + 0.05);

    this.activeOscillators.push(oscTri, oscSine, oscClick);
    this.activeGainNodes.push(gainTri, gainSine, gainClick, noteGain);
  }

  /** Play warm, detuned, lowpass-filtered swelling strings */
  private playStringChord(notes: string[]) {
    if (!this.ctx || !this.currentChannelGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Filter to remove all saw/buzz harshness, leaving a dark, rich pad
    const stringFilter = ctx.createBiquadFilter();
    stringFilter.type = "lowpass";
    stringFilter.frequency.setValueAtTime(280, now); // velvety warm cutoff
    stringFilter.connect(this.currentChannelGain);

    // Polyphonic strings
    notes.forEach((noteStr) => {
      const baseFreq = noteToFreq(noteStr);

      // Create 3 detuned sawtooth/triangle oscillators for a rich chorus string ensemble
      const detunes = [-11, 0, 11];
      detunes.forEach((cents) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Soft string swell amplitude envelope
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.linearRampToValueAtTime(0.024, now + 2.2); // slow 2.2s attack swell
        gainNode.gain.setValueAtTime(0.024, now + 4.0);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 7.5); // slow 3.5s release decay

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.detune.setValueAtTime(cents, now);

        // Add slow LFO vibrato (modulate pitch slightly)
        const vibratoLFO = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibratoLFO.type = "sine";
        vibratoLFO.frequency.setValueAtTime(3.8, now); // 3.8Hz vibrato rate
        vibratoGain.gain.setValueAtTime(3, now);       // 3 cents depth
        
        vibratoLFO.connect(vibratoGain);
        vibratoGain.connect(osc.detune);

        vibratoLFO.start(now);
        vibratoLFO.stop(now + 8.0);

        osc.connect(gainNode);
        gainNode.connect(stringFilter);
        
        osc.start(now);
        osc.stop(now + 7.6);

        this.activeOscillators.push(osc, vibratoLFO);
        this.activeGainNodes.push(gainNode, vibratoGain);
      });
    });
  }

  /** Start a stadium crowd rumble simulation */
  private startStadiumAmbience() {
    if (!this.ctx || !this.currentChannelGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Create a 2s stereo white noise buffer
    const bufferSize = ctx.sampleRate * 2.0;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.noiseSource = ctx.createBufferSource();
    this.noiseSource.buffer = noiseBuffer;
    this.noiseSource.loop = true;

    // 2. Resonant bandpass filter centered at 520Hz (removes low/high noise, leaving crowd murmurs)
    this.noiseFilter = ctx.createBiquadFilter();
    this.noiseFilter.type = "bandpass";
    this.noiseFilter.frequency.setValueAtTime(520, now);
    this.noiseFilter.Q.setValueAtTime(0.9, now);

    this.noiseGain = ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.0001, now);
    // Smoothly fade in crowd rumble
    this.noiseGain.gain.linearRampToValueAtTime(0.038, now + 3.0); 

    // 3. Modulate filter frequency with slow LFOs to create the rise and fall of stadium breath
    this.noiseLFO1 = ctx.createOscillator();
    this.noiseLFO1.type = "sine";
    this.noiseLFO1.frequency.setValueAtTime(0.07, now); // extremely slow 0.07Hz
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.setValueAtTime(90, now); // sweep filter +- 90Hz

    this.noiseLFO2 = ctx.createOscillator();
    this.noiseLFO2.type = "sine";
    this.noiseLFO2.frequency.setValueAtTime(0.045, now);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(0.012, now); // sweep volume slightly

    // Connections
    this.noiseLFO1.connect(lfo1Gain);
    lfo1Gain.connect(this.noiseFilter.frequency);

    this.noiseLFO2.connect(lfo2Gain);
    lfo2Gain.connect(this.noiseGain.gain);

    this.noiseSource.connect(this.noiseFilter);
    this.noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.currentChannelGain);

    // Start
    this.noiseSource.start(now);
    this.noiseLFO1.start(now);
    this.noiseLFO2.start(now);
  }

  /** Trigger a double tension heartbeat (systole-diastole thud) */
  private playHeartbeat() {
    if (!this.ctx || !this.currentChannelGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const hbFilter = ctx.createBiquadFilter();
    hbFilter.type = "lowpass";
    hbFilter.frequency.setValueAtTime(100, now);
    hbFilter.connect(this.currentChannelGain);

    // 1st Thud
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(52, now);
    osc1.frequency.exponentialRampToValueAtTime(5, now + 0.12);
    
    gain1.gain.setValueAtTime(0.24, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc1.connect(gain1);
    gain1.connect(hbFilter);
    osc1.start(now);
    osc1.stop(now + 0.20);

    // 2nd Thud (systole-diastole delay)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const time2 = now + 0.16;
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(46, time2);
    osc2.frequency.exponentialRampToValueAtTime(5, time2 + 0.12);

    gain2.gain.setValueAtTime(0.14, time2);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time2 + 0.14);

    osc2.connect(gain2);
    gain2.connect(hbFilter);
    osc2.start(time2);
    osc2.stop(time2 + 0.20);
  }

  /** Clear all rhythmic schedulers and intervals */
  private clearSchedulers() {
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /** Gracefully fade out and kill current playing nodes */
  private fadeOutCurrent(fadeTime = 2.0) {
    if (!this.ctx || !this.currentChannelGain) return;
    const cg = this.currentChannelGain;
    const now = this.ctx.currentTime;

    cg.gain.cancelScheduledValues(now);
    cg.gain.setValueAtTime(cg.gain.value || 0.001, now);
    cg.gain.exponentialRampToValueAtTime(0.0001, now + fadeTime);

    // Stop stadium noise LFOs
    try { this.noiseSource?.stop(now + fadeTime); } catch (_) {}
    try { this.noiseLFO1?.stop(now + fadeTime); } catch (_) {}
    try { this.noiseLFO2?.stop(now + fadeTime); } catch (_) {}

    const oscsToKill = [...this.activeOscillators];
    const gainsToKill = [...this.activeGainNodes];
    const noiseToKill = [this.noiseSource, this.noiseGain, this.noiseFilter, this.noiseLFO1, this.noiseLFO2, cg];

    this.activeOscillators = [];
    this.activeGainNodes = [];
    this.currentChannelGain = null;
    this.noiseSource = null;
    this.noiseGain = null;
    this.noiseFilter = null;
    this.noiseLFO1 = null;
    this.noiseLFO2 = null;

    // Disconnect and cleanup after fade
    setTimeout(() => {
      oscsToKill.forEach(o => {
        try { o.stop?.(); } catch (_) {}
        try { o.disconnect(); } catch (_) {}
      });
      gainsToKill.forEach(g => {
        try { g.disconnect(); } catch (_) {}
      });
      noiseToKill.forEach(n => {
        try { (n as any)?.stop?.(); } catch (_) {}
        try { (n as any)?.disconnect?.(); } catch (_) {}
      });
    }, (fadeTime + 0.2) * 1000);
  }

  /** Main documentary synth scheduler */
  private buildMood(profile: MoodProfile) {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Create channel gain node for this page (fade-in)
    const channelGain = ctx.createGain();
    channelGain.gain.setValueAtTime(0.0001, now);
    channelGain.gain.linearRampToValueAtTime(1.0, now + 1.8); // fade in over 1.8s
    channelGain.connect(this.masterGain);
    this.currentChannelGain = channelGain;

    // 1. Play stadium ambience if required by this chapter and style allows it
    if (profile.hasAmbience && (this._style === "blend" || this._style === "strings")) {
      this.startStadiumAmbience();
    }

    // 2. Play tension heartbeat if required
    if (profile.hasHeartbeat && (this._style === "blend" || this._style === "strings")) {
      const bpm = profile.bpm || 60;
      const intervalMs = (60 / bpm) * 1000;
      this.playHeartbeat();
      this.heartbeatInterval = setInterval(() => {
        this.playHeartbeat();
      }, intervalMs);
    }

    // 3. Set up the arpeggio chord loop
    let chordIdx = 0;
    const chords = profile.chords;

    const playChordCycle = () => {
      if (!this.ctx || !this.currentChannelGain) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      // Trigger String Pad (Cinematic Strings)
      if (this._style === "blend" || this._style === "strings") {
        this.playStringChord(currentChord);
      }

      // Trigger Rolled Piano Chords (Mellow Piano)
      if (this._style === "blend" || this._style === "piano") {
        currentChord.forEach((noteStr, index) => {
          // Roll chords gently (arpeggiate notes with micro-offsets)
          const delay = index * 0.055 + (Math.random() * 0.015); // ~55ms arpeggio roll
          const velocity = 0.07 + (index === currentChord.length - 1 ? 0.03 : 0); // emphasize top melody note
          this.playPianoNote(noteStr, delay, velocity);
        });
      }
    };

    // Trigger first chord immediately
    playChordCycle();

    // Loop chords every 6.2s
    this.schedulerInterval = setInterval(playChordCycle, 6200);
  }

  /** Resolve which mood key to use for a given pathname */
  private resolveMoodKey(pathname: string): string | null {
    const allowedRoots = [
      "/",
      "/through-the-years",
      "/life-journey",
      "/rcb-legacy",
      "/man-in-love",
      "/price-of-greatness",
      "/legacy"
    ];

    const match = allowedRoots.find(p => {
      if (p === "/") return pathname === "/";
      return pathname === p || pathname.startsWith(p + "/");
    });

    return match ?? null;
  }

  /** Start or crossfade to the mood for the given pathname */
  async play(pathname: string) {
    const moodKey = this.resolveMoodKey(pathname);
    
    // If the style is mute, we track the page but do not play sound
    if (this._style === "mute") {
      this.currentMoodKey = moodKey;
      return;
    }

    if (!moodKey) {
      if (this._isPlaying) {
        this.clearSchedulers();
        this.fadeOutCurrent(2.0);
      }
      this.currentMoodKey = null;
      this._isPlaying = false;
      return;
    }

    if (moodKey === this.currentMoodKey && this._isPlaying) return;

    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    // Resume context if browser suspended it (required for user interaction unlock)
    if (this.ctx.state === "suspended") {
      try { await this.ctx.resume(); } catch (_) {}
    }

    // Fade out current sound nodes gracefully before playing new one
    if (this._isPlaying) {
      this.clearSchedulers();
      this.fadeOutCurrent(2.0); // 2s crossfade out
      await new Promise<void>(r => setTimeout(r, 600)); // overlap slightly
    }

    this.currentMoodKey = moodKey;
    this._isPlaying = true;
    
    const mood = MOODS[moodKey];
    if (mood) {
      this.buildMood(mood);
    }
  }

  /** Stop all audio with a graceful fade */
  stop() {
    if (!this._isPlaying) return;
    this._isPlaying = false;
    this.currentMoodKey = null;
    this.clearSchedulers();
    this.fadeOutCurrent(2.0);
  }

  /** Set master volume (range 0 to 1) */
  setVolume(v: number) {
    this._volume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      // Smoothly ramp volume to avoid audio pops
      this.masterGain.gain.setTargetAtTime(this._volume, this.ctx.currentTime, 0.08);
    }
  }

  /** Change soundtrack style (blend, piano, strings, mute) */
  async setStyle(style: AudioStyle) {
    if (style === this._style) return;
    
    const prevStyle = this._style;
    this._style = style;
    
    // Save to localStorage if possible
    if (typeof window !== "undefined") {
      localStorage.setItem("vk18_audio_style", style);
    }

    // If style is now mute, stop completely
    if (style === "mute") {
      this.stop();
      return;
    }

    // If previous style was mute and now we are unmuting, start playing
    if (prevStyle === "mute" && this.currentMoodKey) {
      this._isPlaying = false; // reset state
      await this.play(this.currentMoodKey);
      return;
    }

    // Otherwise, crossfade active chord progression to apply new style filters/mix
    if (this._isPlaying && this.currentMoodKey) {
      this.clearSchedulers();
      this.fadeOutCurrent(1.6);
      await new Promise<void>(r => setTimeout(r, 500));
      const mood = MOODS[this.currentMoodKey];
      if (mood) {
        this.buildMood(mood);
      }
    }
  }

  /** Called when the application controls unmount */
  cleanup() {
    this.stop();
    setTimeout(() => {
      try { this.ctx?.close(); } catch (_) {}
      this.ctx = null;
      this.masterGain = null;
      this.compressor = null;
      this.reverbInput = null;
      this.delayNode = null;
      this.delayGain = null;
      this.delayFilter = null;
    }, 2800);
  }
}

/** Global singleton — persists across Next.js client-side navigation */
export const audioEngine = new AudioEngine();

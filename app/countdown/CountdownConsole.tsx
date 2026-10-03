"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const HOUR_MS = 60 * 60 * 1000;

type PacificParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type SoundProfile = {
  name: string;
  notes: number[];
  wave: OscillatorType;
  step: number;
  bend: number;
};

const HOURLY_SOUNDS: SoundProfile[] = [
  { name: "Midnight Tax Auditors", notes: [440, 660, 523, 330], wave: "triangle", step: 0.2, bend: 0.78 },
  { name: "The 1 AM Dishwasher Opera", notes: [392, 587, 784, 523], wave: "sawtooth", step: 0.17, bend: 1.18 },
  { name: "Unlicensed Owl Convention", notes: [880, 660, 990, 740], wave: "square", step: 0.24, bend: 0.82 },
  { name: "A Very Small Air Raid", notes: [330, 494, 659, 988], wave: "sawtooth", step: 0.15, bend: 1.12 },
  { name: "The 4 AM Spreadsheet", notes: [523, 392, 294, 440], wave: "sine", step: 0.28, bend: 0.9 },
  { name: "Sunrise for One Pigeon", notes: [587, 880, 784, 1175], wave: "triangle", step: 0.19, bend: 1.2 },
  { name: "Breakfast-Adjacent Trumpets", notes: [349, 440, 523, 698], wave: "square", step: 0.16, bend: 0.86 },
  { name: "The Hamster Has a Briefing", notes: [740, 554, 830, 622], wave: "sawtooth", step: 0.21, bend: 1.14 },
  { name: "Nine O'Clock Bird Law", notes: [494, 659, 831, 659], wave: "triangle", step: 0.14, bend: 0.8 },
  { name: "Suspiciously Upbeat Fax", notes: [392, 523, 698, 1047], wave: "square", step: 0.23, bend: 1.16 },
  { name: "The Department of Hooting", notes: [659, 494, 740, 988], wave: "sine", step: 0.18, bend: 0.84 },
  { name: "A Meeting That Could Be a Chime", notes: [523, 784, 587, 880], wave: "sawtooth", step: 0.13, bend: 1.22 },
  { name: "Lunch Bell for Imaginary People", notes: [294, 440, 587, 784], wave: "triangle", step: 0.25, bend: 0.76 },
  { name: "The Pigeon Has Been Promoted", notes: [880, 1175, 784, 1047], wave: "square", step: 0.16, bend: 1.1 },
  { name: "Fourteen O'Clock, Legally", notes: [415, 622, 831, 554], wave: "sawtooth", step: 0.2, bend: 0.88 },
  { name: "Aggressive Office Plants", notes: [349, 523, 698, 932], wave: "triangle", step: 0.12, bend: 1.2 },
  { name: "The Tiny Parade Permit", notes: [587, 740, 988, 784], wave: "square", step: 0.22, bend: 0.8 },
  { name: "Fax Machine at the Disco", notes: [440, 554, 740, 988], wave: "sawtooth", step: 0.15, bend: 1.15 },
  { name: "The Clock Is Doing Its Best", notes: [330, 392, 494, 659], wave: "sine", step: 0.27, bend: 0.82 },
  { name: "GreetMe's Emergency Kazoo", notes: [784, 659, 988, 523], wave: "square", step: 0.13, bend: 1.2 },
  { name: "Eight PM Court Is in Session", notes: [392, 587, 784, 1175, 1568], wave: "sawtooth", step: 0.18, bend: 1.25 },
  { name: "The Moon's Performance Review", notes: [659, 880, 587, 988], wave: "triangle", step: 0.21, bend: 0.78 },
  { name: "Twenty-Two Tiny Trumpets", notes: [523, 698, 880, 1175], wave: "square", step: 0.16, bend: 1.16 },
  { name: "The Night Shift's Last Brain Cell", notes: [294, 440, 349, 523], wave: "sine", step: 0.25, bend: 0.84 },
  { name: "The Extra Hour's Alibi", notes: [740, 523, 932, 659], wave: "sawtooth", step: 0.19, bend: 1.2 },
];

const GREETME_LINES = [
  "I have checked the clock. It remains extremely committed to 8 PM.",
  "Time is a flat circle. Mine has a little badge.",
  "Please remain calm. I have misplaced the calm.",
  "At 8 PM I become a pumpkin with calendar access.",
  "Your patience has been logged under: suspiciously impressive.",
  "I am the official agent for minutes that feel longer than minutes.",
];

const EXCUSES = [
  "I can't. The hour has requested a meeting with me.",
  "I'm on a very important call with the concept of 8 PM.",
  "My GreetMe agent has escalated this to the clock department.",
  "I have to go. A tiny trumpet is expecting me.",
  "I would, but the countdown and I have a prior arrangement.",
  "Sorry, I'm supervising an extremely punctual robot.",
  "The clock said it was urgent. It was right about the time.",
];

function getPacificParts(timestamp: number): PacificParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(timestamp));
  const values: Record<string, string> = {};
  parts.forEach((part) => {
    values[part.type] = part.value;
  });

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function getPacificInstant(year: number, month: number, day: number, hour: number) {
  const wallClockAsUtc = Date.UTC(year, month - 1, day, hour);
  let guess = wallClockAsUtc;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const local = getPacificParts(guess);
    const representedAsUtc = Date.UTC(
      local.year,
      local.month - 1,
      local.day,
      local.hour,
      local.minute,
      local.second,
    );
    const nextGuess = wallClockAsUtc - (representedAsUtc - guess);
    if (Math.abs(nextGuess - guess) < 1000) return nextGuess;
    guess = nextGuess;
  }

  return guess;
}

function getNextEightPm(now: number) {
  const local = getPacificParts(now);
  const tonight = getPacificInstant(local.year, local.month, local.day, 20);
  if (tonight > now) return tonight;
  return getPacificInstant(local.year, local.month, local.day + 1, 20);
}

function getNextHourSlot(now: number) {
  return Math.floor(now / HOUR_MS) + 1;
}

function getSoundForSlot(slot: number): SoundProfile {
  const slotStart = slot * HOUR_MS;
  const pacificParts = getPacificParts(slotStart);
  const pacificHour = pacificParts.hour;
  const pacificMidnight = getPacificInstant(
    pacificParts.year,
    pacificParts.month,
    pacificParts.day,
    0,
  );
  const chronologicalHour = Math.round((slotStart - pacificMidnight) / HOUR_MS);
  const index = chronologicalHour % HOURLY_SOUNDS.length;
  const dailyVariation = Math.floor(
    Date.UTC(pacificParts.year, pacificParts.month - 1, pacificParts.day) / 86400000,
  );
  const base = HOURLY_SOUNDS[index];
  const semitoneShift = (dailyVariation % 7) - 3;
  const notes = base.notes.map((note, noteIndex) => {
    const extraSemitone = noteIndex % 2 === 0 ? 0 : dailyVariation % 2;
    return note * 2 ** ((semitoneShift + extraSemitone) / 12);
  });
  const isEightPm = pacificHour === 20;

  return {
    ...base,
    name: isEightPm
      ? "GreetMe 8 PM victory proceedings"
      : base.name + " · remix " + String((dailyVariation % 13) + 1).padStart(2, "0"),
    notes: isEightPm
      ? [392, 587, 784, 1175, 1568].map((note) => note * 2 ** (semitoneShift / 12))
      : notes,
    step: base.step + (dailyVariation % 4) * 0.012,
  };
}

function formatHour(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIME_ZONE,
    hour: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

function formatPacificDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

function getCountdown(now: number, target: number) {
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function getProgress(now: number, target: number) {
  const localTarget = getPacificParts(target);
  const previousEightPm = getPacificInstant(
    localTarget.year,
    localTarget.month,
    localTarget.day - 1,
    20,
  );
  const length = target - previousEightPm;
  return Math.max(0, Math.min(100, ((now - previousEightPm) / length) * 100));
}

function playProfile(
  context: AudioContext,
  output: GainNode,
  profile: SoundProfile,
) {
  const startAt = context.currentTime + 0.035;

  profile.notes.forEach((frequency, index) => {
    const start = startAt + index * profile.step;
    const duration = profile.step * 0.9;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const panner = context.createStereoPanner();

    oscillator.type = profile.wave;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(55, frequency * profile.bend),
      start + duration,
    );
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(0.62, start + 0.025);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    panner.pan.setValueAtTime(index % 2 === 0 ? -0.28 : 0.28, start);

    oscillator.connect(envelope);
    envelope.connect(panner);
    panner.connect(output);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);

    if (index % 2 === 0) {
      const undertone = context.createOscillator();
      const undertoneGain = context.createGain();
      undertone.type = "sine";
      undertone.frequency.setValueAtTime(frequency / 2, start);
      undertoneGain.gain.setValueAtTime(0.0001, start);
      undertoneGain.gain.exponentialRampToValueAtTime(0.18, start + 0.03);
      undertoneGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      undertone.connect(undertoneGain);
      undertoneGain.connect(output);
      undertone.start(start);
      undertone.stop(start + duration + 0.03);
    }
  });
}

function TimeAgent({ expression }: { expression: number }) {
  const eyeY = expression % 3 === 1 ? 88 : 91;
  const mouth = expression % 3 === 2 ? "M91 115 Q105 130 119 115" : "M94 117 Q105 123 116 117";

  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-label="A small GreetMe timekeeping agent in a blue uniform"
      className="h-44 w-44 shrink-0 sm:h-52 sm:w-52"
    >
      <ellipse cx="110" cy="193" rx="64" ry="10" fill="#05060a" opacity=".62" />
      <path d="M64 166c0-24 20-40 46-40s46 16 46 40v18H64z" fill="#202b49" stroke="#8497ff" strokeWidth="2" />
      <path d="M76 157 54 174M144 157l22 17" stroke="#8497ff" strokeWidth="9" strokeLinecap="round" />
      <path d="M77 178h66" stroke="#5b6fff" strokeWidth="3" strokeLinecap="round" />
      <rect x="75" y="43" width="70" height="80" rx="20" fill="#dbe2f2" stroke="#93a1c5" strokeWidth="3" />
      <path d="M93 44v-9c0-9 7-15 17-15s17 6 17 15v9" fill="none" stroke="#8497ff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="110" cy="16" r="5" fill="#f6c96e" />
      <rect x="83" y="58" width="54" height="47" rx="13" fill="#101625" stroke="#7a8aff" strokeWidth="2" />
      <circle cx="97" cy={eyeY} r="4.5" fill="#f3f6ff" />
      <circle cx="123" cy={eyeY} r="4.5" fill="#f3f6ff" />
      <path d={mouth} fill="none" stroke="#f3f6ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M89 44h42" stroke="#a8b4d3" strokeWidth="3" strokeLinecap="round" />
      <rect x="91" y="137" width="38" height="20" rx="4" fill="#111827" stroke="#f1c979" strokeWidth="1.5" />
      <text x="110" y="151" textAnchor="middle" fill="#f5d996" fontSize="9" fontFamily="monospace" letterSpacing="1">
        GREETME
      </text>
      <path d="M82 184v8m56-8v8" stroke="#c4cee3" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export default function CountdownConsole() {
  const [now, setNow] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(1);
  const [soundNotice, setSoundNotice] = useState("Sound is off. The browser requires one deliberate click before scheduled audio.");
  const [lastChime, setLastChime] = useState("No chimes yet. The agent is in witness protection.");
  const [lineIndex, setLineIndex] = useState(0);
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [copyNotice, setCopyNotice] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const volumeRef = useRef(volume);
  const soundEnabledRef = useRef(false);
  const lastHourSlotRef = useRef<number | null>(null);

  const playSound = useCallback((profile: SoundProfile) => {
    const context = audioContextRef.current;
    const master = masterGainRef.current;
    if (!context || !master || context.state !== "running") return false;
    playProfile(context, master, profile);
    return true;
  }, []);

  useEffect(() => {
    let lastPaintedSecond = -1;
    const tick = () => {
      const current = Date.now();
      const second = Math.floor(current / 1000);
      if (second !== lastPaintedSecond) {
        lastPaintedSecond = second;
        setNow(current);
      }

      const slot = Math.floor(current / HOUR_MS);
      if (lastHourSlotRef.current === null) {
        lastHourSlotRef.current = slot;
      } else if (slot !== lastHourSlotRef.current) {
        lastHourSlotRef.current = slot;
        const millisecondsIntoHour = current - slot * HOUR_MS;
        if (millisecondsIntoHour < 5000 && soundEnabledRef.current) {
          const profile = getSoundForSlot(slot);
          if (playSound(profile)) {
            const heardAt = formatHour(current);
            setLastChime("Heard at " + heardAt + " · " + profile.name + ".");
            if (getPacificParts(current).hour === 20) setLineIndex(3);
          }
        }
      }
    };

    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [playSound]);

  useEffect(() => {
    volumeRef.current = volume;
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        volume,
        audioContextRef.current.currentTime,
        0.04,
      );
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      soundEnabledRef.current = false;
      void audioContextRef.current?.close();
    };
  }, []);

  const prepareAudio = async () => {
    if (!audioContextRef.current) {
      const context = new AudioContext();
      const master = context.createGain();
      master.gain.value = volumeRef.current;
      master.connect(context.destination);
      audioContextRef.current = context;
      masterGainRef.current = master;
    }

    const context = audioContextRef.current;
    if (context.state !== "running") await context.resume();
    return context;
  };

  const toggleHourlySound = async () => {
    if (soundEnabledRef.current) {
      soundEnabledRef.current = false;
      setSoundEnabled(false);
      setSoundNotice("Disarmed. GreetMe has returned to a normal, unhelpful level of silence.");
      return;
    }

    try {
      await prepareAudio();
      soundEnabledRef.current = true;
      setSoundEnabled(true);
      setSoundNotice("Armed. Keep this tab open; the next chime lands on the next Pacific hour.");
    } catch {
      setSoundNotice("Audio could not start here. Check this browser's sound settings and try again.");
    }
  };

  const previewNextSound = async () => {
    try {
      await prepareAudio();
      const nextSlot = getNextHourSlot(Date.now());
      const profile = getSoundForSlot(nextSlot);
      if (playSound(profile)) setLastChime("Soundcheck · " + profile.name + ".");
      setSoundNotice(soundEnabledRef.current
        ? "Soundcheck complete. The hourly schedule is still armed."
        : "Soundcheck complete. Hourly chimes are still disarmed.");
    } catch {
      setSoundNotice("Audio could not start here. Check this browser's sound settings and try again.");
    }
  };

  const target = now === null ? null : getNextEightPm(now);
  const countdown = target !== null && now !== null ? getCountdown(now, target) : null;
  const progress = target !== null && now !== null ? getProgress(now, target) : 0;
  const nextSlot = now === null ? null : getNextHourSlot(now);
  const nextSound = nextSlot === null ? null : getSoundForSlot(nextSlot);
  const nextChimeAt = nextSlot === null ? null : nextSlot * HOUR_MS;
  const chimesRemaining =
    target !== null && nextChimeAt !== null
      ? Math.max(1, Math.floor((target - nextChimeAt) / HOUR_MS) + 1)
      : null;
  const currentPacificTime =
    now === null
      ? "--:--:--"
      : new Intl.DateTimeFormat("en-US", {
          timeZone: PACIFIC_TIME_ZONE,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }).format(new Date(now));
  const excuse = EXCUSES[excuseIndex];

  const makeExcuse = () => {
    setExcuseIndex((current) => {
      const next = Math.floor(Math.random() * EXCUSES.length);
      return next === current ? (next + 1) % EXCUSES.length : next;
    });
  };

  const copyStatus = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyNotice("Countdown link copied. You are now responsible for this.");
    } catch {
      setCopyNotice("Copy is blocked here. The URL is dillonnagar.com/countdown.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
      <header className="border-b border-white/10 pb-8 sm:pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-300">
            GreetMe time authority <span className="text-white/35">/ unit 08</span>
          </p>
          <p className="font-mono text-[0.68rem] text-white/55">
            PACIFIC CLOCK · {currentPacificTime}
          </p>
        </div>
        <div className="mt-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-200">
            Official countdown, unofficial level of concern
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-white sm:text-7xl">
            8 PM is coming.
            <span className="mt-2 block text-white/55">Act natural.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
            GreetMe has been assigned one job: count down to the next 8 PM Pacific
            and make a completely different noise at every hour mark.
          </p>
        </div>
      </header>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]" aria-label="Countdown and GreetMe agent">
        <article className="rounded-xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
                Time until the next hearing
              </p>
              <p className="mt-2 text-sm text-white/75">
                {target === null ? "Finding the next 8 PM…" : formatPacificDate(target) + " · 8:00 PM Pacific"}
              </p>
            </div>
            <span className="rounded-md border border-emerald-300/25 bg-emerald-300/[0.07] px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-emerald-200">
              Clock has no chill
            </span>
          </div>

          <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-3" aria-live="off">
            {[
              ["DAYS", countdown ? String(countdown.days).padStart(2, "0") : "--"],
              ["HOURS", countdown ? String(countdown.hours).padStart(2, "0") : "--"],
              ["MINUTES", countdown ? String(countdown.minutes).padStart(2, "0") : "--"],
              ["SECONDS", countdown ? String(countdown.seconds).padStart(2, "0") : "--"],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-lg border border-white/10 bg-black/25 px-2 py-4 text-center sm:px-4 sm:py-5">
                <p className="font-mono text-3xl font-medium tabular-nums tracking-[-0.07em] text-white sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 font-mono text-[0.55rem] tracking-[0.12em] text-white/45 sm:text-[0.62rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/45">
              <span>Today’s unnecessary urgency</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Progress through the current countdown cycle"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full rounded-full bg-blue-400 transition-[width] duration-500"
                style={{ width: progress + "%" }}
              />
            </div>
            <p className="mt-2 text-xs text-white/45">
              The bar is not medically meaningful. GreetMe insisted on a bar.
            </p>
          </div>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40">
                Hourly chimes before 8
              </p>
              <p className="mt-1 text-sm text-white/80">
                {chimesRemaining === null ? "Calculating…" : chimesRemaining + (chimesRemaining === 1 ? " dramatic entrance" : " dramatic entrances")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40">
                Next noise at
              </p>
              <p className="mt-1 text-sm text-white/80">
                {nextChimeAt === null ? "Calculating…" : formatHour(nextChimeAt) + " · " + (nextSound?.name ?? "stand by")}
              </p>
            </div>
          </div>
        </article>

        <aside className="flex flex-col justify-between rounded-xl border border-blue-300/20 bg-blue-300/[0.045] p-5 sm:p-7">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <button
              type="button"
              onClick={() => setLineIndex((current) => (current + 1) % GREETME_LINES.length)}
              className="rounded-xl border border-white/10 bg-black/20 p-1 transition-transform hover:-rotate-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label="Ask the GreetMe timekeeping agent for another thought"
            >
              <TimeAgent expression={lineIndex} />
            </button>
            <div className="w-full">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.17em] text-blue-200">
                Your assigned time-agent
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-white">
                GreetMe, Esq.
              </h2>
              <p className="mt-1 font-mono text-[0.62rem] text-white/45">
                Licensed to observe the clock
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-sm leading-6 text-white/80" aria-live="polite">
                  “{GREETME_LINES[lineIndex]}”
                </p>
                <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/40">
                  Tap the agent for another unsolicited update
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
            <p className="text-xs leading-5 text-white/50">
              It has never been late. It also has no commute.
            </p>
            <span className="shrink-0 rounded border border-amber-200/25 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-amber-100">
              Agent online
            </span>
          </div>
        </aside>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2" aria-label="Hourly sound controls and excuse generator">
        <article className="rounded-xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.17em] text-blue-300">
                Hourly noise department
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
                A new sound every hour.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
                Synthesized on this device. Each hour gets its own little audio incident.
                The 8 PM edition includes an unnecessarily triumphant finale.
              </p>
            </div>
            <span className="rounded border border-amber-200/20 bg-amber-200/[0.06] px-2.5 py-1.5 font-mono text-[0.57rem] uppercase tracking-[0.1em] text-amber-100">
              Volume capped by your device
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void toggleHourlySound()}
              aria-pressed={soundEnabled}
              className={
                "min-h-11 rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 " +
                (soundEnabled
                  ? "border-emerald-300/35 bg-emerald-300/[0.08] text-emerald-100 hover:bg-emerald-300/[0.14]"
                  : "border-blue-300/35 bg-blue-400/15 text-blue-100 hover:bg-blue-400/25")
              }
            >
              {soundEnabled ? "Disarm hourly sounds" : "Arm hourly sounds"}
            </button>
            <button
              type="button"
              onClick={() => void previewNextSound()}
              className="min-h-11 rounded-md border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-white/75 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Soundcheck
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="greetme-volume" className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/60">
                Noise dial
              </label>
              <span className="font-mono text-xs tabular-nums text-white/70">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              id="greetme-volume"
              type="range"
              min="0.15"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="mt-3 w-full accent-blue-400"
            />
            <p className="mt-2 text-xs text-white/45">{soundNotice}</p>
          </div>

          <p className="mt-4 flex gap-2 text-xs leading-5 text-white/45">
            <span aria-hidden="true" className="font-mono text-blue-300">NOTE:</span>
            Browsers need this page to stay open and sound to be armed. Your device's
            mute switch and volume still have final say.
          </p>
          <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[0.6rem] leading-5 text-white/55" aria-live="polite">
            LAST DISPATCH · {lastChime}
          </p>
        </article>

        <article className="flex flex-col rounded-xl border border-amber-100/15 bg-amber-100/[0.035] p-5 sm:p-7">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.17em] text-amber-100/75">
              Excuse fabrication bureau
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
              Need a reason to leave?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              GreetMe can generate one with the confidence of a clock that has never
              been asked to do taxes.
            </p>
          </div>
          <blockquote className="my-6 flex-1 rounded-lg border border-amber-100/15 bg-black/20 p-5">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-amber-100/55">
              Official excuse no. {String(excuseIndex + 1).padStart(2, "0")}
            </p>
            <p className="mt-4 text-xl leading-8 tracking-[-0.03em] text-white sm:text-2xl">
              “{excuse}”
            </p>
          </blockquote>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={makeExcuse}
              className="min-h-11 rounded-md border border-amber-100/25 bg-amber-100/[0.07] px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-amber-50 transition-colors hover:bg-amber-100/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100"
            >
              Generate another excuse
            </button>
            <button
              type="button"
              onClick={() => void copyStatus()}
              className="min-h-11 rounded-md border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-white/65 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Copy countdown link
            </button>
          </div>
          {copyNotice && (
            <p className="mt-3 text-xs text-white/50" role="status">
              {copyNotice}
            </p>
          )}
        </article>
      </section>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/35">
        <span>GREETME · TIMEKEEPING DIVISION · PACIFIC TIME AUTO-ADJUSTS FOR DST</span>
        <span>It will be 8 PM eventually.</span>
      </footer>
    </div>
  );
}

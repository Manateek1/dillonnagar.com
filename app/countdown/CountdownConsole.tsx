"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

type PacificParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type BuzzerProfile = {
  name: string;
  frequency: number;
  wave: OscillatorType;
  duration: number;
  pulses: number;
  bend: number;
  overtone: number;
};

const HOURLY_BUZZERS: BuzzerProfile[] = [
  { name: "Midnight Tax Alarm", frequency: 185, wave: "square", duration: 1.45, pulses: 3, bend: 0.78, overtone: 1.49 },
  { name: "Dishwasher Emergency", frequency: 212, wave: "sawtooth", duration: 1.3, pulses: 2, bend: 1.16, overtone: 1.32 },
  { name: "Unlicensed Owl Alert", frequency: 168, wave: "square", duration: 1.6, pulses: 4, bend: 0.86, overtone: 1.62 },
  { name: "Small Air-Raid Bureau", frequency: 245, wave: "sawtooth", duration: 1.35, pulses: 3, bend: 1.2, overtone: 1.38 },
  { name: "Spreadsheet Fire Drill", frequency: 194, wave: "square", duration: 1.5, pulses: 2, bend: 0.82, overtone: 1.55 },
  { name: "Pigeon Sunrise Siren", frequency: 226, wave: "sawtooth", duration: 1.4, pulses: 4, bend: 1.13, overtone: 1.42 },
  { name: "Breakfast Trumpet Alarm", frequency: 174, wave: "square", duration: 1.55, pulses: 3, bend: 0.74, overtone: 1.7 },
  { name: "Hamster Briefing Buzzer", frequency: 264, wave: "sawtooth", duration: 1.35, pulses: 2, bend: 1.19, overtone: 1.28 },
  { name: "Bird-Law Warning Tone", frequency: 205, wave: "square", duration: 1.5, pulses: 4, bend: 0.91, overtone: 1.58 },
  { name: "Upbeat Fax Distress Call", frequency: 235, wave: "sawtooth", duration: 1.4, pulses: 3, bend: 1.25, overtone: 1.36 },
  { name: "Department of Hooting", frequency: 158, wave: "square", duration: 1.65, pulses: 2, bend: 0.8, overtone: 1.66 },
  { name: "Meeting Could Be a Buzzer", frequency: 218, wave: "sawtooth", duration: 1.3, pulses: 4, bend: 1.17, overtone: 1.44 },
  { name: "Imaginary Lunch Bell", frequency: 180, wave: "square", duration: 1.55, pulses: 3, bend: 0.76, overtone: 1.52 },
  { name: "Pigeon Promotion Alarm", frequency: 252, wave: "sawtooth", duration: 1.4, pulses: 2, bend: 1.22, overtone: 1.4 },
  { name: "Fourteen O'Clock Siren", frequency: 201, wave: "square", duration: 1.5, pulses: 4, bend: 0.87, overtone: 1.64 },
  { name: "Aggressive Plant Warning", frequency: 171, wave: "sawtooth", duration: 1.65, pulses: 3, bend: 1.2, overtone: 1.3 },
  { name: "Tiny Parade Emergency", frequency: 230, wave: "square", duration: 1.4, pulses: 2, bend: 0.83, overtone: 1.6 },
  { name: "Disco Fax Evacuation", frequency: 260, wave: "sawtooth", duration: 1.35, pulses: 4, bend: 1.24, overtone: 1.34 },
  { name: "Clock Doing Its Best", frequency: 190, wave: "square", duration: 1.55, pulses: 3, bend: 0.79, overtone: 1.5 },
  { name: "Emergency Kazoo Buzzer", frequency: 243, wave: "sawtooth", duration: 1.4, pulses: 2, bend: 1.21, overtone: 1.39 },
  { name: "GreetMe Mega-Buzzer", frequency: 150, wave: "square", duration: 2.1, pulses: 4, bend: 0.72, overtone: 1.82 },
  { name: "Moon Performance Alarm", frequency: 208, wave: "sawtooth", duration: 1.5, pulses: 3, bend: 1.18, overtone: 1.43 },
  { name: "Twenty-Two Trumpet Warning", frequency: 275, wave: "square", duration: 1.3, pulses: 2, bend: 0.88, overtone: 1.61 },
  { name: "Last Brain Cell Alert", frequency: 165, wave: "sawtooth", duration: 1.65, pulses: 4, bend: 1.15, overtone: 1.31 },
  { name: "Extra Hour's Alibi", frequency: 223, wave: "square", duration: 1.45, pulses: 3, bend: 0.81, overtone: 1.57 },
];

const MOTIVATION_LINES = [
  "Keep going. You have more momentum than it feels like.",
  "One small step still counts as a step.",
  "Stay with it. The finish line is getting closer.",
  "Future you is quietly grateful you kept at it.",
  "You do not need perfect. You need the next useful step.",
  "Take a breath, then keep rolling.",
  "Your effort is doing more than your doubt says.",
  "Five focused minutes can change the whole afternoon.",
  "Keep going. Starting was the hard part.",
  "You are allowed to learn while you work.",
  "Progress looks boring right before it looks obvious.",
  "Keep your head up and your next step small.",
  "You can do the next bit, even if the whole thing feels huge.",
  "Stay curious. That is a surprisingly effective superpower.",
  "Your pace is fine. The clock is just dramatic.",
  "Give the task one more honest minute.",
  "You are building the version of you who finishes.",
  "A little progress beats a perfect plan on the shelf.",
  "Do not let the snack committee adjourn the meeting yet.",
  "Keep your focus. The forest council believes in you.",
  "You have handled tricky things before. This is another one.",
  "Pick one thing. Do that thing. You are already rolling.",
  "Your future self just gave you a tiny thumbs-up.",
  "The next step does not need to be impressive. Just real.",
  "You are closer than you were when this minute started.",
  "A reset is allowed. Giving up is not required.",
  "Look at you, still showing up. Very professional.",
  "The task is big. Your next move can be small.",
  "Your focus is a little lantern. Keep it lit.",
  "You do not have to feel ready to make progress.",
  "The work counts, even when nobody claps for it.",
  "Keep moving. Small steps are excellent at adding up.",
  "You are doing better than the grumpy voice in your head says.",
  "One clean minute of focus. That is the whole assignment.",
  "You have permission to make this simpler.",
  "The hard part is often staying in the room. You are here.",
  "Keep at it. The moss is growing at a very respectable pace.",
  "Every useful attempt teaches the next one what to do.",
  "You can pause after this next small win.",
  "Do the next right thing. The rest can wait its turn.",
  "You are not behind in this minute. You are in it.",
  "Your effort has excellent roots. Keep watering it.",
  "Make a little progress, then let that count.",
  "The forest is large. Your next step is still findable.",
  "You can be tired and still take one gentle step.",
  "You have made it through every weird minute so far.",
  "Keep going. A tiny acorn is not a failed oak.",
  "Your curiosity is a good compass. Follow one question.",
  "You are allowed to do this in your own order.",
  "A rough draft is progress wearing a funny hat.",
  "Stick with the part you can control. That is plenty.",
  "The task does not get to decide what you are capable of.",
  "Keep going. The little forest guy has seen worse.",
  "You are collecting proof that you can follow through.",
  "One more try is a strategy, not a personality flaw.",
  "Make the next minute useful in whatever way you can.",
  "You can restart without making a speech about it.",
  "Let the work be imperfect and let it move forward.",
  "You are building something with every minute you stay.",
  "A kind word to yourself is also part of the work.",
];

const MOTIVATION_TAGS = [
  "The moss committee approves.",
  "A squirrel has filed a positive report.",
  "The local ferns are quietly cheering.",
  "Please accept this professionally gathered leaf.",
  "The owls have noted your persistence.",
  "A tiny woodland trumpet salutes you.",
  "Your imaginary forest badge is shining.",
  "The mushrooms are impressed, and they are hard to impress.",
  "Rooting for you is literally what trees do.",
  "The forest morale desk is open.",
  "One acorn of progress is still an acorn.",
  "Moss has issued a supportive nod.",
  "The pinecones believe in your plan.",
  "No fairy dust required. Just one more step.",
  "A small woodland creature is proud of you.",
  "Your progress has excellent roots.",
  "The trees say: steady is a speed.",
  "A fern just did a tiny standing ovation.",
  "The forest has not lost confidence in you.",
  "Your effort is growing on the locals.",
  "A leaf has been pinned to your honor.",
  "The acorn council says keep at it.",
  "Moss is doing a very sincere thumbs-up.",
  "Your forest pal is right here in your corner.",
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

function getBuzzerForSlot(slot: number): BuzzerProfile {
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
  const index = chronologicalHour % HOURLY_BUZZERS.length;
  const dailyVariation = Math.floor(
    Date.UTC(pacificParts.year, pacificParts.month - 1, pacificParts.day) / 86400000,
  );
  const base = HOURLY_BUZZERS[index];
  const semitoneShift = (dailyVariation % 7) - 3;
  const isEightPm = pacificHour === 20;

  return {
    ...base,
    name: isEightPm
      ? "GreetMe 8 PM MEGA-BUZZER"
      : base.name + " · remix " + String((dailyVariation % 13) + 1).padStart(2, "0"),
    frequency: (isEightPm ? 148 : base.frequency) * 2 ** (semitoneShift / 12),
    duration: isEightPm ? 2.15 : base.duration + (dailyVariation % 3) * 0.045,
    pulses: isEightPm ? 4 : base.pulses,
    bend: isEightPm ? 0.7 : base.bend,
    overtone: isEightPm ? 1.8 : base.overtone,
  };
}

function getMotivationForMinute(minuteSlot: number) {
  const normalizedMinute = ((minuteSlot % MOTIVATION_LINES.length) + MOTIVATION_LINES.length) % MOTIVATION_LINES.length;
  const tagIndex = Math.floor(minuteSlot / MOTIVATION_LINES.length) % MOTIVATION_TAGS.length;
  return MOTIVATION_LINES[normalizedMinute] + " " + MOTIVATION_TAGS[tagIndex];
}

function speakMotivation(message: string, volume = 1) {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    return false;
  }

  const speech = window.speechSynthesis;
  speech.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.volume = Math.max(0, Math.min(1, volume));
  utterance.rate = 1.04;
  utterance.pitch = 1.12;
  const voice =
    speech.getVoices().find((candidate) => candidate.lang.toLowerCase() === "en-us") ??
    speech.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith("en-"));
  if (voice) utterance.voice = voice;
  speech.speak(utterance);
  return true;
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

function playBuzzer(context: AudioContext, output: GainNode, profile: BuzzerProfile) {
  const startAt = context.currentTime + 0.035;
  const pulseLength = profile.duration / profile.pulses;

  for (let index = 0; index < profile.pulses; index += 1) {
    const start = startAt + index * pulseLength;
    const duration = pulseLength * 0.79;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const panner = context.createStereoPanner();

    oscillator.type = profile.wave;
    oscillator.frequency.setValueAtTime(profile.frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(45, profile.frequency * profile.bend),
      start + duration,
    );
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(0.76, start + 0.018);
    envelope.gain.setValueAtTime(0.76, start + duration * 0.72);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    panner.pan.setValueAtTime(index % 2 === 0 ? -0.18 : 0.18, start);

    oscillator.connect(envelope);
    envelope.connect(panner);
    panner.connect(output);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);

    const overtone = context.createOscillator();
    const overtoneGain = context.createGain();
    overtone.type = profile.wave === "square" ? "sawtooth" : "square";
    overtone.frequency.setValueAtTime(profile.frequency * profile.overtone, start);
    overtoneGain.gain.setValueAtTime(0.0001, start);
    overtoneGain.gain.exponentialRampToValueAtTime(0.17, start + 0.02);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    overtone.connect(overtoneGain);
    overtoneGain.connect(output);
    overtone.start(start);
    overtone.stop(start + duration + 0.03);
  }
}

function TimeAgent({ expression }: { expression: number }) {
  const eyeY = expression % 2 === 0 ? 111 : 113;
  const mouth = expression % 3 === 2 ? "M101 128 Q112 139 124 128" : "M103 130 Q112 134 121 130";

  return (
    <svg
      viewBox="0 0 240 220"
      role="img"
      aria-label="Moss, GreetMe's original round forest coach"
      className="h-44 w-48 shrink-0 sm:h-52 sm:w-56"
    >
      <ellipse cx="120" cy="196" rx="72" ry="9" fill="#05060a" opacity=".62" />
      <path d="M73 151 51 165m116-14 22 14" stroke="#71955c" strokeWidth="10" strokeLinecap="round" />
      <path d="M58 159c-9-7-17-5-22 2 8 8 15 8 23 3m122-5c9-7 17-5 22 2-8 8-15 8-23 3" fill="#85aa6a" stroke="#c3d79b" strokeWidth="2" />
      <path d="M78 168v15m84-15v15" stroke="#657d4d" strokeWidth="13" strokeLinecap="round" />
      <path d="M69 178h20m64 0h20" stroke="#a3bd78" strokeWidth="8" strokeLinecap="round" />
      <path d="M53 150c-7-19-2-47 11-62 1-24 21-42 46-43 27-2 50 17 52 43 16 14 21 39 12 61-9 23-31 35-60 35-31 0-52-12-61-34Z" fill="#557d50" stroke="#b0c98a" strokeWidth="3" />
      <path d="M84 148c2-16 16-25 37-25s35 9 37 25c-7 15-20 23-37 23s-30-8-37-23Z" fill="#9db976" />
      <path d="M67 93c-19-4-29-17-26-29 14-2 27 6 32 20m88 9c18-5 26-18 22-30-14-1-26 8-29 22" fill="#759f61" stroke="#bad38e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M112 48c-15-16-11-31 2-40 15 10 19 23 7 40 18-12 33-8 36 5-16 10-31 8-45-5Z" fill="#7dad63" stroke="#c0d895" strokeWidth="2" strokeLinejoin="round" />
      <path d="M99 51c-3-10-1-17 4-23m18 21c4-9 10-14 18-16" fill="none" stroke="#456844" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 105c7-8 16-8 22-1m20 0c7-7 15-7 22 1" fill="none" stroke="#36543d" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="96" cy={eyeY} rx="4" ry="5" fill="#19251a" />
      <ellipse cx="132" cy={eyeY} rx="4" ry="5" fill="#19251a" />
      <circle cx="97" cy={eyeY - 1} r="1.3" fill="#f5f4d9" />
      <circle cx="133" cy={eyeY - 1} r="1.3" fill="#f5f4d9" />
      <ellipse cx="114" cy="122" rx="5" ry="3.5" fill="#d4ad7b" />
      <path d={mouth} fill="none" stroke="#253d2c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="79" cy="123" r="5" fill="#d2856d" opacity=".75" />
      <circle cx="150" cy="123" r="5" fill="#d2856d" opacity=".75" />
      <circle cx="69" cy="137" r="3" fill="#c4d991" />
      <circle cx="166" cy="133" r="2.6" fill="#c4d991" />
      <rect x="94" y="151" width="42" height="18" rx="5" fill="#243a2b" stroke="#e3c98e" strokeWidth="1.5" />
      <text x="115" y="163" textAnchor="middle" fill="#f4dfae" fontSize="8" fontFamily="monospace" letterSpacing=".8">
        GREETME
      </text>
    </svg>
  );
}

export default function CountdownConsole() {
  const [now, setNow] = useState<number | null>(null);
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [volume, setVolume] = useState(1);
  const [soundNotice, setSoundNotice] = useState("Alerts are off. Click once to arm the hourly buzzer and minute pep talks.");
  const [lastAlert, setLastAlert] = useState("No alerts yet. Moss is practicing a supportive nod.");
  const [lineIndex, setLineIndex] = useState(0);
  const [motivation, setMotivation] = useState("Keep going. You have more momentum than it feels like. The moss committee approves.");
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [copyNotice, setCopyNotice] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const volumeRef = useRef(volume);
  const alertsEnabledRef = useRef(false);
  const lastHourSlotRef = useRef<number | null>(null);
  const lastMinuteSlotRef = useRef<number | null>(null);
  const minuteSpeechTimeoutRef = useRef<number | null>(null);

  const playHourlyBuzzer = useCallback((profile: BuzzerProfile) => {
    const context = audioContextRef.current;
    const master = masterGainRef.current;
    if (!context || !master || context.state !== "running") return false;
    playBuzzer(context, master, profile);
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

      const hourSlot = Math.floor(current / HOUR_MS);
      if (lastHourSlotRef.current === null) {
        lastHourSlotRef.current = hourSlot;
      } else if (hourSlot !== lastHourSlotRef.current) {
        lastHourSlotRef.current = hourSlot;
        const millisecondsIntoHour = current - hourSlot * HOUR_MS;
        if (millisecondsIntoHour < 5000 && alertsEnabledRef.current) {
          const buzzer = getBuzzerForSlot(hourSlot);
          if (playHourlyBuzzer(buzzer)) {
            setLastAlert("Buzzer at " + formatHour(current) + " · " + buzzer.name + ".");
          }
        }
      }

      const minuteSlot = Math.floor(current / MINUTE_MS);
      if (lastMinuteSlotRef.current === null) {
        lastMinuteSlotRef.current = minuteSlot;
        setMotivation(getMotivationForMinute(minuteSlot));
        setLineIndex(minuteSlot);
      } else if (minuteSlot !== lastMinuteSlotRef.current) {
        lastMinuteSlotRef.current = minuteSlot;
        const message = getMotivationForMinute(minuteSlot);
        const millisecondsIntoMinute = current - minuteSlot * MINUTE_MS;
        setMotivation(message);
        setLineIndex(minuteSlot);

        if (millisecondsIntoMinute < 5000 && alertsEnabledRef.current) {
          if (minuteSpeechTimeoutRef.current !== null) {
            window.clearTimeout(minuteSpeechTimeoutRef.current);
          }
          const delay = minuteSlot % 60 === 0 ? 2300 : 0;
          minuteSpeechTimeoutRef.current = window.setTimeout(() => {
            minuteSpeechTimeoutRef.current = null;
            if (
              !alertsEnabledRef.current ||
              Math.floor(Date.now() / MINUTE_MS) !== minuteSlot
            ) {
              return;
            }
            if (speakMotivation(message, volumeRef.current)) {
              setLastAlert("Moss at " + formatHour(Date.now()) + ": “" + message + "”");
            } else {
              setSoundNotice("The buzzer is armed, but this browser does not support spoken messages.");
            }
          }, delay);
        }
      }
    };

    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [playHourlyBuzzer]);

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
      alertsEnabledRef.current = false;
      if (minuteSpeechTimeoutRef.current !== null) {
        window.clearTimeout(minuteSpeechTimeoutRef.current);
      }
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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

  const toggleAlerts = async () => {
    if (alertsEnabledRef.current) {
      alertsEnabledRef.current = false;
      setAlertsEnabled(false);
      if (minuteSpeechTimeoutRef.current !== null) {
        window.clearTimeout(minuteSpeechTimeoutRef.current);
        minuteSpeechTimeoutRef.current = null;
      }
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setSoundNotice("Disarmed. Moss will keep the motivational thoughts to itself.");
      return;
    }

    try {
      await prepareAudio();
      alertsEnabledRef.current = true;
      setAlertsEnabled(true);
      const speechAvailable =
        "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
      setSoundNotice(
        speechAvailable
          ? "Armed. A loud buzzer each hour; a spoken pep talk each minute. Keep this tab open."
          : "Buzzer armed. The message will change each minute, but this browser cannot speak it aloud.",
      );
    } catch {
      setSoundNotice("Audio could not start here. Check this browser's sound settings and try again.");
    }
  };

  const previewNextBuzzer = async () => {
    try {
      await prepareAudio();
      const nextSlot = getNextHourSlot(Date.now());
      const buzzer = getBuzzerForSlot(nextSlot);
      if (playHourlyBuzzer(buzzer)) setLastAlert("Buzzer check · " + buzzer.name + ".");
      setSoundNotice(alertsEnabledRef.current
        ? "Buzzer check complete. Minute pep talks are still armed."
        : "Buzzer check complete. Scheduled alerts are still disarmed.");
    } catch {
      setSoundNotice("Audio could not start here. Check this browser's sound settings and try again.");
    }
  };

  const target = now === null ? null : getNextEightPm(now);
  const countdown = target !== null && now !== null ? getCountdown(now, target) : null;
  const progress = target !== null && now !== null ? getProgress(now, target) : 0;
  const nextSlot = now === null ? null : getNextHourSlot(now);
  const nextBuzzer = nextSlot === null ? null : getBuzzerForSlot(nextSlot);
  const nextBuzzerAt = nextSlot === null ? null : nextSlot * HOUR_MS;
  const buzzersRemaining =
    target !== null && nextBuzzerAt !== null
      ? Math.max(1, Math.floor((target - nextBuzzerAt) / HOUR_MS) + 1)
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

  const repeatPepTalk = () => {
    if (speakMotivation(motivation, volumeRef.current)) {
      setLastAlert("Moss repeated: “" + motivation + "”");
    } else {
      setSoundNotice("This browser does not support spoken messages. The pep talk is still on screen.");
    }
  };

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
            GreetMe has been assigned one job: count down to the next 8 PM Pacific,
            speak a fresh pep talk every minute, and make a very serious buzzer noise
            at every hour mark.
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
                Hourly buzzer blasts before 8
              </p>
              <p className="mt-1 text-sm text-white/80">
                {buzzersRemaining === null ? "Calculating…" : buzzersRemaining + (buzzersRemaining === 1 ? " dramatic entrance" : " dramatic entrances")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40">
                Next buzzer at
              </p>
              <p className="mt-1 text-sm text-white/80">
                {nextBuzzerAt === null ? "Calculating…" : formatHour(nextBuzzerAt) + " · " + (nextBuzzer?.name ?? "stand by")}
              </p>
            </div>
          </div>
        </article>

        <aside className="flex flex-col justify-between rounded-xl border border-blue-300/20 bg-blue-300/[0.045] p-5 sm:p-7">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <button
              type="button"
              onClick={repeatPepTalk}
              className="rounded-xl border border-white/10 bg-black/20 p-1 transition-transform hover:-rotate-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label="Hear Moss repeat the current pep talk"
            >
              <TimeAgent expression={lineIndex} />
            </button>
            <div className="w-full">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.17em] text-blue-200">
                Your assigned time-agent
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-white">
                Moss, morale officer.
              </h2>
              <p className="mt-1 font-mono text-[0.62rem] text-white/45">
                Forest-certified motivation
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-sm leading-6 text-white/80" aria-live="polite">
                  “{motivation}”
                </p>
                <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/40">
                  Tap Moss to hear the pep talk again
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
            <p className="text-xs leading-5 text-white/50">
              Moss says it counts as working from the woods.
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
                Buzzer and pep-talk department
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
                One very serious buzzer. Every hour.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
                Each hour gets a different, full-volume buzzer variation. Every minute,
                Moss speaks a new motivational message. Eight PM gets the mega-buzzer.
              </p>
            </div>
            <span className="rounded border border-amber-200/20 bg-amber-200/[0.06] px-2.5 py-1.5 font-mono text-[0.57rem] uppercase tracking-[0.1em] text-amber-100">
              Volume capped by your device
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void toggleAlerts()}
              aria-pressed={alertsEnabled}
              className={
                "min-h-11 rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 " +
                (alertsEnabled
                  ? "border-emerald-300/35 bg-emerald-300/[0.08] text-emerald-100 hover:bg-emerald-300/[0.14]"
                  : "border-blue-300/35 bg-blue-400/15 text-blue-100 hover:bg-blue-400/25")
              }
            >
              {alertsEnabled ? "Disarm all alerts" : "Arm buzzer + pep talks"}
            </button>
            <button
              type="button"
              onClick={() => void previewNextBuzzer()}
              className="min-h-11 rounded-md border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-white/75 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Buzzer soundcheck
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="greetme-volume" className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/60">
                Buzzer and voice volume
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
            LAST DISPATCH · {lastAlert}
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
        <span>GREETME · MOSS'S MORALE DESK · PACIFIC TIME AUTO-ADJUSTS FOR DST</span>
        <span>It will be 8 PM eventually.</span>
      </footer>
    </div>
  );
}

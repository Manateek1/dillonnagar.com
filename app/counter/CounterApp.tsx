"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type ConfettiPiece = {
  id: string;
  color: string;
  left: number;
  drift: string;
  rotate: string;
  delay: string;
  duration: string;
};

type ClickSound = {
  type: OscillatorType;
  start: number;
  end: number;
  gain: number;
  duration: number;
};

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [milestoneLabel, setMilestoneLabel] = useState("");
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (celebrationTimer.current) {
        clearTimeout(celebrationTimer.current);
      }
      if (confettiTimer.current) {
        clearTimeout(confettiTimer.current);
      }

      if (
        audioContextRef.current &&
        typeof audioContextRef.current.close === "function" &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const getAudioContext = (): AudioContext | null => {
    if (typeof window === "undefined") {
      return null;
    }

    const win = window as WindowWithWebkitAudio;
    const AudioContextClass = win.AudioContext || win.webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const audioContext = audioContextRef.current;

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    return audioContext;
  };

  const playClickSound = (clickNumber: number) => {
    const audioContext = getAudioContext();

    if (!audioContext) {
      return;
    }

    const clickSounds: ClickSound[] = [
      { type: "triangle", start: 420, end: 660, gain: 0.075, duration: 0.1 },
      { type: "square", start: 520, end: 820, gain: 0.055, duration: 0.08 },
      { type: "sine", start: 610, end: 900, gain: 0.085, duration: 0.07 },
      { type: "sawtooth", start: 340, end: 540, gain: 0.065, duration: 0.11 },
    ];
    const sound = clickSounds[(clickNumber - 1) % 4];
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const startTime = audioContext.currentTime;

    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.start, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      sound.end,
      startTime + sound.duration * 0.6,
    );

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(sound.gain, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + sound.duration,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + sound.duration);
  };

  const playMilestoneSound = () => {
    const audioContext = getAudioContext();

    if (!audioContext) {
      return;
    }

    const startTime = audioContext.currentTime + 0.04;
    const notes = [784, 988, 1174];

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const noteStart = startTime + index * 0.12;
      const noteEnd = noteStart + 0.24;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      oscillator.frequency.linearRampToValueAtTime(frequency * 1.03, noteEnd);

      gainNode.gain.setValueAtTime(0.0001, noteStart);
      gainNode.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(noteStart);
      oscillator.stop(noteEnd);
    });

    [1046, 1318, 1568].forEach((frequency) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const chordStart = startTime + 0.3;
      const chordEnd = chordStart + 0.5;

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(frequency, chordStart);
      oscillator.frequency.linearRampToValueAtTime(frequency * 1.02, chordEnd);

      gainNode.gain.setValueAtTime(0.0001, chordStart);
      gainNode.gain.exponentialRampToValueAtTime(0.08, chordStart + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, chordEnd);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(chordStart);
      oscillator.stop(chordEnd);
    });
  };

  const handleClick = () => {
    const nextCount = count + 1;
    const colors = [
      "#f97316",
      "#facc15",
      "#22c55e",
      "#38bdf8",
      "#a855f7",
      "#fb7185",
    ];

    playClickSound(nextCount);
    setCount(nextCount);

    if (nextCount < 100) {
      return;
    }

    const step = 10 ** (String(nextCount).length - 1);
    const hitMilestone = nextCount % step === 0;

    if (!hitMilestone) {
      return;
    }

    if (celebrationTimer.current) {
      clearTimeout(celebrationTimer.current);
    }
    if (confettiTimer.current) {
      clearTimeout(confettiTimer.current);
    }

    playMilestoneSound();
    setCelebrating(true);
    setMilestoneLabel(`Milestone ${nextCount.toLocaleString()}!`);
    setConfetti(
      Array.from({ length: 28 }, (_, index) => ({
        id: `${nextCount}-${index}`,
        color: colors[index % colors.length],
        left: Math.random() * 100,
        drift: `${Math.round((Math.random() - 0.5) * 240)}px`,
        rotate: `${Math.round(Math.random() * 360)}deg`,
        delay: `${(Math.random() * 0.18).toFixed(2)}s`,
        duration: `${(1.8 + Math.random() * 0.8).toFixed(2)}s`,
      })),
    );

    celebrationTimer.current = setTimeout(() => {
      setCelebrating(false);
    }, 1800);

    confettiTimer.current = setTimeout(() => {
      setConfetti([]);
      setMilestoneLabel("");
    }, 2600);
  };

  return (
    <div
      className={`counter-app relative box-border flex min-h-[calc(100svh-var(--header-height))] w-full items-center justify-center overflow-hidden p-6 ${
        celebrating ? "counter-app-celebrating" : ""
      }`}
    >
      <style>{`
        .counter-app {
          background:
            radial-gradient(circle at top, rgba(56, 189, 248, 0.22), transparent 30%),
            radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.2), transparent 24%),
            linear-gradient(160deg, #081222 0%, #101b33 50%, #14213d 100%);
        }
        .counter-app::before,
        .counter-app::after {
          content: '';
          position: absolute;
          border-radius: 999px;
          filter: blur(20px);
          opacity: 0.6;
          animation: counter-float 10s ease-in-out infinite;
        }
        .counter-app::before {
          width: 240px;
          height: 240px;
          top: 8%;
          left: -40px;
          background: rgba(59, 130, 246, 0.25);
        }
        .counter-app::after {
          width: 280px;
          height: 280px;
          right: -80px;
          bottom: 6%;
          background: rgba(249, 115, 22, 0.2);
          animation-delay: -5s;
        }
        .counter-card {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 24px 60px rgba(2, 6, 23, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
        }
        .counter-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 42%);
          pointer-events: none;
        }
        .counter-count {
          font-size: clamp(4.5rem, 18vw, 7rem);
          line-height: 0.95;
          color: #f8fafc;
          text-shadow:
            0 0 24px rgba(96, 165, 250, 0.18),
            0 12px 40px rgba(15, 23, 42, 0.45);
        }
        .counter-button {
          background: linear-gradient(135deg, #f97316, #ec4899 45%, #2563eb);
          box-shadow:
            0 14px 30px rgba(37, 99, 235, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            filter 0.18s ease;
        }
        .counter-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 18px 34px rgba(37, 99, 235, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        .counter-button:active {
          transform: translateY(1px) scale(0.99);
        }
        .counter-button:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.28);
          outline-offset: 4px;
        }
        .counter-status-visible {
          color: #fde68a;
          animation: counter-status-pop 0.4s ease;
        }
        .counter-celebrating {
          animation: counter-card-glow 1.8s ease;
        }
        .counter-count-pop {
          animation: counter-count-pop 0.8s ease;
        }
        .counter-button-celebrating {
          animation: counter-button-pulse 0.7s ease 2;
        }
        .counter-burst-ring {
          position: absolute;
          top: 44%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.72);
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: counter-burst-ring 1s ease-out forwards;
        }
        .counter-confetti-piece {
          position: absolute;
          top: -14%;
          left: var(--left);
          width: 10px;
          height: 20px;
          border-radius: 6px;
          background: var(--color);
          opacity: 0;
          transform: translateX(-50%) rotate(var(--rotate));
          animation: counter-confetti-fall var(--duration) ease-out forwards;
          animation-delay: var(--delay);
        }
        .counter-confetti-piece:nth-child(3n) {
          width: 14px;
          height: 14px;
          border-radius: 999px;
        }
        @keyframes counter-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(18px); }
        }
        @keyframes counter-card-glow {
          0% {
            transform: scale(1);
            box-shadow:
              0 24px 60px rgba(2, 6, 23, 0.45),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }
          35% {
            transform: scale(1.02);
            box-shadow:
              0 0 0 8px rgba(250, 204, 21, 0.08),
              0 24px 70px rgba(59, 130, 246, 0.32),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
          }
          100% {
            transform: scale(1);
            box-shadow:
              0 24px 60px rgba(2, 6, 23, 0.45),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }
        }
        @keyframes counter-count-pop {
          0% { transform: scale(1); }
          35% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes counter-button-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes counter-burst-ring {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(8);
          }
        }
        @keyframes counter-confetti-fall {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px) rotate(var(--rotate)) scale(0.5);
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--drift)), 420px) rotate(calc(var(--rotate) + 240deg)) scale(1);
          }
        }
        @keyframes counter-status-pop {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        className={`counter-card relative w-[min(420px,100%)] overflow-hidden rounded-[28px] px-[22px] pb-[26px] pt-[36px] text-center sm:px-[28px] sm:pb-[30px] sm:pt-[42px] ${
          celebrating ? "counter-celebrating" : ""
        }`}
      >
        {confetti.length > 0 && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {confetti.map((piece) => (
              <span
                key={piece.id}
                className="counter-confetti-piece"
                style={
                  {
                    "--left": `${piece.left}%`,
                    "--drift": piece.drift,
                    "--rotate": piece.rotate,
                    "--delay": piece.delay,
                    "--duration": piece.duration,
                    "--color": piece.color,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}

        {celebrating && <div className="counter-burst-ring" aria-hidden="true" />}

        <p className="relative z-10 mb-[18px] text-[0.78rem] uppercase tracking-[0.22em] text-[#93c5fd]">
          Milestone Clicker
        </p>
        <h1
          className={`counter-count relative z-10 mb-6 font-medium tracking-[-1.68px] ${
            celebrating ? "counter-count-pop" : ""
          }`}
        >
          {count.toLocaleString()}
        </h1>
        <button
          type="button"
          className={`counter-button relative z-10 w-full cursor-pointer rounded-full border-none px-[30px] py-[14px] text-base font-bold text-white sm:w-auto ${
            celebrating ? "counter-button-celebrating" : ""
          }`}
          onClick={handleClick}
        >
          Click me
        </button>
        <p
          className={`relative z-10 mt-[18px] min-h-[24px] text-[0.95rem] ${
            milestoneLabel
              ? "counter-status-visible"
              : "text-[rgba(226,232,240,0.8)]"
          }`}
        >
          {milestoneLabel ||
            "Big celebrations start at 100, 200, 1,000, 2,000, and beyond."}
        </p>
      </div>
    </div>
  );
}

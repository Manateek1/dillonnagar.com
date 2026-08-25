"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const runningRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (document.documentElement.dataset.motion === "reduce") return;
    if (runningRef.current) window.cancelAnimationFrame(runningRef.current);
    const start = performance.now();
    const duration = 520;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const resolved = Math.floor(progress * text.length);
      setDisplay(
        text
          .split("")
          .map((character, index) => {
            if (character === " ") return " ";
            if (index < resolved) return character;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(""),
      );
      if (progress < 1) runningRef.current = window.requestAnimationFrame(tick);
      else {
        setDisplay(text);
        runningRef.current = null;
      }
    };

    runningRef.current = window.requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const timer = window.setTimeout(scramble, 360);
    return () => {
      window.clearTimeout(timer);
      if (runningRef.current) window.cancelAnimationFrame(runningRef.current);
    };
  }, [scramble]);

  return (
    <span className={className} onMouseEnter={scramble} onFocus={scramble} tabIndex={-1} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

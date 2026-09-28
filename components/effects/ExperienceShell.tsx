"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import CommandPalette from "@/components/effects/CommandPalette";

export type VisualMode = "signal" | "mono";

type TrailParticle = {
  x: number;
  y: number;
  life: number;
  size: number;
};

export default function ExperienceShell() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [visualMode, setVisualMode] = useState<VisualMode>(() => {
    if (typeof window === "undefined") return "signal";
    const storedMode = window.localStorage.getItem("dn-visual-mode");
    return storedMode === "mono" ? "mono" : "signal";
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedMotion = window.localStorage.getItem("dn-reduced-motion");
    return storedMotion === null
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : storedMotion === "true";
  });
  const [toast, setToast] = useState<string | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    setTerminalOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.visualMode = visualMode;
    window.localStorage.setItem("dn-visual-mode", visualMode);
    window.dispatchEvent(new CustomEvent("dn:visual-mode", { detail: visualMode }));
  }, [visualMode]);

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduce" : "full";
    window.localStorage.setItem("dn-reduced-motion", String(reducedMotion));
    window.dispatchEvent(new CustomEvent("dn:motion", { detail: reducedMotion }));
  }, [reducedMotion]);

  useEffect(() => {
    const openPalette = (event: Event) => {
      const detail = (event as CustomEvent<{ terminal?: boolean }>).detail;
      setTerminalOpen(Boolean(detail?.terminal));
      setPaletteOpen(true);
    };

    window.addEventListener("dn:open-command", openPalette);
    return () => window.removeEventListener("dn:open-command", openPalette);
  }, []);

  useEffect(() => {
    const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let sequenceIndex = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((open) => !open);
        return;
      }

      if (!isTyping && event.key === "`") {
        event.preventDefault();
        setTerminalOpen(true);
        setPaletteOpen(true);
        return;
      }

      if (isTyping) return;

      if (event.key.toLowerCase() === sequence[sequenceIndex].toLowerCase()) {
        sequenceIndex += 1;
        if (sequenceIndex === sequence.length) {
          sequenceIndex = 0;
          document.documentElement.dataset.overdrive = "true";
          setToast("SIGNAL BOOSTED — nice sequence.");
          window.setTimeout(() => {
            delete document.documentElement.dataset.overdrive;
            setToast(null);
          }, 5200);
        }
      } else {
        sequenceIndex = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const register = () => {
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-ready])");
      elements.forEach((element) => {
        element.dataset.revealReady = "true";
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
          element.dataset.revealed = "true";
        } else {
          observer.observe(element);
        }
      });
    };

    let scrollFrame = 0;
    const revealVisible = () => {
      scrollFrame = 0;
      const waiting = document.querySelectorAll<HTMLElement>("[data-reveal-ready]:not([data-revealed])");
      waiting.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          element.dataset.revealed = "true";
          observer.unobserve(element);
        }
      });
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(revealVisible);
    };

    register();
    revealVisible();
    const mutationObserver = new MutationObserver(() => {
      register();
      revealVisible();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, [pathname]);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const glow = glowRef.current;
    const canvas = trailRef.current;
    const context = canvas?.getContext("2d");
    if (!glow || !canvas || !context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let trailFrame = 0;
    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = targetX;
    let currentY = targetY;
    let lastTrailX = targetX;
    let lastTrailY = targetY;
    let activeMagnetic: HTMLElement | null = null;
    let activeTilt: HTMLElement | null = null;
    const particles: TrailParticle[] = [];

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGlow = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
        frame = window.requestAnimationFrame(drawGlow);
      } else {
        frame = 0;
      }
    };

    const drawTrail = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life -= 0.055;
        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }
        context.beginPath();
        context.fillStyle = `rgba(98, 119, 255, ${particle.life * 0.22})`;
        context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
      if (particles.length) {
        trailFrame = window.requestAnimationFrame(drawTrail);
      } else {
        trailFrame = 0;
      }
    };

    const resetMagnetic = () => {
      if (!activeMagnetic) return;
      activeMagnetic.style.setProperty("--magnetic-x", "0px");
      activeMagnetic.style.setProperty("--magnetic-y", "0px");
      activeMagnetic = null;
    };

    const resetTilt = () => {
      if (!activeTilt) return;
      activeTilt.style.setProperty("--tilt-x", "0deg");
      activeTilt.style.setProperty("--tilt-y", "0deg");
      activeTilt.style.setProperty("--glint-x", "50%");
      activeTilt.style.setProperty("--glint-y", "50%");
      activeTilt = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.dataset.visible = "true";
      if (!frame) frame = window.requestAnimationFrame(drawGlow);

      const distance = Math.hypot(targetX - lastTrailX, targetY - lastTrailY);
      if (distance > 11) {
        particles.push({ x: targetX, y: targetY, life: 1, size: 4.5 });
        if (particles.length > 14) particles.shift();
        lastTrailX = targetX;
        lastTrailY = targetY;
        if (!trailFrame) trailFrame = window.requestAnimationFrame(drawTrail);
      }

      const target = event.target instanceof Element ? event.target : null;
      const magnetic = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnetic !== activeMagnetic) resetMagnetic();
      if (magnetic) {
        activeMagnetic = magnetic;
        const rect = magnetic.getBoundingClientRect();
        magnetic.style.setProperty("--magnetic-x", `${(event.clientX - rect.left - rect.width / 2) * 0.12}px`);
        magnetic.style.setProperty("--magnetic-y", `${(event.clientY - rect.top - rect.height / 2) * 0.16}px`);
      }

      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilt !== activeTilt) resetTilt();
      if (tilt) {
        activeTilt = tilt;
        const rect = tilt.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        tilt.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        tilt.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        tilt.style.setProperty("--glint-x", `${x * 100}%`);
        tilt.style.setProperty("--glint-y", `${y * 100}%`);
      }
    };

    const onPointerLeave = () => {
      glow.dataset.visible = "false";
      resetMagnetic();
      resetTilt();
    };

    const onClick = (event: MouseEvent) => {
      const wave = document.createElement("span");
      wave.className = "click-shockwave";
      wave.style.left = `${event.clientX}px`;
      wave.style.top = `${event.clientY}px`;
      document.body.appendChild(wave);
      window.setTimeout(() => wave.remove(), 720);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("click", onClick);
      if (frame) window.cancelAnimationFrame(frame);
      if (trailFrame) window.cancelAnimationFrame(trailFrame);
      resetMagnetic();
      resetTilt();
    };
  }, [pathname, reducedMotion]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={progressRef} />
      </div>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <canvas ref={trailRef} className="cursor-trail-canvas" aria-hidden="true" />
      {toast && <div className="signal-toast" role="status">{toast}</div>}
      {paletteOpen ? (
        <CommandPalette
          open
          terminalOpen={terminalOpen}
          visualMode={visualMode}
          reducedMotion={reducedMotion}
          onClose={closePalette}
          onTerminalChange={setTerminalOpen}
          onVisualModeChange={setVisualMode}
          onReducedMotionChange={setReducedMotion}
        />
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

type Point = {
  angle: number;
  band: number;
  radius: number;
  phase: number;
};

const pointCount = 360;

export default function OrbitalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const points: Point[] = Array.from({ length: pointCount }, (_, index) => ({
      angle: (index / pointCount) * Math.PI * 10,
      band: ((index * 47) % pointCount) / pointCount,
      radius: 0.48 + ((index * 29) % 100) / 420,
      phase: ((index * 83) % 100) / 100,
    }));

    let width = 1;
    let height = 1;
    let dpr = 1;
    let animationFrame = 0;
    let running = true;
    let reduced = document.documentElement.dataset.motion === "reduce";
    let pointerX = 0.68;
    let pointerY = 0.5;
    let targetX = pointerX;
    let targetY = pointerY;
    let accent = getComputedStyle(document.documentElement).getPropertyValue("--signal-rgb").trim() || "91, 111, 255";
    const started = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
    };

    const onMotion = (event: Event) => {
      reduced = Boolean((event as CustomEvent<boolean>).detail);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = running ? window.requestAnimationFrame(draw) : 0;
    };

    const onVisualMode = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue("--signal-rgb").trim() || "91, 111, 255";
      if (running && !animationFrame) animationFrame = window.requestAnimationFrame(draw);
    };

    const draw = (now: number) => {
      if (!running) return;
      const elapsed = (now - started) / 1000;
      const time = reduced ? 0.8 : elapsed;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      context.clearRect(0, 0, width, height);

      const centerX = width * (0.5 + (pointerX - 0.5) * 0.045);
      const centerY = height * (0.51 + (pointerY - 0.5) * 0.045);
      const scale = Math.min(width, height) * 0.56;

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.14 + (pointerX - 0.5) * 0.06);

      for (let orbit = 0; orbit < 7; orbit += 1) {
        context.beginPath();
        context.strokeStyle = `rgba(${accent}, ${0.06 + orbit * 0.012})`;
        context.lineWidth = orbit === 2 ? 1.15 : 0.7;
        context.ellipse(0, 0, scale * (0.42 + orbit * 0.075), scale * (0.13 + orbit * 0.027), orbit * 0.075, 0, Math.PI * 2);
        context.stroke();
      }

      context.globalCompositeOperation = "lighter";
      let previousX = 0;
      let previousY = 0;
      points.forEach((point, index) => {
        const flow = point.angle + time * (0.08 + point.band * 0.025);
        const wave = Math.sin(point.angle * 0.47 + time * 0.7 + point.phase * 5) * scale * 0.05;
        const radius = scale * point.radius * (0.76 + point.band * 0.36);
        const x = Math.cos(flow) * radius;
        const y = Math.sin(flow) * radius * (0.31 + point.band * 0.09) + wave;
        const z = (Math.sin(flow) + 1) / 2;
        const cursorDistance = Math.hypot(x / scale - (pointerX - 0.5) * 1.2, y / scale - (pointerY - 0.5) * 0.8);
        const cursorEnergy = Math.max(0, 1 - cursorDistance * 2.1);
        const size = 0.55 + z * 1.25 + cursorEnergy * 1.6;
        const alpha = 0.16 + z * 0.56 + cursorEnergy * 0.2;

        context.beginPath();
        context.fillStyle = `rgba(${accent}, ${alpha})`;
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fill();

        if (index > 0 && index % 3 === 0) {
          context.beginPath();
          context.strokeStyle = `rgba(${accent}, ${0.025 + z * 0.055})`;
          context.lineWidth = 0.55;
          context.moveTo(previousX, previousY);
          context.lineTo(x, y);
          context.stroke();
        }
        previousX = x;
        previousY = y;
      });

      const nodeX = scale * 0.46;
      const nodeY = scale * 0.08;
      const pulse = reduced ? 0.5 : (Math.sin(time * 2.2) + 1) / 2;
      context.beginPath();
      context.fillStyle = `rgba(${accent}, 0.95)`;
      context.arc(nodeX, nodeY, 3.2 + pulse * 1.5, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.strokeStyle = `rgba(${accent}, ${0.36 - pulse * 0.14})`;
      context.lineWidth = 1;
      context.arc(nodeX, nodeY, 13 + pulse * 12, 0, Math.PI * 2);
      context.stroke();
      context.restore();
      context.globalCompositeOperation = "source-over";

      animationFrame = reduced ? 0 : window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !animationFrame) animationFrame = window.requestAnimationFrame(draw);
      if (!running && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("dn:motion", onMotion);
    window.addEventListener("dn:visual-mode", onVisualMode);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("dn:motion", onMotion);
      window.removeEventListener("dn:visual-mode", onVisualMode);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="orbital-canvas" aria-hidden="true" />;
}

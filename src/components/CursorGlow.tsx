"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const dot = document.createElement("div");
    dotRef.current = dot;
    const glow = document.createElement("div");
    glowRef.current = glow;

    dot.style.cssText = `
      position: fixed; pointer-events: none; margin-left: -8px; margin-top: -8px;
      left: 0; top: 0; width: 16px; height: 16px; border-radius: 50%;
      background: rgba(0,0,0,0.55); z-index: 9999; will-change: transform;
      transform: translate(-50%,-50%);
    `;
    glow.style.cssText = `
      position: fixed; pointer-events: none; margin-left: -60px; margin-top: -60px;
      left: 0; top: 0; width: 120px; height: 120px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%);
      z-index: 9998; filter: blur(24px); will-change: transform;
      transform: translate(-50%,-50%);
    `;
    document.body.appendChild(dot);
    document.body.appendChild(glow);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      const { x, y } = posRef.current;
      if (dotRef.current) { dotRef.current.style.left = `${x}px`; dotRef.current.style.top = `${y}px`; }
      if (glowRef.current) { glowRef.current.style.left = `${x}px`; glowRef.current.style.top = `${y}px`; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      try { document.body.removeChild(dot); } catch {}
      try { document.body.removeChild(glow); } catch {}
    };
  }, []);

  return null;
}

'use client';
import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;

    let raf: number;
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    let active = false;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; active = true; };
    const onLeave = () => { active = false; };

    const tick = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.setProperty('--mx', `${cx}px`);
      el.style.setProperty('--my', `${cy}px`);
      el.style.opacity = active ? '1' : '0';
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-500"
      style={{
        backgroundImage: [
          'linear-gradient(to right, color-mix(in oklab, var(--border) 100%, transparent) 2px, transparent 2px)',
          'linear-gradient(to bottom, color-mix(in oklab, var(--border) 80%, transparent) 2px, transparent 2px)',
        ].join(', '),
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(280px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)',
        maskImage: 'radial-gradient(280px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)',
      }}
    />
  );
}

'use client';
import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;

    let raf: number;
    let tx = -9999, ty = -9999;
    let cx = -9999, cy = -9999;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onLeave = () => { tx = -9999; ty = -9999; };

    const tick = () => {
      // Smooth follow with lerp
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty('--x', `${cx}px`);
      el.style.setProperty('--y', `${cy}px`);
      el.style.opacity = tx === -9999 ? '0' : '1';
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
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500"
      style={{
        // Thick grid lines (2px) masked to a radial spot around cursor
        // Same grid size as .grid-lines (40px) so they overlap perfectly
        backgroundImage: [
          'linear-gradient(to right, color-mix(in oklab, var(--border) 100%, transparent) 2px, transparent 2px)',
          'linear-gradient(to bottom, color-mix(in oklab, var(--border) 80%, transparent) 2px, transparent 2px)',
        ].join(', '),
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)',
        maskImage: 'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)',
      }}
    />
  );
}

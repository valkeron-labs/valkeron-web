'use client';
import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`);
      el.style.setProperty('--y', `${e.clientY}px`);
      el.style.opacity = '1';
    };
    const onLeave = () => { el.style.opacity = '0'; };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(0,180,216,0.07), transparent 60%)',
      }}
    />
  );
}

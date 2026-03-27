'use client';
import { useEffect } from 'react';

export function MouseGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf: number;
    let tx = -9999, ty = -9999;
    let cx = -9999, cy = -9999;
    let active = false;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; active = true; };
    const onLeave = () => { active = false; };

    const tick = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;

      // Update each .grid-lines element with coords relative to itself
      const grids = document.querySelectorAll<HTMLElement>('.grid-lines');
      grids.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const lx = cx - rect.left;
        const ly = cy - rect.top;
        el.style.setProperty('--mouse-x', `${lx}px`);
        el.style.setProperty('--mouse-y', `${ly}px`);
        el.style.setProperty('--mouse-active', active ? '1' : '0');
      });

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

  return null;
}

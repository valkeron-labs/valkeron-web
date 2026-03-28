'use client';

import {useEffect, useRef} from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const ACCENT_RGB = '0, 180, 216';

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let w = 0, h = 0;
    let particles: Particle[] = [];
    let mx = -9999, my = -9999;

    canvas.style.pointerEvents = 'none';

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile ? 30 : 65;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 0.8 + Math.random() * 1.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const attractRadius = 200;
      const attractStrength = 0.02;

      for (const p of particles) {
        // Mouse attraction
        if (mx > 0 && my > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < attractRadius && dist > 1) {
            p.vx += (dx / dist) * attractStrength;
            p.vy += (dy / dist) * attractStrength;
          }
        }

        // Damping to prevent runaway velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)); }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)); }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_RGB}, 0.35)`;
        ctx.fill();
      }

      // Lines between close particles
      const linkDist = isMobile ? 100 : 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const opacity = (1 - dist / linkDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Lines from particles to cursor
      if (mx > 0 && my > 0) {
        for (const p of particles) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < attractRadius) {
            const opacity = (1 - dist / attractRadius) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };

    init();
    raf = requestAnimationFrame(draw);

    // Listen on window so events aren't blocked by content above
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className ?? 'absolute inset-0'}`} />;
}

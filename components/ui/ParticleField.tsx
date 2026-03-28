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
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 0.8 + Math.random() * 1.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const mouseRadius = 160;
      const mouseStrength = 0.0015;
      const peerRadius = 200;
      const G = 0.0006; // gravitational constant — visible orbital dynamics

      // Inter-particle gravity — force proportional to mass (radius²), orbital dynamics
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist > peerRadius || dist < 1) continue;

          const nx = dx / dist;
          const ny = dy / dist;

          // Collision repulsion — only when overlapping
          const minDist = a.radius + b.radius + 2;
          if (dist < minDist) {
            const repel = 0.003;
            a.vx -= nx * repel;
            a.vy -= ny * repel;
            b.vx += nx * repel;
            b.vy += ny * repel;
            continue;
          }

          // Gravitational attraction: F = G * m1 * m2 / d²
          // mass ~ radius² (area), softened denominator to prevent spikes
          const massA = a.radius * a.radius;
          const massB = b.radius * b.radius;
          const force = G * massA * massB / (distSq + 400); // softening prevents tight spirals

          // Apply force — heavier particles move less
          a.vx += nx * force / massA;
          a.vy += ny * force / massA;
          b.vx -= nx * force / massB;
          b.vy -= ny * force / massB;
        }
      }

      for (const p of particles) {
        // Gentle mouse attraction — capped so close distance doesn't cause burst
        if (mx > 0 && my > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 30) {
            const force = mouseStrength * (1 - dist / mouseRadius);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Minimal damping — barely slows, keeps organic drift alive forever
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Gentle min speed — just enough to prevent total freeze, low enough to allow orbits
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.05) {
          const angle = Math.atan2(p.vy, p.vx) || (Math.random() * Math.PI * 2);
          p.vx = Math.cos(angle) * 0.05;
          p.vy = Math.sin(angle) * 0.05;
        }
        // Cap max speed to prevent runaways
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2;
          p.vy = (p.vy / speed) * 1.2;
        }

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

      // Subtle lines from particles to cursor
      if (mx > 0 && my > 0) {
        for (const p of particles) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const opacity = (1 - dist / mouseRadius) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${opacity})`;
            ctx.lineWidth = 0.4;
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

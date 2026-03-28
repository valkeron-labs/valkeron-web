'use client';

import {useEffect, useRef} from 'react';

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let w = 0, h = 0;
    const mouse = { x: -1000, y: -1000 };

    const PARTICLE_COUNT = isMobile ? 40 : 100;
    const CONNECT_DIST = isMobile ? 100 : 150;
    const PEER_ATTRACT = 0.00004; // gentle inter-particle gravity

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; hue: number; alpha: number;
      pulse: number; driftAngle: number; driftSpeed: number;
    };

    let particles: Particle[] = [];

    const createParticle = (): Particle => {
      const hue = 190 + Math.random() * 30; // cyan range matching #00B4D8
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.8 + 0.8,
        hue,
        alpha: Math.random() * 0.4 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.0003 + Math.random() * 0.0006,
      };
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            // Draw connection line
            const lineAlpha = (1 - dist / CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(210, 70%, 55%, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // Gentle inter-particle attraction (proportional to mass)
            if (dist > p.r + q.r + 3) {
              const nx = dx / dist;
              const ny = dy / dist;
              const massP = p.r * p.r;
              const massQ = q.r * q.r;
              const force = PEER_ATTRACT * massP * massQ / (dist * 0.5 + 20);
              p.vx -= nx * force / massP;
              p.vy -= ny * force / massP;
              q.vx += nx * force / massQ;
              q.vy += ny * force / massQ;
            }
          }
        }
      }

      // Draw and update particles
      for (const pt of particles) {
        pt.pulse += 0.012;
        const glow = pt.alpha + Math.sin(pt.pulse) * 0.12;

        // Subtle mouse attraction
        const mdx = mouse.x - pt.x;
        const mdy = mouse.y - pt.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 250 && mdist > 1) {
          const force = (250 - mdist) / 250 * 0.3;
          pt.vx += (mdx / mdist) * force * 0.02;
          pt.vy += (mdy / mdist) * force * 0.02;
        }

        // Gentle sinusoidal drift — organic circular motion
        pt.driftAngle += pt.driftSpeed;
        pt.vx += Math.cos(pt.driftAngle) * 0.0015;
        pt.vy += Math.sin(pt.driftAngle) * 0.0015;

        // Dampen
        pt.vx *= 0.993;
        pt.vy *= 0.993;

        // Clamp max speed
        const speed = Math.sqrt(pt.vx * pt.vx + pt.vy * pt.vy);
        if (speed > 0.25) {
          pt.vx *= 0.25 / speed;
          pt.vy *= 0.25 / speed;
        }

        pt.x += pt.vx;
        pt.y += pt.vy;

        // Soft bounce off edges
        if (pt.x < pt.r) { pt.x = pt.r; pt.vx = Math.abs(pt.vx) * 0.5; }
        if (pt.x > w - pt.r) { pt.x = w - pt.r; pt.vx = -Math.abs(pt.vx) * 0.5; }
        if (pt.y < pt.r) { pt.y = pt.r; pt.vy = Math.abs(pt.vy) * 0.5; }
        if (pt.y > h - pt.r) { pt.y = h - pt.r; pt.vy = -Math.abs(pt.vy) * 0.5; }

        // Outer glow halo — subtle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pt.hue}, 80%, 60%, ${glow * 0.03})`;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pt.hue}, 80%, 65%, ${glow})`;
        ctx.fill();
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    const onResize = () => {
      resize();
      const target = isMobile ? 40 : 100;
      while (particles.length < target) particles.push(createParticle());
      while (particles.length > target) particles.pop();
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    init();
    raf = requestAnimationFrame(draw);

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className ?? 'absolute inset-0'}`} />;
}

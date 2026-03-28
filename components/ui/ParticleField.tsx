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
const MOBILE_BREAKPOINT = 768;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particleCount = 0;
    let particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (reducedMotion ? 0.06 : 0.2),
      vy: (Math.random() - 0.5) * (reducedMotion ? 0.06 : 0.2),
      radius: 1 + Math.random() * 1.8,
    });

    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particleCount = mediaQuery.matches ? 28 : 54;
      particles = Array.from({length: particleCount}, createParticle);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
          particle.x = Math.min(Math.max(particle.x, 0), width);
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
          particle.y = Math.min(Math.max(particle.y, 0), height);
        }

        context.beginPath();
        context.fillStyle = `rgba(${ACCENT_RGB}, 0.22)`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      const linkDistance = mediaQuery.matches ? 110 : 140;

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance > linkDistance) {
            continue;
          }

          const opacity = (1 - distance / linkDistance) * 0.2;
          context.beginPath();
          context.strokeStyle = `rgba(${ACCENT_RGB}, ${opacity})`;
          context.lineWidth = 1;
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    reset();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      reset();
      if (reducedMotion) {
        draw();
      }
    });

    resizeObserver.observe(canvas);
    mediaQuery.addEventListener('change', reset);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', reset);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}

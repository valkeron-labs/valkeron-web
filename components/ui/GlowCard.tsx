'use client';

import type {HTMLAttributes} from 'react';

export function GlowCard({className = '', style, ...props}: HTMLAttributes<HTMLElement>) {
  const handleMouseMove: HTMLAttributes<HTMLElement>['onMouseMove'] = (e) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Glow position
    el.style.setProperty('--glow-x', `${x}px`);
    el.style.setProperty('--glow-y', `${y}px`);

    // 3D tilt — subtle rotation based on cursor offset from center
    const rotateY = ((x - centerX) / centerX) * 6; // max ±6deg
    const rotateX = ((centerY - y) / centerY) * 4; // max ±4deg
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave: HTMLAttributes<HTMLElement>['onMouseLeave'] = (e) => {
    const el = e.currentTarget as HTMLElement;
    el.style.removeProperty('--glow-x');
    el.style.removeProperty('--glow-y');
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <article
      {...props}
      style={{
        ...style,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`glow-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

'use client';

import type {HTMLAttributes} from 'react';

export function GlowCard({className = '', onMouseMove, onMouseLeave, style, ...props}: HTMLAttributes<HTMLElement>) {
  const handleMouseMove: HTMLAttributes<HTMLElement>['onMouseMove'] = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    onMouseMove?.(event);
  };

  const handleMouseLeave: HTMLAttributes<HTMLElement>['onMouseLeave'] = (event) => {
    event.currentTarget.style.removeProperty('--glow-x');
    event.currentTarget.style.removeProperty('--glow-y');
    onMouseLeave?.(event);
  };

  return <article {...props} style={style} className={`glow-card ${className}`.trim()} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />;
}

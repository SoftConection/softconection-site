/**
 * Animated Tech Background Premium — SoftConection
 * Mesh gradients, partículas, grid geométrico, efeito rede neural
 */

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TechBackgroundProps {
  variant?: 'full' | 'hero' | 'gradient';
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  animated?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const TechBackground: React.FC<TechBackgroundProps> = ({
  variant = 'full',
  intensity = 'medium',
  className,
  animated = true,
}) => {
  // Gerar partículas aleatórias
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: intensity === 'light' ? 10 : intensity === 'medium' ? 20 : 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, [intensity]);

  const opacityMap = {
    light: 0.3,
    medium: 0.5,
    heavy: 0.7,
  };

  const opacity = opacityMap[intensity];

  return (
    <div className={cn(
      'absolute inset-0 overflow-hidden pointer-events-none',
      className
    )}>
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,24%,5%)] via-[hsl(222,30%,8%)] to-[hsl(222,24%,5%)]" />

      {/* ──── Mesh Gradients (Animated Orbs) ──── */}
      
      {/* Cyan Orb — Top Center */}
      <div
        className={cn(
          'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3',
          'w-[600px] h-[600px] rounded-full',
          'blur-[120px]',
          animated && 'animate-float',
        )}
        style={{
          background: 'radial-gradient(ellipse, rgba(0,211,255,0.25) 0%, transparent 70%)',
          animationDuration: '12s',
        }}
      />

      {/* Violet Orb — Bottom Left */}
      <div
        className={cn(
          'absolute bottom-0 -left-64',
          'w-[500px] h-[500px] rounded-full',
          'blur-[100px]',
          animated && 'animate-float',
        )}
        style={{
          background: 'radial-gradient(ellipse, rgba(146,98,232,0.20) 0%, transparent 70%)',
          animationDuration: '16s',
          animationDelay: '2s',
        }}
      />

      {/* Blue Orb — Right Center */}
      <div
        className={cn(
          'absolute right-0 top-1/3 -translate-y-1/3',
          'w-[450px] h-[450px] rounded-full',
          'blur-[90px]',
          animated && 'animate-pulse-soft',
        )}
        style={{
          background: 'radial-gradient(ellipse, rgba(77,142,247,0.20) 0%, transparent 70%)',
        }}
      />

      {/* ──── Geometric Grid Pattern ──── */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 211, 255, 0.03) 0px,
              rgba(0, 211, 255, 0.03) 1px,
              transparent 1px,
              transparent 50px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0, 211, 255, 0.03) 0px,
              rgba(0, 211, 255, 0.03) 1px,
              transparent 1px,
              transparent 50px
            )
          `,
        }}
      />

      {/* ──── Hexagon Pattern (Light) ──── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          <pattern id="hexagons" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <polygon points="100,5 190,50 190,150 100,195 10,150 10,50" fill="none" stroke="rgba(0,211,255,0.3)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#hexagons)" />
      </svg>

      {/* ──── Neural Network Particles ──── */}
      {animated && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/60 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: opacity * 0.6,
          }}
        />
      ))}

      {/* ──── Connecting Lines (Neural Effect) ──── */}
      {animated && (
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
          {particles.slice(0, 5).map((p1, i) =>
            particles.slice(i + 1, i + 3).map((p2, j) => (
              <line
                key={`${i}-${j}`}
                x1={`${p1.x}%`}
                y1={`${p1.y}%`}
                x2={`${p2.x}%`}
                y2={`${p2.y}%`}
                stroke="rgba(0,211,255,0.3)"
                strokeWidth="1"
              />
            ))
          )}
        </svg>
      )}

      {/* ──── Top Edge Glow ──── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* ──── Bottom Vignette ──── */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[hsl(222,24%,5%)] via-transparent to-transparent" />

      {/* ──── Corner Accents ──── */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default TechBackground;

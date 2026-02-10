/**
 * Hero Background Component com efeitos tecnológicos animados
 * Inclui gradientes dinâmicos, partículas flutuantes e transições modernas
 */

import React from "react";
import { cn } from "@/lib/utils";

export const HeroBgEffects: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

      {/* Animated Gradient Overlays */}
      <div className="absolute inset-0">
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
            animation: "slideGrid 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Tech Lines */}
      <svg className="absolute inset-0 opacity-30" width="100%" height="100%">
        <defs>
          <pattern id="lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,0 L100,100" stroke="rgba(0,217,255,0.3)" strokeWidth="1" />
            <path d="M100,0 L0,100" stroke="rgba(0,217,255,0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>

      {/* Isometric Boxes */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={`box-${i}`}
            className="absolute border border-cyan-500/30"
            style={{
              width: `${50 + (i % 5) * 30}px`,
              height: `${50 + (i % 5) * 30}px`,
              left: `${(i % 10) * 10}%`,
              top: `${Math.floor(i / 10) * 20}%`,
              transform: `perspective(1000px) rotateX(45deg) rotateY(45deg)`,
              animation: `float ${5 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950" />

      <style>{`
        @keyframes slideGrid {
          0% {
            transform: translateY(-50px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.3;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 217, 255, 0.8), 0 0 80px rgba(0, 217, 255, 0.4);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBgEffects;

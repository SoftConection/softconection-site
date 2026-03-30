/**
 * Hero Background Premium — SoftConection
 * Mesh gradient • soft orbs • dot grid (sem partículas ou animações desnecessárias)
 */

import React from "react";
import { cn } from "@/lib/utils";

export const HeroBgEffects: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} style={style}>
      {/* ── Deep gradient base ─────────────────────────────── */}
      <div className="absolute inset-0 bg-[hsl(222,24%,5%)]" />

      {/* ── Ambient orbs ────────────────────────────────── */}
      {/* Cyan — top centre */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[480px] rounded-full blur-[120px] animate-glow-pulse"
        style={{ background: "radial-gradient(ellipse, rgba(0,211,255,0.14) 0%, transparent 70%)" }}
      />
      {/* Violet — bottom left */}
      <div
        className="absolute bottom-0 -left-40 w-[520px] h-[420px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(ellipse, rgba(146,98,232,0.10) 0%, transparent 70%)" }}
      />
      {/* Blue — right centre */}
      <div
        className="absolute top-1/3 -right-48 w-[440px] h-[360px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(ellipse, rgba(77,142,247,0.09) 0%, transparent 70%)" }}
      />

      {/* ── Dot grid ────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Top-edge gradient fade ───────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── Bottom vignette ─────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[hsl(222,24%,5%)] to-transparent" />

    </div>
  );
};


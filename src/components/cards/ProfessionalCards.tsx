/**
 * Componentes de Cartão Premium — SoftConection
 * Glass morphism • gradient borders • hover glow
 */

import React from "react";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Base Glass Card ─────────────────────────────────── */
interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "gradient";
  hover?: boolean;
  onClick?: () => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className,
  hover = true,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "glass-card",
        hover && "glass-card-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/* ─── Service Card ────────────────────────────────────── */
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  action,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-xl cursor-pointer overflow-hidden",
        "transition-all duration-300",
        "bg-white/[0.04] border border-white/[0.08]",
        "hover:bg-white/[0.07] hover:border-primary/25",
        "hover:shadow-[0_8px_32px_-8px_rgba(0,211,255,0.18),0_0_0_1px_rgba(0,211,255,0.10)]",
        "hover:-translate-y-1"
      )}
      onClick={onClick}
    >
      {/* Top accent line — appears on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="inline-flex p-3 rounded-xl mb-5 transition-all duration-300 bg-gradient-to-br from-primary/15 to-accent/10 group-hover:from-primary/25 group-hover:to-accent/20 border border-primary/10 group-hover:border-primary/25">
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-display font-semibold text-base text-foreground mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* CTA */}
      {action ? (
        <div>{action}</div>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
          Explorar <ArrowRight className="w-3 h-3" />
        </span>
      )}
    </div>
  );
};

/* ─── Stat Card ───────────────────────────────────────── */
interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  change?: { value: number; direction: "up" | "down" };
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  change,
}) => {
  return (
    <div className="glass-card p-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-display font-bold tracking-tight gradient-text">
          {value}
        </p>
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              change.direction === "up" ? "text-emerald-400" : "text-red-400"
            )}
          >
            {change.direction === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change.value}%
          </span>
        )}
      </div>
    </div>
  );
};

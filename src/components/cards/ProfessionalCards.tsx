/**
 * Componentes de Cartão Profissional para SoftConection
 * Segue a identidade visual e branding da empresa
 */

import React from "react";
import { cn } from "@/lib/utils";

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
  variant = "default",
  hover = true,
  onClick,
}) => {
  const variantStyles = {
    default:
      "bg-white border border-gray-200 rounded-xl shadow-sm",
    elevated:
      "bg-white border border-gray-100 rounded-xl shadow-md",
    gradient:
      "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm",
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        hover && "hover:shadow-lg transition-shadow duration-300 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

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
    <ProfessionalCard
      variant="default"
      onClick={onClick}
      className="p-6 group"
    >
      <div className="space-y-4">
        {/* Icon Container */}
        <div className="inline-flex p-3 rounded-lg bg-cyan-50 group-hover:bg-cyan-100 transition-colors duration-300">
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-display font-bold text-lg text-gray-900">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Action */}
        {action && <div className="pt-2">{action}</div>}
      </div>
    </ProfessionalCard>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    direction: "up" | "down";
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  change,
}) => {
  return (
    <ProfessionalCard variant="elevated" className="p-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          {icon && <div className="text-cyan-500">{icon}</div>}
        </div>

        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-display font-bold text-gray-900">
            {value}
          </p>
          {change && (
            <span
              className={`text-xs font-semibold ${
                change.direction === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {change.direction === "up" ? "↑" : "↓"} {change.value}%
            </span>
          )}
        </div>
      </div>
    </ProfessionalCard>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatar,
}) => {
  return (
    <ProfessionalCard variant="gradient" className="p-6">
      <div className="space-y-4">
        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-amber-400">
              ★
            </span>
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-700 font-medium italic">"{quote}"</p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{author}</p>
            <p className="text-xs text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </ProfessionalCard>
  );
};

interface FeatureCardProps {
  number: number;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <ProfessionalCard variant="default" className="p-6">
      <div className="space-y-4">
        <div className="inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-600 font-display font-bold text-lg">
          {number}
        </div>

        <div>
          <h3 className="font-display font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </ProfessionalCard>
  );
};

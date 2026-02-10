/**
 * Componentes de Hero Section Profissionais
 * Seções title/hero reutilizáveis para páginas
 */

import React from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  cta?: {
    label: string;
    onClick: () => void;
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
  background?: "gradient" | "solid" | "pattern";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "py-12 md:py-16",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-40",
  xl: "min-h-screen flex items-center justify-center py-20 md:py-28",
};

const backgroundMap = {
  gradient: "bg-gradient-to-b from-gray-50 to-white",
  solid: "bg-white",
  pattern: "bg-gradient-to-b from-gray-50 via-white to-gray-50",
};

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  image,
  cta,
  background = "gradient",
  size = "lg",
  className,
}) => {
  return (
    <section className={cn(backgroundMap[background], sizeMap[size], className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {!image ? (
          // Text-only Hero
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {subtitle && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-sm font-medium text-cyan-700">
                  {subtitle}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900">
              {title}
            </h1>

            {description && (
              <p className="text-lg md:text-xl text-gray-600">{description}</p>
            )}

            {cta && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={cta.onClick}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
                >
                  {cta.label}
                </button>
                {cta.secondary && (
                  <button
                    onClick={cta.secondary.onClick}
                    className="px-8 py-4 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-all duration-300 w-full md:w-auto"
                  >
                    {cta.secondary.label}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          // Hero with Image
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {subtitle && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-sm font-medium text-cyan-700">
                    {subtitle}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                {title}
              </h1>

              {description && (
                <p className="text-lg text-gray-600">{description}</p>
              )}

              {cta && (
                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={cta.onClick}
                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  >
                    {cta.label}
                  </button>
                  {cta.secondary && (
                    <button
                      onClick={cta.secondary.onClick}
                      className="px-8 py-4 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-all duration-300 w-full"
                    >
                      {cta.secondary.label}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  align = "center",
}) => {
  const alignMap = {
    left: "text-left",
    center: "text-center max-w-3xl",
    right: "text-right",
  };

  return (
    <div className={cn(alignMap[align], align === "center" && "mx-auto")}>
      {subtitle && (
        <p className="text-sm font-medium text-cyan-600 mb-2 uppercase tracking-wide">
          {subtitle}
        </p>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
};

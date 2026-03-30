/**
 * Hero Section Profissional para SoftConection
 * Componente reutilizável com múltiplas variantes
 */

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  primaryCTA?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryCTA?: {
    label: string;
    onClick: () => void;
  };
  features?: string[];
  variant?: "centered" | "split" | "minimal";
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  primaryCTA,
  secondaryCTA,
  features,
  variant = "centered",
  className,
}) => {
  const containerClass = "max-w-7xl mx-auto px-4 md:px-6 lg:px-8";

  if (variant === "split") {
    return (
      <section className={cn("relative min-h-screen flex items-center py-12 md:py-20", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 -z-10"></div>

        <div className={containerClass}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {subtitle && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
                  <span className="text-sm font-medium text-cyan-800">
                    {subtitle}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
                {title}
              </h1>

              {description && (
                <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
              )}

              {/* Features List */}
              {features && features.length > 0 && (
                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {primaryCTA && (
                  <Button
                    onClick={primaryCTA.onClick}
                    disabled={primaryCTA.loading}
                    className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    size="lg"
                  >
                    {primaryCTA.label}
                    {!primaryCTA.loading && <ArrowRight className="w-5 h-5" />}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    onClick={secondaryCTA.onClick}
                    variant="outline"
                    className="border-gray-300"
                    size="lg"
                  >
                    {secondaryCTA.label}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Image */}
            {image && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl blur-2xl opacity-30"></div>
                <img
                  src={image}
                  alt={imageAlt || "Hero Image"}
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className={cn("py-12 md:py-20 bg-white", className)}>
        <div className={containerClass}>
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-600">{description}</p>
            )}
            {primaryCTA && (
              <div className="pt-2">
                <Button
                  onClick={primaryCTA.onClick}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                >
                  {primaryCTA.label}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default: Centered — Premium
  return (
    <section
      className={cn(
        "relative min-h-[100svh] flex items-center py-32 bg-transparent",
        className
      )}
    >
      <div className={containerClass}>
        <div className="text-center max-w-4xl mx-auto space-y-10 animate-fade-up">

          {/* Pre-heading badge */}
          {subtitle && (
            <div className="section-badge mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {subtitle}
            </div>
          )}

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-display font-bold leading-[1.08] tracking-tight text-balance text-foreground">
            {title.split(" ").map((word, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <React.Fragment key={i}>
                  {isLast ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    word
                  )}
                  {!isLast && " "}
                </React.Fragment>
              );
            })}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              {description}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {primaryCTA && (
              <button
                onClick={primaryCTA.onClick}
                disabled={primaryCTA.loading}
                className="btn-primary text-base px-8 py-3 glow-effect"
              >
                {primaryCTA.label}
                {!primaryCTA.loading && <ArrowRight className="w-4 h-4" />}
              </button>
            )}
            {secondaryCTA && (
              <button
                onClick={secondaryCTA.onClick}
                className="btn-secondary text-base px-8 py-3"
              >
                {secondaryCTA.label}
              </button>
            )}
          </div>

          {/* Feature chips */}
          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center pt-3">
              {features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground bg-white/[0.04] border border-white/[0.08]"
                >
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Optional hero image */}
          {image && (
            <div className="relative mt-16 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-40" />
              <img
                src={image}
                alt={imageAlt || "Hero"}
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/[0.08]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

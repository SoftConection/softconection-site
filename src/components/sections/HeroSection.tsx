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

  // Default: Centered
  return (
    <section className={cn("relative min-h-screen flex items-center py-12 md:py-20", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 to-blue-50 -z-10"></div>

      <div className={containerClass}>
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          {subtitle && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
              <span className="text-sm font-medium text-cyan-800">{subtitle}</span>
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}

          {/* Features Grid */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
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

          {/* Image Below */}
          {image && (
            <div className="relative mt-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl blur-2xl opacity-20"></div>
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
};

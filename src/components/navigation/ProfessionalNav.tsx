/**
 * Navegação Premium — SoftConection
 * Glass morphism • scroll-aware • responsive
 */

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/branding/Logo";

interface NavLink {
  label: string;
  href: string;
}

interface ProfessionalNavProps {
  logo?: string;
  links?: NavLink[];
  onLogoClick?: () => void;
  cta?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  className?: string;
}

export const ProfessionalNav: React.FC<ProfessionalNavProps> = ({
  logo: logoUrl = logo,
  links = [
    { label: "Início",    href: "#" },
    { label: "Serviços",  href: "#services" },
    { label: "Sobre",     href: "#about" },
    { label: "Contato",   href: "#contact" },
  ],
  onLogoClick,
  cta,
  className,
}) => {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobile(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDefaultLogo = logoUrl === logo;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-0 bg-[hsl(222_24%_5%/0.85)] backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
          : "py-0 bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">

          {/* ── Logo ─────────────────────────────────────── */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
            aria-label="SoftConection — página inicial"
          >
            {isDefaultLogo ? (
              <Logo size={isScrolled ? "small" : "medium"} animated showWordmark={false} />
            ) : (
              <img
                src={logoUrl}
                alt="SoftConection"
                className={cn(
                  "transition-all duration-400 w-auto",
                  isScrolled
                    ? "h-9 drop-shadow-none"
                    : "h-12 drop-shadow-[0_0_18px_rgba(0,211,255,0.45)]"
                )}
              />
            )}
            <span
              className={cn(
                "hidden sm:inline font-display font-bold tracking-tight transition-all duration-400",
                isScrolled ? "text-base text-foreground/90" : "text-xl gradient-text"
              )}
            >
              SoftConection
            </span>
          </button>

          {/* ── Desktop Links ─────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/65 hover:text-foreground transition-colors duration-200 group rounded-lg hover:bg-white/[0.05]"
              >
                {link.label}
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* ── CTA + Mobile Toggle ───────────────────────── */}
          <div className="flex items-center gap-3">
            {cta && (
              <button
                onClick={cta.onClick}
                className={cn(
                  "hidden md:inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300",
                  cta.variant === "primary"
                    ? "btn-primary"
                    : "btn-secondary"
                )}
              >
                {cta.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setIsMobile(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/[0.07] transition-colors"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu ──────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.07] py-4 space-y-1 animate-slide-up">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobile(false)}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}
            {cta && (
              <div className="pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => { cta.onClick(); setIsMobile(false); }}
                  className="btn-primary w-full justify-center"
                >
                  {cta.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

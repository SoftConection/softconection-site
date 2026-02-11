/**
 * Componente de Navegação Profissional para SoftConection
 * Header responsivo com menu mobile e theme switcher
 */

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  submenu?: NavLink[];
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
    { label: "Início", href: "#" },
    { label: "Serviços", href: "#services" },
    { label: "Sobre", href: "#about" },
    { label: "Contato", href: "#contact" },
  ],
  onLogoClick,
  cta,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-slate-950/40 backdrop-blur-md border-b border-cyan-500/20",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-24 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={onLogoClick}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
            >
              <img
                src={logoUrl}
                alt="SoftConection"
                className={cn(
                  "transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-2xl filter brightness-110",
                  isScrolled ? "h-12 md:h-10" : "h-20 md:h-16"
                )}
                style={{
                  filter: isScrolled ? "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" : "drop-shadow(0 0 20px rgba(0,217,255,0.4)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                }}
              />
              <span className={cn(
                "font-bold transition-all duration-300 hidden sm:inline whitespace-nowrap",
                isScrolled 
                  ? "text-lg text-gray-900" 
                  : "text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              )}>
                SoftConection
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <div key={link.href} className="relative group">
                <a
                  href={link.href}
                  className="px-4 py-2 text-white hover:text-cyan-300 font-medium text-sm transition-colors duration-300 flex items-center gap-1"
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  )}
                </a>

                {/* Submenu */}
                {link.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-full pt-2">
                    {link.submenu.map((sublink) => (
                      <a
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-cyan-600 text-sm transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {sublink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            {cta && (
              <button
                onClick={cta.onClick}
                className={cn(
                  "px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hidden md:block",
                  cta.variant === "primary"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                    : "border border-gray-300 text-gray-900 hover:bg-gray-50"
                )}
              >
                {cta.label}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/60 backdrop-blur-md border-t border-cyan-500/10 py-4 space-y-2 animate-slide-up">
            {links.map((link) => (
              <div key={link.href}>
                <button
                  onClick={() =>
                    setOpenSubmenu(
                      openSubmenu === link.href ? null : link.href
                    )
                  }
                  className="w-full text-left px-4 py-3 text-white hover:bg-slate-800/40 font-medium transition-colors duration-300 flex items-center justify-between"
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openSubmenu === link.href && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {link.submenu && openSubmenu === link.href && (
                  <div className="bg-slate-800/20">
                    {link.submenu.map((sublink) => (
                      <a
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-8 py-2 text-white hover:text-cyan-300 text-sm transition-colors duration-300"
                      >
                        {sublink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {cta && (
              <button
                onClick={cta.onClick}
                className={cn(
                  "w-full px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 mx-4 my-2",
                  cta.variant === "primary"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
                    : "border border-gray-300 text-gray-900 hover:bg-gray-50"
                )}
              >
                {cta.label}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

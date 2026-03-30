import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/branding/Logo";
import { useLandingUIStore } from "../store/useLandingUIStore";
import type { LandingNavItem, LandingSectionId } from "../types";

interface LandingHeaderProps {
  navItems: LandingNavItem[];
  activeSection: LandingSectionId;
  onNavigate: (section: LandingSectionId) => void;
  primaryLabel: string;
  onPrimaryAction: () => void;
}

export function LandingHeader({
  navItems,
  activeSection,
  onNavigate,
  primaryLabel,
  onPrimaryAction,
}: LandingHeaderProps) {
  const mobileNavOpen = useLandingUIStore((state) => state.mobileNavOpen);
  const closeMobileNav = useLandingUIStore((state) => state.closeMobileNav);
  const toggleMobileNav = useLandingUIStore((state) => state.toggleMobileNav);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const rootClassName = useMemo(
    () =>
      cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        isScrolled
          ? "border-border/90 bg-background/95 backdrop-blur"
          : "border-transparent bg-background/80",
      ),
    [isScrolled],
  );

  const handleNavigate = (section: LandingSectionId) => {
    onNavigate(section);
    closeMobileNav();
  };

  return (
    <header className={rootClassName}>
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <button
          type="button"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          onClick={() => handleNavigate("services")}
          aria-label="Ir para servicos"
        >
          <Logo size="medium" animated={!isScrolled} compactOnMobile />
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={onPrimaryAction} className="hidden md:inline-flex">
            {primaryLabel}
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
            onClick={toggleMobileNav}
            aria-controls="landing-mobile-nav"
            aria-label={mobileNavOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div id="landing-mobile-nav" className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Menu mobile">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  "rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button onClick={onPrimaryAction} className="mt-4 w-full">
            {primaryLabel}
          </Button>
        </div>
      )}
    </header>
  );
}

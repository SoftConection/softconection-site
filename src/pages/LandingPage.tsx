import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LandingContact,
  LandingEmptyState,
  LandingErrorState,
  LandingHeader,
  LandingHero,
  LandingHighlights,
  LandingLoadingState,
  LandingMetrics,
  LandingServices,
} from "@/features/landing/components";
import { useLandingContent } from "@/features/landing/hooks/useLandingContent";
import { useLandingUIStore } from "@/features/landing/store/useLandingUIStore";
import type { LandingSectionId } from "@/features/landing/types";

const OBSERVED_SECTIONS: LandingSectionId[] = ["services", "highlights", "contact"];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const activeSection = useLandingUIStore((state) => state.activeSection);
  const setActiveSection = useLandingUIStore((state) => state.setActiveSection);

  const { data, isLoading, isError, refetch } = useLandingContent();

  const handlePrimaryAction = useCallback(() => {
    navigate(isAuthenticated ? "/dashboard" : "/auth/login");
  }, [isAuthenticated, navigate]);

  const handleGoToServices = useCallback(() => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveSection("services");
  }, [setActiveSection]);

  const handleSectionNavigate = useCallback(
    (section: LandingSectionId) => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(section);
    },
    [setActiveSection],
  );

  const handleSelectService = useCallback(
    (serviceId: string) => {
      if (isAuthenticated) {
        navigate(`/services/${serviceId}`);
        return;
      }

      navigate("/auth/login");
    },
    [isAuthenticated, navigate],
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const currentSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!currentSection?.target?.id) {
          return;
        }

        setActiveSection(currentSection.target.id as LandingSectionId);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.75],
      },
    );

    OBSERVED_SECTIONS.forEach((sectionId) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => observer.disconnect();
  }, [data, setActiveSection]);

  if (isLoading) {
    return <LandingLoadingState />;
  }

  if (isError) {
    return <LandingErrorState onRetry={() => void refetch()} />;
  }

  if (!data || data.services.length === 0) {
    return <LandingEmptyState />;
  }

  return (
    <div className="landing-surface min-h-screen bg-background text-foreground">
      <LandingHeader
        navItems={data.navigation}
        activeSection={activeSection}
        onNavigate={handleSectionNavigate}
        primaryLabel={data.hero.primaryCta}
        onPrimaryAction={handlePrimaryAction}
      />

      <main>
        <LandingHero
          content={data.hero}
          onPrimaryAction={handlePrimaryAction}
          onSecondaryAction={handleGoToServices}
        />
        <LandingMetrics metrics={data.metrics} />
        <LandingServices services={data.services} onSelectService={handleSelectService} />
        <LandingHighlights highlights={data.highlights} />
        <LandingContact
          title={data.contact.title}
          description={data.contact.description}
          channels={data.contact.channels}
          primaryCta={data.contact.primaryCta}
          onPrimaryAction={handlePrimaryAction}
        />
      </main>
    </div>
  );
}

export type LandingSectionId = "services" | "highlights" | "contact";

export interface LandingNavItem {
  id: LandingSectionId;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  primaryCta: string;
  secondaryCta: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  supportingText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  sla: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface LandingContent {
  navigation: LandingNavItem[];
  hero: HeroContent;
  metrics: MetricItem[];
  services: ServiceItem[];
  highlights: HighlightItem[];
  contact: {
    title: string;
    description: string;
    channels: ContactChannel[];
    primaryCta: string;
  };
}

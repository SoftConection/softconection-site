import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "../types";

interface LandingHeroProps {
  content: HeroContent;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export const LandingHero = memo(function LandingHero({
  content,
  onPrimaryAction,
  onSecondaryAction,
}: LandingHeroProps) {
  return (
    <section className="landing-section pt-28 md:pt-36">
      <div className="landing-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div className="space-y-8">
          <p className="inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {content.eyebrow}
          </p>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-display font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onPrimaryAction} className="gap-2">
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" onClick={onSecondaryAction}>
              {content.secondaryCta}
            </Button>
          </div>
        </div>

        <ul className="space-y-3 rounded-2xl border border-border bg-card p-6">
          {content.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

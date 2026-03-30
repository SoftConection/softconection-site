import { memo } from "react";
import { Check } from "lucide-react";
import type { HighlightItem } from "../types";

interface LandingHighlightsProps {
  highlights: HighlightItem[];
}

export const LandingHighlights = memo(function LandingHighlights({ highlights }: LandingHighlightsProps) {
  return (
    <section id="highlights" className="landing-section">
      <div className="landing-container grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Diferenciais</p>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
            Uma operacao simples para escalar
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Interface limpa, processos previsiveis e suporte tecnico orientado a resultado.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {highlights.map((highlight) => (
            <article key={highlight.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-display font-medium text-foreground">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

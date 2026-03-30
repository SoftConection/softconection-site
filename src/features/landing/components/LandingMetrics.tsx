import { memo } from "react";
import type { MetricItem } from "../types";

interface LandingMetricsProps {
  metrics: MetricItem[];
}

const MetricCard = memo(function MetricCard({ item }: { item: MetricItem }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
      <p className="mt-3 text-3xl font-display font-semibold tracking-tight text-foreground">{item.value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{item.supportingText}</p>
    </article>
  );
});

export const LandingMetrics = memo(function LandingMetrics({ metrics }: LandingMetricsProps) {
  return (
    <section className="landing-section">
      <div className="landing-container grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} item={metric} />
        ))}
      </div>
    </section>
  );
});

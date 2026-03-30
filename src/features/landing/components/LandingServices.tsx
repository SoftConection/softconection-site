import { memo, useMemo } from "react";
import {
  ArrowRight,
  Code2,
  MonitorCog,
  Phone,
  ShieldCheck,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "../types";

interface LandingServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceId: string) => void;
}

const SERVICE_ICON_BY_ID: Record<string, LucideIcon> = {
  repair: Wrench,
  software: Code2,
  consulting: ShieldCheck,
  maintenance: MonitorCog,
  support: Phone,
  cctv: Video,
};

const ServiceCard = memo(function ServiceCard({
  service,
  onSelect,
}: {
  service: ServiceItem;
  onSelect: (serviceId: string) => void;
}) {
  const Icon = SERVICE_ICON_BY_ID[service.id] ?? ShieldCheck;

  return (
    <article className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-lg font-display font-medium text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">{service.sla}</p>

      <Button className="mt-6 gap-2" variant="secondary" onClick={() => onSelect(service.id)}>
        Ver detalhes
        <ArrowRight className="h-4 w-4" />
      </Button>
    </article>
  );
});

export const LandingServices = memo(function LandingServices({
  services,
  onSelectService,
}: LandingServicesProps) {
  const serviceCards = useMemo(
    () =>
      services.map((service) => (
        <ServiceCard key={service.id} service={service} onSelect={onSelectService} />
      )),
    [services, onSelectService],
  );

  return (
    <section id="services" className="landing-section">
      <div className="landing-container">
        <header className="mb-8 space-y-3 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Servicos</p>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
            Solucoes organizadas por especialidade
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Cada frente de servico foi desenhada para manter estabilidade operacional e acelerar a entrega de valor.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{serviceCards}</div>
      </div>
    </section>
  );
});

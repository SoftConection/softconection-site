import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactChannel } from "../types";

interface LandingContactProps {
  title: string;
  description: string;
  channels: ContactChannel[];
  primaryCta: string;
  onPrimaryAction: () => void;
}

export const LandingContact = memo(function LandingContact({
  title,
  description,
  channels,
  primaryCta,
  onPrimaryAction,
}: LandingContactProps) {
  return (
    <section id="contact" className="landing-section pb-20 md:pb-24">
      <div className="landing-container">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Contato</p>
              <h2 className="mt-3 text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {description}
              </p>
            </div>

            <Button size="lg" onClick={onPrimaryAction} className="gap-2 lg:justify-self-end">
              {primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-xl border border-border bg-background px-4 py-4 transition-colors hover:border-primary/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{channel.label}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{channel.value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

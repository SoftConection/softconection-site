/**
 * Footer Premium — SoftConection
 * Glass morphism • minimal • spacious
 */

import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Globe } from "lucide-react";
import { COMPANY_INFO } from "@/config/branding";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/branding/Logo";

interface ProfessionalFooterProps {
  className?: string;
  withNewsletter?: boolean;
}

export const ProfessionalFooter: React.FC<ProfessionalFooterProps> = ({
  className,
  withNewsletter = true,
}) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Produto: [
      { label: "Serviços",   href: "#services" },
      { label: "Soluções",   href: "#services" },
      { label: "Segurança",  href: "#about" },
    ],
    Empresa: [
      { label: "Sobre nós",  href: "#about" },
      { label: "Carreiras",  href: "#" },
      { label: "Blog",       href: "#" },
    ],
    Suporte: [
      { label: "Contato",    href: "#contact" },
      { label: "FAQ",        href: "#" },
      { label: "Ajuda",      href: "#" },
    ],
    Legal: [
      { label: "Privacidade", href: "/privacy" },
      { label: "Termos",      href: "/terms" },
      { label: "Cookies",     href: "/cookies" },
    ],
  };

  const socials = [
    { icon: Linkedin, href: COMPANY_INFO.social?.linkedin ?? "#", label: "LinkedIn" },
    { icon: Twitter,  href: COMPANY_INFO.social?.twitter  ?? "#", label: "Twitter" },
    { icon: Github,   href: COMPANY_INFO.social?.github   ?? "#", label: "GitHub" },
    { icon: Globe,    href: "#",                                   label: "Website" },
  ];

  return (
    <footer className={cn("relative bg-[hsl(222,24%,4%)] text-foreground/70 overflow-hidden", className)}>

      {/* ── Top border glow line ───────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── Ambient glow ───────────────────────────────── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] blur-[100px] pointer-events-none bg-[radial-gradient(ellipse,rgba(0,211,255,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Newsletter ─────────────────────────────────── */}
        {withNewsletter && (
          <div className="py-12 border-b border-white/[0.07]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="section-badge mb-4">Newsletter</p>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2 leading-snug">
                  Fique à frente da tecnologia
                </h3>
                <p className="text-sm text-muted-foreground">
                  Receba insights de TI, actualizações de serviço e novidades directo na sua caixa de entrada.
                </p>
              </div>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-white/[0.05] border border-white/[0.10] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Main Grid ──────────────────────────────────── */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-10 border-b border-white/[0.07]">

          {/* Brand column */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Logo size="small" animated />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {COMPANY_INFO.description}
            </p>

            {/* Locations */}
            <div className="space-y-2 pt-2">
              {COMPANY_INFO.locations.map((loc) => (
                <div key={loc.city} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{loc.flag} {loc.city} — {loc.address}</span>
                </div>
              ))}
            </div>

            {/* Contact quick links */}
            <div className="space-y-2 pt-1">
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {COMPANY_INFO.contact.email}
              </a>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {COMPANY_INFO.contact.phone}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/45 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────── */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/55 order-2 sm:order-1">
            © {currentYear} SoftConection. Todos os direitos reservados.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 border border-white/[0.07] hover:border-primary/25 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};


/**
 * Footer Profissional e Tecnológico para SoftConection
 * Componente reutilizável com design moderno e interativo
 */

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  Github,
  Code2,
  Shield,
  Zap,
  Lightbulb,
  Globe,
  Cpu,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { COMPANY_INFO } from "@/config/branding";
import { cn } from "@/lib/utils";

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
      { label: "Serviços", href: "#services" },
      { label: "Preços", href: "#pricing" },
      { label: "Segurança", href: "#security" },
    ],
    Empresa: [
      { label: "Sobre", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Carreira", href: "#careers" },
    ],
    Suporte: [
      { label: "Contato", href: "#contact" },
      { label: "FAQ", href: "#faq" },
      { label: "Centro de Ajuda", href: "#help" },
    ],
    Legal: [
      { label: "Privacidade", href: "/privacy" },
      { label: "Termos", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  };

  const techFeatures = [
    {
      icon: Code2,
      title: "Código de Qualidade",
      description: "Padrões e melhores práticas",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Certificado e protegido",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Otimizado e rápido",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Sempre evoluindo",
    },
  ];

  return (
    <footer className={cn("relative bg-slate-950 text-gray-300 overflow-hidden", className)}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-blue-500/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        {withNewsletter && (
          <div className="relative overflow-hidden border-b border-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10" />
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Fique Atualizado
                  </h3>
                  <p className="text-gray-300">
                    Receba as últimas notícias e dicas de TI direto na sua caixa de entrada.
                  </p>
                </div>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Inscrever
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tech Features */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {techFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="mb-3 p-2 w-fit rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-1 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
            {/* Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <img src={logo} alt="SoftConection" className="h-12 w-auto" />
              </div>
              <p className="text-sm text-gray-400">
                {COMPANY_INFO.description}
              </p>
              {/* Locações */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                {COMPANY_INFO.locations.map((loc) => (
                  <div key={loc.city} className="flex items-center gap-2 text-xs">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">{loc.flag} {loc.address}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wide">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-3 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="border-t border-slate-800 pt-12 mb-8">
            <h3 className="font-display font-bold text-white mb-6 text-sm uppercase tracking-wide">
              Entre em Contato
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Email */}
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="group relative overflow-hidden rounded-xl p-4 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-cyan-400 transition-colors">
                      Email
                    </p>
                    <p className="text-sm font-medium">{COMPANY_INFO.contact.email}</p>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="group relative overflow-hidden rounded-xl p-4 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-cyan-400 transition-colors">
                      Telefone
                    </p>
                    <p className="text-sm font-medium">{COMPANY_INFO.contact.phone}</p>
                  </div>
                </div>
              </a>

              {/* WhatsApp Brasil */}
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl p-4 bg-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <Globe className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-green-400 transition-colors">
                      WhatsApp 🇧🇷
                    </p>
                    <p className="text-sm font-medium">{COMPANY_INFO.contact.phone}</p>
                  </div>
                </div>
              </a>

              {/* WhatsApp Angola */}
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsappAngola}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl p-4 bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-amber-400 transition-colors">
                      Telefone 🇦🇴
                    </p>
                    <p className="text-sm font-medium">{COMPANY_INFO.contact.phoneAngola}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-12">
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <span className="text-sm">📷</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-slate-800">
              <p className="text-sm text-gray-500">
                © {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Desenvolvido com ❤️ e tecnologia de ponta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Footer Profissional para SoftConection
 * Componente reutilizável com todas as informações de contato
 */

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
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

  return (
    <footer className={cn("bg-gray-900 text-gray-300", className)}>
      {/* Newsletter Section */}
      {withNewsletter && (
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  Fique atualizado
                </h3>
                <p className="text-cyan-100">
                  Receba as últimas notícias e dicas de TI direto na sua caixa
                  de entrada.
                </p>
              </div>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-cyan-600 font-medium rounded-lg hover:bg-cyan-50 transition-colors"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <img src={logo} alt="SoftConection" className="h-10 w-auto" />
            <p className="text-sm text-gray-400">
              {COMPANY_INFO.description}
            </p>
            {/* Locações */}
            <div className="space-y-2 pt-4 border-t border-gray-800">
              {COMPANY_INFO.locations.map((loc) => (
                <div key={loc.city} className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{loc.flag} {loc.address}</span>
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
                      className="text-sm hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-800 pt-12 mb-8">
          <h3 className="font-display font-bold text-white mb-6 text-sm uppercase tracking-wide">
            Entre em Contato
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="group flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 transition-colors"
            >
              <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-cyan-400 transition-colors">
                  Email
                </p>
                <p className="text-sm font-medium">{COMPANY_INFO.contact.email}</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="group flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 transition-colors"
            >
              <Phone className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-cyan-400 transition-colors">
                  Telefone
                </p>
                <p className="text-sm font-medium">{COMPANY_INFO.contact.phone}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 hover:bg-green-500/10 transition-colors"
            >
              <div className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform flex items-center justify-center">
                💬
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 group-hover:text-green-400 transition-colors">
                  WhatsApp
                </p>
                <p className="text-sm font-medium">{COMPANY_INFO.contact.phone}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-12">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href={COMPANY_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={COMPANY_INFO.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={COMPANY_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Instagram"
            >
              <span className="w-5 h-5 flex items-center justify-center text-sm">📷</span>
            </a>
            <a
              href={COMPANY_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <span className="w-5 h-5 flex items-center justify-center text-sm">🐙</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Desenvolvido com profissionalismo e qualidade.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

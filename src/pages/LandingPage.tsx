import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  Code2,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Settings,
  Phone,
  Video,
  Palette,
  Clock,
  Terminal,
} from "lucide-react";
import { COMPANY_INFO } from "@/config/branding";
import { ProfessionalNav } from "@/components/navigation/ProfessionalNav";
import { ServiceCard, StatCard } from "@/components/cards/ProfessionalCards";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroBgEffects } from "@/components/sections/HeroBgEffects";
import { ProfessionalFooter } from "@/components/footers/ProfessionalFooter";
import { cn } from "@/lib/utils";

// Categorias com ícones Lucide
const CATEGORIES = [
  {
    id: "repair",
    icon: Wrench,
    title: "Reparação de Equipamentos",
    description: "Reparo profissional e manutenção preventiva de computadores, impressoras e periféricos",
  },
  {
    id: "software",
    icon: Code2,
    title: "Desenvolvimento de Software",
    description: "Aplicações web, mobile e desktop customizadas para seu negócio",
  },
  {
    id: "consulting",
    icon: Zap,
    title: "Consultoria TI",
    description: "Estratégias de infraestrutura, segurança e transformação digital",
  },
  {
    id: "maintenance",
    icon: Settings,
    title: "Manutenção de Sistemas",
    description: "Monitoramento 24/7 e suporte contínuo para seus servidores",
  },
  {
    id: "support",
    icon: Phone,
    title: "Suporte Técnico",
    description: "Atendimento ágil e eficiente para seus problemas técnicos",
  },
  {
    id: "cctv",
    icon: Video,
    title: "Sistemas CCTV",
    description: "Vigilância profissional com tecnologia de ponta",
  },
  {
    id: "design",
    icon: Palette,
    title: "Design Gráfico",
    description: "Branding, identidade visual e materiais de marketing",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing Digital",
    description: "Estratégias de SEO, redes sociais e publicidade digital",
  },
];

const features = [
  { icon: Clock, title: "Resposta em 2 Horas", description: "Atendimento ágil e eficiente", shortKey: "quick" },
  { icon: CheckCircle2, title: "Certificações Profissionais", description: "Equipe com certificações internacionais", shortKey: "cert" },
  { icon: Shield, title: "Qualidade Garantida", description: "100% de satisfação do cliente", shortKey: "quality" },
  { icon: Users, title: "Suporte Dedicado", description: "Equipe dedicada ao seu sucesso", shortKey: "support" },
];

const stats = [
  { label: "Clientes Atendidos", value: "500+", icon: Users },
  { label: "Anos de Experiência", value: "10+", icon: Terminal },
  { label: "Projetos Realizados", value: "1000+", icon: Code2 },
  { label: "Profissionais", value: "50+", icon: Users },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (isAuthenticated) {
      navigate(`/services/${categoryId}`);
    } else {
      navigate("/auth/login");
    }
  };

  const navLinks = [
    { label: "Serviços", href: "#services" },
    { label: "Sobre", href: "#about" },
    { label: "Recursos", href: "#features" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <div className="w-full bg-slate-950 text-white relative">
      {/* Hero Background Effects */}
      <HeroBgEffects className="fixed top-0 left-0 right-0 h-screen pointer-events-none" />
      
      {/* Navigation */}
      <div className="relative z-50">
      <ProfessionalNav
        links={navLinks}
        onLogoClick={() => navigate("/")}
        cta={{
          label: "Entrar",
          onClick: () => navigate("/auth/login"),
          variant: "primary",
        }}
      />

      {/* Hero Section */}
      <HeroSection
        title="Soluções de TI Profissionais para Seu Negócio"
        description="Da reparação de equipamentos ao desenvolvimento de software. Oferecemos 8 categorias de serviços com mais de 48 soluções profissionais para empresas de todos os tamanhos."
        features={[
          "Suporte 24/7 disponível",
          "Profissionais certificados",
          "Atendimento em até 2 horas",
        ]}
        primaryCTA={{
          label: "Iniciar Sessão",
          onClick: () => navigate("/auth/login"),
        }}
        secondaryCTA={{
          label: "Explorar Categorias",
          onClick: () => {
            document.getElementById("services")?.scrollIntoView({
              behavior: "smooth",
            });
          },
        }}
        variant="centered"
      />

      {/* Locações */}
      <section className="relative py-16 border-y border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Presente em Dois Continentes
            </h2>
            <p className="text-cyan-300/80">
              Atendimento profissional em Brasil e Angola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY_INFO.locations.map((loc) => (
              <div
                key={loc.city}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-cyan-500/30 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 text-center space-y-4 tech-fade"
              >
                <p className="text-4xl">{loc.flag}</p>
                <h3 className="text-2xl font-display font-bold text-white">
                  {loc.city}
                </h3>
                <p className="text-cyan-300/70">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900/30 to-slate-950 border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="text-center p-6 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="inline-flex justify-center mb-4">
                    <StatIcon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-cyan-300">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-cyan-300/70 mt-2">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 md:py-28 bg-slate-950 border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Nossas Categorias de Serviços
            </h2>
            <p className="text-xl text-cyan-200/70 max-w-3xl mx-auto">
              8 áreas de especialidade com mais de 48 serviços profissionais para
              atender todas as suas necessidades de TI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <ServiceCard
                  key={category.id}
                  icon={<IconComponent className="w-6 h-6 text-cyan-600" />}
                  title={category.title}
                  description={category.description}
                  action={
                    <Button
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      size="sm"
                    >
                      Ver Serviços
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  }
                  onClick={() => handleCategoryClick(category.id)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Por Que Escolher a SoftConection
            </h2>
            <p className="text-xl text-gray-600">
              Qualidade, profissionalismo e dedicação em cada projeto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.shortKey} className="p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-cyan-500 transition-all hover:shadow-lg group">
                  <div className="inline-flex p-3 rounded-lg bg-cyan-100 mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <FeatureIcon className="w-6 h-6 text-cyan-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                Conhece a SoftConection
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Desde {COMPANY_INFO.company.founded}, a SoftConection é referência no
                mercado de TI. Oferecemos soluções inovadoras, personalizadas e
                confiáveis para empresas de todos os tamanhos.
              </p>

              <div className="space-y-4">
                {[
                  "Equipe de mais de 50 profissionais certificados",
                  `Mais de 10 anos de experiência no mercado`,
                  "Atendimento em São Paulo e Luanda",
                  "Suporte dedicado 24/7",
                  "Garantia de satisfação 100%",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => navigate(isAuthenticated ? "/services" : "/auth/register")}
                className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                size="lg"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl opacity-10 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 p-8 md:p-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center min-h-96">
                <div className="text-center">
                  <p className="text-6xl mb-4">💻</p>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    Soluções de TI Completas
                  </h3>
                  <p className="text-gray-600">
                    Desde infraestrutura até desenvolvimento de software
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-28 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Pronto para Transformar Seu Negócio?
          </h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Entre em contato com o nosso time agora mesmo e descubra como podemos
            ajudar sua empresa a crescer com tecnologia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={() =>
                navigate(isAuthenticated ? "/services" : "/auth/register")
              }
              className="gap-2 bg-white text-cyan-600 hover:bg-cyan-50 font-semibold"
              size="lg"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              size="lg"
            >
              <a href={`tel:${COMPANY_INFO.contact.phone}`}>
                Ligar Agora
              </a>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="pt-8 border-t border-white/20 space-y-4">
            <p className="text-sm text-cyan-100">
              Ou entre em contato conosco através dos seguintes canais:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="hover:text-cyan-200 transition-colors"
              >
                📧 {COMPANY_INFO.contact.email}
              </a>
              <span className="hidden sm:block text-white/30">•</span>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="hover:text-cyan-200 transition-colors"
              >
                📱 {COMPANY_INFO.contact.phone}
              </a>
              <span className="hidden sm:block text-white/30">•</span>
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-200 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <ProfessionalFooter withNewsletter={true} />
    </div>
  );
}

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import {
  Wrench,
  Code2,
  Zap,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Settings,
  Phone,
  Video,
  Palette,
  Clock,
} from "lucide-react";
import { SERVICE_CATEGORIES, BRAND_FEATURES } from "@/config/branding";
import { cn } from "@/lib/utils";

// Mapeamento de ícones para categorias
const CATEGORIES = [
  {
    id: "repair",
    icon: Wrench,
    title: "Reparação de Equipamentos",
    description: "Serviços profissionais de reparação e manutenção",
    color: "text-blue-500",
  },
  {
    id: "software",
    icon: Code2,
    title: "Desenvolvimento de Software",
    description: "Soluções personalizadas e robustas",
    color: "text-purple-500",
  },
  {
    id: "consulting",
    icon: Zap,
    title: "Consultoria TI",
    description: "Orientação especializada em infraestrutura",
    color: "text-yellow-500",
  },
  {
    id: "maintenance",
    icon: Settings,
    title: "Manutenção de Sistemas",
    description: "Suporte contínuo e manutenção",
    color: "text-green-500",
  },
  {
    id: "support",
    icon: Phone,
    title: "Suporte Técnico",
    description: "Resolução rápida de problemas",
    color: "text-red-500",
  },
  {
    id: "cctv",
    icon: Video,
    title: "Sistemas CCTV",
    description: "Soluções de vigilância por vídeo",
    color: "text-orange-500",
  },
  {
    id: "design",
    icon: Palette,
    title: "Design Gráfico",
    description: "Criação de conteúdo visual",
    color: "text-pink-500",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing Digital",
    description: "Estratégias e presença online",
    color: "text-cyan-500",
  },
];

const features = [
  { icon: Clock, title: "Resposta Rápida", description: "Atendimento em até 2 horas" },
  {
    icon: CheckCircle2,
    title: "Profissionais Certificados",
    description: "Equipe altamente qualificada",
  },
  { icon: Shield, title: "Garantia de Qualidade", description: "100% de satisfação garantida" },
  {
    icon: Users,
    title: "Suporte Dedicado",
    description: "Atendimento personalizado",
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (isAuthenticated) {
      navigate(`/services/${categoryId}`);
    } else {
      navigate("/auth/register");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SoftConection" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth/login")}
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => navigate("/auth/register")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Começar
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500"
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-sm text-cyan-400 font-medium">
                Soluções Profissionais de TI
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-blue-400">
              Transforme Seu Negócio com Tecnologia
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Desde reparação de equipamentos até desenvolvimento de software,
              oferecemos soluções completas e confiáveis para empresas de todos
              os tamanhos.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/services" : "/auth/register")}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              {isAuthenticated ? "Ver Serviços" : "Começar Gratuitamente"}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/services")}
              className="border-gray-700 hover:bg-gray-800"
            >
              Explorar Categorias
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-gray-800">
            <div>
              <p className="text-3xl font-bold text-cyan-400">500+</p>
              <p className="text-sm text-gray-400">Clientes Satisfeitos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">10+</p>
              <p className="text-sm text-gray-400">Anos de Experiência</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">24/7</p>
              <p className="text-sm text-gray-400">Suporte Disponível</p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              Nossas Categorias de Serviços
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore nossas 8 áreas de especialidade com mais de 48 serviços profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="space-y-4">
                    <div className={cn("inline-flex p-3 rounded-lg bg-gray-800/50 group-hover:bg-gray-700 transition-colors", category.color)}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white mb-1">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {category.description}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                      size="sm"
                    >
                      Ver Serviços
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-6 bg-gradient-to-r from-gray-900/50 to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                Sobre a SoftConection
              </h2>
              <p className="text-lg text-gray-400">
                A SoftConection é uma empresa líderi no mercado de TI, oferecendo soluções
                inovadoras e personalizadas para empresas de todos os tamanhos. Com mais de
                10 anos de experiência, garantimos qualidade e profissionalismo em cada projeto.
              </p>
              <div className="space-y-3">
                {[
                  "Equipe de profissionais certificados",
                  "Soluções personalizadas e escaláveis",
                  "Suporte 24/7 dedicado",
                  "Garantia de satisfação 100%",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <img src={logo} alt="SoftConection" className="w-48 h-auto opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              Por que escolher a SoftConection
            </h2>
            <p className="text-lg text-gray-400">
              Qualidade, profissionalismo e dedicação em cada projeto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={idx} className="p-6 bg-gray-900 border-gray-800 hover:border-cyan-500 transition-colors group">
                  <div className="inline-flex p-2 rounded-lg bg-gray-800/50 mb-4 group-hover:bg-cyan-500/10 transition-colors">
                    <FeatureIcon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <h2 className="text-4xl font-display font-bold mb-4 text-white">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Entre em contato conosco e descubra como podemos ajudar sua empresa
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate(isAuthenticated ? "/services" : "/auth/register")}
                className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
                asChild
              >
                <a href="tel:+5511999999999">+55 (11) 9999-9999</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <img src={logo} alt="SoftConection" className="h-10 w-auto" />
              <p className="text-sm text-gray-400">
                Soluções profissionais de TI para seu negócio
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-display font-bold text-white mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition">Serviços</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Preços</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Segurança</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-display font-bold text-white mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition">Sobre</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Contato</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-display font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Termos</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2024 SoftConection. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Configuração centralizada de branding SoftConection
 * Define identidade visual, cores, ícones e constantes da marca
 */

import {
  Wrench,
  Code2,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Phone,
  Video,
  Palette,
  Smartphone,
  Settings,
  Lock,
  Clock,
} from "lucide-react";

// Cores oficiais SoftConection - Professional Tech Palette
export const BRAND_COLORS = {
  primary: "#0A0A0A", // Preto profissional
  primaryLight: "#1A1A1A",
  secondary: "#00D9FF", // Cyan vibrante
  accent: "#FF6B35", // Laranja energético
  success: "#00C853",
  warning: "#FFC400",
  danger: "#FF3B30",
  light: "#F5F5F5",
  dark: "#0A0A0A",
};

// Configuração de categorias de serviços com ícones Lucide
export const SERVICE_CATEGORIES = [
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

// Features/Diferenciais
export const BRAND_FEATURES = [
  {
    icon: Clock,
    title: "Resposta Rápida",
    description: "Atendimento em até 2 horas",
  },
  {
    icon: CheckCircle2,
    title: "Profissionais Certificados",
    description: "Equipe altamente qualificada",
  },
  {
    icon: Shield,
    title: "Garantia de Qualidade",
    description: "100% de satisfação garantida",
  },
  {
    icon: Users,
    title: "Suporte Dedicado",
    description: "Atendimento personalizado",
  },
];

// Dados da empresa
export const COMPANY_INFO = {
  name: "SoftConection",
  tagline: "Soluções de TI Profissionais",
  locations: [
    {
      city: "São Paulo",
      country: "Brasil",
      timezone: "America/Sao_Paulo",
    },
    {
      city: "Luanda",
      country: "Angola",
      timezone: "Africa/Luanda",
    },
  ],
  contact: {
    phone: "+55 11 XXXXX-XXXX",
    email: "contato@softconection.com",
    address: "São Paulo, Brasil",
  },
};

// Tipografia para melhor controle
export const TYPOGRAPHY = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-bold tracking-tight",
  body: "text-base md:text-lg text-foreground/80",
  small: "text-sm text-foreground/60",
};

// Spacing padrão
export const SPACING = {
  section: "py-12 md:py-20 lg:py-28",
  container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
};

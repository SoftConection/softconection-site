import type { LandingContent } from "../types";

export const landingContentSeed: LandingContent = {
  navigation: [
    { id: "services", label: "Servicos" },
    { id: "highlights", label: "Diferenciais" },
    { id: "contact", label: "Contato" },
  ],
  hero: {
    eyebrow: "SoftConection",
    title: "TI premium para operacoes que nao podem parar",
    description:
      "Unimos suporte tecnico, engenharia de software e consultoria para equipes que precisam de velocidade, previsibilidade e qualidade.",
    bullets: [
      "Onboarding tecnico em menos de 5 dias",
      "SLA com resposta inicial em ate 2 horas",
      "Operacao em Brasil e Angola",
    ],
    primaryCta: "Entrar na plataforma",
    secondaryCta: "Ver servicos",
  },
  metrics: [
    {
      id: "clients",
      label: "Clientes ativos",
      value: "500+",
      supportingText: "Empresas de pequeno a grande porte",
    },
    {
      id: "projects",
      label: "Projetos entregues",
      value: "1000+",
      supportingText: "Execucao com metodo e padrao de qualidade",
    },
    {
      id: "team",
      label: "Especialistas",
      value: "50+",
      supportingText: "Equipe multidisciplinar certificada",
    },
    {
      id: "experience",
      label: "Anos de experiencia",
      value: "10+",
      supportingText: "Historico comprovado em tecnologia",
    },
  ],
  services: [
    {
      id: "repair",
      title: "Reparacao de equipamentos",
      description: "Diagnostico e recuperacao para estações de trabalho e perifericos criticos.",
      sla: "SLA tecnico: 24h",
    },
    {
      id: "software",
      title: "Desenvolvimento de software",
      description: "Produtos web orientados a negocio com arquitetura escalavel e observabilidade.",
      sla: "SLA tecnico: sob demanda",
    },
    {
      id: "consulting",
      title: "Consultoria em TI",
      description: "Roadmaps de modernizacao, seguranca e produtividade com foco em resultado.",
      sla: "SLA consultivo: 48h",
    },
    {
      id: "maintenance",
      title: "Manutencao de sistemas",
      description: "Sustentacao continua para manter sistemas estaveis, rapidos e seguros.",
      sla: "SLA tecnico: 4h",
    },
    {
      id: "support",
      title: "Suporte tecnico",
      description: "Atendimento multicanal com triagem inteligente e escala de criticidade.",
      sla: "SLA suporte: 2h",
    },
    {
      id: "cctv",
      title: "Sistemas CCTV",
      description: "Projeto, instalacao e monitoramento de vigilancia para ambientes corporativos.",
      sla: "SLA implantacao: 72h",
    },
  ],
  highlights: [
    {
      id: "governance",
      title: "Governanca de entrega",
      description: "KPIs claros, comunicacao objetiva e ciclo continuo de melhoria.",
    },
    {
      id: "security",
      title: "Seguranca por padrao",
      description: "Boas praticas de seguranca aplicadas desde o desenho ate a operacao.",
    },
    {
      id: "ux",
      title: "Experiencia orientada ao usuario",
      description: "Fluxos simples, acessiveis e com baixo esforco cognitivo.",
    },
    {
      id: "scale",
      title: "Escala sem retrabalho",
      description: "Arquitetura modular para evoluir produto e equipe com previsibilidade.",
    },
  ],
  contact: {
    title: "Pronto para elevar sua operacao?",
    description:
      "Fale com um especialista e receba um plano tecnico alinhado ao contexto da sua empresa.",
    channels: [
      {
        id: "mail",
        label: "Email",
        value: "softconection25@gmail.com",
        href: "mailto:softconection25@gmail.com",
      },
      {
        id: "phone",
        label: "Telefone",
        value: "+55 11 96826-8377",
        href: "tel:+5511968268377",
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: "+55 11 96826-8377",
        href: "https://wa.me/5511968268377",
      },
    ],
    primaryCta: "Solicitar diagnostico",
  },
};

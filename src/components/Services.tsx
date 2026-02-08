import { 
  Globe, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Rocket,
  Check
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Pacote START",
    subtitle: "Presença Digital",
    description: "Ideal para pequenos negócios que precisam de uma presença online profissional.",
    duration: "7 a 14 dias",
    features: [
      "Website profissional (até 5 páginas)",
      "Design moderno e responsivo",
      "Formulário de contacto",
      "Integração com WhatsApp",
      "Suporte inicial (30 dias)",
    ],
  },
  {
    icon: Rocket,
    title: "Pacote PRO",
    subtitle: "Empresa Digital",
    description: "Perfeito para empresas e startups que necessitam de funcionalidades avançadas.",
    duration: "15 a 45 dias",
    features: [
      "Website corporativo avançado",
      "Painel administrativo",
      "Autenticação de utilizadores",
      "Integrações externas",
      "Segurança básica",
    ],
    popular: true,
  },
  {
    icon: Building2,
    title: "Pacote BUSINESS",
    subtitle: "Sistema Empresarial",
    description: "Automatize os processos da sua empresa com sistemas sob medida.",
    duration: "30 a 60 dias",
    features: [
      "Sistema web personalizado",
      "Módulos sob medida",
      "Banco de dados seguro",
      "Relatórios e dashboards",
      "Documentação técnica",
    ],
  },
  {
    icon: Smartphone,
    title: "Pacote MOBILE",
    subtitle: "Apps iOS & Android",
    description: "Aplicações móveis profissionais para alcançar os seus clientes onde eles estiverem.",
    duration: "45 a 90 dias",
    features: [
      "App profissional",
      "UX/UI moderno",
      "Integração com APIs",
      "Publicação nas lojas",
    ],
  },
  {
    icon: CreditCard,
    title: "Pacote FINTECH",
    subtitle: "Enterprise",
    description: "Soluções robustas para sistemas financeiros e empresas de grande porte.",
    duration: "Sob consulta",
    features: [
      "Sistemas financeiros",
      "Segurança avançada",
      "Escalabilidade",
      "Auditoria técnica",
    ],
  },
];

const Services = () => {
  return (
    <section id="servicos" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pacotes de serviços <span className="gradient-text">à sua medida</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Escolha o pacote ideal para o seu negócio e comece a sua transformação digital hoje mesmo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass-card p-6 lg:p-8 hover-lift relative group ${
                service.popular ? "ring-1 ring-primary/50" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Mais Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                {service.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-3">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border/30">
                <div className="font-display text-2xl font-bold gradient-text">
                  {service.price}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Prazo: {service.duration}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`block text-center py-3 rounded-xl font-medium transition-all duration-300 ${
                  service.popular
                    ? "btn-primary w-full"
                    : "btn-secondary w-full"
                }`}
              >
                Solicitar Orçamento
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

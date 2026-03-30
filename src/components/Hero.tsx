import { ArrowRight, Sparkles, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import { Logo } from "@/components/branding/Logo";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse-soft [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:60px_60px]" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12 animate-fade-up flex justify-center">
            <Logo
              size="xl"
              animated
              className="drop-shadow-[0_0_50px_hsl(198_85%_55%/0.4)] transition-all hover:scale-105 duration-500"
              showWordmark={false}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up [animation-delay:0.1s]">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Criação Inovadora
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up [animation-delay:0.2s]">
            Transformamos ideias em{" "}
            <span className="gradient-text">soluções digitais</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up [animation-delay:0.3s]">
            Desenvolvemos websites, aplicações móveis e sistemas empresariais 
            com tecnologia de ponta e design inovador para impulsionar o seu negócio.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.4s]">
            <a
              href="#servicos"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Ver Serviços
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://wa.me/5511999999999?text=Olá%20SoftConection,%20gostaria%20de%20mais%20informações"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_-5px_#22c55e]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp - São Paulo
            </a>
            <a
              href="https://wa.me/244935358417?text=Olá%20SoftConection,%20gostaria%20de%20mais%20informações"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_-5px_#22c55e]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp - Luanda
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap mt-6 animate-fade-up [animation-delay:0.45s]">
            <a href="#servicos" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300 border border-primary/30 hover:border-primary/60 text-sm">
              Serviços <ChevronDown className="w-3.5 h-3.5" />
            </a>
            <a href="#sobre" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300 border border-primary/30 hover:border-primary/60 text-sm">
              Sobre <ChevronDown className="w-3.5 h-3.5" />
            </a>
            <a href="#contacto" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300 border border-primary/30 hover:border-primary/60 text-sm">
              Contacto <ChevronDown className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 pt-16 border-t border-border/30 animate-fade-up [animation-delay:0.5s]">
            {[
              { value: "2", label: "Sedes Globais" },
              { value: "50+", label: "Projetos Entregues" },
              { value: "100%", label: "Clientes Satisfeitos" },
              { value: "24/7", label: "Suporte Técnico" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Location Badges */}
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-up [animation-delay:0.6s]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              🇧🇷 São Paulo, Brasil
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              🇦🇴 Luanda, Angola
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

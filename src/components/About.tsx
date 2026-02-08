import { Target, Users, Zap, Award } from "lucide-react";
import logo from "@/assets/logo.png";

const features = [
  {
    icon: Target,
    title: "Foco no Cliente",
    description: "Cada projeto é único. Ouvimos as suas necessidades e entregamos soluções personalizadas.",
  },
  {
    icon: Zap,
    title: "Tecnologia de Ponta",
    description: "Utilizamos as ferramentas e frameworks mais modernos do mercado.",
  },
  {
    icon: Users,
    title: "Equipa Dedicada",
    description: "Profissionais experientes e apaixonados por criar soluções inovadoras.",
  },
  {
    icon: Award,
    title: "Qualidade Garantida",
    description: "Compromisso com a excelência em cada linha de código.",
  },
];

const About = () => {
  return (
    <section id="sobre" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Sobre Nós
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Criação inovadora para o <span className="gradient-text">futuro digital</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              A Softconection é uma empresa de desenvolvimento de software, 
              especializada em criar soluções digitais que transformam negócios.
            </p>
            <p className="text-muted-foreground mb-8">
              Com presença no Brasil e em Angola, ajudamos empresas de todos os tamanhos a estabelecer 
              uma presença digital forte e a automatizar os seus processos.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-border/30 p-8 lg:p-12">
              <div className="w-full h-full rounded-2xl glass-card flex items-center justify-center relative overflow-hidden">
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                
                <div className="text-center p-6 relative z-10">
                  <img 
                    src={logo} 
                    alt="Softconection" 
                    className="h-24 md:h-32 w-auto mx-auto mb-4 drop-shadow-[0_0_40px_hsl(198_85%_55%/0.4)]" 
                  />
                  <div className="text-muted-foreground text-lg">
                    Criação Inovadora
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

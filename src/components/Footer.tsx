import logo from "@/assets/logo.png";
import { MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // WhatsApp contact information
  const locations = [
    {
      city: "São Paulo",
      country: "Brasil",
      phone: "5511999999999", // Without special chars for wa.me
      phoneDisplay: "+55 (11) 9999-9999",
      flag: "🇧🇷",
    },
    {
      city: "Luanda",
      country: "Angola",
      phone: "244935358417", // Without special chars for wa.me
      phoneDisplay: "+244 935 358 417",
      flag: "🇦🇴",
    },
  ];

  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Company Info */}
          <div className="flex flex-col">
            <img src={logo} alt="Softconection" className="h-10 w-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Soluções de TI Profissionais
            </p>
            <p className="text-muted-foreground/70 text-xs mt-2">
              Criação Inovadora
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm mb-2">Navegação</h4>
            <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Início
            </a>
            <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Serviços
            </a>
            <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Sobre
            </a>
            <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Contacto
            </a>
          </div>

          {/* Locations & WhatsApp */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm mb-2">Contacto</h4>
            {locations.map((location) => (
              <a
                key={location.city}
                href={`https://wa.me/${location.phone}?text=Olá%20SoftConection,%20preciso%20de%20serviços%20de%20TI`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="flex flex-col">
                  <span>{location.flag} {location.city}</span>
                  <span className="text-xs text-muted-foreground/70 group-hover:text-primary/70">
                    {location.phoneDisplay}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Locations Info */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm mb-2">Sedes</h4>
            {locations.map((location) => (
              <div key={location.city} className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{location.city}</p>
                  <p className="text-xs text-muted-foreground">{location.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/20 mt-8 pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © {currentYear} SoftConection. Todos os direitos reservados.
          </p>
          <p className="text-center text-muted-foreground/50 text-xs mt-1">
            Presença Global | São Paulo • Luanda
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

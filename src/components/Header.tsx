import { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#servicos", label: "Serviços" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#inicio" className="flex items-center gap-2">
              <img src={logo} alt="Softconection" className="h-10 md:h-12 w-auto transition-all" />
            </a>
            {/* Location Badge */}
            <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-border/30">
              <div className="flex items-center gap-1 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground/60">São Paulo • Luanda</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-primary font-medium transition-colors duration-200 relative group text-sm"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#contacto"
                className="btn-primary text-sm"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 mt-4" : "max-h-0"
          }`}
        >
          <div className="glass-card p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground/60 py-2 border-b border-border/20 mb-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>São Paulo • Luanda</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/70 hover:text-primary font-medium py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary text-center mt-2"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

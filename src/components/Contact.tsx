import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";

const contacts = [
  {
    phone: "+55 (11) 9999-9999",
    label: "Brasil - São Paulo",
    whatsappLink: "https://wa.me/5511999999999?text=Olá%20SoftConection,%20preciso%20de%20serviços%20de%20TI",
  },
  {
    phone: "+244 935 358 417",
    label: "Angola - Luanda",
    whatsappLink: "https://wa.me/244935358417?text=Olá%20SoftConection,%20preciso%20de%20serviços%20de%20TI",
  },
];

const Contact = () => {
  return (
    <section id="contacto" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Contacto
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Vamos <span className="gradient-text">conversar</span> sobre o seu projeto
          </h2>
          <p className="text-muted-foreground text-lg">
            Entre em contacto connosco e descubra como podemos ajudar o seu negócio a crescer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Phone Cards */}
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-lift"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {contact.label}
                    </div>
                    <div className="font-display text-xl font-semibold text-foreground">
                      {contact.phone}
                    </div>
                  </div>
                </div>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_-5px_#22c55e]"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            ))}

            {/* Additional Info */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Email
                  </div>
                  <a href="mailto:softconection@gmail.com" className="text-primary hover:underline">
                    softconection@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Sedes Globais
                  </div>
                  <div className="text-muted-foreground space-y-1">
                    <div>🇧🇷 Brasil - São Paulo</div>
                    <div>🇦🇴 Angola - Luanda</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    Horário de Atendimento
                  </div>
                  <div className="text-muted-foreground">
                    Segunda a Sexta: 08:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-6 lg:p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Envie-nos uma mensagem
            </h3>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="O seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                  Serviço de Interesse
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="start">Pacote START - Presença Digital</option>
                  <option value="pro">Pacote PRO - Empresa Digital</option>
                  <option value="business">Pacote BUSINESS - Sistema Empresarial</option>
                  <option value="mobile">Pacote MOBILE - Apps iOS & Android</option>
                  <option value="fintech">Pacote FINTECH / Enterprise</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Descreva o seu projeto..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Clock, DollarSign, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { Service } from '@/types';

const CATEGORIES = {
  repair: {
    name: 'Reparação de Equipamentos',
    description: 'Serviços profissionais de reparação e manutenção de hardware',
    icon: '🔧',
    services: [
      {
        id: 'repair-1',
        name: 'Reparação de Computador',
        description: 'Diagnóstico e reparação completa de computadores desktop e portáteis',
        price: 150,
        duration: 120,
        features: ['Diagnóstico gratuito', 'Garantia de reparo', 'Reparação rápida'],
      },
      {
        id: 'repair-2',
        name: 'Reparação de Laptop',
        description: 'Consertos especializados em laptops de todas as marcas',
        price: 180,
        duration: 90,
        features: ['Peças originais', 'Backup de dados', 'Teste completo'],
      },
      {
        id: 'repair-3',
        name: 'Reparação de Smartphones',
        description: 'Troca de ecrã, bateria e outros componentes',
        price: 120,
        duration: 60,
        features: ['Vidro temperado', 'Garantia 6 meses', 'Rápido'],
      },
      {
        id: 'repair-4',
        name: 'Reparação de Tablets',
        description: 'Serviços completos para tablets de todas as marcas',
        price: 150,
        duration: 75,
        features: ['Ecrã substituído', 'Bateria nova', 'Limpeza interior'],
      },
      {
        id: 'repair-5',
        name: 'Reparação de Impressoras',
        description: 'Limpeza, substituição de peças e manutenção',
        price: 100,
        duration: 60,
        features: ['Limpeza profunda', 'Toner substituído', 'Teste de impressão'],
      },
      {
        id: 'repair-6',
        name: 'Recuperação de Dados',
        description: 'Recuperação de dados de discos danificados',
        price: 300,
        duration: 240,
        features: ['Taxa de sucesso 95%', 'Sigilo garantido', 'Relatório detalhado'],
      },
    ]
  },
  software: {
    name: 'Desenvolvimento de Software',
    description: 'Criação e desenvolvimento de aplicações profissionais',
    icon: '💻',
    services: [
      {
        id: 'software-1',
        name: 'Desenvolvimento Web',
        description: 'Websites e aplicações web modernas e responsivas',
        price: 3000,
        duration: 1440,
        features: ['Design responsivo', 'SEO otimizado', 'Rápido carregamento'],
      },
      {
        id: 'software-2',
        name: 'App Mobile',
        description: 'Desenvolvimento de aplicações para iOS e Android',
        price: 5000,
        duration: 2880,
        features: ['Interface intuitiva', 'Sincronização cloud', 'Push notifications'],
      },
      {
        id: 'software-3',
        name: 'Sistema de Gestão',
        description: 'Sistemas personalizados para sua empresa',
        price: 4000,
        duration: 2160,
        features: ['Banco de dados robusto', 'Relatórios automáticos', 'Acesso 24/7'],
      },
      {
        id: 'software-4',
        name: 'E-commerce',
        description: 'Loja online completa com pagamentos integrados',
        price: 3500,
        duration: 1920,
        features: ['Carrinho de compras', 'Gateway de pagamento', 'Inventário'],
      },
      {
        id: 'software-5',
        name: 'Sistema de Agendamento',
        description: 'Plataforma de agendamentos para seu negócio',
        price: 2500,
        duration: 1200,
        features: ['Calendário inteligente', 'Notificações automáticas', 'Relatórios'],
      },
      {
        id: 'software-6',
        name: 'Integração de APIs',
        description: 'Integração com sistemas e serviços externos',
        price: 1500,
        duration: 480,
        features: ['Conexão segura', 'Síncronia em tempo real', 'Documentação'],
      },
    ]
  },
  consulting: {
    name: 'Consultoria TI',
    description: 'Orientação especializada para transformação digital',
    icon: '📋',
    services: [
      {
        id: 'consulting-1',
        name: 'Consultoria Estratégica',
        description: 'Plano estratégico de TI para sua empresa',
        price: 1500,
        duration: 240,
        features: ['Análise completa', 'Roadmap detalhado', 'Implementação suportada'],
      },
      {
        id: 'consulting-2',
        name: 'Segurança Informática',
        description: 'Auditoria e implementação de segurança',
        price: 2000,
        duration: 360,
        features: ['Teste de penetração', 'Plano de segurança', 'Treinamento'],
      },
      {
        id: 'consulting-3',
        name: 'Conformidade e Compliance',
        description: 'Adequação a regulamentações GDPR, LGPD, etc.',
        price: 1800,
        duration: 300,
        features: ['Auditoria completa', 'Documentação', 'Implementação'],
      },
      {
        id: 'consulting-4',
        name: 'Transformação Digital',
        description: 'Modernização dos processos da empresa',
        price: 3000,
        duration: 600,
        features: ['Análise de processos', 'Automação', 'Treinamento equipa'],
      },
      {
        id: 'consulting-5',
        name: 'Cloud Migration',
        description: 'Migração segura para ambientes cloud',
        price: 2500,
        duration: 480,
        features: ['Plano de migração', 'Zero downtime', 'Otimização de custos'],
      },
      {
        id: 'consulting-6',
        name: 'Escolha de Tecnologia',
        description: 'Recomendações de software e hardware',
        price: 1000,
        duration: 180,
        features: ['Comparativa de soluções', 'ROI análise', 'Demo gratuita'],
      },
    ]
  },
  maintenance: {
    name: 'Manutenção de Sistemas',
    description: 'Suporte contínuo e manutenção de infraestrutura',
    icon: '🛠️',
    services: [
      {
        id: 'maintenance-1',
        name: 'Plano Mensal Pequena Empresa',
        description: 'Suporte completo para pequenos negócios até 10 computadores',
        price: 500,
        duration: 60,
        features: ['Suporte 8x5', 'Atualizações', 'Backup automático'],
      },
      {
        id: 'maintenance-2',
        name: 'Plano Mensal Média Empresa',
        description: 'Suporte para empresas com 11-50 computadores',
        price: 1200,
        duration: 120,
        features: ['Suporte 24/7', 'Gestor dedicado', 'Relatórios mensais'],
      },
      {
        id: 'maintenance-3',
        name: 'Gestão de Rede',
        description: 'Monitoramento e administração de redes',
        price: 1500,
        duration: 480,
        features: ['Monitoramento 24/7', 'Alertas automáticos', 'Otimização'],
      },
      {
        id: 'maintenance-4',
        name: 'Backup e Disaster Recovery',
        description: 'Plano de backup automático e recuperação',
        price: 800,
        duration: 120,
        features: ['Backup diário', 'Redundância', 'Teste mensal'],
      },
      {
        id: 'maintenance-5',
        name: 'Atualização de Software',
        description: 'Atualização e patch management',
        price: 600,
        duration: 180,
        features: ['Updates automáticas', 'Sem interrupção', 'Relatório'],
      },
      {
        id: 'maintenance-6',
        name: 'Limpeza e Otimização',
        description: 'Limpeza e otimização de sistemas',
        price: 200,
        duration: 120,
        features: ['Remoção de vírus', 'Otimização performance', 'Teste final'],
      },
    ]
  },
  support: {
    name: 'Suporte Técnico',
    description: 'Resolução rápida de problemas técnicos',
    icon: '📞',
    services: [
      {
        id: 'support-1',
        name: 'Suporte Remoto',
        description: 'Acesso remoto para resolução de problemas',
        price: 80,
        duration: 60,
        features: ['Conexão segura', 'Sem instalação', 'Rápido'],
      },
      {
        id: 'support-2',
        name: 'Suporte Presencial',
        description: 'Técnico na sua localização',
        price: 120,
        duration: 120,
        features: ['Atendimento rápido', 'Diagnóstico completo', 'Relatório'],
      },
      {
        id: 'support-3',
        name: 'Help Desk 24/7',
        description: 'Suporte por telefone 24 horas',
        price: 2000,
        duration: 43200,
        features: ['Disponível sempre', 'Técnico experiente', 'Chamadas ilimitadas'],
      },
      {
        id: 'support-4',
        name: 'Suporte de Utilizadores',
        description: 'Treinamento e suporte ao utilizador final',
        price: 300,
        duration: 240,
        features: ['Treinamento prático', 'Documentação', 'Follow-up'],
      },
      {
        id: 'support-5',
        name: 'Troubleshooting',
        description: 'Resolução de problemas comuns',
        price: 100,
        duration: 90,
        features: ['Diagnóstico rápido', 'Solução imediata', 'Prevenção'],
      },
      {
        id: 'support-6',
        name: 'Configuração de Equipamentos',
        description: 'Instalação e configuração de hardware/software',
        price: 150,
        duration: 180,
        features: ['Setup completo', 'Testes funcionais', 'Entrega de credenciais'],
      },
    ]
  },
  cctv: {
    name: 'Sistemas CCTV',
    description: 'Soluções completas de vigilância por vídeo',
    icon: '📹',
    services: [
      {
        id: 'cctv-1',
        name: 'Instalação de Câmaras',
        description: 'Instalação profissional de sistema de câmaras',
        price: 1200,
        duration: 480,
        features: ['Câmaras 4K', 'Instalação profissional', 'Teste completo'],
      },
      {
        id: 'cctv-2',
        name: 'Manutenção CCTV',
        description: 'Limpeza e manutenção de câmaras e servidor',
        price: 300,
        duration: 120,
        features: ['Limpeza lentes', 'Verificação cabos', 'Teste funcionamento'],
      },
      {
        id: 'cctv-3',
        name: 'Upgrade de Sistema',
        description: 'Atualização para sistema moderno com cloud',
        price: 2000,
        duration: 600,
        features: ['Sem perda de dados', 'Instalação zero downtime', 'Suporte'],
      },
      {
        id: 'cctv-4',
        name: 'Monitoramento Remoto',
        description: 'Acesso remoto e alertas em tempo real',
        price: 500,
        duration: 240,
        features: ['App móvel', 'Alertas inteligentes', 'Cloud storage'],
      },
      {
        id: 'cctv-5',
        name: 'Análise de Vídeo',
        description: 'Inteligência artificial para análise automática',
        price: 1500,
        duration: 300,
        features: ['Detecção de objetos', 'Contagem de pessoas', 'Alertas automáticos'],
      },
      {
        id: 'cctv-6',
        name: 'Recuperação de Gravações',
        description: 'Recuperação e análise de gravações antigas',
        price: 400,
        duration: 240,
        features: ['Pesquisa avançada', 'Exportação forense', 'Relatório'],
      },
    ]
  },
  design: {
    name: 'Design Gráfico',
    description: 'Criação de conteúdo visual profissional',
    icon: '🎨',
    services: [
      {
        id: 'design-1',
        name: 'Design de Logo',
        description: 'Logo único e profissional para sua marca',
        price: 600,
        duration: 480,
        features: ['Conceitos múltiplos', 'Versões cores/preto', 'Fonte vectorial'],
      },
      {
        id: 'design-2',
        name: 'Identidade Visual',
        description: 'Sistema de identidade completo',
        price: 2000,
        duration: 1440,
        features: ['Logo', 'Cartão de visita', 'Paleta cores', 'Guidelines'],
      },
      {
        id: 'design-3',
        name: 'Design de Website',
        description: 'Mockups e design de interfaces web',
        price: 1500,
        duration: 720,
        features: ['Desktop + Mobile', 'Protótipo interativo', 'Especificações'],
      },
      {
        id: 'design-4',
        name: 'Material de Marketing',
        description: 'Flyers, posters, banners e materiais promocionais',
        price: 400,
        duration: 240,
        features: ['Designs ilimitados', 'Revisões', 'Arquivo em alta resolução'],
      },
      {
        id: 'design-5',
        name: 'Design de Pacotes',
        description: 'Embalagem profissional para produtos',
        price: 1000,
        duration: 600,
        features: ['Conceptualização', 'Prototipagem', 'Arquivo pronto impressão'],
      },
      {
        id: 'design-6',
        name: 'Ilustração Customizada',
        description: 'Ilustrações originais para seu projeto',
        price: 800,
        duration: 480,
        features: ['Estilo personalizado', 'Múltiplas versões', 'Direitos exclusivos'],
      },
    ]
  },
  marketing: {
    name: 'Marketing Digital',
    description: 'Estratégias de marketing e presença online',
    icon: '📱',
    services: [
      {
        id: 'marketing-1',
        name: 'SEO - Otimização para Motores de Busca',
        description: 'Aumento de visibilidade no Google',
        price: 800,
        duration: 240,
        features: ['Análise de palavras-chave', 'Otimização on-page', 'Link building'],
      },
      {
        id: 'marketing-2',
        name: 'Gestão de Redes Sociais',
        description: 'Criação e gestão de conteúdo em redes sociais',
        price: 1200,
        duration: 480,
        features: ['Plano editorial', 'Publicações diárias', 'Relatórios mensais'],
      },
      {
        id: 'marketing-3',
        name: 'Google Ads',
        description: 'Campanhas de publicidade no Google',
        price: 1500,
        duration: 300,
        features: ['Setup de campanhas', 'Otimização', 'Relatório de ROI'],
      },
      {
        id: 'marketing-4',
        name: 'Email Marketing',
        description: 'Campanhas de email profissionais',
        price: 600,
        duration: 180,
        features: ['Template profissional', 'Segmentação', 'Rastreamento'],
      },
      {
        id: 'marketing-5',
        name: 'Marketing de Conteúdo',
        description: 'Estratégia e criação de conteúdo',
        price: 900,
        duration: 300,
        features: ['Blog posts', 'Whitepapers', 'Guias'],
      },
      {
        id: 'marketing-6',
        name: 'Análise de Concorrência',
        description: 'Análise detalhada de estratégias dos concorrentes',
        price: 500,
        duration: 240,
        features: ['Relatório completo', 'Oportunidades', 'Recomendações'],
      },
    ]
  },
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { addAppointment } = useData();

  const category = CATEGORIES[categoryId as keyof typeof CATEGORIES];

  const filteredServices = useMemo(() => {
    if (!category) return [];
    return category.services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [category, searchTerm]);

  if (!category) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Categoria não encontrada</p>
          <Button onClick={() => navigate('/services')} className="mt-4">
            Voltar aos Serviços
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleRequestService = () => {
    if (selectedService) {
      // Simular adição de um agendamento
      const toast = () => {
        const element = document.createElement('div');
        element.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse';
        element.textContent = `Serviço "${selectedService.name}" solicitado com sucesso!`;
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 3000);
      };
      toast();
      setSelectedService(null);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/services')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-display font-bold">{category.name}</h1>
              <p className="text-gray-400">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Procurar por serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-cyan-500 transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>

                {/* Price and Duration */}
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{service.price}€</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span>{Math.round(service.duration / 60)}h</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum serviço encontrado</p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedService?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-6">
              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Preço</p>
                  <p className="text-3xl font-bold text-cyan-400">{selectedService.price}€</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Duração Estimada</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {Math.round(selectedService.duration / 60)}h
                  </p>
                </div>
              </div>

              {/* Full Features List */}
              <div>
                <h3 className="font-display font-bold text-white mb-3">O que está incluído:</h3>
                <ul className="space-y-2">
                  {selectedService.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  ✅ Suporte profissional garantido
                  <br />
                  ✅ Garantia de satisfação
                  <br />
                  ✅ Acompanhamento pós-serviço
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleRequestService}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white h-12 gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Solicitar Serviço
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 border-gray-700"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

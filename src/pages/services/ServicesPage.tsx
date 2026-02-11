import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import ComingSoon from "@/components/ComingSoon";
import { Zap } from "lucide-react";

export const ServicesPage: React.FC = () => {
  return (
    <AppLayout>
      <ComingSoon
        title="Centro de Serviços"
        description="Aqui você poderá visualizar todos os serviços disponibilizados pela SoftConection e solicitar orçamentos personalizados."
        features={[
          "Catálogo completo de serviços",
          "Solicitação de orçamentos",
          "Acompanhamento em tempo real",
          "Chat com especialistas",
          "Histórico de serviços contratados",
        ]}
        icon={<Zap className="w-12 h-12" />}
        ctaText="Voltar ao Dashboard"
      />
    </AppLayout>
  );
};

export default ServicesPage;

/* ==================== CÓDIGO FUTURO ==================== 
const CATEGORIES_DATA = [
  {
    id: "repair",
    name: "Reparação de Equipamentos",
    icon: "🔧",
    description: "Serviços profissionais de reparação e manutenção de hardware",
    count: 6,
  },
  {
    id: "software",
    name: "Desenvolvimento de Software",
    icon: "💻",
    description: "Criação e desenvolvimento de aplicações profissionais",
    count: 6,
  },
  {
    id: "consulting",
    name: "Consultoria TI",
    icon: "📋",
    description: "Orientação especializada para transformação digital",
    count: 6,
  },
  {
    id: "maintenance",
    name: "Manutenção de Sistemas",
    icon: "🛠️",
    description: "Suporte contínuo e manutenção de infraestrutura",
    count: 6,
  },
  {
    id: "support",
    name: "Suporte Técnico",
    icon: "📞",
    description: "Resolução rápida de problemas técnicos",
    count: 6,
  },
  {
    id: "cctv",
    name: "Sistemas CCTV",
    icon: "📹",
    description: "Soluções completas de vigilância por vídeo",
    count: 6,
  },
  {
    id: "design",
    name: "Design Gráfico",
    icon: "🎨",
    description: "Criação de conteúdo visual profissional",
    count: 6,
  },
  {
    id: "marketing",
    name: "Marketing Digital",
    icon: "📱",
    description: "Estratégias de marketing e presença online",
    count: 6,
  },
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { services } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = CATEGORIES_DATA.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/services/${categoryId}`);
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Catálogo de Serviços</h1>
        <p className="text-gray-400">
          Explore nossas 8 áreas de especialidade com mais de 48 serviços profissionais
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Procurar categorias ou serviços..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 bg-gray-900 border-gray-700"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="space-y-4">
              {/* Icon */}
              <div className="text-5xl group-hover:scale-110 transition-transform">
                {category.icon}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {category.description}
                </p>
              </div>

              {/* Service Count */}
              <div className="pt-2 border-t border-gray-700">
                <p className="text-sm text-cyan-400 font-semibold">
                  {category.count} serviços disponíveis
                </p>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
              >
                Ver Serviços
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Nenhuma categoria encontrada</p>
          <Button
            variant="outline"
            onClick={() => setSearchTerm("")}
            className="mt-4"
          >
            Limpar busca
          </Button>
        </div>
      )}


            Ampla variedade de serviços em 8 áreas diferentes
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-display font-bold text-white mb-2">Rápido & Eficiente</h3>
          <p className="text-sm text-gray-400">
            Atendimento profissional com máxima rapidez
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="font-display font-bold text-white mb-2">Garantido</h3>
          <p className="text-sm text-gray-400">
            Satisfação garantida em todos os serviços
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

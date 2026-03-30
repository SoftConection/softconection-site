import React from "react";
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

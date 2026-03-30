import React from "react";
import { AppLayout } from "@/components/AppLayout";
import ComingSoon from "@/components/ComingSoon";
import { Calendar } from "lucide-react";

export const AppointmentsPage: React.FC = () => {
  return (
    <AppLayout>
      <ComingSoon
        title="Agenda de Atendimentos"
        description="Gerencie seus agendamentos e consulte a disponibilidade dos nossos profissionais."
        features={[
          "Visualizar calendário de disponibilidade",
          "Agendar novos atendimentos",
          "Confirmar agendamentos existentes",
          "Receber lembretes automáticos",
          "Histórico de atendimentos realizados",
        ]}
        icon={<Calendar className="w-12 h-12" />}
        ctaText="Voltar ao Dashboard"
      />
    </AppLayout>
  );
};

export default AppointmentsPage;

import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
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

/* ==================== CÓDIGO FUTURO ====================
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  ChevronRight,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";*/
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    const service = services.find((s) => s.id === apt.serviceId);
    const matchesSearch =
      service?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancelAppointment = (id: string) => {
    toast.success("Agendamento cancelado");
  };

  const handleConfirmAppointment = (id: string) => {
    toast.success("Agendamento confirmado");
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Agendamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus agendamentos de serviços
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por serviço ou local..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-secondary/40 border-border/30"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter || ""} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 bg-secondary/40 border-border/30">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="scheduled">Agendado</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="in-progress">Em Andamento</SelectItem>
            <SelectItem value="completed">Completado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => {
            const service = services.find((s) => s.id === appointment.serviceId);
            const config = statusConfig[appointment.status];

            return (
              <Card key={appointment.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{service?.name}</h3>
                      <Badge className={config.color}>{config.label}</Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border/30">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {appointment.date.toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {appointment.startTime} - {appointment.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>Técnico: {appointment.technicianId || "A designar"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {appointment.status === "scheduled" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleConfirmAppointment(appointment.id)}
                      >
                        Confirmar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {appointment.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                  {appointment.status === "completed" && (
                    <Button size="sm" variant="outline" disabled>
                      Concluído
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Crie seu primeiro agendamento agora
            </p>
            <Button>Novo Agendamento</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

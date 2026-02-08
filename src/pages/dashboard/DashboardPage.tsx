import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  change,
  trend,
  className,
}) => (
  <Card className={cn("p-6 hover:shadow-lg transition-all duration-300", className)}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {change !== undefined && (
          <p
            className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend === "up" ? "text-green-500" : "text-red-500"
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {Math.abs(change)}% vs mês anterior
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
  </Card>
);

interface RecentActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "pending" | "warning";
}

const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: "1",
    title: "Novo Pedido de Serviço",
    description: "João Silva solicitou reparo de computador",
    timestamp: "Há 2 horas",
    status: "success",
  },
  {
    id: "2",
    title: "Proposta Aceita",
    description: "Cliente aceitou proposta de desenvolvimento web",
    timestamp: "Há 5 horas",
    status: "success",
  },
  {
    id: "3",
    title: "Agendamento Pendente",
    description: "Aguardando confirmação de consultoria TI",
    timestamp: "Há 1 dia",
    status: "pending",
  },
  {
    id: "4",
    title: "Serviço Completado",
    description: "Manutenção de sistemas finalizada",
    timestamp: "Há 2 dias",
    status: "success",
  },
];

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { serviceRequests, appointments, orders, proposals } = useData();

  // Calculate stats
  const completedRequests = serviceRequests.filter(
    (r) => r.status === "completed"
  ).length;
  const pendingRequests = serviceRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const acceptedProposals = proposals.filter(
    (p) => p.status === "accepted"
  ).length;

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">
          Bem-vindo, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está um resumo da atividade da sua conta e negócio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Receita Total"
          value={`R$ ${totalRevenue.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
          change={12.5}
          trend="up"
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Serviços Completos"
          value={completedRequests}
          change={8}
          trend="up"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label="Pendentes"
          value={pendingRequests}
          change={-5}
          trend="down"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Propostas Aceitas"
          value={acceptedProposals}
          change={15}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Atividades Recentes</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Últimas ações no seu sistema
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver Tudo
              </Button>
            </div>

            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors border border-border/30"
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full mt-1.5 flex-shrink-0",
                      activity.status === "success" && "bg-green-500",
                      activity.status === "pending" && "bg-yellow-500",
                      activity.status === "warning" && "bg-red-500"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-2 h-10" variant="outline">
                <Zap className="w-4 h-4" />
                Novo Serviço
              </Button>
              <Button className="w-full justify-start gap-2 h-10" variant="outline">
                <Clock className="w-4 h-4" />
                Agendar Atendimento
              </Button>
              <Button className="w-full justify-start gap-2 h-10" variant="outline">
                <AlertCircle className="w-4 h-4" />
                Criar Proposta
              </Button>
              <Button className="w-full justify-start gap-2 h-10" variant="outline">
                <BarChart3 className="w-4 h-4" />
                Ver Relatórios
              </Button>
            </div>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Próximos Agendamentos</h2>
            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-lg bg-secondary/40 border border-border/30"
                  >
                    <p className="text-sm font-medium">
                      {apt.date.toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {apt.startTime} - {apt.endTime}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum agendamento próximo
              </p>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

import React, { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useGovernance } from "@/contexts/GovernanceContext";
import { toast } from "sonner";

export const PricingGovernancePage: React.FC = () => {
  const { user } = useAuth();
  const {
    catalog,
    priceRequests,
    recurringPlans,
    retentionCampaigns,
    canPerform,
    requestPriceChange,
    reviewPriceChange,
  } = useGovernance();

  const [serviceId, setServiceId] = useState(catalog[0]?.id ?? "");
  const [newPrice, setNewPrice] = useState("");
  const [reason, setReason] = useState("");

  const selectedService = useMemo(
    () => catalog.find((service) => service.id === serviceId) || null,
    [catalog, serviceId]
  );

  const canRequest = canPerform(user ?? null, "pricing.request", selectedService?.category);
  const canApprove = canPerform(user ?? null, "pricing.approve", selectedService?.category);

  const pendingRequests = priceRequests.filter((item) => item.status === "pending");

  const submitRequest = () => {
    if (!user || !selectedService) return;

    const nextPrice = Number(newPrice);
    if (!Number.isFinite(nextPrice) || nextPrice <= 0) {
      toast.error("Informe um preco valido.");
      return;
    }

    requestPriceChange(user, selectedService.id, nextPrice, reason);
    toast.success("Solicitacao enviada para aprovacao em duas etapas.");
    setNewPrice("");
    setReason("");
  };

  const approve = (requestId: string) => {
    if (!user) return;
    reviewPriceChange(user, requestId, "approved", "Aprovacao do comite de precos");
    toast.success("Reajuste aprovado e aplicado ao catalogo.");
  };

  const reject = (requestId: string) => {
    if (!user) return;
    reviewPriceChange(user, requestId, "rejected", "Rejeicao por falta de justificativa economica");
    toast.success("Solicitacao rejeitada e registrada em auditoria.");
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Governanca de Precificacao</h1>
        <p className="text-muted-foreground">
          Fluxo em duas etapas: solicitacao por colaborador e aprovacao por administrador.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Nova Solicitacao de Preco</h2>

          <div>
            <label className="text-sm font-medium">Servico</label>
            <select
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              aria-label="Selecione o servico para reajuste"
              title="Selecione o servico para reajuste"
              className="mt-1 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {catalog.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {service.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Novo preco</label>
            <Input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Ex: 1490"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Motivo da alteracao</label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: novo SLA e escopo expandido"
              className="mt-1"
            />
          </div>

          {!canRequest && (
            <p className="text-sm text-amber-500">
              Seu perfil nao tem permissao para solicitar reajuste nesta categoria.
            </p>
          )}

          <Button onClick={submitRequest} disabled={!canRequest || !reason.trim()}>
            Enviar para Aprovacao
          </Button>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">Impacto em Retencao</h2>
          <p className="text-sm text-muted-foreground">
            Reajustes aprovados atualizam planos recorrentes e acionam campanhas para clientes ativos.
          </p>
          <div className="rounded-lg border border-border/40 p-3">
            <p className="text-sm font-medium">Planos recorrentes ativos</p>
            <p className="text-2xl font-bold">{recurringPlans.filter((item) => item.active).length}</p>
          </div>
          <div className="rounded-lg border border-border/40 p-3">
            <p className="text-sm font-medium">Campanhas ativas</p>
            <p className="text-2xl font-bold">{retentionCampaigns.filter((item) => item.active).length}</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 mt-6 space-y-4">
        <h2 className="text-lg font-semibold">Fila de Aprovacao</h2>
        {pendingRequests.length === 0 && (
          <p className="text-sm text-muted-foreground">Nao ha solicitacoes pendentes.</p>
        )}

        {pendingRequests.map((request) => {
          const service = catalog.find((item) => item.id === request.serviceId);

          return (
            <div
              key={request.id}
              className="rounded-lg border border-border/40 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium">{service?.name || request.serviceId}</p>
                <p className="text-sm text-muted-foreground">
                  De R$ {request.oldPrice} para R$ {request.newPrice}
                </p>
                <p className="text-sm text-muted-foreground">Motivo: {request.reason}</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">Pendente</Badge>
                <Button size="sm" onClick={() => approve(request.id)} disabled={!canApprove}>
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => reject(request.id)}
                  disabled={!canApprove}
                >
                  Rejeitar
                </Button>
              </div>
            </div>
          );
        })}
      </Card>
    </AppLayout>
  );
};

export default PricingGovernancePage;

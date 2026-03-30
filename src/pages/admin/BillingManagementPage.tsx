import React, { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/branding/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useGovernance } from "@/contexts/GovernanceContext";
import { toast } from "sonner";

export const BillingManagementPage: React.FC = () => {
  const { user } = useAuth();
  const { catalog, invoices, canPerform, issueInvoice } = useGovernance();

  const [serviceId, setServiceId] = useState(catalog[0]?.id ?? "");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const service = useMemo(() => catalog.find((item) => item.id === serviceId) || null, [catalog, serviceId]);
  const canIssue = canPerform(user ?? null, "pricing.read", service?.category);

  const emitInvoice = (type: "proforma" | "real") => {
    if (!user || !service) return;
    if (!customerName.trim() || !customerEmail.trim()) {
      toast.error("Preencha cliente e email.");
      return;
    }

    const parsedAmount = amount.trim() ? Number(amount) : service.price;
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Valor invalido para faturacao.");
      return;
    }

    issueInvoice(user, {
      serviceId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      type,
      amount: parsedAmount,
      currency: "AOA",
      notes: notes.trim() || undefined,
    });

    toast.success(type === "proforma" ? "Factura proforma emitida." : "Factura real emitida.");
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Gestao de Faturas SaaS</h1>
        <p className="text-muted-foreground">
          Emissao de factura proforma e factura real com identidade visual SoftConection.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Nova Emissao</h2>

          <div>
            <label className="text-sm font-medium">Servico publicado</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              aria-label="Selecione servico para faturar"
              title="Selecione servico para faturar"
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {catalog.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Nome do cliente</label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Email do cliente</label>
              <Input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Valor (opcional)</label>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Ex: 45000" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Tempo de servico</label>
              <Input value={service ? `${service.duration} min` : "-"} readOnly className="mt-1" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Notas comerciais</label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1" />
          </div>

          {!canIssue && (
            <p className="text-sm text-amber-500">Seu perfil nao possui permissao para faturacao.</p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => emitInvoice("proforma")} disabled={!canIssue}>Emitir Proforma</Button>
            <Button variant="outline" onClick={() => emitInvoice("real")} disabled={!canIssue}>Emitir Fatura Real</Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Identidade da Fatura</h2>
          <div className="rounded-xl border border-border/50 p-4 bg-secondary/20 space-y-3">
            <Logo size="medium" animated showWordmark />
            <p className="text-sm text-muted-foreground">
              Documento com marca SoftConection, numero fiscal interno e referencia de servico.
            </p>
            <Badge variant="outline">Template oficial SaaS</Badge>
          </div>
        </Card>
      </div>

      <Card className="p-6 mt-6 space-y-4">
        <h2 className="text-lg font-semibold">Historico de Faturas</h2>
        {invoices.length === 0 && <p className="text-sm text-muted-foreground">Sem faturas emitidas.</p>}

        {invoices.map((invoice) => (
          <div key={invoice.id} className="rounded-lg border border-border/50 p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
            <div className="md:col-span-2">
              <p className="font-medium">{invoice.documentNumber}</p>
              <p className="text-sm text-muted-foreground">{invoice.customerName}</p>
            </div>
            <div>
              <Badge variant={invoice.type === "proforma" ? "secondary" : "default"}>
                {invoice.type === "proforma" ? "Proforma" : "Real"}
              </Badge>
            </div>
            <div>
              <p className="text-sm">{invoice.serviceName}</p>
            </div>
            <div>
              <p className="font-medium">{invoice.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{new Date(invoice.issueDate).toLocaleString("pt-BR")}</p>
            </div>
          </div>
        ))}
      </Card>
    </AppLayout>
  );
};

export default BillingManagementPage;

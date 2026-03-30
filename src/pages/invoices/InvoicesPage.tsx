import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/branding/Logo";
import { useGovernance } from "@/contexts/GovernanceContext";

export const InvoicesPage: React.FC = () => {
  const { invoices } = useGovernance();

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Faturas SoftConection</h1>
          <p className="text-muted-foreground">Painel de faturas proforma e faturas reais para operacao SaaS.</p>
        </div>
        <Logo size="small" animated showWordmark={false} />
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Documentos Emitidos</h2>

        {invoices.length === 0 && <p className="text-sm text-muted-foreground">Ainda nao ha documentos emitidos.</p>}

        {invoices.map((invoice) => (
          <div key={invoice.id} className="rounded-lg border border-border/50 p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            <div>
              <p className="font-medium">{invoice.documentNumber}</p>
              <p className="text-sm text-muted-foreground">{invoice.customerName}</p>
            </div>
            <div>
              <Badge variant={invoice.type === "proforma" ? "secondary" : "default"}>
                {invoice.type === "proforma" ? "Proforma" : "Fatura Real"}
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

export default InvoicesPage;

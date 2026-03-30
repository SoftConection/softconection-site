import React, { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useGovernance } from "@/contexts/GovernanceContext";
import { toast } from "sonner";

export const GovernanceAuditPage: React.FC = () => {
  const { user } = useAuth();
  const { auditEntries, canPerform, rollbackAuditEntry } = useGovernance();
  const [reasonByEntry, setReasonByEntry] = useState<Record<string, string>>({});

  const canRollback = canPerform(user ?? null, "pricing.rollback");
  const canReadAudit = canPerform(user ?? null, "audit.read");

  const entries = useMemo(() => auditEntries.slice(0, 40), [auditEntries]);

  const onRollback = (auditId: string) => {
    if (!user) return;
    const reason = reasonByEntry[auditId] || "Rollback administrativo";
    rollbackAuditEntry(user, auditId, reason);
    toast.success("Rollback aplicado e auditado.");
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Historico e Rollback</h1>
        <p className="text-muted-foreground">
          Visualize alteracoes antes/depois e reverta mudancas com controle administrativo.
        </p>
      </div>

      {!canReadAudit && (
        <Card className="p-6">
          <p className="text-amber-500">Seu perfil nao possui permissao para visualizar auditoria.</p>
        </Card>
      )}

      {canReadAudit && (
        <Card className="p-6 space-y-4">
          {entries.length === 0 && <p className="text-sm text-muted-foreground">Sem eventos registrados.</p>}

          {entries.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-border/40 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="font-medium">{entry.entityType} - {entry.action}</p>
                  <p className="text-sm text-muted-foreground">Entidade: {entry.entityId}</p>
                </div>
                <Badge variant="outline">{new Date(entry.createdAt).toLocaleString("pt-BR")}</Badge>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 text-sm">
                <div className="rounded border border-border/40 p-3 bg-secondary/20">
                  <p className="font-semibold mb-2">Antes</p>
                  <pre className="overflow-auto text-xs">{JSON.stringify(entry.snapshot.before, null, 2)}</pre>
                </div>
                <div className="rounded border border-border/40 p-3 bg-secondary/20">
                  <p className="font-semibold mb-2">Depois</p>
                  <pre className="overflow-auto text-xs">{JSON.stringify(entry.snapshot.after, null, 2)}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Motivo do rollback</label>
                <Input
                  value={reasonByEntry[entry.id] || ""}
                  onChange={(e) =>
                    setReasonByEntry((prev) => ({
                      ...prev,
                      [entry.id]: e.target.value,
                    }))
                  }
                  placeholder="Ex: impacto negativo em conversao"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => onRollback(entry.id)}
                disabled={!canRollback}
              >
                Executar Rollback
              </Button>
            </div>
          ))}
        </Card>
      )}
    </AppLayout>
  );
};

export default GovernanceAuditPage;

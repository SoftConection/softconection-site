import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Download,
  Check,
  X,
  Clock,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { color: string; label: string }> = {
  draft: { color: "bg-gray-500/10 text-gray-500", label: "Rascunho" },
  sent: { color: "bg-blue-500/10 text-blue-500", label: "Enviada" },
  accepted: { color: "bg-green-500/10 text-green-500", label: "Aceita" },
  rejected: { color: "bg-red-500/10 text-red-500", label: "Rejeitada" },
  expired: { color: "bg-yellow-500/10 text-yellow-500", label: "Expirada" },
};

export const ProposalsPage: React.FC = () => {
  const { proposals } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadPDF = (proposalId: string) => {
    // Mock download
    console.log(`Downloading proposal: ${proposalId}`);
  };

  const getDaysUntilExpiry = (validUntil: Date) => {
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Propostas</h1>
          <p className="text-muted-foreground">
            Gerencie suas propostas comerciais
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Proposta
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título..."
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
            <SelectItem value="draft">Rascunho</SelectItem>
            <SelectItem value="sent">Enviada</SelectItem>
            <SelectItem value="accepted">Aceita</SelectItem>
            <SelectItem value="rejected">Rejeitada</SelectItem>
            <SelectItem value="expired">Expirada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => {
            const config = statusConfig[proposal.status];
            const daysUntilExpiry = getDaysUntilExpiry(proposal.validUntil);
            const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

            return (
              <Card key={proposal.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold">{proposal.title}</h3>
                      <Badge className={config.color}>{config.label}</Badge>
                      {isExpiringSoon && (
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-500">
                          Expirando em {daysUntilExpiry} dias
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {proposal.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      R${" "}
                      {proposal.totalAmount.toLocaleString("pt-BR", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {proposal.items.length} item(ns)
                    </p>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="mb-4 pb-4 border-b border-border/30">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    ITENS
                  </p>
                  <div className="space-y-1">
                    {proposal.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                        <span className="truncate">{item.description}</span>
                        <span className="flex-shrink-0 ml-2">
                          R${" "}
                          {item.subtotal.toLocaleString("pt-BR", {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Válida até {proposal.validUntil.toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleDownloadPDF(proposal.id)}
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    {proposal.status === "sent" && (
                      <>
                        <Button size="sm" className="gap-2 text-green-500 hover:text-green-600">
                          <Check className="w-4 h-4" />
                          Aceitar
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 text-red-500 hover:text-red-600">
                          <X className="w-4 h-4" />
                          Rejeitar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma proposta encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Crie sua primeira proposta agora
            </p>
            <Button>Nova Proposta</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

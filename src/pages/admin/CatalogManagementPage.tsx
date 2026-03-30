import React, { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useGovernance } from "@/contexts/GovernanceContext";
import { toast } from "sonner";
import type { ServiceCategoryType } from "@/types";

const CATEGORY_OPTIONS: ServiceCategoryType[] = [
  "repair",
  "software",
  "consulting",
  "maintenance",
  "support",
  "cctv",
  "design",
  "marketing",
];

export const CatalogManagementPage: React.FC = () => {
  const { user } = useAuth();
  const { catalog, canPerform, createCatalogService, updateCatalogService, publishCatalogService } = useGovernance();

  const [selectedId, setSelectedId] = useState<string | null>(catalog[0]?.id ?? null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState<ServiceCategoryType>("software");
  const [newPrice, setNewPrice] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newFeatures, setNewFeatures] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState("");
  const [reason, setReason] = useState("");

  const selectedService = useMemo(
    () => catalog.find((service) => service.id === selectedId) || null,
    [catalog, selectedId]
  );

  React.useEffect(() => {
    if (!selectedService) return;
    setName(selectedService.name);
    setDescription(selectedService.description);
    setPrice(String(selectedService.price));
    setDuration(String(selectedService.duration));
    setFeatures(selectedService.features.join(", "));
  }, [selectedService]);

  const canEdit = canPerform(user ?? null, "services.edit", selectedService?.category);
  const canPublish = canPerform(user ?? null, "services.publish", selectedService?.category);

  const onCreate = () => {
    if (!user) return;
    if (!newName.trim() || !newDescription.trim()) {
      toast.error("Preencha nome e descricao do servico.");
      return;
    }

    const parsedPrice = Number(newPrice);
    const parsedDuration = Number(newDuration);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      toast.error("Preco invalido.");
      return;
    }
    if (!Number.isFinite(parsedDuration) || parsedDuration <= 0) {
      toast.error("Tempo de servico invalido.");
      return;
    }

    createCatalogService(
      user,
      {
        name: newName.trim(),
        description: newDescription.trim(),
        category: newCategory,
        price: parsedPrice,
        duration: parsedDuration,
        features: newFeatures
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
      "Cadastro administrativo de servico"
    );

    toast.success("Servico cadastrado como rascunho. Publique quando estiver pronto.");
    setNewName("");
    setNewDescription("");
    setNewPrice("");
    setNewDuration("");
    setNewFeatures("");
  };

  const onSave = () => {
    if (!user || !selectedService) return;

    const parsedPrice = Number(price);
    const parsedDuration = Number(duration);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      toast.error("Preco invalido.");
      return;
    }
    if (!Number.isFinite(parsedDuration) || parsedDuration <= 0) {
      toast.error("Tempo de servico invalido.");
      return;
    }

    updateCatalogService(
      user,
      selectedService.id,
      {
        name,
        description,
        price: parsedPrice,
        duration: parsedDuration,
        features: features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
      reason
    );
    toast.success("Servico atualizado com trilha de auditoria.");
    setReason("");
  };

  const onPublish = () => {
    if (!user || !selectedService) return;
    publishCatalogService(user, selectedService.id, reason || "Publicacao administrativa");
    toast.success("Servico publicado com sucesso.");
    setReason("");
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Gestao de Catalogo</h1>
        <p className="text-muted-foreground">
          Edite servicos com governanca, motivo obrigatorio e publicacao controlada.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-4 xl:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold">Servicos</h2>
          {catalog.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedId(service.id)}
              className={`w-full text-left rounded-lg border p-3 transition ${
                selectedId === service.id
                  ? "border-primary bg-primary/10"
                  : "border-border/40 hover:bg-secondary/30"
              }`}
            >
              <p className="font-medium">{service.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">{service.category}</Badge>
                <Badge className="bg-primary/20 text-primary">{service.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Badge>
                <Badge variant="outline">{service.duration} min</Badge>
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Publicado" : "Rascunho"}
                </Badge>
              </div>
            </button>
          ))}
        </Card>

        <div className="xl:col-span-2 grid grid-cols-1 gap-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Cadastro de Servico (Admin)</h2>
            <p className="text-sm text-muted-foreground">
              Registre servicos para publicacao em diversas areas de atuacao da SoftConection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Nome do servico</label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Categoria</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ServiceCategoryType)}
                  aria-label="Selecione categoria do servico"
                  title="Selecione categoria do servico"
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Descricao</label>
              <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Preco base</label>
                <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Ex: 3500" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Tempo de servico (min)</label>
                <Input value={newDuration} onChange={(e) => setNewDuration(e.target.value)} placeholder="Ex: 120" className="mt-1" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Recursos do servico</label>
              <Input value={newFeatures} onChange={(e) => setNewFeatures(e.target.value)} placeholder="Ex: SLA, suporte, monitoramento" className="mt-1" />
            </div>

            <Button onClick={onCreate}>Cadastrar Servico</Button>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Edicao Controlada</h2>

            {!selectedService && <p className="text-muted-foreground">Selecione um servico.</p>}

            {selectedService && (
              <>
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium">Descricao</label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Preco base</label>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tempo de servico (min)</label>
                    <Input value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Features (separadas por virgula)</label>
                  <Input
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Motivo da alteracao</label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ex: ajuste de escopo e entrega"
                    className="mt-1"
                  />
                </div>

                {!canEdit && (
                  <p className="text-sm text-amber-500">
                    Seu perfil nao possui permissao para editar este servico.
                  </p>
                )}

                <div className="flex gap-3 flex-wrap">
                  <Button onClick={onSave} disabled={!canEdit || !reason.trim()}>
                    Salvar Alteracoes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onPublish}
                    disabled={!canPublish || !reason.trim()}
                  >
                    Publicar Servico
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CatalogManagementPage;

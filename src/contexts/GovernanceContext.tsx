import React, { createContext, useContext, useMemo, useState } from "react";
import type {
  BrandedInvoice,
  GovernanceAuditEntry,
  JSONValue,
  PolicyAction,
  PriceChangeRequest,
  RecurringPlan,
  RetentionCampaign,
  Service,
  StaffPermission,
  User,
} from "@/types";

interface GovernanceState {
  catalog: Service[];
  invoices: BrandedInvoice[];
  permissions: StaffPermission[];
  priceRequests: PriceChangeRequest[];
  auditEntries: GovernanceAuditEntry[];
  recurringPlans: RecurringPlan[];
  retentionCampaigns: RetentionCampaign[];
}

interface GovernanceContextType extends GovernanceState {
  canPerform: (user: User | null, action: PolicyAction, serviceCategory?: Service["category"]) => boolean;
  createCatalogService: (
    actor: User,
    payload: Pick<Service, "name" | "description" | "category" | "price" | "duration" | "features">,
    reason: string
  ) => void;
  updateCatalogService: (
    actor: User,
    serviceId: string,
    updates: Partial<Pick<Service, "name" | "description" | "features" | "price" | "duration">>,
    reason: string
  ) => void;
  publishCatalogService: (actor: User, serviceId: string, reason: string) => void;
  requestPriceChange: (actor: User, serviceId: string, newPrice: number, reason: string) => void;
  reviewPriceChange: (
    actor: User,
    requestId: string,
    decision: "approved" | "rejected",
    reason: string
  ) => void;
  issueInvoice: (
    actor: User,
    payload: {
      serviceId: string;
      customerName: string;
      customerEmail: string;
      type: "proforma" | "real";
      amount?: number;
      currency?: BrandedInvoice["currency"];
      dueDate?: Date;
      notes?: string;
    }
  ) => void;
  rollbackAuditEntry: (actor: User, auditEntryId: string, reason: string) => void;
}

const STORAGE_KEY = "sc_governance_state_v1";

const id = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const now = () => new Date();

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const toJsonRecord = (value: unknown): Record<string, JSONValue> => {
  return clone(value) as Record<string, JSONValue>;
};

const roleActionMap: Record<User["role"], PolicyAction[]> = {
  admin: [
    "services.read",
    "services.edit",
    "services.publish",
    "pricing.read",
    "pricing.request",
    "pricing.approve",
    "pricing.rollback",
    "audit.read",
    "retention.manage",
  ],
  manager: [
    "services.read",
    "services.edit",
    "services.publish",
    "pricing.read",
    "pricing.request",
    "audit.read",
    "retention.manage",
  ],
  technician: ["services.read", "services.edit", "pricing.read", "pricing.request"],
  client: ["services.read", "pricing.read"],
  partner: ["services.read", "pricing.read"],
  investor: ["services.read", "pricing.read"],
};

const seedCatalog: Service[] = [
  {
    id: "svc_seed_repair",
    name: "Reparo Empresarial Premium",
    description: "Diagnostico completo e reparo para parque de maquinas corporativo.",
    category: "repair",
    price: 450,
    duration: 180,
    features: ["SLA de 8h", "Relatorio tecnico", "Garantia de 60 dias"],
    isActive: true,
    billingSupports: { proforma: true, realInvoice: true },
    adminPublishedBy: "seed_admin",
    adminPublishedAt: now(),
  },
  {
    id: "svc_seed_support",
    name: "Suporte Proativo 24x7",
    description: "Monitoramento continuo com resposta prioritaria para incidentes.",
    category: "support",
    price: 1200,
    duration: 1440,
    features: ["Canal dedicado", "Monitoramento continuo", "Escalonamento rapido"],
    isActive: true,
    billingSupports: { proforma: true, realInvoice: true },
    adminPublishedBy: "seed_admin",
    adminPublishedAt: now(),
  },
  {
    id: "svc_seed_marketing",
    name: "Growth Digital Assistido",
    description: "Servico de marketing orientado por dados para crescimento recorrente.",
    category: "marketing",
    price: 980,
    duration: 720,
    features: ["Plano mensal", "Relatorio de performance", "Otimizacao semanal"],
    isActive: true,
    billingSupports: { proforma: true, realInvoice: true },
    adminPublishedBy: "seed_admin",
    adminPublishedAt: now(),
  },
];

const seedState: GovernanceState = {
  catalog: seedCatalog,
  invoices: [],
  permissions: [],
  priceRequests: [],
  auditEntries: [],
  recurringPlans: [
    {
      id: "plan_monthly_support",
      title: "Plano Recorrente de Suporte",
      serviceIds: ["svc_seed_support"],
      billingCycle: "monthly",
      price: 1200,
      active: true,
      updatedAt: now(),
    },
  ],
  retentionCampaigns: [
    {
      id: "camp_welcome_clients",
      title: "Onboarding de Novos Clientes",
      trigger: "churn_risk",
      audienceSegment: "new_clients",
      channel: "in_app",
      message: "Ative seu plano recorrente e ganhe prioridade no atendimento.",
      active: true,
      createdAt: now(),
    },
  ],
};

const hydrate = (raw: GovernanceState): GovernanceState => ({
  ...raw,
  permissions: raw.permissions.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  })),
  invoices: raw.invoices.map((item) => ({
    ...item,
    issueDate: new Date(item.issueDate),
    dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
  })),
  priceRequests: raw.priceRequests.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    reviewedAt: item.reviewedAt ? new Date(item.reviewedAt) : undefined,
  })),
  auditEntries: raw.auditEntries.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  })),
  recurringPlans: raw.recurringPlans.map((item) => ({
    ...item,
    updatedAt: new Date(item.updatedAt),
  })),
  retentionCampaigns: raw.retentionCampaigns.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  })),
});

const loadState = (): GovernanceState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedState;

  try {
    return hydrate(JSON.parse(raw) as GovernanceState);
  } catch {
    return seedState;
  }
};

const GovernanceContext = createContext<GovernanceContextType | undefined>(undefined);

export const GovernanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GovernanceState>(loadState);

  const save = (updater: (prev: GovernanceState) => GovernanceState) => {
    setState((prev) => {
      const next = updater(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const canPerform: GovernanceContextType["canPerform"] = (user, action, serviceCategory) => {
    if (!user) return false;

    const rolePermissions = roleActionMap[user.role] || [];
    if (!rolePermissions.includes(action)) return false;

    const explicitPermission = state.permissions.find((permission) => permission.userId === user.id);
    if (!explicitPermission) return true;

    const actionAllowed = explicitPermission.allowedActions.includes(action);
    if (!actionAllowed) return false;

    if (!serviceCategory) return true;
    return explicitPermission.managedCategories.includes(serviceCategory);
  };

  const addAudit = (
    prev: GovernanceState,
    actor: User,
    payload: Omit<GovernanceAuditEntry, "id" | "actorUserId" | "actorRole" | "createdAt">
  ): GovernanceState => ({
    ...prev,
    auditEntries: [
      {
        id: id("audit"),
        actorUserId: actor.id,
        actorRole: actor.role,
        createdAt: now(),
        ...payload,
      },
      ...prev.auditEntries,
    ],
  });

  const ensureReason = (reason: string) => reason.trim() || "Atualizacao operacional";

  const createCatalogService: GovernanceContextType["createCatalogService"] = (actor, payload, reason) => {
    if (!canPerform(actor, "services.edit", payload.category)) return;

    save((prev) => {
      const service: Service = {
        id: id("svc"),
        ...payload,
        isActive: false,
        billingSupports: { proforma: true, realInvoice: true },
      };

      const next = {
        ...prev,
        catalog: [service, ...prev.catalog],
      };

      return addAudit(next, actor, {
        entityType: "service",
        entityId: service.id,
        action: "create",
        reason: ensureReason(reason),
        snapshot: {
          before: {},
          after: toJsonRecord(service),
        },
      });
    });
  };

  const updateCatalogService: GovernanceContextType["updateCatalogService"] = (
    actor,
    serviceId,
    updates,
    reason
  ) => {
    if (!canPerform(actor, "services.edit")) return;

    save((prev) => {
      const current = prev.catalog.find((service) => service.id === serviceId);
      if (!current) return prev;

      const nextService: Service = {
        ...current,
        ...updates,
      };

      const next = {
        ...prev,
        catalog: prev.catalog.map((service) => (service.id === serviceId ? nextService : service)),
      };

      return addAudit(next, actor, {
        entityType: "service",
        entityId: serviceId,
        action: "update",
        reason: ensureReason(reason),
        snapshot: {
          before: toJsonRecord(current),
          after: toJsonRecord(nextService),
        },
      });
    });
  };

  const publishCatalogService: GovernanceContextType["publishCatalogService"] = (actor, serviceId, reason) => {
    if (!canPerform(actor, "services.publish")) return;

    save((prev) => {
      const current = prev.catalog.find((service) => service.id === serviceId);
      if (!current) return prev;

      const nextService: Service = {
        ...current,
        isActive: true,
        adminPublishedBy: actor.id,
        adminPublishedAt: now(),
      };

      const next = {
        ...prev,
        catalog: prev.catalog.map((service) => (service.id === serviceId ? nextService : service)),
      };

      return addAudit(next, actor, {
        entityType: "service",
        entityId: serviceId,
        action: "publish",
        reason: ensureReason(reason),
        snapshot: {
          before: toJsonRecord(current),
          after: toJsonRecord(nextService),
        },
      });
    });
  };

  const issueInvoice: GovernanceContextType["issueInvoice"] = (actor, payload) => {
    if (!canPerform(actor, "pricing.read")) return;

    save((prev) => {
      const service = prev.catalog.find((item) => item.id === payload.serviceId);
      if (!service) return prev;

      const amount = payload.amount ?? service.price;
      const currency = payload.currency ?? "AOA";
      const prefix = payload.type === "proforma" ? "PF" : "INV";

      const invoice: BrandedInvoice = {
        id: id("inv_doc"),
        type: payload.type,
        serviceId: service.id,
        serviceName: service.name,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        issuerName: "SoftConection",
        issuerTaxId: "SOFTCONECTION-TAX",
        amount,
        currency,
        serviceMinutes: service.duration,
        status: "issued",
        documentNumber: `${prefix}-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
        issueDate: now(),
        dueDate: payload.dueDate,
        notes: payload.notes,
      };

      const next = {
        ...prev,
        invoices: [invoice, ...prev.invoices],
      };

      return addAudit(next, actor, {
        entityType: "pricing",
        entityId: invoice.id,
        action: "create",
        reason: `Emissao de fatura ${payload.type}`,
        snapshot: {
          before: {},
          after: toJsonRecord(invoice),
        },
      });
    });
  };

  const requestPriceChange: GovernanceContextType["requestPriceChange"] = (
    actor,
    serviceId,
    newPrice,
    reason
  ) => {
    if (!canPerform(actor, "pricing.request")) return;

    save((prev) => {
      const targetService = prev.catalog.find((service) => service.id === serviceId);
      if (!targetService) return prev;

      const request: PriceChangeRequest = {
        id: id("price_req"),
        serviceId,
        requestedBy: actor.id,
        reason: ensureReason(reason),
        oldPrice: targetService.price,
        newPrice,
        status: "pending",
        createdAt: now(),
      };

      const next = {
        ...prev,
        priceRequests: [request, ...prev.priceRequests],
      };

      return addAudit(next, actor, {
        entityType: "pricing",
        entityId: request.id,
        action: "create",
        reason: request.reason,
        snapshot: {
          before: { oldPrice: request.oldPrice },
          after: { newPrice: request.newPrice },
        },
      });
    });
  };

  const reviewPriceChange: GovernanceContextType["reviewPriceChange"] = (
    actor,
    requestId,
    decision,
    reason
  ) => {
    if (!canPerform(actor, "pricing.approve")) return;

    save((prev) => {
      const request = prev.priceRequests.find((item) => item.id === requestId);
      if (!request || request.status !== "pending") return prev;

      const reviewedRequest: PriceChangeRequest = {
        ...request,
        status: decision,
        reviewedBy: actor.id,
        reviewedAt: now(),
      };

      const nextRequests = prev.priceRequests.map((item) =>
        item.id === requestId ? reviewedRequest : item
      );

      let nextCatalog = prev.catalog;
      let nextPlans = prev.recurringPlans;
      let nextCampaigns = prev.retentionCampaigns;

      if (decision === "approved") {
        nextCatalog = prev.catalog.map((service) =>
          service.id === request.serviceId ? { ...service, price: request.newPrice } : service
        );

        nextPlans = prev.recurringPlans.map((plan) =>
          plan.serviceIds.includes(request.serviceId)
            ? { ...plan, price: request.newPrice, updatedAt: now() }
            : plan
        );

        const campaign: RetentionCampaign = {
          id: id("camp_price"),
          title: "Comunicacao de reajuste de preco",
          trigger: "price_changed",
          audienceSegment: "active_clients",
          channel: "email",
          message: "Atualizamos valores com novos beneficios. Mantenha seu plano recorrente com condicoes especiais.",
          relatedEntityId: request.serviceId,
          active: true,
          createdAt: now(),
        };

        nextCampaigns = [campaign, ...prev.retentionCampaigns];
      }

      const next = {
        ...prev,
        priceRequests: nextRequests,
        catalog: nextCatalog,
        recurringPlans: nextPlans,
        retentionCampaigns: nextCampaigns,
      };

      return addAudit(next, actor, {
        entityType: "pricing",
        entityId: request.id,
        action: decision === "approved" ? "approve" : "reject",
        reason: ensureReason(reason),
        snapshot: {
          before: {
            serviceId: request.serviceId,
            oldPrice: request.oldPrice,
            requestStatus: request.status,
          },
          after: {
            newPrice: request.newPrice,
            requestStatus: reviewedRequest.status,
          },
        },
      });
    });
  };

  const rollbackAuditEntry: GovernanceContextType["rollbackAuditEntry"] = (actor, auditEntryId, reason) => {
    if (!canPerform(actor, "pricing.rollback")) return;

    save((prev) => {
      const targetEntry = prev.auditEntries.find((entry) => entry.id === auditEntryId);
      if (!targetEntry) return prev;

      if (targetEntry.entityType === "service") {
        const restored = targetEntry.snapshot.before as Partial<Service>;
        const nextCatalog = prev.catalog.map((service) =>
          service.id === targetEntry.entityId ? { ...service, ...restored } : service
        );

        return addAudit(
          { ...prev, catalog: nextCatalog },
          actor,
          {
            entityType: "service",
            entityId: targetEntry.entityId,
            action: "rollback",
            reason: ensureReason(reason),
            snapshot: {
              before: targetEntry.snapshot.after,
              after: targetEntry.snapshot.before,
            },
          }
        );
      }

      if (targetEntry.entityType === "pricing") {
        const beforePrice = Number(targetEntry.snapshot.before.oldPrice);
        if (Number.isNaN(beforePrice)) return prev;

        const serviceId =
          typeof targetEntry.snapshot.before.serviceId === "string"
            ? String(targetEntry.snapshot.before.serviceId)
            : undefined;

        if (!serviceId) return prev;

        const nextCatalog = prev.catalog.map((service) =>
          service.id === serviceId ? { ...service, price: beforePrice } : service
        );

        return addAudit(
          { ...prev, catalog: nextCatalog },
          actor,
          {
            entityType: "pricing",
            entityId: serviceId,
            action: "rollback",
            reason: ensureReason(reason),
            snapshot: {
              before: targetEntry.snapshot.after,
              after: targetEntry.snapshot.before,
            },
          }
        );
      }

      return prev;
    });
  };

  const value = useMemo<GovernanceContextType>(
    () => ({
      ...state,
      canPerform,
      createCatalogService,
      updateCatalogService,
      publishCatalogService,
      requestPriceChange,
      reviewPriceChange,
      issueInvoice,
      rollbackAuditEntry,
    }),
    [state]
  );

  return <GovernanceContext.Provider value={value}>{children}</GovernanceContext.Provider>;
};

export const useGovernance = () => {
  const context = useContext(GovernanceContext);
  if (!context) {
    throw new Error("useGovernance precisa ser usado dentro de GovernanceProvider");
  }
  return context;
};

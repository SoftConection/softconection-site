import React, { createContext, useContext, useMemo, useState } from "react";

export type TicketStatus = "novo" | "em_andamento" | "concluido" | "cancelado";
export type AppointmentStatus = "agendado" | "confirmado" | "concluido" | "cancelado";
export type InvoiceStatus = "rascunho" | "emitida" | "paga" | "atrasada";
export type ContractStatus = "rascunho" | "enviado" | "assinado" | "ativo" | "encerrado";
export type PartnershipStatus = "proposta" | "negociacao" | "ativa" | "encerrada";
export type DonationStatus = "recebida" | "confirmada";
export type OpportunityStatus = "aberta" | "financiada" | "encerrada";

export interface ServiceTicket {
  id: string;
  title: string;
  serviceType: string;
  plan: string;
  clientName: string;
  budget: number;
  status: TicketStatus;
  createdAt: string;
}

export interface AppointmentBooking {
  id: string;
  subject: string;
  clientName: string;
  assignedTo: string;
  date: string;
  time: string;
  location: string;
  status: AppointmentStatus;
}

export interface InvoiceRecord {
  id: string;
  reference: string;
  customerName: string;
  amount: number;
  dueDate: string;
  issuedAt: string;
  status: InvoiceStatus;
}

export interface ContractRecord {
  id: string;
  title: string;
  counterparty: string;
  value: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
}

export interface PartnershipRecord {
  id: string;
  company: string;
  type: string;
  proposalDate: string;
  status: PartnershipStatus;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  purpose: string;
  status: DonationStatus;
  createdAt: string;
}

export interface InvestmentOpportunityRecord {
  id: string;
  title: string;
  targetAmount: number;
  raisedAmount: number;
  expectedReturn: number;
  status: OpportunityStatus;
}

export interface MarketplaceItemRecord {
  id: string;
  title: string;
  type: "software" | "app" | "servico_marketing" | "template";
  category: string;
  price: number;
  status: "ativo" | "rascunho";
}

export interface ActivityRecord {
  id: string;
  module:
    | "servicos"
    | "agendamentos"
    | "faturas"
    | "contratos"
    | "parcerias"
    | "doacoes"
    | "investidor"
    | "marketplace";
  action: string;
  description: string;
  by: string;
  timestamp: string;
}

interface PlatformState {
  tickets: ServiceTicket[];
  appointments: AppointmentBooking[];
  invoices: InvoiceRecord[];
  contracts: ContractRecord[];
  partnerships: PartnershipRecord[];
  donations: DonationRecord[];
  opportunities: InvestmentOpportunityRecord[];
  marketplaceItems: MarketplaceItemRecord[];
  activities: ActivityRecord[];
}

interface PlatformContextType extends PlatformState {
  createTicket: (payload: Omit<ServiceTicket, "id" | "status" | "createdAt">, actor: string) => void;
  updateTicketStatus: (id: string, status: TicketStatus, actor: string) => void;
  scheduleAppointment: (
    payload: Omit<AppointmentBooking, "id" | "status">,
    actor: string
  ) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, actor: string) => void;
  createInvoice: (payload: Omit<InvoiceRecord, "id" | "status" | "issuedAt">, actor: string) => void;
  markInvoiceAsPaid: (id: string, actor: string) => void;
  createContract: (payload: Omit<ContractRecord, "id" | "status">, actor: string) => void;
  updateContractStatus: (id: string, status: ContractStatus, actor: string) => void;
  createPartnership: (payload: Omit<PartnershipRecord, "id" | "status">, actor: string) => void;
  updatePartnershipStatus: (id: string, status: PartnershipStatus, actor: string) => void;
  registerDonation: (payload: Omit<DonationRecord, "id" | "status" | "createdAt">, actor: string) => void;
  createOpportunity: (
    payload: Omit<InvestmentOpportunityRecord, "id" | "status" | "raisedAmount">,
    actor: string
  ) => void;
  investInOpportunity: (id: string, amount: number, actor: string) => void;
  addMarketplaceItem: (payload: Omit<MarketplaceItemRecord, "id" | "status">, actor: string) => void;
}

const STORAGE_KEY = "sc_platform_state_v1";

const nowIso = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const seedState: PlatformState = {
  tickets: [
    {
      id: id("ticket"),
      title: "Implementacao CRM para equipe comercial",
      serviceType: "Desenvolvimento de software",
      plan: "Profissional",
      clientName: "Grupo Horizonte",
      budget: 8500,
      status: "em_andamento",
      createdAt: nowIso(),
    },
  ],
  appointments: [
    {
      id: id("appt"),
      subject: "Reuniao de descoberta",
      clientName: "Grupo Horizonte",
      assignedTo: "Equipe Comercial",
      date: new Date().toISOString().slice(0, 10),
      time: "10:00",
      location: "Online",
      status: "agendado",
    },
  ],
  invoices: [
    {
      id: id("inv"),
      reference: "INV-2026-001",
      customerName: "Grupo Horizonte",
      amount: 12500,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      issuedAt: nowIso(),
      status: "emitida",
    },
  ],
  contracts: [
    {
      id: id("ctr"),
      title: "Contrato de Desenvolvimento SaaS",
      counterparty: "Grupo Horizonte",
      value: 42000,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
      status: "enviado",
    },
  ],
  partnerships: [],
  donations: [],
  opportunities: [
    {
      id: id("opp"),
      title: "Expansao Unidade de Marketing Digital",
      targetAmount: 180000,
      raisedAmount: 45000,
      expectedReturn: 22,
      status: "aberta",
    },
  ],
  marketplaceItems: [
    {
      id: id("mkp"),
      title: "SoftCRM Pro",
      type: "software",
      category: "Vendas",
      price: 199,
      status: "ativo",
    },
  ],
  activities: [],
};

const loadState = (): PlatformState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedState;

  try {
    const parsed = JSON.parse(raw) as Partial<PlatformState>;
    return {
      tickets: Array.isArray(parsed.tickets) ? parsed.tickets : seedState.tickets,
      appointments: Array.isArray(parsed.appointments) ? parsed.appointments : seedState.appointments,
      invoices: Array.isArray(parsed.invoices) ? parsed.invoices : seedState.invoices,
      contracts: Array.isArray(parsed.contracts) ? parsed.contracts : seedState.contracts,
      partnerships: Array.isArray(parsed.partnerships) ? parsed.partnerships : seedState.partnerships,
      donations: Array.isArray(parsed.donations) ? parsed.donations : seedState.donations,
      opportunities: Array.isArray(parsed.opportunities) ? parsed.opportunities : seedState.opportunities,
      marketplaceItems: Array.isArray(parsed.marketplaceItems) ? parsed.marketplaceItems : seedState.marketplaceItems,
      activities: Array.isArray(parsed.activities) ? parsed.activities : seedState.activities,
    };
  } catch {
    return seedState;
  }
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlatformState>(loadState);

  const updateState = (updater: (prev: PlatformState) => PlatformState) => {
    setState((prev) => {
      const next = updater(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const appendActivity = (prev: PlatformState, activity: Omit<ActivityRecord, "id" | "timestamp">): PlatformState => {
    const nextActivity: ActivityRecord = {
      id: id("act"),
      timestamp: nowIso(),
      ...activity,
    };

    return {
      ...prev,
      activities: [nextActivity, ...prev.activities].slice(0, 300),
    };
  };

  const createTicket: PlatformContextType["createTicket"] = (payload, actor) => {
    updateState((prev) => {
      const ticket: ServiceTicket = {
        id: id("ticket"),
        status: "novo",
        createdAt: nowIso(),
        ...payload,
      };
      return appendActivity(
        { ...prev, tickets: [ticket, ...prev.tickets] },
        { module: "servicos", action: "criado", description: `Novo pedido: ${ticket.title}`, by: actor }
      );
    });
  };

  const updateTicketStatus: PlatformContextType["updateTicketStatus"] = (ticketId, status, actor) => {
    updateState((prev) =>
      appendActivity(
        {
          ...prev,
          tickets: prev.tickets.map((item) => (item.id === ticketId ? { ...item, status } : item)),
        },
        { module: "servicos", action: "atualizado", description: `Pedido ${ticketId} -> ${status}`, by: actor }
      )
    );
  };

  const scheduleAppointment: PlatformContextType["scheduleAppointment"] = (payload, actor) => {
    updateState((prev) => {
      const appointment: AppointmentBooking = { id: id("appt"), status: "agendado", ...payload };
      return appendActivity(
        { ...prev, appointments: [appointment, ...prev.appointments] },
        { module: "agendamentos", action: "criado", description: `Agendamento: ${appointment.subject}`, by: actor }
      );
    });
  };

  const updateAppointmentStatus: PlatformContextType["updateAppointmentStatus"] = (appointmentId, status, actor) => {
    updateState((prev) =>
      appendActivity(
        {
          ...prev,
          appointments: prev.appointments.map((item) =>
            item.id === appointmentId ? { ...item, status } : item
          ),
        },
        { module: "agendamentos", action: "atualizado", description: `Agendamento ${appointmentId} -> ${status}`, by: actor }
      )
    );
  };

  const createInvoice: PlatformContextType["createInvoice"] = (payload, actor) => {
    updateState((prev) => {
      const invoice: InvoiceRecord = {
        id: id("inv"),
        issuedAt: nowIso(),
        status: "emitida",
        ...payload,
      };
      return appendActivity(
        { ...prev, invoices: [invoice, ...prev.invoices] },
        { module: "faturas", action: "criado", description: `Fatura ${invoice.reference} emitida`, by: actor }
      );
    });
  };

  const markInvoiceAsPaid: PlatformContextType["markInvoiceAsPaid"] = (invoiceId, actor) => {
    updateState((prev) =>
      appendActivity(
        {
          ...prev,
          invoices: prev.invoices.map((item) =>
            item.id === invoiceId ? { ...item, status: "paga" } : item
          ),
        },
        { module: "faturas", action: "pago", description: `Fatura ${invoiceId} marcada como paga`, by: actor }
      )
    );
  };

  const createContract: PlatformContextType["createContract"] = (payload, actor) => {
    updateState((prev) => {
      const contract: ContractRecord = { id: id("ctr"), status: "rascunho", ...payload };
      return appendActivity(
        { ...prev, contracts: [contract, ...prev.contracts] },
        { module: "contratos", action: "criado", description: `Contrato ${contract.title} criado`, by: actor }
      );
    });
  };

  const updateContractStatus: PlatformContextType["updateContractStatus"] = (contractId, status, actor) => {
    updateState((prev) =>
      appendActivity(
        {
          ...prev,
          contracts: prev.contracts.map((item) =>
            item.id === contractId ? { ...item, status } : item
          ),
        },
        { module: "contratos", action: "atualizado", description: `Contrato ${contractId} -> ${status}`, by: actor }
      )
    );
  };

  const createPartnership: PlatformContextType["createPartnership"] = (payload, actor) => {
    updateState((prev) => {
      const partnership: PartnershipRecord = { id: id("prtn"), status: "proposta", ...payload };
      return appendActivity(
        { ...prev, partnerships: [partnership, ...prev.partnerships] },
        { module: "parcerias", action: "criado", description: `Parceria com ${partnership.company}`, by: actor }
      );
    });
  };

  const updatePartnershipStatus: PlatformContextType["updatePartnershipStatus"] = (partnershipId, status, actor) => {
    updateState((prev) =>
      appendActivity(
        {
          ...prev,
          partnerships: prev.partnerships.map((item) =>
            item.id === partnershipId ? { ...item, status } : item
          ),
        },
        { module: "parcerias", action: "atualizado", description: `Parceria ${partnershipId} -> ${status}`, by: actor }
      )
    );
  };

  const registerDonation: PlatformContextType["registerDonation"] = (payload, actor) => {
    updateState((prev) => {
      const donation: DonationRecord = {
        id: id("don"),
        status: "recebida",
        createdAt: nowIso(),
        ...payload,
      };
      return appendActivity(
        { ...prev, donations: [donation, ...prev.donations] },
        { module: "doacoes", action: "recebido", description: `Doacao de ${donation.donorName}`, by: actor }
      );
    });
  };

  const createOpportunity: PlatformContextType["createOpportunity"] = (payload, actor) => {
    updateState((prev) => {
      const opportunity: InvestmentOpportunityRecord = {
        id: id("opp"),
        status: "aberta",
        raisedAmount: 0,
        ...payload,
      };
      return appendActivity(
        { ...prev, opportunities: [opportunity, ...prev.opportunities] },
        { module: "investidor", action: "criado", description: `Nova oportunidade: ${opportunity.title}`, by: actor }
      );
    });
  };

  const investInOpportunity: PlatformContextType["investInOpportunity"] = (opportunityId, amount, actor) => {
    updateState((prev) => {
      const opportunities = prev.opportunities.map((item) => {
        if (item.id !== opportunityId) return item;

        const nextRaised = item.raisedAmount + amount;
        return {
          ...item,
          raisedAmount: nextRaised,
          status: nextRaised >= item.targetAmount ? "financiada" : item.status,
        };
      });

      return appendActivity(
        { ...prev, opportunities },
        { module: "investidor", action: "investido", description: `Investimento de ${amount} na oportunidade ${opportunityId}`, by: actor }
      );
    });
  };

  const addMarketplaceItem: PlatformContextType["addMarketplaceItem"] = (payload, actor) => {
    updateState((prev) => {
      const item: MarketplaceItemRecord = { id: id("mkp"), status: "ativo", ...payload };
      return appendActivity(
        { ...prev, marketplaceItems: [item, ...prev.marketplaceItems] },
        { module: "marketplace", action: "publicado", description: `Item publicado: ${item.title}`, by: actor }
      );
    });
  };

  const value = useMemo<PlatformContextType>(
    () => ({
      ...state,
      createTicket,
      updateTicketStatus,
      scheduleAppointment,
      updateAppointmentStatus,
      createInvoice,
      markInvoiceAsPaid,
      createContract,
      updateContractStatus,
      createPartnership,
      updatePartnershipStatus,
      registerDonation,
      createOpportunity,
      investInOpportunity,
      addMarketplaceItem,
    }),
    [state]
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform deve ser usado dentro de PlatformProvider");
  }
  return context;
};

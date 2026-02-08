import React, { createContext, useState, ReactNode } from "react";
import { Service, ServiceRequest, Appointment, Order, Proposal } from "@/types";

interface DataContextType {
  services: Service[];
  serviceRequests: ServiceRequest[];
  appointments: Appointment[];
  orders: Order[];
  proposals: Proposal[];

  addServiceRequest: (request: ServiceRequest) => void;
  updateServiceRequest: (id: string, updates: Partial<ServiceRequest>) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, updates: Partial<Proposal>) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const MOCK_SERVICES: Service[] = [
  {
    id: "svc_1",
    name: "Reparo de Computador",
    description: "Diagnóstico e reparo completo de computadores",
    category: "repair",
    price: 150,
    duration: 120,
    features: ["Diagnóstico grátis", "Garantia de 30 dias", "Serviço rápido"],
    isActive: true,
  },
  {
    id: "svc_2",
    name: "Desenvolvimento Web",
    description: "Criação de websites profissionais e responsivos",
    category: "software",
    price: 3000,
    duration: 1440,
    features: ["Design moderno", "SEO otimizado", "Responsivo"],
    isActive: true,
  },
  {
    id: "svc_3",
    name: "Consultoria TI",
    description: "Consultoria especializada em infraestrutura de TI",
    category: "consulting",
    price: 200,
    duration: 60,
    features: ["Análise personalizada", "Recomendações", "Suporte pós-consultoria"],
    isActive: true,
  },
  {
    id: "svc_4",
    name: "Manutenção de Sistemas",
    description: "Manutenção preventiva e corretiva de sistemas",
    category: "maintenance",
    price: 500,
    duration: 480,
    features: ["Monitoramento 24/7", "Backups automáticos", "Suporte técnico"],
    isActive: true,
  },
  {
    id: "svc_5",
    name: "Suporte Remoto",
    description: "Suporte técnico remoto via TeamViewer",
    category: "support",
    price: 80,
    duration: 60,
    features: ["Resposta rápida", "Suporte contínuo", "Registro de sessão"],
    isActive: true,
  },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services] = useState<Service[]>(MOCK_SERVICES);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const addServiceRequest = (request: ServiceRequest) => {
    setServiceRequests((prev) => [...prev, request]);
  };

  const updateServiceRequest = (id: string, updates: Partial<ServiceRequest>) => {
    setServiceRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updates } : req))
    );
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders((prev) => prev.map((ord) => (ord.id === id ? { ...ord, ...updates } : ord)));
  };

  const addProposal = (proposal: Proposal) => {
    setProposals((prev) => [...prev, proposal]);
  };

  const updateProposal = (id: string, updates: Partial<Proposal>) => {
    setProposals((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, ...updates } : prop))
    );
  };

  const value: DataContextType = {
    services,
    serviceRequests,
    appointments,
    orders,
    proposals,
    addServiceRequest,
    updateServiceRequest,
    addAppointment,
    updateAppointment,
    addOrder,
    updateOrder,
    addProposal,
    updateProposal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

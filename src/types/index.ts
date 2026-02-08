// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "technician" | "client";
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: Date;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}

// Service Categories & Types
export type ServiceCategoryType = 
  | "repair" 
  | "software" 
  | "consulting" 
  | "maintenance" 
  | "support" 
  | "cctv" 
  | "design" 
  | "marketing";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategoryType;
  price: number;
  duration: number; // in minutes
  icon?: string;
  image?: string;
  features: string[];
  isActive: boolean;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  serviceId: string;
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
  description: string;
  priority: "low" | "medium" | "high";
  estimatedDate?: Date;
  completionDate?: Date;
  notes?: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Appointment Types
export interface Appointment {
  id: string;
  clientId: string;
  technicianId?: string;
  serviceId: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  technicianId?: string;
}

// Order Types
export interface Order {
  id: string;
  clientId: string;
  items: OrderItem[];
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  subtotal: number;
  tax: number;
  discount?: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  serviceId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Proposal Types
export interface Proposal {
  id: string;
  clientId: string;
  title: string;
  description: string;
  items: ProposalItem[];
  totalAmount: number;
  validUntil: Date;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  notes?: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
}

export interface ProposalItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Analytics Types
export interface Analytics {
  totalServices: number;
  completedServices: number;
  pendingServices: number;
  totalRevenue: number;
  totalClients: number;
  avgRating: number;
  monthlyRevenue: RevenueData[];
}

export interface RevenueData {
  month: string;
  revenue: number;
}

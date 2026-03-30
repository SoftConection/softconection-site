/**
 * Tipos completos para a plataforma SoftConection v2
 * Estruturada para suportar múltiplos roles e funcionalidades enterprise
 */

// ═══════════════════════════════════════════════════════════════════
// 🔐 AUTHENTICATION & AUTHORIZATION
// ═══════════════════════════════════════════════════════════════════

export type UserRole =
  | 'admin'
  | 'manager'
  | 'technician'
  | 'provider'
  | 'client'
  | 'investor'
  | 'partner'
  | 'moderator';

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export type JSONArray = JSONValue[];

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  bio: string;
  avatar: string;
  roles: UserRole[];
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderProfile extends User {
  specializations: string[];
  rating: number;
  totalReviews: number;
  totalOrders: number;
  responseTime: number; // em minutos
  verified: boolean;
  bankAccount?: {
    accountName: string;
    accountNumber: string;
    bankCode: string;
  };
}

export interface ClientProfile extends User {
  preferredServices: string[];
  defaultBillingAddress: Address;
  totalSpent: number;
  favoriteProviders: string[];
}

export interface InvestorProfile extends User {
  companyName: string;
  investmentCapital: number;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  investments: string[]; // IDs de investments
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface OAuthUserData {
  id: string;
  name: string;
  email: string;
  picture?: string;
  verified?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// 📦 SERVICES & CATEGORIES
// ═══════════════════════════════════════════════════════════════════

export type ServiceCategory =
  | 'repair'
  | 'software'
  | 'consulting'
  | 'maintenance'
  | 'support'
  | 'cctv'
  | 'design'
  | 'marketing'
  | 'development'
  | 'training'
  | 'other';

export interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  estimatedDuration: number; // em horas
  images: string[];
  availability: TimeSlot[];
  maxClientsPerSlot: number;
  tags: string[];
  minRating?: number;
  reviews: Review[];
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  dayOfWeek: number; // 0-6 (Dom-Sab)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable: boolean;
}

export interface Review {
  id: string;
  userId: string;
  entityId: string;
  entityType: 'service' | 'provider' | 'marketplace_item';
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 📋 ORDERS & SERVICE REQUESTS
// ═══════════════════════════════════════════════════════════════════

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'rejected'
  | 'disputed';

export interface ServiceOrder {
  id: string;
  clientId: string;
  serviceId: string;
  providerId: string;
  status: OrderStatus;
  title: string;
  description: string;
  scheduledAt: Date | null;
  completedAt: Date | null;
  amount: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments: string[];
  deliverables: Deliverable[];
  activityLog: ActivityLog[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  deliveredAt: Date;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
}

// ═══════════════════════════════════════════════════════════════════
// 📅 APPOINTMENTS & SCHEDULING
// ═══════════════════════════════════════════════════════════════════

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

export interface Appointment {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  location: string | 'online';
  meetingUrl?: string;
  status: AppointmentStatus;
  notes: string;
  reminders: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  recordingUrl?: string; // para session online gravada
  createdAt: Date;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 💰 INVOICES & PAYMENTS
// ═══════════════════════════════════════════════════════════════════

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'digital_wallet' | 'check';

export interface Invoice {
  id: string;
  orderId?: string;
  appointmentId?: string;
  issuerId: string; // provider ou admin
  recipientId: string; // client ou provider
  invoiceNumber: string; // formato: INV-2026-001
  amount: number;
  currency: string; // "EUR", "USD", etc
  tax: number;
  taxPercentage: number;
  total: number;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  items: LineItem[];
  notes: string;
  attachments: string[];
  paymentMethod?: PaymentMethod;
  paymentDate?: Date;
  paymentReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  payerId: string;
  payeeId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 📄 CONTRACTS & AGREEMENTS
// ═══════════════════════════════════════════════════════════════════

export type ContractStatus = 'draft' | 'sent' | 'signed' | 'active' | 'expired' | 'terminated';

export interface Contract {
  id: string;
  clientId: string;
  providerId: string;
  title: string;
  content: string; // markdown ou html
  template?: string; // template ID se for baseado em template
  status: ContractStatus;
  createdAt: Date;
  signedAt: Date | null;
  expiresAt: Date | null;
  terminatedAt: Date | null;
  digitalSignatures: DigitalSignature[];
  versions: ContractVersion[];
  attachments: string[];
  tags: string[];
}

export interface DigitalSignature {
  id: string;
  userId: string;
  signedAt: Date;
  signatureUrl: string;
  ipAddress: string;
  userAgent: string;
}

export interface ContractVersion {
  id: string;
  contractId: string;
  version: number;
  content: string;
  createdAt: Date;
  createdBy: string;
}

// ═══════════════════════════════════════════════════════════════════
// 📝 PROPOSALS
// ═══════════════════════════════════════════════════════════════════

export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined' | 'expired';

export interface Proposal {
  id: string;
  providerId: string;
  clientId: string;
  orderId?: string;
  title: string;
  description: string;
  amount: number;
  timeline: number; // em dias
  items: ProposalItem[];
  status: ProposalStatus;
  validUntil: Date;
  attachments: string[];
  createdAt: Date;
  respondedAt: Date | null;
  updatedAt: Date;
}

export interface ProposalItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// ═══════════════════════════════════════════════════════════════════
// 🎯 ACTIVITY LOG & AUDITING
// ═══════════════════════════════════════════════════════════════════

export type ActivityAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'viewed'
  | 'downloaded'
  | 'shared'
  | 'signed'
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'paid'
  | 'failed';

export interface ActivityLog {
  id: string;
  userId: string;
  entityType: 'order' | 'appointment' | 'invoice' | 'contract' | 'proposal' | 'user' | 'payment';
  entityId: string;
  action: ActivityAction;
  description: string;
  metadata: Record<string, JSONValue>;
  changes?: {
    before: Record<string, JSONValue>;
    after: Record<string, JSONValue>;
  };
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 🏪 MARKETPLACE
// ═══════════════════════════════════════════════════════════════════

export type LicenseType = 'perpetual' | 'subscription' | 'freemium' | 'trial';
export type MarketplaceItemType = 'software' | 'app' | 'template' | 'plugin' | 'service';

export interface MarketplaceItem {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  type: MarketplaceItemType;
  category: string;
  price: number;
  licenseType: LicenseType;
  images: string[];
  documentation: string;
  repositoryUrl?: string;
  demoUrl?: string;
  supportEmail: string;
  rating: number;
  reviews: Review[];
  downloads: number;
  status: 'published' | 'draft' | 'removed' | 'suspended';
  tags: string[];
  requirements?: string; // Sistema operativo, etc
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplacePurchase {
  id: string;
  buyerId: string;
  itemId: string;
  vendorId: string;
  amount: number;
  licenseKey?: string;
  expiresAt?: Date;
  status: 'completed' | 'refunded' | 'expired';
  invoiceId: string;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 💡 INVESTMENT & PARTNERSHIPS
// ═══════════════════════════════════════════════════════════════════

export type OpportunityStatus = 'open' | 'closed' | 'funded' | 'archived';

export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  fundingTarget: number;
  fundingRaised: number;
  minimumInvestment: number;
  expectedReturn: number; // percentual
  timeline: number; // em meses
  riskLevel: 'low' | 'medium' | 'high';
  attachments: string[];
  status: OpportunityStatus;
  createdAt: Date;
  closesAt: Date;
}

export interface Investment {
  id: string;
  investorId: string;
  opportunityId: string;
  amount: number;
  createdAt: Date;
  expectedReturnDate: Date;
  status: 'active' | 'returned' | 'cancelled';
  documents: string[];
}

export interface Partnership {
  id: string;
  partnerId: string;
  company: string;
  type: 'technology' | 'commercial' | 'reseller' | 'affiliate' | 'strategic';
  startDate: Date;
  endDate?: Date;
  terms: string;
  contractId?: string;
  status: 'active' | 'inactive' | 'terminated';
}

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  currency: string;
  purpose: string;
  recipientId?: string; // se for para um projeto específico
  status: 'received' | 'acknowledged' | 'reported';
  receiptUrl?: string;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 📊 ANALYTICS & DASHBOARD
// ═══════════════════════════════════════════════════════════════════

export interface ProviderAnalytics {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  responseTime: number;
  rating: number;
  clientRetention: number; // percentual
  topServices: string[];
}

export interface ClientAnalytics {
  totalOrders: number;
  totalSpent: number;
  favoriteProviders: string[];
  averageRating: number;
  ordersPerMonth: Record<string, number>;
}

export interface SystemAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  churnRate: number;
}

// ═══════════════════════════════════════════════════════════════════
// 🔧 MISCELLANEOUS
// ═══════════════════════════════════════════════════════════════════

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'appointment' | 'invoice' | 'message' | 'system';
  title: string;
  message: string;
  actionUrl?: string;
  read: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  conversationId: string;
  content: string;
  attachments: string[];
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  updatedAt: Date;
}

export interface SystemSetting {
  key: string;
  value: JSONValue;
  type: 'string' | 'number' | 'boolean' | 'json';
  description: string;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// 🎯 CONTEXT & GLOBAL STATE
// ═══════════════════════════════════════════════════════════════════

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: string | OAuthUserData, password?: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  company: string;
  role: UserRole;
  agreeToTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// 🛡️ STAFF PERMISSIONS, PRICING GOVERNANCE & RETENTION
// ═══════════════════════════════════════════════════════════════════

export type PolicyAction =
  | 'services.read'
  | 'services.edit'
  | 'services.publish'
  | 'pricing.read'
  | 'pricing.request'
  | 'pricing.approve'
  | 'pricing.rollback'
  | 'audit.read'
  | 'retention.manage';

export interface StaffPermission {
  id: string;
  userId: string;
  role: UserRole;
  allowedActions: PolicyAction[];
  managedCategories: ServiceCategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceChangeRequest {
  id: string;
  serviceId: string;
  requestedBy: string;
  reviewedBy?: string;
  reason: string;
  oldPrice: number;
  newPrice: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
}

export interface ChangeSnapshot {
  before: Record<string, JSONValue>;
  after: Record<string, JSONValue>;
}

export interface GovernanceAuditEntry {
  id: string;
  actorUserId: string;
  actorRole: UserRole;
  entityType: 'service' | 'pricing' | 'retention_campaign' | 'recurring_plan';
  entityId: string;
  action: 'create' | 'update' | 'approve' | 'reject' | 'rollback' | 'publish';
  reason: string;
  snapshot: ChangeSnapshot;
  createdAt: Date;
}

export interface RecurringPlan {
  id: string;
  title: string;
  serviceIds: string[];
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  active: boolean;
  updatedAt: Date;
}

export interface RetentionCampaign {
  id: string;
  title: string;
  trigger: 'price_changed' | 'service_updated' | 'churn_risk';
  audienceSegment: 'new_clients' | 'active_clients' | 'inactive_clients' | 'all';
  channel: 'email' | 'in_app' | 'whatsapp';
  message: string;
  relatedEntityId?: string;
  active: boolean;
  createdAt: Date;
}

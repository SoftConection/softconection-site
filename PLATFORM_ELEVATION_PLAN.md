# Plano de Elevação da Plataforma SoftConection

> **Data:** 16 de março de 2026  
> **Versão:** 1.0  
> **Objetivo:** Transformar SoftConection numa plataforma enterprise multi-stakeholder, premium e fully-functional

---

## 🎯 Visão de Longo Prazo

SoftConection evoluirá de um website corporativo para uma **plataforma colaborativa** onde:

- **Clientes** podem solicitar serviços, processar agendar consultas e acompanhar projetos
- **Prestadores** gerenciam agenda, propostas, contratos e faturas
- **Administradores** controlam toda a operação, financeiro, investimentos
- **Investidores** veem oportunidades e retorno sobre investimento
- **Fornecedores** comercializam softwares, apps e serviços especializados

---

## 🏗️ Arquitetura Proposta

```
┌─────────────────────────────────────────────────────────────────┐
│                   SOFTCONECTION PLATFORM v2                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [FRONTEND - React 18 + TypeScript + Vite]                     │
│  ├── Landing Page (público)                                     │
│  ├── Auth Hub (login/register/oauth)                           │
│  └── Dashboard Multi-Role                                       │
│      ├── Client Dashboard (pedidos, agendamentos)              │
│      ├── Provider Dashboard (calendário, propostas, faturas)   │
│      ├── Admin Dashboard (analytics, gestão global)            │
│      ├── Investor Portal (opportunities, ROI tracking)         │
│      └── Marketplace (softwares, serviços, apps)              │
│                                                                 │
│  [BACKEND API - Node.js/Express ou Supabase]                  │
│  ├── Authentication & Authorization (JWT/OAuth)               │
│  ├── Service Management (CRUD serviços)                        │
│  ├── Order Management (pedidos, status, tracking)             │
│  ├── Scheduling System (calendário, disponibilidade)          │
│  ├── Billing Engine (faturas, pagamentos, recibos)            │
│  ├── Contract Management (assinatura digital, versionamento)  │
│  ├── Activity Audit Log (registo completo de ações)           │
│  ├── Marketplace Engine (vitrinas, vendas, comissões)         │
│  ├── Partnership & Donation Module                             │
│  └── Investment Tracking & Analytics                           │
│                                                                 │
│  [DATABASE]                                                     │
│  ├── Users & Roles                                             │
│  ├── Services & Categories                                     │
│  ├── Orders & Appointments                                     │
│  ├── Invoices & Payments                                       │
│  ├── Contracts & Agreements                                    │
│  ├── Marketplace Items                                         │
│  ├── Activity Logs                                             │
│  ├── Investment Records                                        │
│  └── Donation/Partnership Tracking                             │
│                                                                 │
│  [EXTERNAL SERVICES]                                            │
│  ├── Payment Gateway (Stripe/Paypal)                           │
│  ├── Email Service (SendGrid/Resend)                           │
│  ├── File Storage (AWS S3/Cloudinary)                          │
│  ├── Digital Signature (DocuSign/Adobe Sign)                   │
│  └── Analytics (Segment/Mixpanel)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 Sistema de Roles & Permissions

### 1. **ADMIN** (Super Admin)
- Acesso completo a todas as funcionalidades
- Gerir utilizadores, roles, permissões
- Ver analytics e relatórios
- Gerir faturas e pagamentos
- Criar e moderar conteúdo

### 2. **PROVIDER** (Prestador de Serviços)
- Criar e gerir serviços próprios
- Visualizar e responder a pedidos
- Gerir agendamento pessoal
- Enviar propostas
- Gerar próprias faturas
- Rastreamento de pagamentos

### 3. **CLIENT** (Cliente)
- Visualizar catálogo de serviços
- Solicitar serviços (criar pedidos)
- Agendar consultas
- Rastreamento de pedidos em tempo real
- Histórico de transações
- Acesso a contratos e documentos

### 4. **INVESTOR** (Investidor)
- Acesso a oportunidades de investimento
- Dashboards de ROI
- Documentação financeira
- Relatórios trimestrais/anuais
- Chat com administração

### 5. **PARTNER** (Parceiro Comercial)
- Listar softwares/apps/serviços no marketplace
- Relatórios de vendas
- Gestão de comissões
- Analytics de performance

### 6. **MODERATOR** (Moderador de Conteúdo)
- Revisar e aprovar conteúdo publicado
- Gerir denúncias e problemas
- Moderar comunidade

---

## 📊 Modelos de Dados Principais

### User (com Role Extension)
```ts
interface User {
  id: uuid
  email: string
  name: string
  avatar: string
  phone: string
  company: string
  bio: string
  roles: Role[] // ["client"] ou ["provider"] ou ["admin"]
  verifiedEmail: boolean
  verifiedPhone: boolean
  status: "active" | "inactive" | "suspended"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Service
```ts
interface Service {
  id: uuid
  providerId: uuid
  title: string
  description: string
  category: string
  basePrice: decimal
  estimatedDuration: number // em horas
  images: string[]
  availability: TimeSlot[]
  maxClientsPerSlot: number
  tags: string[]
  minRating: number
  reviews: Review[]
  status: "active" | "inactive" | "suspended"
}
```

### Order (Pedido de Serviço)
```ts
interface ServiceOrder {
  id: uuid
  clientId: uuid
  serviceId: uuid
  providerId: uuid
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled"
  scheduledAt: timestamp
  completedAt: timestamp
  amount: decimal
  description: string
  attachments: string[]
  deliverables: Deliverable[]
  activityLog: ActivityLog[]
}
```

### Invoice (Fatura)
```ts
interface Invoice {
  id: uuid
  orderId: uuid
  recipientId: uuid
  amount: decimal
  tax: decimal
  total: decimal
  status: "draft" | "sent" | "viewed" | "paid" | "overdue"
  issueDate: date
  dueDate: date
  items: LineItem[]
  notes: string
  attachments: string[]
  paymentMethod: "credit_card" | "bank_transfer" | "other"
}
```

### Appointment (Agendamento)
```ts
interface Appointment {
  id: uuid
  clientId: uuid
  providerId: uuid
  serviceId: uuid
  startTime: timestamp
  endTime: timestamp
  location: string | "online"
  meetingUrl: string // para sessões online
  status: "scheduled" | "confirmed" | "cancelled" | "completed"
  notes: string
  reminders: boolean
}
```

### Contract (Contrato)
```ts
interface Contract {
  id: uuid
  clientId: uuid
  providerId: uuid
  title: string
  content: string // markdown ou html
  status: "draft" | "sent" | "signed" | "active" | "expired"
  createdAt: timestamp
  signedAt: timestamp
  expiresAt: timestamp
  digitalSignatures: Signature[]
  attachments: string[]
}
```

### ActivityLog (Registro de Atividades)
```ts
interface ActivityLog {
  id: uuid
  userId: uuid
  entityType: string // "order", "appointment", "invoice", etc
  entityId: uuid
  action: string
  description: string
  metadata: object
  timestamp: timestamp
  ipAddress: string
}
```

### MarketplaceItem (Software/App/Serviço)
```ts
interface MarketplaceItem {
  id: uuid
  vendorId: uuid
  title: string
  description: string
  category: string
  price: decimal
  licenseType: "perpetual" | "subscription" | "freemium"
  images: string[]
  documentation: string
  supportEmail: string
  rating: number
  reviews: Review[]
  downloads: number
  status: "published" | "draft" | "removed"
}
```

### Investment Opportunity
```ts
interface InvestmentOpportunity {
  id: uuid
  title: string
  description: string
  fundingTarget: decimal
  fundingRaised: decimal
  minimumInvestment: decimal
  expectedReturn: number // percentual
  timeline: number // em meses
  documentationUrl: string
  status: "open" | "closed" | "funded"
}
```

---

## 🛣️ Mapa de Rotas Completo

### Públicas
```
/                           → Landing Page (Hero + Serviços + Sobre)
/services                   → Catálogo de serviços
/services/:id              → Detalhe do serviço
/pricing                    → Tabela de preços
/about                      → Sobre a SoftConection
/contact                    → Formulário de contato
/blog                       → Blog de artigos
/faq                        → Perguntas frequentes
/marketplace               → Marketplace de softwares/apps
/marketplace/:id           → Detalhe do produto
/partnerships              → Oportunidades de parceria
/investments               → Oportunidades de investimento
/donate                     → Portal de doações
```

### Autenticação
```
/auth/login                 → Login
/auth/register             → Registo (cliente/prestador)
/auth/google               → Google OAuth
/auth/password-reset       → Recuperação de senha
/auth/verify-email         → Verificação de email
/auth/2fa                  → Autenticação dois fatores
```

### Cliente
```
/client/dashboard          → Dashboard principal
/client/services           → Meus serviços solicitados
/client/orders             → Meus pedidos
/client/orders/:id         → Detalhe do pedido
/client/appointments       → Meus agendamentos
/client/appointments/new   → Agendar novo
/client/invoices           → Minhas faturas
/client/contracts          → Meus contratos
/client/activity-log       → Meu registro de atividades
/client/messages           → Mensagens com prestadores
/client/settings           → Configurações da conta
/client/profile            → Editar perfil
```

### Prestador
```
/provider/dashboard        → Dashboard principal
/provider/services         → Meus serviços
/provider/services/new     → Criar novo serviço
/provider/services/:id/edit → Editar serviço
/provider/orders           → Pedidos solicitados
/provider/orders/:id       → Detalhe do pedido
/provider/calendar         → Calendário de agendamentos
/provider/appointments     → Meus agendamentos
/provider/proposals        → Minhas propostas
/provider/proposals/new    → Criar nova proposta
/provider/invoices         → Minhas faturas
/provider/invoices/new     → Gerar fatura
/provider/contracts        → Meus contratos
/provider/payments         → Histórico de pagamentos
/provider/activity-log     → Meu registro de atividades
/provider/analytics        → Análise de performance
/provider/messages         → Mensagens com clientes
/provider/settings         → Configurações
```

### Admin
```
/admin/dashboard           → Dashboard analytics geral
/admin/users               → Gestão de utilizadores
/admin/users/:id          → Detalhe do utilizador
/admin/services            → Gestão de serviços
/admin/orders              → Todos os pedidos
/admin/invoices            → Todas as faturas
/admin/contracts           → Todos os contratos
/admin/marketplace         → Gestão de marketplace
/admin/investments         → Gestão de investimentos
/admin/donations           → Gestão de doações
/admin/activity-logs       → Logs de atividades do sistema
/admin/reports             → Relatórios
/admin/settings            → Configurações do sistema
/admin/users/:id/roles     → Gerir roles do utilizador
```

### Investor
```
/investor/dashboard        → Dashboard de investimentos
/investor/opportunities    → Oportunidades disponíveis
/investor/opportunities/:id → Detalhe da oportunidade
/investor/portfolio        → Meu portfólio
/investor/returns          → Retorno sobre investimento
/investor/documents        → Documentação financeira
/investor/messages         → Chat com administração
```

### Partner/Marketplace
```
/partner/dashboard         → Dashboard do parceiro
/partner/products          → Meus produtos no marketplace
/partner/products/new      → Publicar novo produto
/partner/products/:id/edit → Editar produto
/partner/sales             → Histórico de vendas
/partner/earnings          → Ganhos e comissões
/partner/analytics         → Performance dos produtos
```

---

## 🎨 Componentes Premium que Precisam Refactor

### Layout Base
- [ ] `Header` - Logo grande (120px+), nav limpa, indicador de status
- [ ] `Sidebar` - Navegação contextual por role
- [ ] `Footer` - Links úteis, redes sociais, info legal
- [ ] `DashboardLayout` - Layout com sidebar + content

### Componentes Funcionais
- [ ] `ServiceCard` - Card premium com imagens, ratings, preço
- [ ] `OrderCard` - Card com status, timeline, ações
- [ ] `AppointmentCard` - Card com calendário, confirmação
- [ ] `InvoiceCard` - Card com preview de fatura, status pagamento
- [ ] `ContractCard` - Card com assinatura digital status
- [ ] `UserCard` - Perfil com badge de role/rating
- [ ] `MarketplaceProductCard` - Card de software/app

### Formulários
- [ ] `ServiceRequestForm` - Criar pedido de serviço
- [ ] `AppointmentForm` - Agendar com calendário integrado
- [ ] `InvoiceForm` - Gerar fatura
- [ ] `ContractForm` - Editor de contrato
- [ ] `ProfileForm` - Editar perfil completo

### Data Tables
- [ ] `OrdersTable` - Tabela com filtros, sorting, paginação
- [ ] `AppointmentsTable` - Com visualização em calendário
- [ ] `InvoicesTable` - Com status visual, ações rápidas
- [ ] `ActivityLogTable` - Com busca e filtros

### Modais & Dialogs
- [ ] `ConfirmActionModal` - Confirmação de ações
- [ ] `PaymentModal` - Integração com gateway
- [ ] `FileUploadModal` - Upload de documentos
- [ ] `ContractSigningModal` - Assinatura digital
- [ ] `MessageModal` - Chat com outro utilizador

---

## 🚀 Roadmap de Implementação

### **Fase 1: Fundações** (1-2 semanas)
1. ✅ ~~Refactor tipos de dados~~ → Criar modelos completos
2. ✅ ~~Definir roles e permissões~~ → Sistema granular
3. Refactor componentes base (Header, Sidebar, Dashboard Layout)
4. Melhorar autenticação com role-based redirects
5. Nova navegação por role

### **Fase 2: Core Funcionalidade** (2-3 semanas)
1. Sistema de pedidos de serviço (criar, visualizar, atualizar, cancelar)
2. Calendário e agendamentos (integração com disponibilidade)
3. Sistema de propostas (criar, enviar, aceitar)
4. Dashboard de provider com analytics

### **Fase 3: Financeiro** (1-2 semanas)
1. Sistema de faturas (criar, enviar, rastreamento)
2. Integração com gateway de pagamento
3. Histórico de transações
4. Recibos e documentação

### **Fase 4: Documentos & Contratos** (1 semana)
1. Editor de contratos
2. Assinatura digital
3. Histórico de versões
4. Download em PDF

### **Fase 5: Marketplace & Expansão** (2 semanas)
1. Seção de softwares/apps para venda
2. Sistema de comentários e ratings
3. Analytics para vendedores
4. Gestão de comissões

### **Fase 6: Investimento & Parcerias** (1 semana)
1. Portal de investimento
2. Rastreamento de oportunidades
3. Documentação financeira
4. Doações

### **Fase 7: Polish & Premium** (1-2 semanas)
1. Animações e micro-interações
2. Temas dark/light refinados
3. Responsividade perfeita
4. Performance optimization
5. Testes e QA

---

## 🎬 Background Tecnológico & Logo

### Logo
- Aumentar para **120-150px** em header
- Adicionar animação subtle (glow dos orbes)
- Versão light/dark auto-detectada

### Background Animado
```
Elementos:
├── Gradient base: navy-black → purple hints
├── Mesh gradients animadas (3-4 orbes)
├── Padrão geométrico (grid soft, hexágonos)
├── Partículas conectadas (efeito rede neural)
├── Código simulado em background (opacity baixa)
└── Animações:
    ├── Orbes flutuam suavemente
    ├── Partículas conectam/desconectam
    ├── Efeito de "scroll parallax"
    └── Transições suaves entre páginas
```

---

## 📋 Checklist de Implementação

### Estrutura de Dados
- [ ] Migrations de database para todos os modelos
- [ ] Seeders com dados de exemplo
- [ ] Índices de performance

### Frontend
- [ ] Componentes atomizados (Atom, Molecule, Organism)
- [ ] Sistema de design consistente
- [ ] TypeScript strict em 100%
- [ ] Testes unitários críticos
- [ ] Acessibilidade (WCAG 2.1 AA)

### Backend
- [ ] Autenticação JWT com refresh tokens
- [ ] Rate limiting
- [ ] Validação de input rigorosa
- [ ] Logging e monitoring
- [ ] Backup automático

### DevOps
- [ ] CI/CD pipeline
- [ ] Staging environment
- [ ] SSL/TLS automático
- [ ] CDN para assets
- [ ] Monitoramento de performance

---

## 📈 Métricas de Sucesso

| Métrica | Meta |
|---------|------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Page Load Time | < 2s |
| Time to Interactive | < 3s |
| Test Coverage | ≥ 80% |
| TypeScript Coverage | 100% |
| Uptime | 99.9% |
| Mobile Score | ≥ 95 |

---

## 🔄 Próximas Ações

1. **Hoje**: Criar estrutura de tipos completa
2. **Amanhã**: Refactor componentes base
3. **Esta semana**: Implementar pedidos de serviço
4. **Próxima semana**: Dashboard por role + agendamentos

---

*Documento vivente | Última atualização: 16/03/2026*

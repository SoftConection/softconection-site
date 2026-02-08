# 📊 Arquitetura Visual - Sistema de Serviços

## Tree de Estrutura de Componentes

```
SoftConection Platform
│
├─── 🏠 Landing Page (/)
│    ├─ Navigation
│    │  ├─ Logo (clicável)
│    │  └─ Auth Buttons
│    │
│    ├─ Hero Section
│    │  ├─ Título + Descrição
│    │  ├─ 2 CTAs (Começar / Explorar)
│    │  └─ Stats (500+ clientes, 10+ anos, 24/7)
│    │
│    ├─ 8 Category Cards
│    │  ├─ 🔧 Reparação
│    │  ├─ 💻 Software
│    │  ├─ 📋 Consultoria
│    │  ├─ 🛠️  Manutenção
│    │  ├─ 📞 Suporte
│    │  ├─ 📹 CCTV
│    │  ├─ 🎨 Design
│    │  └─ 📱 Marketing
│    │
│    ├─ About Section
│    │  ├─ Logo destacada
│    │  ├─ Descrição empresa
│    │  └─ Features
│    │
│    ├─ Features Section
│    │  ├─ Resposta Rápida
│    │  ├─ Certificados
│    │  ├─ Garantia
│    │  └─ Preços
│    │
│    ├─ CTA Final
│    │  ├─ "Começar Agora"
│    │  └─ Telefone
│    │
│    └─ Footer
│       ├─ Links
│       ├─ Social
│       └─ Copyright
│
├─── 📑 Categorias (/services) [PROTECTED]
│    ├─ Header
│    │  ├─ Título
│    │  └─ Descrição (8 áreas, 48 serviços)
│    │
│    ├─ Search Bar (real-time)
│    │
│    ├─ 8 Category Cards (4 colunas)
│    │  ├─ Ícone emoji grande
│    │  ├─ Nome categoria
│    │  ├─ Descrição
│    │  ├─ "6 serviços disponíveis"
│    │  └─ Botão "Ver Serviços"
│    │      └─ → /services/:categoryId
│    │
│    └─ Info Cards
│       ├─ 📊 48+ Serviços
│       ├─ ⚡ Rápido & Eficiente
│       └─ ✅ Garantido
│
├─── 🎯 Serviços por Categoria (/services/:categoryId) [PROTECTED]
│    ├─ Header
│    │  ├─ ← Botão Voltar
│    │  ├─ Ícone categoria
│    │  ├─ Título categoria
│    │  └─ Descrição
│    │
│    ├─ Search Bar (filtra por nome/descrição)
│    │
│    ├─ 6 Service Cards (3 colunas)
│    │  ├─ Título serviço
│    │  ├─ Descrição breve
│    │  ├─ 3 Features com ✓
│    │  ├─ Preço em euros
│    │  ├─ Duração em horas
│    │  └─ Botão "Ver Detalhes"
│    │      └─ → MODAL
│    │
│    ├─ MODAL (Dialog)
│    │  ├─ Título completo
│    │  ├─ Descrição completa
│    │  ├─ Preço destacado (grande)
│    │  ├─ Duração (hours)
│    │  ├─ "O que está incluído:"
│    │  │  ├─ Feature 1 com • verde
│    │  │  ├─ Feature 2 com • verde
│    │  │  └─ Feature 3 com • verde
│    │  ├─ "Benefícios adicionais"
│    │  ├─ Botão "Solicitar Serviço"
│    │  │  └─ → Toast de sucesso
│    │  └─ Botão "Fechar"
│    │
│    └─ Empty State
│       ├─ "Nenhum serviço encontrado"
│       └─ "Limpar busca"
│
└─── 🔐 Protected Routes
     ├─ /dashboard
     ├─ /appointments/calendar
     ├─ /orders
     ├─ /proposals
     └─ /settings
```

---

## Fluxograma de Dados

```
                    USER
                      |
            ┌─────────┼─────────┐
            │                   │
        Não Auth            Auth
            │                   │
            ▼                   ▼
         /Login          Landing Page
           │                   |
           │                   ├─→ Clica Logo
           │                   │    └─ Topo
           │                   │
           │                   ├─→ Clica Categoria
           │                   │    └─ /services/:categoryId
           │                   │
           │                   ├─→ Clica "Ver Serviços"
           │                   │    └─ /services
           │                   │
           └───────┬───────────┘
                   │
                   ▼
            /services (Categorias)
                   |
         ┌─────────┼─────────┐
         │                   │
       Search           Click Category
         │                   │
         ▼                   ▼
    Filtra Real-time    /services/:categoryId
                              |
                   ┌──────────┼──────────┐
                   │                    │
                 Search            Click Card
                   │                    │
                   ▼                    ▼
             Filtra Serviços         MODAL
                                         |
                                  ┌──────┼──────┐
                                  │             │
                            Solicitar       Fechar
                                  │             │
                                  ▼             ▼
                              Toast         Modal Fecha
```

---

## Estrutura de Estados (Componentes)

```
App.tsx
│
├─ AuthProvider
│  ├─ user: null | User
│  ├─ isAuthenticated: boolean
│  └─ login/logout/register: functions
│
├─ DataProvider
│  ├─ services: Service[]
│  ├─ appointments: Appointment[]
│  └─ funcs: add/update/delete
│
├─ QueryClientProvider
│
└─ Router
   ├─ Landing Page (/)
   │  └─ state: none (stateless)
   │
   ├─ ServicesPage (/services) [PROTECTED]
   │  └─ state:
   │     └─ searchTerm: string
   │
   ├─ CategoryPage (/services/:categoryId) [PROTECTED]
   │  └─ state:
   │     ├─ searchTerm: string
   │     └─ selectedService: Service | null
   │
   └─ Auth Pages
      └─ state: form data
```

---

## Estrutura de Dados - 48 Serviços

```
CATEGORIAS = {
  repair: {
    name: "Reparação",
    icon: "🔧",
    services: [
      { id, name, description, price, duration, features },
      { id, name, description, price, duration, features },
      ... (6 total)
    ]
  },
  software: { ... },
  consulting: { ... },
  maintenance: { ... },
  support: { ... },
  cctv: { ... },
  design: { ... },
  marketing: { ... }
}

Total: 8 categorias × 6 serviços = 48 serviços
```

---

## Fluxo de Componentes React

```
<App/>
│
├─ <QueryClientProvider/>
│  ├─ <AuthProvider/>
│  │  ├─ <DataProvider/>
│  │  │  ├─ <Router/>
│  │  │  │  ├─ <LandingPage/>
│  │  │  │  │  ├─ Navigation
│  │  │  │  │  ├─ Hero
│  │  │  │  │  ├─ Categories (8x)
│  │  │  │  │  ├─ About
│  │  │  │  │  ├─ Features
│  │  │  │  │  ├─ CTA
│  │  │  │  │  └─ Footer
│  │  │  │  │
│  │  │  │  ├─ <ProtectedRoute>
│  │  │  │  │  ├─ <ServicesPage/>
│  │  │  │  │  │  ├─ Header
│  │  │  │  │  │  ├─ SearchBar
│  │  │  │  │  │  ├─ CategoryCards (8x)
│  │  │  │  │  │  └─ InfoCards (3x)
│  │  │  │  │  │
│  │  │  │  │  ├─ <CategoryPage/>
│  │  │  │  │  │  ├─ Header + Breadcrumb
│  │  │  │  │  │  ├─ SearchBar
│  │  │  │  │  │  ├─ ServiceCards (6x)
│  │  │  │  │  │  ├─ Modal
│  │  │  │  │  │  │  ├─ Title
│  │  │  │  │  │  │  ├─ Details
│  │  │  │  │  │  │  ├─ Features
│  │  │  │  │  │  │  └─ Actions
│  │  │  │  │  │  └─ EmptyState
│  │  │  │  │  │
│  │  │  │  │  └─ Other Protected Pages
│  │  │  │  │
│  │  │  │  └─ Auth Pages
│  │  │  │     ├─ LoginPage
│  │  │  │     └─ RegisterPage
│  │  │  │
│  │  │  │  └─ 404 Page
│  │  │  │
│  │  │  └─ <Toaster/>
│  │  │  └─ <Sonner/>
│  │  │  └─ <TooltipProvider/>
```

---

## Fluxo de Navegação Completo

```
ENTRADA
   │
   └─→ /
       │
       ├─ [Não Auth]
       │   │
       │   ├─→ Clica Categoria
       │   │    │
       │   │    └─→ /auth/register
       │   │
       │   └─→ Clica "Começar"
       │        │
       │        └─→ /auth/register
       │
       ├─ [Auth]
       │   │
       │   ├─→ Clica Categoria
       │   │    │
       │   │    └─→ /services/:categoryId
       │   │         │
       │   │         ├─→ Busca filtra
       │   │         │
       │   │         ├─→ Clica Serviço
       │   │         │    │
       │   │         │    └─→ MODAL
       │   │         │         │
       │   │         │         ├─→ Solicitar
       │   │         │         │    │
       │   │         │         │    └─→ Toast + Fecha
       │   │         │         │
       │   │         │         └─→ Fechar
       │   │         │              │
       │   │         │              └─→ Lista
       │   │         │
       │   │         └─→ Voltar
       │   │              │
       │   │              └─→ /services
       │   │                   │
       │   │                   ├─→ Busca filtra
       │   │                   │
       │   │                   └─→ Clica Categoria
       │   │                        │
       │   │                        └─→ /services/:categoryId
       │   │
       │   ├─→ Clica "Ver Serviços"
       │   │    │
       │   │    └─→ /services
       │   │
       │   └─→ Clica Logo
       │        │
       │        └─→ Topo ↑
       │
       └─→ /auth/login
           │
           └─→ Login bem-sucedido
               │
               └─→ / (Landing)
```

---

## URLs e Rotas

```
Public Routes (sem autenticação):
├─ GET  /                    → LandingPage
├─ GET  /auth/login          → LoginPage
├─ GET  /auth/register       → RegisterPage
├─ POST /auth/login          → Authenticate
└─ POST /auth/register       → Create User

Protected Routes (requer autenticação):
├─ GET  /services            → ServicesPage
├─ GET  /services/:categoryId → CategoryPage
├─ GET  /dashboard           → DashboardPage
├─ GET  /appointments/calendar → AppointmentsPage
├─ GET  /orders              → OrdersPage
├─ GET  /proposals           → ProposalsPage
└─ GET  /settings            → SettingsPage

Fallback:
└─ GET  *                    → NotFoundPage
```

---

## Estrutura de Props e Context

```
LandingPage
├─ useAuth()
│  ├─ isAuthenticated: boolean
│  └─ user: User | null
└─ useNavigate()
   └─ navigate(path)

ServicesPage
├─ useNavigate()
│  └─ navigate(path)
├─ useData()
│  └─ services: Service[]
└─ useState()
   └─ searchTerm: string

CategoryPage
├─ useParams()
│  └─ categoryId: string
├─ useNavigate()
│  └─ navigate(path)
├─ useData()
│  ├─ addAppointment()
│  └─ services: Service[]
└─ useState()
   ├─ selectedService: Service | null
   └─ searchTerm: string

Modal (Dialog)
├─ open: boolean
├─ onOpenChange: function
└─ children: ReactNode
```

---

## Performance e Otimizações

```
Rendering:
├─ useMemo() para filtros
├─ useState() para estado local
└─ useCallback() para handlers (se necessário)

Data:
├─ 48 serviços (hardcoded)
├─ Sem API calls (por enquanto)
└─ Sem queries (TanStack Query disponível)

Components:
├─ Functional Components
├─ Reusable UI Components
├─ No unnecessary re-renders
└─ Lazy loading (se necessário)
```

---

## Segurança

```
Proteção:
├─ ProtectedRoute wrapper
├─ useAuth() para verificar
├─ Redireciona se não autenticado
└─ Role-based access (if needed)

Validação:
├─ Inputs validados
├─ TypeScript strict
└─ Type-safe

Session:
├─ localStorage
├─ Persiste entre reloads
└─ Logout limpa dados
```

---

## Arquivo: src/types/index.ts

```typescript
// Auth Types
export interface User { ... }
export interface AuthContext { ... }

// Service Types
export type ServiceCategoryType = 
  | "repair" | "software" | "consulting" | "maintenance"
  | "support" | "cctv" | "design" | "marketing"

export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
  services: Service[]
}

export interface Service {
  id: string
  name: string
  description: string
  category: ServiceCategoryType
  price: number
  duration: number
  icon?: string
  features: string[]
  isActive: boolean
}

// Appointment, Order, Proposal types...
```

---

## Espaço em Disco

```
src/pages/services/
├─ CategoryPage.tsx          480+ linhas
├─ ServicesPage.tsx          180+ linhas
└─ index.tsx                 (se existir)

src/pages/
├─ LandingPage.tsx           400+ linhas (reescrita)
└─ App.tsx                   +5 linhas (rota)

Documentação
├─ SERVICOS_REDESIGN.md      600+ linhas
├─ NAVIGATION_MAP.md         500+ linhas
├─ TESTING_GUIDE.md          400+ linhas
└─ SUMMARY.md                300+ linhas

Total: ~3000+ linhas de novo código/docs
```

---

## Checklist de Componentes

```
Landing Page (/):
├─ [✅] Navigation
├─ [✅] Hero Section
├─ [✅] 8 Categories
├─ [✅] About Section
├─ [✅] Features Section
├─ [✅] CTA Final
└─ [✅] Footer

Services Page (/services):
├─ [✅] Header
├─ [✅] Search Bar
├─ [✅] 8 Category Cards
└─ [✅] Info Cards

Category Page (/services/:categoryId):
├─ [✅] Header + Breadcrumb
├─ [✅] Search Bar
├─ [✅] 6 Service Cards
├─ [✅] Modal (Dialog)
└─ [✅] Empty State

Global:
├─ [✅] ProtectedRoute
├─ [✅] AppLayout
├─ [✅] Responsive Design
├─ [✅] Dark Mode
└─ [✅] Animations
```

---

**Arquitetura Visual Completa e Documentada! 🎉**

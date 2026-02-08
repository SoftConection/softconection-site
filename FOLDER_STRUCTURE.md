# 📂 Estrutura de Arquivos - SoftConection

## Visão Geral da Organização

```
softconection/
├── src/                              # Código-fonte
│   ├── components/                   # Componentes React
│   │   ├── layout/                   # Componentes de layout
│   │   │   ├── Sidebar.tsx          # Barra lateral com navegação
│   │   │   ├── Header.tsx           # Header com busca e tema
│   │   │   ├── MainLayout.tsx       # Wrapper de layout
│   │   │   └── index.ts             # Exportações
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx           # Componente de botão
│   │   │   ├── card.tsx             # Componente de card
│   │   │   ├── input.tsx            # Componente de input
│   │   │   ├── badge.tsx            # Componente de badge
│   │   │   ├── select.tsx           # Componente de select
│   │   │   ├── toast.tsx            # Sistema de toast
│   │   │   ├── sonner.tsx           # Sonner toasts
│   │   │   ├── separator.tsx        # Separador
│   │   │   ├── label.tsx            # Labels
│   │   │   ├── dropdown-menu.tsx    # Menu dropdown
│   │   │   ├── hover-card.tsx       # Card com hover
│   │   │   ├── popover.tsx          # Popover
│   │   │   ├── tabs.tsx             # Abas
│   │   │   ├── dialog.tsx           # Diálogos
│   │   │   └── ... (mais componentes)
│   │   ├── ProtectedRoute.tsx        # Componente de proteção
│   │   └── AppLayout.tsx             # Wrapper de app layout
│   │
│   ├── pages/                        # Páginas da aplicação
│   │   ├── auth/                     # Autenticação
│   │   │   ├── LoginPage.tsx         # Página de login
│   │   │   └── RegisterPage.tsx      # Página de registro
│   │   ├── dashboard/                # Dashboard
│   │   │   └── DashboardPage.tsx     # Dashboard principal
│   │   ├── services/                 # Serviços
│   │   │   └── ServicesPage.tsx      # Catálogo de serviços
│   │   ├── appointments/             # Agendamentos
│   │   │   └── AppointmentsPage.tsx  # Lista de agendamentos
│   │   ├── orders/                   # Pedidos
│   │   │   └── OrdersPage.tsx        # Lista de pedidos
│   │   ├── proposals/                # Propostas
│   │   │   └── ProposalsPage.tsx     # Lista de propostas
│   │   ├── settings/                 # Configurações
│   │   │   └── SettingsPage.tsx      # Página de configurações
│   │   ├── LandingPage.tsx           # Página inicial
│   │   ├── Index.tsx                 # Página de índice
│   │   └── NotFound.tsx              # Página 404
│   │
│   ├── contexts/                     # Contextos React
│   │   ├── AuthContext.tsx           # Contexto de autenticação
│   │   └── DataContext.tsx           # Contexto de dados
│   │
│   ├── types/                        # Tipos TypeScript
│   │   └── index.ts                  # Definições de tipos
│   │
│   ├── hooks/                        # Hooks customizados
│   │   ├── use-mobile.tsx            # Hook de detecção mobile
│   │   └── use-toast.ts              # Hook de toast
│   │
│   ├── lib/                          # Utilitários
│   │   └── utils.ts                  # Funções utilitárias
│   │
│   ├── assets/                       # Ativos estáticos
│   │   ├── react.svg                 # Logo React
│   │   └── ... (mais imagens)
│   │
│   ├── App.tsx                       # Componente principal
│   ├── App.css                       # Estilos da app
│   ├── index.css                     # Estilos globais
│   ├── main.tsx                      # Ponto de entrada
│   └── vite-env.d.ts                 # Tipos Vite
│
├── public/                           # Arquivos públicos
│   └── robots.txt                    # Robots.txt
│
├── dist/                             # Build output (gerado)
│
├── node_modules/                     # Dependências (gerado)
│
├── Configuration Files
│   ├── package.json                  # Dependências e scripts
│   ├── tsconfig.json                 # Config TypeScript
│   ├── tsconfig.app.json             # Config TS para app
│   ├── tsconfig.node.json            # Config TS para node
│   ├── vite.config.ts                # Config Vite
│   ├── tailwind.config.ts            # Config Tailwind
│   ├── postcss.config.js             # Config PostCSS
│   ├── eslint.config.js              # Config ESLint
│   ├── components.json               # Config shadcn/ui
│   └── .gitignore                    # Git ignore rules
│
├── Documentation
│   ├── README.md                     # README original
│   ├── QUICK_START.md                # Guia de início rápido
│   ├── PLATFORM_README.md            # Documentação plataforma
│   ├── IMPLEMENTATION_GUIDE.md       # Guia técnico
│   ├── EXECUTIVE_SUMMARY.md          # Resumo executivo
│   ├── DEPLOYMENT_GUIDE.md           # Guia de deploy
│   ├── IMPLEMENTATION_MANIFEST.md    # Manifesto detalhado
│   └── SUMMARY_PT.md                 # Resumo em português
│
├── Other Files
│   ├── bun.lockb                     # Lock file Bun
│   ├── index.html                    # HTML entry point
│   ├── vite-env.d.ts                 # Tipos Vite
│   └── .env (opcional)               # Variáveis de ambiente
```

---

## 📊 Detalhamento por Diretório

### `/src/components/`

Contém todos os componentes React organizados por tipo:

**layout/** - Componentes de layout
- Sidebar.tsx (200+ linhas) - Navegação
- Header.tsx (120+ linhas) - Header com busca
- MainLayout.tsx (30+ linhas) - Layout wrapper

**ui/** - Componentes shadcn/ui
- 30+ componentes prontos para uso
- Totalmente estilizados com Tailwind
- Customizáveis e reutilizáveis

**Componentes Customizados**
- ProtectedRoute.tsx - Proteção de rotas
- AppLayout.tsx - Wrapper completo

### `/src/pages/`

Páginas organizadas por feature:

**auth/** - Autenticação
- LoginPage.tsx - Interface de login
- RegisterPage.tsx - Interface de registro

**dashboard/** - Dashboard
- DashboardPage.tsx - Página principal com métricas

**services/** - Serviços
- ServicesPage.tsx - Catálogo de serviços

**appointments/** - Agendamentos
- AppointmentsPage.tsx - Gestão de agendamentos

**orders/** - Pedidos
- OrdersPage.tsx - Gestão de pedidos

**proposals/** - Propostas
- ProposalsPage.tsx - Gestão de propostas

**settings/** - Configurações
- SettingsPage.tsx - Página de configurações

**Root Pages**
- LandingPage.tsx - Landing page profissional
- Index.tsx - Página de índice
- NotFound.tsx - Página 404

### `/src/contexts/`

Gerenciamento de estado global:

**AuthContext.tsx**
- useAuth hook
- Autenticação global
- Persistência de sessão
- 120+ linhas

**DataContext.tsx**
- useData hook
- Dados de aplicação
- Mock data
- CRUD operations
- 180+ linhas

### `/src/types/`

Definições TypeScript completas:

**index.ts** - Contém:
- User interface
- Service interface
- Appointment interface
- Order interface
- Proposal interface
- Analytics interface
- E mais...

### `/src/lib/`

Utilidades e helpers:

**utils.ts**
- cn() function (clsx wrapper)
- Outras utilidades

### `/src/hooks/`

Hooks React customizados:

**use-mobile.tsx** - Detecção de mobile
**use-toast.ts** - Hook de toast

### `/src/assets/`

Ativos estáticos:

- Imagens
- SVGs
- Ícones

### `/public/`

Arquivos servidos como static:

- robots.txt
- Favicon (preparado)

---

## 🔧 Arquivos de Configuração

### Build & Runtime
- **package.json** - 84 linhas
  - Scripts: dev, build, lint, preview
  - Dependências principais
  - DevDependencies

- **vite.config.ts** - 20+ linhas
  - Aliases (@)
  - Plugins React
  - Server config

- **tsconfig.json** - Config TS global
- **tsconfig.app.json** - Config app específico
- **tsconfig.node.json** - Config node específico

### Styling
- **tailwind.config.ts** - 112+ linhas
  - Colors customizadas
  - Fonts
  - Breakpoints

- **postcss.config.js** - Config PostCSS
- **index.css** - Estilos globais (200+ linhas)
  - CSS variables
  - @layer directives
  - Custom classes

### Code Quality
- **eslint.config.js** - Regras ESLint
  - TypeScript support
  - React hooks

### Components Setup
- **components.json** - Config shadcn/ui
  - Aliases
  - Globals CSS

---

## 📝 Documentação

| Arquivo | Linhas | Conteúdo |
|---------|--------|----------|
| QUICK_START.md | ~200 | Início rápido |
| PLATFORM_README.md | ~300 | Visão geral |
| IMPLEMENTATION_GUIDE.md | ~400 | Guia técnico |
| EXECUTIVE_SUMMARY.md | ~350 | Resumo executivo |
| DEPLOYMENT_GUIDE.md | ~300 | Deploy |
| IMPLEMENTATION_MANIFEST.md | ~400 | Manifesto |
| SUMMARY_PT.md | ~350 | Resumo português |

**Total Documentação: ~2000 linhas**

---

## 📊 Estatísticas de Código

### Linhas por Componente

| Componente | Linhas |
|-----------|--------|
| Sidebar.tsx | 200+ |
| DashboardPage.tsx | 250+ |
| LandingPage.tsx | 400+ |
| ServicesPage.tsx | 180+ |
| AppointmentsPage.tsx | 200+ |
| OrdersPage.tsx | 200+ |
| ProposalsPage.tsx | 280+ |
| LoginPage.tsx | 150+ |
| RegisterPage.tsx | 200+ |
| SettingsPage.tsx | 200+ |

### Linhas por Tipo

| Tipo | Linhas |
|------|--------|
| Páginas | 1800+ |
| Componentes Layout | 350+ |
| Contextos | 300+ |
| Tipos | 180+ |
| Utilitários | 100+ |
| **Total Código** | **2730+** |

---

## 🔍 Tipos Implementados

Em `src/types/index.ts`:

```typescript
// User
interface User
interface AuthContext
interface RegisterData

// Services
interface Service
interface ServiceRequest
interface TimeSlot

// Appointments
interface Appointment

// Orders
interface Order
interface OrderItem
interface Address

// Proposals
interface Proposal
interface ProposalItem

// Analytics
interface Analytics
interface RevenueData
```

**Total: 20+ tipos definidos**

---

## 🚀 Pontos de Entrada

### Development
```
npm run dev
→ localhost:8080
→ src/main.tsx
→ src/App.tsx
```

### Production
```
npm run build
→ dist/
→ dist/index.html
```

---

## 📦 Dependências Principais

### React Ecosystem
- react@18.3.1
- react-dom@18.3.1
- react-router-dom@6.30.1
- react-hook-form@7.61.1

### UI/Styling
- tailwindcss@3.4.17
- lucide-react@0.462.0
- shadcn/ui (30+ componentes)

### State/Data
- @tanstack/react-query@5.83.0

### Utilities
- date-fns@3.6.0
- zod@3.25.76
- clsx@2.1.1
- next-themes@0.3.0

### Tools
- vite@5.4.19
- typescript@5.8.3
- eslint@9.32.0
- postcss@8.5.6

---

## 🎯 Estrutura Conceitual

```
┌─────────────────────────────────────────┐
│         SoftConection Platform          │
├─────────────────────────────────────────┤
│                                         │
│  Landing Page (LandingPage.tsx)        │
│      ↓                                  │
│  Auth (Login/Register)                 │
│      ↓                                  │
│  Protected Routes                      │
│  ├── Dashboard                         │
│  ├── Services                          │
│  ├── Appointments                      │
│  ├── Orders                            │
│  ├── Proposals                         │
│  └── Settings                          │
│      ↓                                  │
│  Global State (Contexts)               │
│  ├── AuthContext                       │
│  └── DataContext                       │
│      ↓                                  │
│  Components (Layout + UI)              │
│  ├── Sidebar                           │
│  ├── Header                            │
│  └── 50+ UI Components                │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔐 Segurança da Estrutura

- Tipos TypeScript em cada arquivo
- Componentes isolados e reutilizáveis
- Contextos centralizados
- Separação de responsabilidades
- Fácil de manter e expandir

---

## 📈 Escalabilidade

A estrutura permite fácil adição de:

- Novas páginas → `src/pages/`
- Novos componentes → `src/components/`
- Novos tipos → `src/types/index.ts`
- Novos hooks → `src/hooks/`
- Novos contextos → `src/contexts/`

---

## 🎓 Convenções Usadas

### Arquivos
- Componentes: PascalCase.tsx
- Hooks: use-kebab-case.ts
- Páginas: NamePage.tsx
- Utilitários: kebab-case.ts

### Componentes
- Sempre exportados como named exports
- Tipos bem definidos
- Props interface para cada componente

### Cores/Temas
- CSS variables em index.css
- Tailwind config com valores customizados
- Dark mode como padrão

---

## 🚀 Como Navegar

### Para Adicionar Página
1. Crie arquivo em `src/pages/`
2. Importe em App.tsx
3. Adicione rota

### Para Adicionar Componente
1. Crie em `src/components/`
2. Exporte do index.ts
3. Use onde necessário

### Para Adicionar Tipo
1. Adicione em `src/types/index.ts`
2. Importe onde necessário
3. Use para type safety

---

## 💾 Backup e Controle de Versão

```
Importante manter:
- src/ (código-fonte)
- public/ (estáticos)
- Arquivos de config
- Documentação
```

---

**Estrutura Completa e Bem Organizada! ✅**

*Pronta para desenvolvimento contínuo e escalável*

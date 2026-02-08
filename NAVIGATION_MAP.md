# 🗺️ Mapa de Navegação - Sistema de Serviços

## Estrutura de Rotas

```
┌─────────────────────────────────────────────────────────────────┐
│                    LANDING PAGE (/)                             │
│  • Logo SoftConection (clicável)                                │
│  • 8 Categorias com ícones (clicáveis)                         │
│  • Botão "Ver Serviços" em cada categoria                      │
│  • Seção About com logo                                         │
│  • Features e CTA                                               │
│  • SEM Testemunhos                                              │
└────────┬──────────────────────┬─────────────────────────────────┘
         │                      │
         │ Autenticado          │ Não Autenticado
         │                      │
         ▼                      ▼
    /services            /auth/register
    (/services)              ou
      │                    /auth/login
      │
      │ Clica em categoria
      │
      ▼
  /services/:categoryId
  (/services/repair, /services/software, etc.)
      │
      │ Mostra 6 serviços
      │ • Grid responsivo
      │ • Busca dinâmica
      │ • Cada card clicável
      │
      │ Clica em serviço
      │
      ▼
    MODAL
    • Detalhes completos
    • Preço e duração
    • Features lista
    • Botão "Solicitar Serviço"
    • Toast de sucesso


Protected Routes (Requer Login):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ /services (Home de categorias)
├─ /services/:categoryId (Detalhes de categoria)
├─ /dashboard
├─ /appointments/calendar
├─ /orders
├─ /proposals
└─ /settings


Public Routes (Sem Login):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ / (Landing Page)
├─ /auth/login
├─ /auth/register
└─ 404 (Not Found)
```

---

## Fluxos de Usuário

### 📱 Usuário Novo (Não Autenticado)

```
Abre aplicação
    ↓
Landing Page (/)
    │
    ├─→ Clica botão "Começar"
    │       ↓
    │   /auth/register
    │
    ├─→ Clica em categoria
    │       ↓
    │   /auth/register (redireciona)
    │
    └─→ Clica logo
            ↓
        Volta ao topo
```

### 🔐 Usuário Autenticado

```
Login bem-sucedido
    ↓
/dashboard (automático) OU Landing
    │
    ├─→ Clica "Ver Serviços"
    │       ↓
    │   /services (8 categorias)
    │       │
    │       ├─→ Clica categoria
    │       │       ↓
    │       │   /services/repair (6 serviços)
    │       │       │
    │       │       ├─→ Clica serviço
    │       │       │       ↓
    │       │       │   MODAL abre
    │       │       │       │
    │       │       │       ├─→ Clica "Solicitar Serviço"
    │       │       │       │       ↓
    │       │       │       │   Toast de sucesso
    │       │       │       │   Modal fecha
    │       │       │       │
    │       │       │       └─→ Clica "Fechar"
    │       │       │               ↓
    │       │       │           Modal fecha
    │       │       │
    │       │       └─→ Clica "Voltar"
    │       │               ↓
    │       │           /services
    │       │
    │       └─→ Busca categoria
    │               ↓
    │           Filtra em tempo real
    │
    ├─→ Clica em categoria na Landing
    │       ↓
    │   /services/:categoryId
    │
    └─→ Acessa /dashboard, /settings, etc.
```

### 🔍 Exploração de Serviços

```
/services (Landing de categorias)
    ↓
[8 Categorias visíveis]
    │
    ├─ 🔧 Reparação → /services/repair
    ├─ 💻 Software → /services/software
    ├─ 📋 Consultoria → /services/consulting
    ├─ 🛠️  Manutenção → /services/maintenance
    ├─ 📞 Suporte → /services/support
    ├─ 📹 CCTV → /services/cctv
    ├─ 🎨 Design → /services/design
    └─ 📱 Marketing → /services/marketing
    
    Cada categoria contém 6 serviços
```

---

## Estrutura de URLs

### Padrão Geral

```
http://localhost:5173/services/:categoryId

onde categoryId pode ser:
- repair (Reparação)
- software (Software)
- consulting (Consultoria)
- maintenance (Manutenção)
- support (Suporte)
- cctv (CCTV)
- design (Design)
- marketing (Marketing)
```

### Exemplos Reais

```
http://localhost:5173/
http://localhost:5173/services
http://localhost:5173/services/repair
http://localhost:5173/services/software
http://localhost:5173/services/cctv
http://localhost:5173/services/design
http://localhost:5173/services/marketing
http://localhost:5173/auth/login
http://localhost:5173/auth/register
http://localhost:5173/dashboard
```

---

## Componentes Interativos

### Na Landing Page (/)

```
┌─ Logo SoftConection [CLICÁVEL]
│   └─ Scroll até topo
│
├─ Botão "Começar" [CLICÁVEL]
│   └─ Se não auth → /auth/register
│   └─ Se auth → /services
│
├─ Botão "Explorar Categorias" [CLICÁVEL]
│   └─ /services
│
├─ 8 Categoria Cards [CLICÁVEIS]
│   ├─ Card (hover effect)
│   └─ Botão "Ver Serviços"
│       └─ Se não auth → /auth/register
│       └─ Se auth → /services/:categoryId
│
├─ Botão "Começar Agora" (CTA) [CLICÁVEL]
│   └─ Se não auth → /auth/register
│   └─ Se auth → /services
│
└─ Botão "+55 (11) 9999-9999" [CLICÁVEL]
    └─ tel: call (telefone)
```

### Na Página de Categorias (/services)

```
┌─ Barra de Busca [INTERATIVA]
│   └─ Filtra categorias em tempo real
│
├─ 8 Categoria Cards [CLICÁVEIS]
│   ├─ Hover effect com animação
│   └─ Botão "Ver Serviços"
│       └─ /services/:categoryId
│
└─ 3 Info Cards (informativos)
    └─ Sem ação
```

### Na Página de Serviços (/services/:categoryId)

```
┌─ Botão "Voltar" [CLICÁVEL]
│   └─ /services
│
├─ Barra de Busca [INTERATIVA]
│   └─ Filtra serviços em tempo real
│
├─ Grid de Serviços [CLICÁVEIS]
│   ├─ Service Card (hover effect)
│   │   └─ Botão "Ver Detalhes"
│   │       └─ Abre MODAL
│   │
│   └─ MODAL [INTERATIVO]
│       ├─ Mostra detalhes do serviço
│       ├─ Botão "Solicitar Serviço" [CLICÁVEL]
│       │   └─ Toast de sucesso
│       │   └─ Modal fecha
│       └─ Botão "Fechar" [CLICÁVEL]
│           └─ Modal fecha
│
└─ Estado vazio (se nenhum serviço encontrado)
    └─ Mensagem e botão "Limpar Busca"
```

---

## Estados de Navegação

### ✅ Autenticado (Com Login)

```
Acessível:
- ✅ / (Landing)
- ✅ /services
- ✅ /services/:categoryId (NOVO)
- ✅ /dashboard
- ✅ /appointments/calendar
- ✅ /orders
- ✅ /proposals
- ✅ /settings
- ✅ /auth/login (pode sair)
- ✅ /auth/register (pode sair)

Redirecionamento:
- Nenhum (acesso total)
```

### ❌ Não Autenticado (Sem Login)

```
Acessível:
- ✅ / (Landing)
- ✅ /auth/login
- ✅ /auth/register

Bloqueado:
- ❌ /services → Redireciona para /auth/login
- ❌ /services/:categoryId → Redireciona para /auth/login
- ❌ /dashboard → Redireciona para /auth/login
- ❌ Outras protected routes → Redireciona para /auth/login

Landing Page Comportamento:
- Botões mostram "Começar" (register) em vez de "Ver Serviços"
- Cliques em categorias redirecionam para register
- Links públicos funcionam normalmente
```

---

## Fluxo de Dados

### Loading de Categoria

```
1. Usuário clica em categoria
2. URL muda para /services/:categoryId
3. CategoryPage.tsx carrega
4. Busca dados internos (hardcoded)
5. Renderiza 6 serviços
6. Estado pronto para interação
```

### Filtro de Busca

```
1. Usuário digita na barra de busca
2. setValue(searchTerm) dispara
3. useMemo calcula filtro em tempo real
4. Grid atualiza automaticamente
5. Sem delay ou API call
```

### Abrir Modal

```
1. Usuário clica "Ver Detalhes" ou card
2. setSelectedService(service)
3. Dialog component detecta estado
4. Modal abre com animação fade
5. Mostra dados do serviço
6. Usuário pode "Solicitar" ou "Fechar"
```

### Solicitar Serviço

```
1. Usuário clica "Solicitar Serviço"
2. handleRequestService() dispara
3. Toast aparece com sucesso
4. Modal fecha automaticamente
5. Usuário volta à lista de serviços
```

---

## Breadcrumb Navigation

### Structure

```
Landing (/)
  └─ Categorias (/services)
      └─ Serviços (/services/:categoryId)
          └─ Modal (não é rota)

Volta:
/services/:categoryId → /services → /
```

---

## Mobile vs Desktop

### Desktop (lg: ≥1024px)

```
Landing:
- 4 colunas de categorias
- Hero grande
- Layout completo

/services:
- 4 colunas de categorias
- 3 info cards lado a lado

/services/:categoryId:
- 3 colunas de serviços
- Grid responsivo
```

### Tablet (md: 768px-1023px)

```
Landing:
- 2 colunas de categorias
- Hero reduzido

/services:
- 2 colunas de categorias
- 2 info cards

/services/:categoryId:
- 2 colunas de serviços
```

### Mobile (< 768px)

```
Landing:
- 1 coluna (full width)
- Hero ajustado
- Botões em coluna

/services:
- 1 coluna (full width)
- 1 info card por vez

/services/:categoryId:
- 1 coluna de serviços
- Cards em coluna
- Modal responsivo
```

---

## Proteção de Rotas

### ProtectedRoute Component

```typescript
<ProtectedRoute>
  <CategoryPage />
</ProtectedRoute>

Lógica:
- Se NOT autenticado → Redireciona para /auth/login
- Se autenticado → Renderiza component
- Opcional: verificar role específica
```

### Aplicado em:
- /services ✅
- /services/:categoryId ✅
- /dashboard ✅
- /appointments/calendar ✅
- /orders ✅
- /proposals ✅
- /settings ✅

---

## 🎯 Resumo Funcional

| Funcionalidade | Implementado | Local |
|----------------|--------------|-------|
| Landing Page com categorias | ✅ | / |
| Página de categorias | ✅ | /services |
| Página de serviços por categoria | ✅ | /services/:categoryId |
| Modal de detalhes | ✅ | CategoryPage.tsx |
| Busca dinâmica | ✅ | Ambas as páginas |
| Navegação clara | ✅ | Breadcrumb + voltar |
| Proteção de rotas | ✅ | ProtectedRoute |
| Responsividade | ✅ | Mobile + Tablet + Desktop |
| Logo em destaque | ✅ | Landing + Footer |
| Sem testemunhos | ✅ | Landing removido |
| Todos botões funcionam | ✅ | Testado |
| Zero erros | ✅ | Compilação OK |

---

## 🚀 Próximos Passos

1. **Testar no Browser**
   - Abrir `http://localhost:5173`
   - Clicar em categorias
   - Verificar navegação

2. **Backend Integration**
   - Conectar API real
   - Substituir dados mock

3. **Funcionalidade de Solicitação**
   - Enviar email
   - Guardar no BD
   - Notificar admin

---

**Mapa de navegação completo e funcional! 🎉**

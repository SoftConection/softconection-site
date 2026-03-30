# Plano de Refatoração — SoftConection Website

> **Baseline:** 16 de março de 2026  
> **Branch:** `main`  
> **Estado pós-sessão anterior:** lint 0 erros, build ✓, servidor dev funcional.

---

## Visão Geral

Este documento organiza o trabalho técnico remanescente em sprints sequenciais, da maior urgência (segurança/funcionalidade) à menor (qualidade/manutenção). Cada sprint tem pré-requisitos, entregas e critérios de aceitação definidos.

---

## Sprint 0 — Concluído ✅

**Duração real:** ~1 sessão de trabalho  
**Objetivo:** Tornar o projeto compilável, executável e estruturalmente seguro.

| Tarefa | Resultado |
|---|---|
| Corrigir `vite.config.ts` (`componentTagger` sem import) | ✅ Dev server funcional |
| Remover blocos `CÓDIGO FUTURO` malformados (3 ficheiros) | ✅ 0 erros de parsing |
| Sanitizar sidebar (6 rotas inexistentes) | ✅ Navegação sem 404 |
| Registar rota `/auth/google` em `App.tsx` | ✅ |
| Remover Google Client ID hardcoded do código-fonte | ✅ Movido para `VITE_GOOGLE_CLIENT_ID` |
| Eliminar armazenamento de JWT bruto em localStorage | ✅ |
| Tipificar callbacks OAuth (`CredentialResponse`) | ✅ `src/lib/googleAuth.ts` criado |
| Validar dados lidos do localStorage (`parseStoredUser`) | ✅ |
| Substituir `require()` por ESM em `tailwind.config.ts` | ✅ |
| Corrigir `tsconfig.node.json` (`ES2023` → `ES2022`) | ✅ |
| Adicionar `aria-label` a botões só com ícone | ✅ |
| Criar `.env.example` com variáveis documentadas | ✅ |

**Validação:** `npm run lint` → 0 erros · `npm run build` → ✓

---

## Sprint 1 — Consolidação de Tipos e Autenticação Real

**Estimativa:** 3–5 dias  
**Pré-requisito:** Sprint 0 concluído.  
**Responsável sugerido:** 1 developer backend + 1 frontend.

### Objetivo
Eliminar a autenticação simulada em localStorage e unificar o modelo de utilizador.

### Tarefas

#### 1.1 — Unificar modelo de utilizador (1 dia)

`src/types/index.ts` e `src/types/user.ts` coexistem com campos sobrepostos:

| Campo em `index.ts` | Equivalente em `user.ts` |
|---|---|
| `role: "provider" \| "client" \| "admin"` | `accountType: "prestador" \| "cliente" \| "admin"` |
| `name: string` | `name: string` |
| `subscription?: string` | `— (ausente)` |

**Acção:** Fundir os dois ficheiros num único `src/types/user.ts` com um tipo `UserRole` canónico (em inglês, para consistência de código). Substituir todas as referências em `AuthContext`, `ProtectedRoute`, `UserStorageService`, `Sidebar`.

```ts
// src/types/user.ts — após unificação
export type UserRole = "provider" | "client" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  subscription?: string;
}
```

#### 1.2 — Activar `strict: true` no TypeScript (1–2 dias)

**Ficheiros afectados:** Estimar com `tsc --strict --noEmit 2>&1 | grep "error TS"`.  
**Estratégia:** Activar `strict` e corrigir erros por ficheiro, começando pelos contextos (`AuthContext`, `DataContext`), depois páginas, depois componentes.

Adicionar a `tsconfig.app.json`:
```json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true
```

#### 1.3 — Integração de backend real (2–3 dias)

A autenticação usa localStorage como base de dados. Opções recomendadas:

**Opção A — Supabase** (baixo custo operacional, Auth incluído):
```
npm install @supabase/supabase-js
```
- `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` em `.env`
- Substituir `AuthContext` para usar `supabase.auth.signIn` / `onAuthStateChange`
- Google OAuth passa a ser gerido pelo Supabase (elimina `@react-oauth/google`)

**Opção B — API REST própria:**
- Criar `src/services/authService.ts` com `login(email, password)` → `Promise<User>`
- JWT armazenado em `httpOnly cookie` (nunca em localStorage)
- `AuthContext` passa a chamar o serviço e manter estado em memória

**Critério de aceitação:** Nenhum dado de sessão persistido em localStorage sem cifra ou expiração.

#### 1.4 — Restaurar regra `no-unused-vars` no ESLint

Em `eslint.config.js`, adicionar:
```js
"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
```

---

## Sprint 2 — Implementação das Páginas Funcionais

**Estimativa:** 1 semana  
**Pré-requisito:** Sprint 1 concluído (modelo de utilizador unificado).

### Objetivo
Implementar as páginas que actualmente mostram apenas `<ComingSoon />`.

### Tarefas

#### 2.1 — Activar React Query para dados (1 dia)

`@tanstack/react-query` está instalado mas não é utilizado. `DataContext` fornece dados mockados em memória.

**Acção:**
- Criar `src/lib/queryClient.ts` com configuração de `QueryClient`
- Substituir chamadas em `DataContext` por `useQuery` / `useMutation`
- Remover `DataContext` quando não existirem mais consumidores directos

```ts
// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});
```

#### 2.2 — Página de Serviços (`ServicesPage`) (2 dias)

O código original estava num bloco `CÓDIGO FUTURO` removido na Sprint 0. A lógica de referência existe em `LandingPage.tsx` (secção de serviços).

**Entregas:**
- Listagem de categorias com filtro por tipo
- Modal/drawer de detalhe de serviço
- CTA para agendar (liga ao agendamento — Sprint 2.3)
- Rota: `/services` já registada

#### 2.3 — Página de Agendamentos (`AppointmentsPage`) (2 dias)

Actualmente `<ComingSoon />`. A lógica de referência estava no bloco removido.

**Entregas:**
- Calendário de agendamentos (biblioteca sugerida: `react-big-calendar` ou `@schedule-x/react`)
- CRUD de agendamentos via React Query
- Vista diferenciada por `role` (provider vê agenda; client vê os seus pedidos)
- Rota: `/appointments` já registada

#### 2.4 — Registar rotas em falta (0,5 dias)

Adicionar a `App.tsx`:

| Rota | Componente a criar |
|---|---|
| `/analytics` | `AnalyticsPage` — dashboard simples com métricas |
| `/team` | `TeamPage` — listagem de membros da equipa |
| `/services/requests` | `ServiceRequestsPage` — pedidos recebidos (role: provider) |
| `/proposals/create` | `CreateProposalPage` — formulário de proposta |

---

## Sprint 3 — Testes Automatizados

**Estimativa:** 1 semana  
**Pré-requisito:** Sprint 2 concluído (páginas funcionais para testar).

### Objetivo
Cobrir os caminhos críticos com testes automatizados para evitar regressões.

### Setup inicial (0,5 dias)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

Adicionar a `package.json`:
```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

Adicionar a `vite.config.ts`:
```ts
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: "./src/test/setup.ts",
}
```

### Casos de teste prioritários

| Ficheiro de teste | O que cobre |
|---|---|
| `AuthContext.test.tsx` | Login válido, login inválido, logout, `parseStoredUser` com dados corrompidos |
| `ProtectedRoute.test.tsx` | Redireccionamento quando não autenticado; acesso permitido quando autenticado |
| `googleAuth.test.ts` | `extractGoogleUserData` com token válido, token malformado, campos em falta |
| `CategoryPage.test.tsx` | Renderização de categorias, selecção de serviço, modal |
| `UserStorageService.test.ts` | `getUsers`, `getUsersByAccountType`, `parseActivities` |

### Critério de aceitação
`npm run test` passa com cobertura mínima de 60% nas linhas dos ficheiros listados acima.

---

## Sprint 4 — Limpeza de Documentação e Manutenção

**Estimativa:** 3–5 dias  
**Pré-requisito:** Nenhum (pode ser feito em paralelo com outras sprints).

### Objetivo
Reduzir 36 ficheiros markdown na raiz para uma estrutura `docs/` organizada e remover duplicados.

### Tarefas

#### 4.1 — Consolidar documentação (1–2 dias)

**Estrutura proposta:**
```
docs/
  architecture/
    ARCHITECTURE.md          ← mover de raiz
    FOLDER_STRUCTURE.md      ← mover de raiz
    NAVIGATION_MAP.md        ← mover de raiz
  guides/
    DEPLOYMENT_GUIDE.md      ← mover de raiz
    IMPLEMENTATION_GUIDE.md  ← mover de raiz
    QUICK_START.md           ← mover de raiz
    TESTING_GUIDE.md         ← mover de raiz
  branding/
    BRANDING_UPDATE.md       ← mover de raiz
    README_BRANDING.md       ← mover de raiz
    VISUAL_GUIDE.md          ← mover de raiz
```

**Ficheiros a eliminar (duplicados/obsoletos):**

| Ficheiro | Razão |
|---|---|
| `FINAL_SUMMARY.md` | Duplica `SUMMARY.md` |
| `SUMMARY_PT.md` | Duplica `SUMMARY.md` em português |
| `SUMMARY_v5.md` | Versão intermédia obsoleta |
| `IMPLEMENTATION_COMPLETE_V2.md` | Duplica `IMPLEMENTATION_MANIFEST.md` |
| `IMPLEMENTATION_SUMMARY.md` | Duplica `IMPLEMENTATION_MANIFEST.md` |
| `IMPLEMENTATION_VISUAL_SUMMARY.md` | Conteúdo movido para `VISUAL_GUIDE.md` |
| `EXECUTIVE_SUMMARY_FINAL.md` | Duplica `EXECUTIVE_SUMMARY_BRANDING.md` |
| `ESCALABILIDADE_v2_VISUAL_SUMMARY.md` | Conteúdo desactualizado |

#### 4.2 — Actualizar `README.md` principal (0,5 dias)

O `README.md` actual não inclui:
- Instruções de setup (`cp .env.example .env`, preencher `VITE_GOOGLE_CLIENT_ID`)
- Como executar (`npm install`, `npm run dev`)
- Estrutura de pastas (link para `docs/architecture/FOLDER_STRUCTURE.md`)
- Variáveis de ambiente obrigatórias

#### 4.3 — Mover guias de teste para specs (1 dia)

`TESTING_GUIDE.md` e `TESTING_GUIDE_BRANDING.md` contêm checklists manuais. As verificações funcionais devem migrar para testes automatizados (Sprint 3). Os restantes itens (verificação visual, cross-browser) permanecem como checklist manual no ficheiro, com nota de que os testes de regressão são automatizados.

---

## Backlog Técnico (sem sprint atribuído)

Estes itens são identificados mas não têm urgência imediata:

| Item | Esforço estimado | Impacto |
|---|---|---|
| Remover `react-query` se não for activado (Sprint 2) ou activá-lo | 0,5 dias | Reduz bundle ~15 kB |
| Migrar de `localStorage` para `IndexedDB` para dados de sessão offline | 2–3 dias | Capacidade e segurança |
| Adicionar `Content-Security-Policy` no servidor/Vite | 0,5 dias | Segurança XSS |
| Adicionar `husky` + `lint-staged` (lint automático em commit) | 0,5 dias | DX e qualidade |
| Avaliar migração de `react-router-dom` v6 para v7 (Data Router) | 2 dias | Performance e tipagem |
| Configurar `vite-plugin-pwa` já listado em `package.json` mas não configurado | 1 dia | PWA offline |
| Implementar error boundaries por rota (actualmente só 1 global) | 1 dia | UX de erros |
| Adicionar `Suspense` + `lazy()` por rota para code-splitting | 0,5 dias | Performance |

---

## Métricas de Progresso

| Métrica | Pré-Sprint 0 | Pós-Sprint 0 | Meta (Sprint 4) |
|---|---|---|---|
| Erros de lint | 13 | 0 | 0 |
| Avisos de lint | 12 | 12 | ≤ 5 |
| Build bem-sucedido | ❌ | ✅ | ✅ |
| Cobertura de testes | 0% | 0% | ≥ 60% |
| Rotas com destino válido | ~60% | 100% | 100% |
| Ficheiros `any` explícito | ≥ 8 | ~2 | 0 |
| Markdown na raiz | 36 | 36 | ≤ 5 |
| Segredos no código-fonte | 1 (Client ID) | 0 | 0 |

---

## Ordem de Execução Recomendada

```
Sprint 1.1 (tipos) → Sprint 1.2 (strict TS) → Sprint 1.3 (auth real)
       ↓
Sprint 2.1 (React Query) → Sprint 2.2 + 2.3 (páginas) → Sprint 2.4 (rotas)
       ↓
Sprint 3 (testes)
       ↓ (pode ser paralelo com Sprint 3)
Sprint 4 (documentação)
```

---

*Documento gerado em 16/03/2026. Actualizar à medida que as sprints são concluídas.*

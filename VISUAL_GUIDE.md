# 🎬 Guia Visual - SoftConection

## Páginas e Funcionalidades por Rota

### 1. **Landing Page (`/`)**

**O que você vê:**
- Header com logo e navegação
- Hero section com CTA grande
- Seção de serviços (6 cards)
- Seção sobre com features
- Depoimentos de clientes
- CTA final
- Footer completo

**Elementos:**
- Navegação responsiva
- Dark mode premium
- Botões grandes de ação
- Animações suaves
- Ícones profissionais

---

### 2. **Login (`/auth/login`)**

**O que você vê:**
- Logo centralizado
- Formulário de login
- Email e senha
- Checkbox "Lembrar-me"
- Link "Esqueci a senha"
- Botão de login
- Link para registro

**Features:**
- Validação de input
- Credenciais demo visíveis
- Design premium
- Responsivo
- Animações suaves

**Credenciais de Demo:**
```
Email: admin@softconection.com
Senha: password
```

---

### 3. **Registro (`/auth/register`)**

**O que você vê:**
- Formulário completo
- Campos: Nome, Email, Empresa, Telefone, Senha
- Confirmação de senha
- Checkbox de termos
- Botão de criar conta

**Features:**
- Validação de senhas
- Campos opcionais
- Design consistente
- Links úteis

---

### 4. **Dashboard (`/dashboard`)** ⭐ Principal

**O que você vê:**

**Seção 1: Stats Cards (4 colunas em desktop)**
- Receita Total com seta verde
- Serviços Completos com números
- Pendentes com alerta
- Propostas Aceitas com crescimento

**Seção 2: Atividades Recentes (2 colunas)**
- Histórico de ações
- Status visual (pontos coloridos)
- Timestamps
- Descrições detalhadas

**Seção 3: Quick Actions (sidebar)**
- Novo Serviço
- Agendar Atendimento
- Criar Proposta
- Ver Relatórios

**Features:**
- Dados em tempo real
- Animações suaves
- Cores de status
- Totalmente responsivo

---

### 5. **Serviços (`/services`)**

**O que você vê:**

**Topo:**
- Título e descrição
- Barra de busca
- Filtro de categoria

**Grid de Serviços (3 colunas em desktop):**
1. **Reparo de Computador**
   - Ícone de ferramenta
   - R$ 150
   - 120 minutos
   - 3 features
   - Botão "Solicitar"

2. **Desenvolvimento Web**
   - Ícone de código
   - R$ 3.000
   - 1440 minutos

3. **Consultoria TI**
4. **Manutenção de Sistemas**
5. **Suporte Remoto**

**Features:**
- Cards com hover effect
- Animações suaves
- Busca em tempo real
- Filtro dinâmico
- Preços destacados

---

### 6. **Agendamentos (`/appointments/calendar`)**

**O que você vê:**

**Topo:**
- Título
- Botão "Novo Agendamento"
- Barra de busca
- Filtro de status

**Lista de Agendamentos:**
Cada item mostra:
- Nome do serviço
- Badge de status (color-coded)
- Data
- Horário
- Local
- Técnico
- Botões de ação

**Status Possíveis:**
- 🔵 Agendado
- 🟢 Confirmado
- 🟡 Em Andamento
- ✅ Completado
- ❌ Cancelado

---

### 7. **Pedidos (`/orders`)**

**O que você vê:**

**Topo:**
- Título
- Botão "Novo Pedido"
- Busca e filtro de status

**Cartão de Pedido (expandível):**
- ID do pedido
- Status com badge
- Localização
- Valor total
- Quantidade de itens
- Itens detalhados (expandível)
- Botões de ação

**Status Possíveis:**
- 🟡 Pendente
- 🔵 Confirmado
- 🟣 Processando
- 🔷 Enviado
- 🟢 Entregue
- ❌ Cancelado

---

### 8. **Propostas (`/proposals`)**

**O que você vê:**

**Topo:**
- Título
- Botão "Nova Proposta"
- Busca e filtro

**Cartão de Proposta:**
- Ícone de documento
- Título
- Status badge
- Alertas (se expirando)
- Valor total
- Descrição
- Itens (com preços)
- Data de validade
- Botões:
  - Ver Detalhes
  - Download PDF
  - Aceitar/Rejeitar (se pendente)

**Features:**
- Cálculo automático
- Alertas de validade
- Cores de status
- PDF exportável

---

### 9. **Configurações (`/settings`)**

**O que você vê:**

**Layout 3 colunas:**

**Coluna 1: Menu**
- Perfil (selecionado)
- Segurança
- Notificações

**Coluna 2-3: Conteúdo**

**Seção Perfil:**
- Nome (readonly)
- Email (readonly)
- Empresa (editável)
- Telefone (editável)
- Botão "Salvar"

**Seção Segurança:**
- Senha atual
- Nova senha
- Confirmar senha
- Botão "Atualizar"

**Seção Zona de Perigo:**
- Aviso em vermelho
- Botão "Deletar Conta"

---

## 🎨 Design System em Ação

### Paleta de Cores

**Elementos Primários:**
- 🔵 Azul (#4CB8FF) - Botões, links, ícones
- 🟦 Ciano (#2DD4BF) - Destaques, accents
- ⬛ Preto (#0A0A0A) - Background
- 🟩 Cinza (#121212) - Cards

**Status Colors:**
- 🟢 Verde - Sucesso, Completo
- 🟡 Amarelo - Pendente, Alerta
- 🔵 Azul - Informação
- 🔴 Vermelho - Erro, Cancelado
- 🟣 Roxo - Processando

### Tipografia

**Títulos:**
- Font: Space Grotesk
- Sizes: 32px, 28px, 24px, 20px

**Corpo:**
- Font: Inter
- Size: 16px, 14px, 12px

---

## 📱 Responsividade em Ação

### Mobile (320px - 480px)

**Sidebar:**
- Colapse em hamburger menu
- Overlay quando aberto
- Menu aninhado colapsável

**Layout:**
- 1 coluna
- Cards full-width
- Botões full-width
- Spacing reduzido

**Dashboard:**
- Stats em 1 coluna
- Atividades full-width
- Sidebar na lateral

### Tablet (481px - 768px)

**Sidebar:**
- Colapsível mas visível
- Ícones quando colapsado

**Layout:**
- 2 colunas
- Cards responsivos
- Spacing balanceado

### Desktop (769px+)

**Sidebar:**
- Sempre visível
- Menu completo
- Toda a navegação

**Layout:**
- 3-4 colunas
- Grid responsivo
- Máxima funcionalidade

---

## 🎬 Fluxos de Uso

### Fluxo 1: Novo Usuário

1. **Landing Page** (`/`)
   - Explora serviços
   - Lê sobre empresa
   - Clica "Começar"

2. **Registro** (`/auth/register`)
   - Preenche formulário
   - Confirma termos
   - Clica "Criar"

3. **Dashboard** (`/dashboard`)
   - Vê dashboard vazio
   - Explora módulos
   - Clica em Quick Actions

### Fluxo 2: Solicitar Serviço

1. **Dashboard** → Clica "Novo Serviço"
2. **Serviços** (`/services`)
   - Vê catálogo
   - Filtra categoria
   - Busca serviço
   - Clica "Solicitar"

3. **Confirmação**
   - Toast de sucesso
   - Volta ao dashboard

### Fluxo 3: Agendar

1. **Dashboard** → Clica "Agendar"
2. **Agendamentos** (`/appointments/calendar`)
   - Clica "Novo Agendamento"
   - Seleciona data/hora
   - Confirma
   - Sucesso!

### Fluxo 4: Criar Proposta

1. **Dashboard** → Clica "Criar Proposta"
2. **Propostas** (`/proposals`)
   - Clica "Nova Proposta"
   - Adiciona itens
   - Define validade
   - Envia
   - Cliente recebe

---

## 🎯 Componentes Visuais

### Cards

**Padrão:**
```
┌─────────────────────────┐
│ [ÍCONE] TÍTULO          │
│ Descrição com detalhes  │
│ ─────────────────────── │
│ [BOTÃO] [BOTÃO]         │
└─────────────────────────┘
```

### Buttons

- **Primary**: Gradiente azul-ciano
- **Outline**: Borda apenas
- **Ghost**: Texto apenas
- **Disabled**: Opacidade reduzida

### Badges

- Diferentes cores por status
- Icones quando apropriado
- Padding consistente

### Inputs

- Focus state azul
- Validação visual
- Labels descritivos
- Placeholder útil

---

## ✨ Animações

### Transições
- **Duration**: 200-300ms
- **Easing**: ease-in-out
- **Suave**: Sem saltos

### Hover Effects
- Cards: `-translate-y-1`
- Botões: Shadow aumento
- Links: Color change

### Loading States
- Spinner de carregamento
- Skeleton loaders
- Pulse animations

### Transitions
- Page transitions suaves
- Modal fade-in
- Dropdown slide-down

---

## 🌙 Dark Mode

**Implementado por padrão:**
- Fundo preto (#0A0A0A)
- Cards cinza escuro (#121212)
- Texto branco/cinza
- Contraste otimizado

**Tema Claro** (disponível via toggle):
- Fundo branco
- Cards cinza claro
- Texto preto
- Mesmo contraste

---

## 📊 Dashboard Widgets

### Stat Card

Mostra:
- Ícone com background
- Label
- Valor grande
- Trend (seta + percentual)

### Activity Item

Mostra:
- Indicador de status (ponto)
- Título
- Descrição
- Timestamp

### Quick Action Button

Mostra:
- Ícone
- Label
- Hover state

---

## 🔐 Indicadores de Segurança

- ✅ Status visual para ações
- ✅ Confirmação para ações críticas
- ✅ Toast notifications
- ✅ Mensagens de erro
- ✅ Loading states

---

## 💡 UX Details

### Feedback Visual
- Toast notifications
- Página feedback
- Loading spinners
- Success messages

### Error Handling
- Mensagens claras
- Sugestões de ação
- Links úteis
- Recuperação fácil

### Validation
- Real-time validation
- Visual feedback
- Error messages
- Help text

### Accessibility
- ARIA labels
- Keyboard nav
- Focus indicators
- Color contrast

---

## 🎓 Aprender Explorando

### Para Entender Design
1. Acesse landing page
2. Note as cores
3. Veja as animações
4. Observe responsividade

### Para Entender Funcionalidade
1. Faça login
2. Explore dashboard
3. Entre em cada módulo
4. Teste filtros

### Para Entender Código
1. Abra DevTools (F12)
2. Inspecione elementos
3. Veja classes Tailwind
4. Entenda estrutura

---

**Plataforma Visual Completa! 🎨**

*Aproveite a experiência premium*

# SoftConection - Plataforma Profissional de Gestão de TI

Uma plataforma moderna, responsiva e de classe mundial para gerenciamento completo de serviços de TI, desenvolvida com as tecnologias mais avançadas.

## 🎯 Visão Geral

A SoftConection é uma solução empresarial completa para empresas de prestação de serviços de TI. Oferece:

- **Dashboard Inteligente** - Análise em tempo real de métricas e atividades
- **Gestão de Serviços** - Catálogo profissional com preços e descrições
- **Sistema de Agendamentos** - Calendário interativo com slots de tempo
- **Gestão de Pedidos** - Rastreamento completo de pedidos
- **Sistema de Propostas** - Gerador profissional de propostas comerciais
- **Autenticação Segura** - Sistema completo de login e registro
- **Interface Premium** - Design responsivo estilo Apple

## 🚀 Começar Rápido

### Credenciais de Demo

Para testar a plataforma, use:
- **Email:** admin@softconection.com
- **Senha:** password

### Instalação

```bash
# Instalar dependências
bun install

# Executar em modo desenvolvimento
bun run dev

# Build para produção
bun run build
```

## 📋 Funcionalidades Principais

### 1. **Dashboard**
- Estatísticas em tempo real
- Gráficos de receita
- Atividades recentes
- Agendamentos próximos

### 2. **Catálogo de Serviços**
- Reparo de computadores
- Desenvolvimento de software
- Consultoria TI
- Manutenção de sistemas
- Suporte 24/7
- Otimização de sistemas

### 3. **Sistema de Agendamentos**
- Calendário interativo
- Seleção de horários
- Confirmação automática
- Notificações

### 4. **Gestão de Pedidos**
- Carrinho de compras
- Múltiplas formas de pagamento
- Rastreamento de status
- Histórico completo

### 5. **Sistema de Propostas**
- Criador visual de propostas
- Geração de PDFs
- Histórico de propostas
- Análise de taxa de aceitação

## 🎨 Design & UX

### Características de Design
- **Tema Escuro Premium** - Reduz fadiga ocular
- **Cores de Marca** - Azul e Ciano gradiente
- **Responsividade Total** - Mobile, tablet, desktop
- **Animações Suaves** - Transições elegantes
- **Tipografia Profissional** - Space Grotesk e Inter

### Componentes UI
- Botões com estados hover/active
- Cards com sombras dinâmicas
- Modais elegantes
- Inputs com validação visual
- Badges e badges de status
- Skeletons de carregamento
- Tooltips informativos

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── components/
│   ├── layout/           # Componentes de layout
│   ├── ui/              # Componentes shadcn/ui
│   └── AppLayout.tsx    # Wrapper de layout
├── pages/
│   ├── auth/            # Páginas de autenticação
│   ├── dashboard/       # Dashboard
│   ├── services/        # Catálogo de serviços
│   ├── appointments/    # Agendamentos
│   ├── orders/          # Pedidos
│   ├── proposals/       # Propostas
│   ├── settings/        # Configurações
│   └── LandingPage.tsx  # Página inicial
├── contexts/
│   ├── AuthContext.tsx  # Autenticação
│   └── DataContext.tsx  # Dados da aplicação
├── types/
│   └── index.ts         # Tipos TypeScript
├── lib/
│   └── utils.ts         # Utilidades
└── hooks/
    ├── use-mobile.tsx   # Detecção mobile
    └── use-toast.ts     # Sistema de toast
```

## 🔐 Autenticação

A plataforma possui um sistema completo de autenticação com:

- **Login** - Email e senha
- **Registro** - Criar nova conta
- **Rotas Protegidas** - Acesso apenas autenticado
- **Roles** - Admin, Manager, Technician, Client
- **Persistência** - LocalStorage para sessão

## 🌐 Responsividade

### Breakpoints
- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

### Adaptações
- Sidebar colapsável em mobile
- Menu hamburger adaptativo
- Grid responsivo (1-4 colunas)
- Tipografia escalada
- Espacimento ajustado

## 🎯 Padrões de Design Implementados

### Design System
- Paleta de cores consistente
- Tipografia hierárquica
- Espaçamento baseado em grid
- Ícones de tamanho único
- Sombras categorizadas

### Componentes Reutilizáveis
- Cards com variantes
- Buttons com múltiplos estados
- Inputs com validação
- Modals customizáveis
- Tabs e Accordions

### Micro-interações
- Hover states
- Loading spinners
- Toast notifications
- Transitions suaves
- Scroll behavior

## 📱 Funcionalidades Avançadas

### Dashboard Analytics
- Receita total
- Serviços completados
- Pendências
- Propostas aceitas
- Gráficos de tendência

### Sistema de Propostas
- Múltiplos itens
- Cálculo automático
- Exportação em PDF
- Validade com alerta
- Status tracking

### Agendamentos
- Calendário interativo
- Slots de tempo
- Confirmação em 2 passos
- Cancelamento com motivo
- Sincronização automática

## 🚀 Performance

- Lazy loading de componentes
- Code splitting automático
- Otimização de imagens
- Caching de dados
- Debounce em buscas

## 🌙 Modo Escuro/Claro

A plataforma suporta alternância entre:
- **Modo Escuro** (padrão)
- **Modo Claro**
- **Auto** (baseado no SO)

## 📊 Dados Simulados

Para facilitar testes, a plataforma inclui:
- 5 serviços pré-configurados
- Dados mock para agendamentos
- Histórico de atividades
- Propostas de exemplo

## 🔄 Próximas Implementações

- [ ] Integração com banco de dados real
- [ ] Sistema de pagamento (Stripe/PayPal)
- [ ] Relatórios avançados com gráficos
- [ ] Email notifications
- [ ] API REST completa
- [ ] Sistema de permissões granular
- [ ] Importação/Exportação de dados
- [ ] Integração com calendários (Google Calendar, Outlook)

## 📚 Tecnologias Utilizadas

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **TanStack Query** - Data fetching
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **Next Themes** - Dark mode

## 📄 Licença

Copyright © 2026 SoftConection. Todos os direitos reservados.

## 👥 Suporte

Para dúvidas ou problemas, entre em contato:
- Email: support@softconection.com
- Telefone: +55 (11) 9999-9999
- Website: www.softconection.com

---

**Desenvolvido com ❤️ pela SoftConection**

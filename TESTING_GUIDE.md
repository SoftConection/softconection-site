# 🧪 Guia de Teste - Sistema de Serviços

## Como Testar Localmente

### 1. **Iniciar o Servidor de Desenvolvimento**

```bash
npm run dev
```

O servidor iniciará em `http://localhost:5173`

---

## ✅ Testes de Navegação Landing Page

### Cenário 1: Usuário Não Autenticado

```
1. Abre http://localhost:5173/
   ✅ Vê landing page
   ✅ Logo SoftConection no topo
   ✅ 8 categorias com ícones

2. Clica em qualquer categoria
   ✅ Redireciona para /auth/register
   ✅ Mostra formulário de registro

3. Clica em "Começar Agora"
   ✅ Redireciona para /auth/register

4. Clica em "Explorar Categorias"
   ✅ Mantém na landing ou redireciona

5. Clica logo (+55 (11) 9999-9999)
   ✅ Abre dialer (tel://)
```

### Cenário 2: Usuário Autenticado

**Pré-requisito:** Fazer login com demo credentials
- Email: `admin@softconection.com`
- Senha: `password`

```
1. Após login, volta à landing page
   ✅ Botão muda para "Dashboard"

2. Clica em "Ver Serviços"
   ✅ Vai para /services (não register)

3. Clica em qualquer categoria
   ✅ Vai para /services/:categoryId
   ✅ NÃO redireciona para login

4. Clica "Explorar Categorias"
   ✅ Vai para /services

5. Logo está visível
   ✅ Usa /src/assets/logo.png
```

---

## ✅ Testes de Página de Categorias (/services)

### Cenário 1: Visualização

**Estado:** Autenticado

```
1. Acessa /services
   ✅ Vê 8 categorias em grid (4 colunas desktop)
   ✅ Cada categoria tem:
      ✅ Ícone emoji grande
      ✅ Título
      ✅ Descrição
      ✅ "6 serviços disponíveis"
      ✅ Botão "Ver Serviços"

2. Hover em categoria
   ✅ Border muda para cyan
   ✅ Card sobe (-translate-y-2)
   ✅ Sombra aumenta

3. Info cards na base
   ✅ 3 cards informativos
   ✅ "48+ Serviços"
   ✅ "Rápido & Eficiente"
   ✅ "Garantido"
```

### Cenário 2: Busca Dinâmica

```
1. Clica na barra de busca
   ✅ Focus visible
   ✅ Placeholder "Procurar categorias ou serviços..."

2. Digita "repair"
   ✅ Filtra apenas Reparação
   ✅ Outras categorias desaparecem

3. Digita "design"
   ✅ Filtra apenas Design
   ✅ Busca case-insensitive

4. Digita "rápido"
   ✅ Filtra por descrição
   ✅ Encontra "Rápido & Eficiente"

5. Limpa busca
   ✅ Todas as categorias voltam

6. Digita "xyz" (não existe)
   ✅ Mostra mensagem "Nenhuma categoria encontrada"
   ✅ Botão "Limpar busca"
```

### Cenário 3: Navegação

```
1. Clica "Ver Serviços" em categoria
   ✅ URL muda para /services/:categoryId
   ✅ Exemplos:
      /services/repair
      /services/software
      /services/cctv

2. Cada clique leva para categoria correta
   ✅ Todos 8 links funcionam
```

---

## ✅ Testes de Página de Serviços (/services/:categoryId)

### Cenário 1: Visualização de Serviços

**URL:** `/services/repair`

```
1. Abre página
   ✅ Header com:
      ✅ Botão "Voltar"
      ✅ Ícone emoji (🔧)
      ✅ Título "Reparação de Equipamentos"
      ✅ Descrição

2. Vê 6 serviços em grid (3 colunas)
   ✅ Cada card mostra:
      ✅ Título (ex: "Reparação de Computador")
      ✅ Descrição curta
      ✅ 3 features com ✓ verde
      ✅ Preço em euros (azul-ciano)
      ✅ Duração em horas (azul)
      ✅ Botão "Ver Detalhes"

3. Testar em outros categoryIds
   ✅ /services/software (6 serviços)
   ✅ /services/cctv (6 serviços)
   ✅ /services/design (6 serviços)
   ✅ /services/marketing (6 serviços)
   ✅ Todos carregam corretamente
```

### Cenário 2: Busca de Serviços

```
1. Digita "computador"
   ✅ Filtra para "Reparação de Computador"
   ✅ Outros desaparecem

2. Digita "backup"
   ✅ Encontra serviço em categoria certa
   ✅ Busca por descrição funciona

3. Digita "xyz"
   ✅ "Nenhum serviço encontrado"

4. Limpa busca
   ✅ Todos voltam
```

### Cenário 3: Hover Effects

```
1. Passa mouse sobre card
   ✅ Border fica cyan
   ✅ Card sobe animado
   ✅ Sombra aumenta

2. Botão "Ver Detalhes"
   ✅ Destaque ao hover
   ✅ Cursor muda para pointer
```

### Cenário 4: Botão Voltar

```
1. Clica "Voltar"
   ✅ Volta para /services
   ✅ URL muda
   ✅ Página de categorias mostra
```

---

## ✅ Testes de Modal de Detalhes

### Cenário 1: Abrir Modal

```
1. Clica "Ver Detalhes" em qualquer serviço
   ✅ Modal abre com fade animation
   ✅ Fundo escurece (overlay)
   ✅ Modal no centro

2. Modal mostra:
   ✅ Título do serviço
   ✅ Descrição
   ✅ Preço grande em cyan (€)
   ✅ Duração em azul (h)
   ✅ "O que está incluído:"
   ✅ Lista de features com bolinhas
   ✅ Seção "Benefícios"
   ✅ Botão "Solicitar Serviço" (gradient)
   ✅ Botão "Fechar"
```

### Cenário 2: Testar Diferentes Serviços

```
1. Abre modalem "Reparação de Computador"
   ✅ Preço: 150€
   ✅ Duração: 2h
   ✅ Features corretos

2. Abre modal em "Desenvolvimento Web"
   ✅ Preço: 3000€
   ✅ Duração: 24h
   ✅ Features diferentes

3. Fechar e abrir outro
   ✅ Conteúdo muda corretamente
```

### Cenário 3: Solicitar Serviço

```
1. Abre modal
2. Clica "Solicitar Serviço"
   ✅ Toast aparece com sucesso
   ✅ Mensagem: "Serviço 'X' solicitado com sucesso!"
   ✅ Toast desaparece após 3s
   ✅ Modal fecha

3. Lista volta a mostrar
```

### Cenário 4: Fechar Modal

```
1. Modal aberto
2. Clica botão "Fechar"
   ✅ Modal fecha
   ✅ Lista visível
   ✅ Overlay desaparece

3. Testa fechar clicando fora
   ✅ Modal fecha quando clica fora
```

---

## ✅ Testes de Responsividade

### Mobile (< 768px)

```
1. Abre landing em mobile
   ✅ Logo visível no topo
   ✅ Categorias em 1 coluna
   ✅ Botões full width
   ✅ Texto redimensionado

2. Clica em categoria
   ✅ Vai para /services/:categoryId

3. Página de serviços
   ✅ Cards em 1 coluna
   ✅ Barra de busca full width
   ✅ Buttons responsivos

4. Modal em mobile
   ✅ Modal é 90% da tela
   ✅ Scroll se necessário
   ✅ Botões acessíveis
```

### Tablet (768px - 1023px)

```
1. Landing
   ✅ Categorias em 2 colunas

2. Página de serviços
   ✅ Serviços em 2 colunas
```

### Desktop (> 1024px)

```
1. Landing
   ✅ Categorias em 4 colunas

2. Página de serviços
   ✅ Serviços em 3 colunas

3. Todas animações funcionam
   ✅ Smooth transitions
```

---

## ✅ Testes de Proteção de Rotas

### Cenário 1: Sem Autenticação

```
1. Logout do usuário
   ✅ Status: NOT authenticated

2. Tenta acessar /services
   ✅ Redireciona para /auth/login

3. Tenta acessar /services/repair
   ✅ Redireciona para /auth/login

4. Tenta acessar /dashboard
   ✅ Redireciona para /auth/login
```

### Cenário 2: Com Autenticação

```
1. Faz login com:
   Email: admin@softconection.com
   Senha: password
   ✅ Login bem-sucedido

2. Acessa /services
   ✅ Carrega página (sem redirecionamento)

3. Acessa /services/cctv
   ✅ Carrega página (sem redirecionamento)

4. Session persiste
   ✅ Recarregar página mantém login
```

---

## ✅ Testes de Links e Botões

### Landing Page

- [ ] Logo clicável
- [ ] "Começar" funciona
- [ ] "Explorar Categorias" funciona
- [ ] Cada categoria card clicável
- [ ] "Ver Serviços" em cada categoria
- [ ] "Começar Agora" CTA funciona
- [ ] Telefone clicável (tel://)
- [ ] Footer links navegam
- [ ] Dashboard link (se auth)

### Página de Categorias

- [ ] Cada "Ver Serviços" leva certa categoria
- [ ] Busca filtra em tempo real
- [ ] "Limpar busca" funciona

### Página de Serviços

- [ ] Botão "Voltar" funciona
- [ ] Todos "Ver Detalhes" abrem modal
- [ ] Busca funciona
- [ ] Scroll funciona

### Modal

- [ ] "Solicitar Serviço" funciona
- [ ] "Fechar" funciona
- [ ] Clicar fora fecha

---

## ✅ Testes de Design

### Cores

- [ ] Fundo preto (#0A0A0A)
- [ ] Cards cinza escuro
- [ ] Texto branco
- [ ] Accent azul-ciano
- [ ] Hover effects visíveis

### Animações

- [ ] Transições suaves (200-300ms)
- [ ] Hover effects em cards
- [ ] Icon scale ao hover
- [ ] Button arrow animation
- [ ] Modal fade-in
- [ ] Toast slide-in

### Tipografia

- [ ] Títulos em Space Grotesk
- [ ] Corpo em Inter
- [ ] Tamanhos apropriados
- [ ] Contraste bom

---

## ✅ Testes de Funcionalidade

### Sem Erros

```bash
npm run dev
```

- [ ] Zero console errors
- [ ] Zero console warnings
- [ ] Network requests OK

### Compilação

```bash
npm run build
```

- [ ] Build sucesso
- [ ] Tamanho arquivo OK
- [ ] Pronto para deploy

### TypeScript

```bash
npx tsc --noEmit
```

- [ ] Sem type errors
- [ ] Todos types corretos

---

## 🐛 Bugs Conhecidos / Checklist

### Funcionalidades Implementadas

- [x] 8 categorias visíveis
- [x] 48 serviços (6 cada)
- [x] Navegação funcional
- [x] Modal de detalhes
- [x] Busca dinâmica
- [x] Proteção de rotas
- [x] Responsividade
- [x] Logo em destaque
- [x] Sem testemunhos
- [x] Todos botões funcionam
- [x] Zero erros de compilação

### Teste de Integração

```
Landing → Não Auth → Redireciona Register ✅
Landing → Auth → Vai para Services ✅
Services → Clica Categoria → /services/:categoryId ✅
ServiceDetail → Clica Serviço → Modal ✅
Modal → Solicita → Toast + Fecha ✅
Voltar → /services ✅
Voltar → / ✅
```

---

## 📊 Performance

### Carregamento

- Página Landing: < 1s
- Página Categorias: < 1s
- Página Serviço: < 1s
- Modal: < 200ms
- Busca: < 100ms (instant)

### Responsividade

- Smooth scrolling ✅
- No janky animations ✅
- Touch friendly ✅
- Tap targets 44px+ ✅

---

## 🎯 Checklist Final

- [ ] Abrir landing page
- [ ] Clicar em 3 categorias diferentes
- [ ] Abrir 5 modais
- [ ] Solicitar 2 serviços
- [ ] Testar busca
- [ ] Voltar para trás
- [ ] Testar em mobile
- [ ] Fazer logout
- [ ] Tentar acessar services (deve redirecionar)
- [ ] Fazer login de novo
- [ ] Testar dark mode (já é dark)

---

**Tudo testado? Sistema pronto para produção! 🚀**

Para começar os testes:
```bash
npm run dev
```

Depois abra: `http://localhost:5173`

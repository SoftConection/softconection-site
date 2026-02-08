# 🧪 Guia de Teste - SoftConection Branding

## Teste Visual Completo

### Parte 1: Testar Favicon (1 min)
1. Abrir site no browser
2. Olhar para a aba do navegador
3. **Esperado**: Logo SoftConection (não favicon padrão)
4. Fazer refresh F5
5. **Esperado**: Favicon continua logo

✅ **Resultado**: Favicon visível como logo

---

### Parte 2: Testar Header (2 min)

#### Desktop (1920px+)
1. Scroll até topo
2. Olhar direita do logo
3. **Esperado**: Badge "🗺️ São Paulo • Luanda"
4. Hover sobre badge
5. **Esperado**: Cor muda (transition smooth)

#### Mobile (375px)
1. Abrir em telemóvel (ou DevTools F12)
2. Clicar menu (≡ hambúrguer)
3. **Esperado**: Menu abre com localização no topo
4. **Esperado**: "🗺️ São Paulo • Luanda"

✅ **Resultado**: Header localização visível em ambos

---

### Parte 3: Testar Hero Section (3 min)

#### Visual
1. Ir para topo da página
2. Ver logo grande SoftConection
3. Ler tagline "Transformamos ideias..."
4. **Esperado**: Logo com drop shadow brilhante

#### Botões CTA
1. Ver 3 botões:
   - Azul: "Ver Serviços"
   - Verde: "WhatsApp - São Paulo"
   - Verde: "WhatsApp - Luanda"
2. Hover em cada um
3. **Esperado**: Cor muda e glow effect (apenas WhatsApp)

#### Stats
1. Scroll um pouco down
2. Ver números:
   - "2" Sedes Globais ← NOVO
   - "50+" Projetos
   - "100%" Clientes
   - "24/7" Suporte
3. **Esperado**: 4 items (antes eram 3)

#### Location Badges
1. Scroll mais down
2. Ver badges:
   - 🇧🇷 São Paulo, Brasil
   - 🇦🇴 Luanda, Angola
3. **Esperado**: Ambas flags visíveis com estilo claro

✅ **Resultado**: Hero completo com novidades

---

### Parte 4: Testar Contact Section (5 min)

#### Card 1 - São Paulo
1. Scroll até "Contacto"
2. Ver primeiro card
3. **Esperado**: 
   - Ícone de telefone
   - Label: "Brasil - São Paulo"
   - Número: "+55 (11) 9999-9999"
   - Botão verde: "💬 WhatsApp"

#### Card 2 - Luanda
1. Ver segundo card
2. **Esperado**:
   - Ícone de telefone
   - Label: "Angola - Luanda"
   - Número: "+244 935 358 417"
   - Botão verde: "💬 WhatsApp"

#### Botões WhatsApp
1. Clicar primeiro "WhatsApp" (São Paulo)
2. **Esperado**: Abre novo separador com WhatsApp
3. Verificar número: +55 11 9999-9999
4. Voltar e clicar segundo "WhatsApp" (Luanda)
5. **Esperado**: Abre novo separador com WhatsApp diferente
6. Verificar número: +244 935 358 417
7. Verificar mensagem pré-preenchida

#### Sedes Globais
1. Ver secção "Sedes Globais"
2. **Esperado**:
   - 🇧🇷 Brasil - São Paulo
   - 🇦🇴 Angola - Luanda

✅ **Resultado**: Contact completo e WhatsApp funcional

---

### Parte 5: Testar Footer (3 min)

#### Layout
1. Scroll até fim da página
2. **Esperado**: 4 colunas (não 3 como antes)

#### Coluna 1 - Logo & Info
- Logo visível
- Texto "Softconection"
- Tagline "Criação Inovadora"

#### Coluna 2 - Navegação
- Links: Início, Serviços, Sobre, Contacto
- Hover: cor muda

#### Coluna 3 - Contacto
1. Ver 2 botões WhatsApp
2. Primeiro: "🇧🇷 São Paulo" + "+55 (11) 9999-9999"
3. Segundo: "🇦🇴 Luanda" + "+244 935 358 417"
4. Clicar um → Deve abrir WhatsApp
5. Verificar que abre chat correto

#### Coluna 4 - Sedes
- 🇧🇷 Brasil - São Paulo
- 🇦🇴 Angola - Luanda

#### Copyright
- Ver "Presença Global | São Paulo • Luanda"

✅ **Resultado**: Footer 4 colunas com WhatsApp

---

## Teste Funcional

### Teste 1: WhatsApp Links (10 min)

#### São Paulo
1. Clica em "WhatsApp - São Paulo" (qualquer lugar: Hero/Contact/Footer)
2. Abre WhatsApp?
   - ✅ Desktop: Abre web.whatsapp.com
   - ✅ Mobile: Abre app WhatsApp
3. Número correto? `+55 11 9999-9999`
4. Mensagem pré-preenchida? Sim/Não?
5. **Esperado**: Tudo acima = SIM

#### Luanda
1. Clica em "WhatsApp - Luanda" (qualquer lugar)
2. Abre WhatsApp?
   - ✅ Desktop: Abre web.whatsapp.com
   - ✅ Mobile: Abre app WhatsApp
3. Número correto? `+244 935 358 417`
4. Mensagem diferente de São Paulo? Sim
5. **Esperado**: Tudo acima = SIM

✅ **Resultado**: Links WhatsApp funcionam

---

### Teste 2: Responsividade (5 min)

#### Testar em 3 tamanhos

**Mobile (375px)**
- [ ] Header: Hamburger menu visible
- [ ] Hero: Botões empilhados vertical
- [ ] Contact: 2 cards em stack
- [ ] Footer: Single column (scroll vertical)
- **Esperado**: Sem scroll horizontal, layout clean

**Tablet (768px)**
- [ ] Header: Badge de localização invisível (apenas em lg+)
- [ ] Hero: Botões podem estar 2+1 ou 3 em linha
- [ ] Contact: Cards side-by-side
- [ ] Footer: 2 colunas ou grid responsivo

**Desktop (1920px+)**
- [ ] Header: Badge "São Paulo • Luanda" visível
- [ ] Hero: Todos elementos espalhados
- [ ] Contact: Full width, 2 cards lado-a-lado
- [ ] Footer: 4 colunas lado-a-lado

✅ **Resultado**: Responsive em todos tamanhos

---

### Teste 3: Metadados & SEO (5 min)

#### Abrir DevTools (F12)
1. Ir para Elements/Inspector
2. Procurar `<head>`
3. Verificar:

```html
✅ <title>SoftConection | Soluções de TI... | São Paulo & Luanda</title>
✅ <meta name="description" content="SoftConection - Empresa de TI...">
✅ <meta name="keywords" content="...São Paulo, Luanda...">
✅ <meta name="author" content="SoftConection">
✅ <meta property="og:title" content="...">
✅ <meta property="og:description" content="...">
✅ <link rel="icon" href="/src/assets/logo.png">
✅ <link rel="shortcut icon" href="/src/assets/logo.png">
✅ <link rel="apple-touch-icon" href="/src/assets/logo.png">
```

✅ **Resultado**: Metadados completos

---

### Teste 4: Performance & Erros (3 min)

#### Console (F12)
1. Abrir DevTools (F12)
2. Ir para Console
3. **Esperado**: Sem erros vermelhos
4. Warnings (amarelo)? Nenhum relacionado com código

#### Network
1. Reload página (Ctrl+R ou Cmd+R)
2. Ver ficheiros carregados
3. **Esperado**: Nenhum erro 404 ou similar
4. Favicon carrega? Sim (status 200)

#### Performance
1. Lighthouse (Ctrl+Shift+P → Lighthouse)
2. Run audit
3. **Esperado**:
   - Performance > 80
   - Accessibility > 85
   - Best Practices > 80
   - SEO > 90

✅ **Resultado**: Site sem erros e performante

---

## Teste de Fluxo Completo

### Cenário: Cliente Potencial

```
1. CHEGA NO SITE
   → Vê logo SoftConection no favicon ✅
   → Vê "São Paulo • Luanda" no header ✅

2. LÊ HERO
   → Vê tagline inspirador
   → 3 botões: Serviços + 2x WhatsApp ✅

3. CLICA "WhatsApp - São Paulo"
   → Abre WhatsApp ✅
   → Número certo: +55 11 9999-9999 ✅
   → Conversação iniciada ✅

4. ALTERNATIVA: Clica "Ver Serviços"
   → Vai para serviços ✅
   → Explora 48 serviços ✅

5. VOLTA AO CONTACTO
   → Vê 2 opções (SP vs Luanda) ✅
   → Escolhe localização ✅

6. FOOTER
   → Vê 4 colunas ✅
   → Botões WhatsApp visíveis ✅
   → "Presença Global" mencionada ✅
```

✅ **Resultado**: Fluxo completo e intuitivo

---

## Checklist Final

### Visual ✅
- [ ] Logo visível no favicon
- [ ] Header tem localização
- [ ] Hero tem 3 botões
- [ ] Contact tem 2 cards
- [ ] Footer tem 4 colunas
- [ ] Cores corretas (verde WhatsApp)

### Funcional ✅
- [ ] WhatsApp São Paulo abre
- [ ] WhatsApp Luanda abre
- [ ] Números corretos
- [ ] Mensagens aparecem
- [ ] Links sem erro

### Responsive ✅
- [ ] Mobile: OK
- [ ] Tablet: OK
- [ ] Desktop: OK
- [ ] Sem scroll horizontal

### Qualidade ✅
- [ ] Sem erros console
- [ ] Sem warnings importantes
- [ ] Metadados completos
- [ ] Performance OK
- [ ] SEO OK

### Documentação ✅
- [ ] BRANDING_UPDATE.md criado
- [ ] FINAL_SUMMARY.md criado
- [ ] QUICK_REFERENCE.md criado
- [ ] VALIDATION_CHECKLIST.md criado

---

## Se Encontrar Problemas

### WhatsApp não abre
- Verificar internet
- Testar link manualmente: `wa.me/5511999999999`
- Se for mobile: Confirmar WhatsApp instalado

### Favicon não aparece
- Hard refresh: Ctrl+Shift+R (Chrome) ou Cmd+Shift+R (Mac)
- Limpar cache browser
- Verificar `/src/assets/logo.png` existe

### Layout quebrado em mobile
- DevTools: Ctrl+Shift+M (activate device mode)
- Testar em tamanhos: 375px, 768px, 1024px
- Verificar scroll horizontal?

### Botões broxos
- Hard refresh (Ctrl+Shift+R)
- Verificar Tailwind build
- Limpar `.next` ou `/dist` se existir

---

## Teste de Produção

```bash
# Build production
npm run build

# Preview
npm run preview

# Verificar tudo funciona igual
# Depois fazer deploy
```

---

## ✅ Teste Completo: 30 minutos

```
Parte 1: Favicon       (1 min) ✅
Parte 2: Header        (2 min) ✅
Parte 3: Hero          (3 min) ✅
Parte 4: Contact       (5 min) ✅
Parte 5: Footer        (3 min) ✅
Teste Funcional        (10 min) ✅
Responsividade         (5 min) ✅
Metadados              (5 min) ✅
Fluxo Completo         (5 min) ✅
                      ___________
Total:                 ~40 min ⏱️
```

---

## 🎉 Se Tudo Passou!

✅ **PRONTO PARA DEPLOY** 🚀

Parabéns! SoftConection está com branding completo,
WhatsApp integrado, e pronto para produção!

---

**Teste: 2024**
**Status: READY TO TEST**

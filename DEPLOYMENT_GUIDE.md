# 🚀 Guia de Deploy - SoftConection

Como publicar sua plataforma SoftConection em produção.

---

## 📋 Pré-requisitos

- Node.js 18+
- npm ou bun
- Conta em um serviço de hosting
- Domínio (opcional)

---

## 🏗️ Preparar para Produção

### 1. Build Otimizado

```bash
npm run build
```

Isso criará uma pasta `dist/` com os arquivos otimizados.

### 2. Verificar a Build

```bash
npm run preview
```

Teste a build localmente antes de fazer deploy.

---

## 🌐 Opções de Hosting

### Opção 1: Vercel (Recomendado)

**Vantagens:**
- Deploy automático do Git
- SSL grátis
- CDN global
- Preço inicial gratuito

**Passos:**
1. Acesse [vercel.com](https://vercel.com)
2. Clique "Import Project"
3. Selecione seu repositório Git
4. Clique "Deploy"

```bash
# Ou via CLI
npm i -g vercel
vercel
```

### Opção 2: Netlify

**Vantagens:**
- Muito fácil
- Notificações push
- Formulários
- Funções serverless

**Passos:**
1. Acesse [netlify.com](https://netlify.com)
2. Clique "New site from Git"
3. Selecione repositório
4. Build settings automáticas
5. Deploy

```bash
# Ou via CLI
npm i -g netlify-cli
netlify deploy
```

### Opção 3: GitHub Pages

**Vantagens:**
- Grátis
- Integrado com GitHub
- Sem limites de banda

**Passos:**
1. Adicione ao `package.json`:
```json
"homepage": "https://username.github.io/repo",
"scripts": {
  "build": "vite build",
  "deploy": "npm run build && npm run deploy"
}
```

2. Configure GitHub Actions

### Opção 4: AWS S3 + CloudFront

**Vantagens:**
- Escalável
- CDN rápido
- Preço baixo

**Passos:**
1. Crie bucket S3
2. Habilite static website hosting
3. Configure CloudFront
4. Upload dos arquivos
5. Configure DNS

```bash
# Upload para S3
aws s3 sync dist/ s3://seu-bucket/
```

### Opção 5: Docker + Any Cloud

**Vantagens:**
- Portável
- Controle total
- Qualquer cloud

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Deploy:**
```bash
docker build -t softconection .
docker run -p 3000:3000 softconection
```

---

## 🔧 Configuração de Produção

### Variáveis de Ambiente

Crie arquivo `.env.production`:

```env
VITE_API_URL=https://api.softconection.com
VITE_ENVIRONMENT=production
VITE_ANALYTICS_ID=seu-analytics-id
```

### TypeScript Check

```bash
npx tsc --noEmit
```

### ESLint Check

```bash
npm run lint
```

### Build Size Check

```bash
npm run build
# Verifique o tamanho em dist/
```

---

## 📊 Monitoramento em Produção

### Google Analytics

Adicione ao `src/main.tsx`:

```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_GA_ID);
ReactGA.send(pageview);
```

### Sentry (Error Tracking)

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

### Uptime Monitoring

Use serviços como:
- UptimeRobot
- Pingdom
- StatusPage

---

## 🔐 Segurança em Produção

### Headers de Segurança

Configure em seu hosting:

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### HTTPS Obrigatório

```bash
# Netlify/Vercel fazem automaticamente
# Para outros: use Let's Encrypt
```

### Certificado SSL

- Vercel: Automático
- Netlify: Automático
- AWS: ACM (grátis)
- GoDaddy: Pago

---

## 🌍 DNS & Domínio

### Registrar Domínio

Providers recomendados:
- Namecheap
- GoDaddy
- Porkbun (mais barato)

### Apontar para Hosting

**Vercel:**
```
CNAME: cname.vercel-dns.com
```

**Netlify:**
```
A: 75.2.60.5
```

**GitHub Pages:**
```
CNAME: username.github.io
```

---

## 📈 Otimizações

### 1. Compressão Gzip

```nginx
# nginx.conf
gzip on;
gzip_types text/plain text/css application/json;
```

### 2. Cache Headers

```nginx
location ~* \.(js|css|woff)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location / {
  expires 5m;
  add_header Cache-Control "public";
}
```

### 3. Image Optimization

```bash
# Otimizar imagens antes do deploy
npm i -g imagemin-cli
imagemin src/assets/*.{jpg,png} --out-dir=dist/assets/
```

### 4. Lazy Loading

Já implementado no projeto!

---

## 🐛 Debugging em Produção

### Erros Comuns

**Blank Page**
- Verifique console (F12)
- Verifique Network tab
- Verifique path do build

**CORS Error**
- Configure backend CORS
- Use proxy
- Configure headers

**Asset 404**
- Verifique caminhos de assets
- Verifique build output
- Verifique homepage URL

### Logging

```typescript
// Adicione logging
if (import.meta.env.VITE_ENVIRONMENT === 'production') {
  // Envie para serviço de logs
  console.error('Production error:', error);
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: npm run deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

---

## 📱 Versão Mobile

### PWA Support

Adicione `manifest.json`:

```json
{
  "name": "SoftConection",
  "short_name": "SC",
  "icons": [],
  "start_url": "/",
  "display": "standalone"
}
```

### Service Worker

```typescript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 💰 Custos Estimados

| Serviço | Custo | Notas |
|---------|-------|-------|
| Vercel | Grátis | Pro: $20/mês |
| Netlify | Grátis | Pro: $19/mês |
| GitHub Pages | Grátis | GitHub Pro |
| AWS S3 | $0.023/GB | Mínimo |
| CloudFront | $0.085/GB | CDN |
| Domínio | $12/ano | Varies |
| SSL | Grátis | Let's Encrypt |
| **Total Mínimo** | **$12/ano** | Com GitHub Pages |

---

## 🚦 Checklist de Deploy

Antes de fazer deploy:

- [ ] Testes locais completos
- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem erros
- [ ] TypeScript types OK
- [ ] Environment variables configuradas
- [ ] Segurança verificada
- [ ] Performance testada
- [ ] Responsividade verificada
- [ ] SEO tags adicionadas
- [ ] Analytics configurado
- [ ] Backup realizado
- [ ] Documentação atualizada

---

## 📊 Pós-Deploy

### Verificar Deploy

1. Acesse seu domínio
2. Verifique funcionamento
3. Teste todas as páginas
4. Verifique console (F12)
5. Teste responsividade
6. Verifique performance

### Performance Audit

```bash
# Lighthouse CLI
npm i -g @lhci/cli@next
lhci autorun
```

### Monitoring

- Uptime: UptimeRobot
- Errors: Sentry
- Performance: New Relic
- Analytics: Google Analytics

---

## 🔄 Updates Futuros

### Versioning

```
v1.0.0 → v1.1.0 (minor feature)
v1.1.0 → v2.0.0 (breaking change)
```

### Deployment Strategy

1. Test em staging
2. Deploy em horário baixo
3. Monitor por 1 hora
4. Rollback se necessário

---

## 📞 Suporte pós-Deploy

Mantenha:
- Backups regularmente
- Logs centralizados
- Alertas configurados
- Plano de recuperação
- Documentação atualizada

---

## 🎯 Resumo

Para fazer deploy:

1. **Build:** `npm run build`
2. **Escolher hosting:** Vercel/Netlify recomendado
3. **Conectar repositório:** Git push automático
4. **Configurar domínio:** DNS settings
5. **Monitorar:** Analytics + Uptime
6. **Otimizar:** Contínuamente

**É isso! 🎉**

---

*Guia de Deploy - SoftConection*
*Pronto para escalar em produção*

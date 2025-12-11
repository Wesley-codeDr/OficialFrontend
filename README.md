# WellWave Frontend

Frontend separado para o sistema WellWave - Sistema de Anamnese Digital para Emergências.

## 📋 Sobre o Projeto

Este repositório contém o frontend do sistema WellWave, projetado para se integrar com o backend existente no repositório [Oficial](https://github.com/Wesley-codeDr/Oficial). O WellWave é um sistema médico avançado para geração automática de anamneses (históricos médicos) em ambientes de pronto-socorro.

## 🎯 Funcionalidades

- **Anamnese Digital**: Interface para geração de texto médico a partir de checkboxes
- **Detecção de Red Flags**: Visualização de alertas automáticos para sinais críticos
- **Chat EBM**: Interface para assistente de IA com consultas baseadas em evidências
- **Suporte a 3 Síndromes**: Dor Torácica, Dispneia, Abdome Agudo
- **Modo Resumido/Detalhado**: Interface adaptável ao workflow médico
- **Histórico de Sessões**: Acesso a anamneses anteriores

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS + shadcn/ui
- **Estado**: Zustand + React Query
- **Autenticação**: Supabase Auth
- **Testes**: Vitest (unitários) + Playwright (E2E)
- **Validação**: Zod + React Hook Form
- **Gerenciador de Pacotes**: pnpm

## 📦 Pré-requisitos

- Node.js 18+ 
- pnpm 8+

Instalação do pnpm:
```bash
npm install -g pnpm
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Wesley-codeDr/OficialFrontend.git
cd OficialFrontend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# URL do backend (repositório Oficial)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Configuração do Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎮 Comandos Disponíveis

### Desenvolvimento
```bash
pnpm dev              # Inicia servidor de desenvolvimento (Turbopack)
pnpm build            # Build de produção
pnpm start            # Inicia servidor de produção
```

### Qualidade de Código
```bash
pnpm typecheck        # Verificação de tipos TypeScript
pnpm format           # Formata código com Prettier
pnpm format:check     # Verifica formatação
```

> **Nota**: O comando `pnpm lint` será configurado em uma atualização futura com compatibilidade ESLint 9.

### Testes
```bash
pnpm test             # Executa testes unitários (watch mode)
pnpm test:ui          # Executa testes com UI interativa
pnpm test:coverage    # Executa testes com cobertura
pnpm test:e2e         # Executa testes E2E
pnpm test:e2e:ui      # Executa E2E com UI interativa
```

## 🔗 Integração com Backend

Este frontend foi projetado para se integrar com o backend no repositório [Oficial](https://github.com/Wesley-codeDr/Oficial). 

### Configuração da API

A comunicação com o backend é feita através do `apiClient` localizado em `src/lib/api-client.ts`. Configure a URL base através da variável de ambiente:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Serviços Disponíveis

- **syndromeService**: Gerenciamento de síndromes e checkboxes
- **anamnesisService**: Criação e consulta de anamneses

### Exemplo de Uso

```typescript
import { syndromeService } from "@/services/syndrome.service"

// Buscar todas as síndromes
const syndromes = await syndromeService.getAll()

// Buscar checkboxes de uma síndrome
const checkboxes = await syndromeService.getCheckboxes(syndromeId)
```

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Layout raiz
│   │   ├── page.tsx          # Página inicial
│   │   └── globals.css       # Estilos globais
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── providers.tsx    # Providers (React Query, Theme)
│   ├── lib/                  # Utilitários e configurações
│   │   ├── api-client.ts    # Cliente HTTP para API
│   │   ├── supabase/        # Configuração Supabase
│   │   └── utils.ts         # Funções utilitárias
│   ├── services/            # Camada de serviços
│   │   ├── syndrome.service.ts
│   │   └── anamnesis.service.ts
│   ├── types/               # Definições de tipos TypeScript
│   │   └── api.ts           # Tipos da API
│   └── hooks/               # Custom React Hooks
├── tests/                   # Testes E2E (Playwright)
├── components.json          # Configuração shadcn/ui
├── tailwind.config.ts       # Configuração Tailwind
├── tsconfig.json            # Configuração TypeScript
└── next.config.js           # Configuração Next.js
```

## 🔐 Autenticação

O frontend utiliza Supabase Auth para autenticação. Os clientes Supabase estão configurados em:

- `src/lib/supabase/client.ts` - Cliente para uso no navegador
- `src/lib/supabase/server.ts` - Cliente para uso no servidor (Server Components)

## 🎨 Componentes UI

Este projeto utiliza [shadcn/ui](https://ui.shadcn.com/) para componentes de interface. Para adicionar novos componentes:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
```

## 🧪 Testes

### Testes Unitários (Vitest)

Os testes unitários estão configurados com Vitest e Testing Library:

```bash
pnpm test              # Watch mode
pnpm test:coverage     # Com cobertura
```

### Testes E2E (Playwright)

Os testes E2E utilizam Playwright:

```bash
pnpm test:e2e          # Executa testes
pnpm test:e2e:ui       # UI interativa
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel Dashboard](https://vercel.com)
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático a cada push

### Docker

```bash
docker build -t wellwave-frontend .
docker run -p 3001:3001 wellwave-frontend
```

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🔗 Links Relacionados

- [Repositório Backend (Oficial)](https://github.com/Wesley-codeDr/Oficial)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
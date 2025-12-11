# Integração Frontend-Backend

Este documento descreve como o frontend se integra com o backend do repositório Oficial.

## Arquitetura da Integração

```
┌─────────────────────┐         ┌─────────────────────┐
│                     │         │                     │
│  OficialFrontend    │ ──────► │   Oficial (Backend) │
│  (Next.js App)      │  HTTP   │   (Next.js API)     │
│                     │ ◄────── │                     │
└─────────────────────┘         └─────────────────────┘
         │                               │
         │                               │
         │                               │
         ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│  Supabase Auth      │         │  PostgreSQL         │
│  (Authentication)   │         │  (Database)         │
└─────────────────────┘         └─────────────────────┘
```

## Configuração

### 1. Variáveis de Ambiente

Configure o arquivo `.env` com as seguintes variáveis:

```env
# URL do backend (repositório Oficial)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Configuração do Supabase (compartilhada com o backend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Cliente HTTP

O frontend utiliza um cliente HTTP configurado em `src/lib/api-client.ts` para se comunicar com o backend.

#### Exemplo de uso:

```typescript
import { apiClient } from "@/lib/api-client"

// GET request
const data = await apiClient.get("/api/syndromes")

// POST request
const result = await apiClient.post("/api/anamnesis", {
  syndromeId: "123",
  checkboxIds: ["1", "2", "3"],
})
```

## Endpoints da API

### Síndromes

- `GET /api/syndromes` - Lista todas as síndromes
- `GET /api/syndromes/:id` - Busca síndrome por ID
- `GET /api/syndromes/slug/:slug` - Busca síndrome por slug
- `GET /api/syndromes/:id/checkboxes` - Lista checkboxes de uma síndrome

### Anamnese

- `POST /api/anamnesis` - Cria uma nova anamnese
- `GET /api/anamnesis/:id` - Busca anamnese por ID
- `GET /api/anamnesis/user/:userId` - Lista anamneses de um usuário

## Camada de Serviços

O frontend utiliza uma camada de serviços para abstrair a comunicação com a API:

### syndromeService

```typescript
import { syndromeService } from "@/services/syndrome.service"

// Buscar todas as síndromes
const syndromes = await syndromeService.getAll()

// Buscar síndrome por ID
const syndrome = await syndromeService.getById("syndrome-id")

// Buscar síndrome por slug
const syndrome = await syndromeService.getBySlug("dor-toracica")

// Buscar checkboxes de uma síndrome
const checkboxes = await syndromeService.getCheckboxes("syndrome-id")
```

### anamnesisService

```typescript
import { anamnesisService } from "@/services/anamnesis.service"

// Criar nova anamnese
const anamnesis = await anamnesisService.create({
  syndromeId: "syndrome-id",
  checkboxIds: ["checkbox-1", "checkbox-2"],
  mode: "resumido",
  additionalNotes: "Observações adicionais",
})

// Buscar anamnese por ID
const anamnesis = await anamnesisService.getById("anamnesis-id")

// Buscar histórico do usuário
const history = await anamnesisService.getUserHistory("user-id")
```

## Autenticação

O frontend e backend compartilham a mesma instância do Supabase para autenticação.

### Cliente Supabase (Browser)

```typescript
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
})

// Logout
await supabase.auth.signOut()
```

### Cliente Supabase (Server)

```typescript
import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()

// Buscar usuário autenticado
const {
  data: { user },
} = await supabase.auth.getUser()
```

## Tratamento de Erros

O cliente HTTP trata erros automaticamente:

```typescript
try {
  const data = await apiClient.get("/api/endpoint")
} catch (error) {
  if (error.status === 404) {
    // Recurso não encontrado
  } else if (error.status === 401) {
    // Não autenticado
  } else {
    // Outros erros
  }
}
```

## React Query

O frontend utiliza React Query para gerenciamento de estado do servidor:

```typescript
import { useQuery } from "@tanstack/react-query"
import { syndromeService } from "@/services/syndrome.service"

function SyndromesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["syndromes"],
    queryFn: () => syndromeService.getAll(),
  })

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>

  return <div>{/* Renderizar síndromes */}</div>
}
```

## Desenvolvimento Local

### Rodando Frontend e Backend Juntos

1. **Backend (Repositório Oficial)**:
```bash
cd Oficial
pnpm install
pnpm dev  # Porta 3000
```

2. **Frontend (Este Repositório)**:
```bash
cd OficialFrontend
pnpm install
pnpm dev  # Porta 3001 (ou outra porta livre)
```

3. Configure `NEXT_PUBLIC_API_URL=http://localhost:3000` no frontend

## Deploy em Produção

### Frontend (Vercel)

1. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL` - URL do backend em produção
   - `NEXT_PUBLIC_SUPABASE_URL` - URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave pública do Supabase

### CORS

Certifique-se de que o backend está configurado para aceitar requisições do frontend:

```typescript
// No backend (Oficial)
const allowedOrigins = [
  "http://localhost:3001",
  "https://seu-frontend.vercel.app",
]
```

## Tipos TypeScript

O frontend define os tipos da API em `src/types/api.ts`. Estes tipos devem ser mantidos sincronizados com o backend:

```typescript
export interface Syndrome {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface AnamnesisResponse {
  id: string
  text: string
  mode: "resumido" | "detalhado"
  syndromeId: string
  userId: string
  createdAt: string
}
```

## Debugging

### Logs de Requisições

Para debugar requisições HTTP, você pode adicionar logs no cliente:

```typescript
// src/lib/api-client.ts
console.log("Request:", url, options)
console.log("Response:", response)
```

### DevTools

- **React Query DevTools**: Visualize o estado do cache
- **Browser DevTools**: Network tab para ver requisições HTTP

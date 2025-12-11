# Contribuindo para WellWave Frontend

Obrigado por considerar contribuir para o WellWave Frontend! Este documento fornece diretrizes para contribuições.

## Código de Conduta

- Seja respeitoso e inclusivo
- Critique ideias, não pessoas
- Aceite feedback construtivo
- Foque no que é melhor para a comunidade

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já não foi reportado nos [Issues](https://github.com/Wesley-codeDr/OficialFrontend/issues)
2. Se não, crie um novo issue com:
   - Título claro e descritivo
   - Passos para reproduzir o bug
   - Comportamento esperado vs comportamento atual
   - Screenshots, se aplicável
   - Informações do ambiente (SO, navegador, versão do Node)

### Sugerindo Melhorias

1. Verifique se a melhoria já não foi sugerida
2. Crie um issue descrevendo:
   - O problema que a melhoria resolve
   - Benefícios da implementação
   - Possíveis desvantagens ou trade-offs

### Pull Requests

1. **Fork o repositório**
2. **Clone seu fork**:
   ```bash
   git clone https://github.com/seu-usuario/OficialFrontend.git
   cd OficialFrontend
   ```

3. **Crie uma branch**:
   ```bash
   git checkout -b feature/minha-feature
   # ou
   git checkout -b fix/meu-bugfix
   ```

4. **Instale dependências**:
   ```bash
   pnpm install
   ```

5. **Faça suas alterações**:
   - Escreva código limpo e bem documentado
   - Siga os padrões de código do projeto
   - Adicione testes quando apropriado

6. **Execute os testes**:
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm test
   pnpm build
   ```

7. **Commit suas mudanças**:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

   Use commits semânticos:
   - `feat:` - Nova funcionalidade
   - `fix:` - Correção de bug
   - `docs:` - Documentação
   - `style:` - Formatação
   - `refactor:` - Refatoração
   - `test:` - Testes
   - `chore:` - Tarefas de manutenção

8. **Push para seu fork**:
   ```bash
   git push origin feature/minha-feature
   ```

9. **Abra um Pull Request**:
   - Descreva suas mudanças claramente
   - Referencie issues relacionados
   - Inclua screenshots se houver mudanças visuais

## Padrões de Código

### TypeScript

- Use TypeScript estrito
- Defina tipos explícitos
- Evite `any` quando possível
- Use interfaces para objetos complexos

```typescript
// ✅ Bom
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Evite
function getUser(id: any): any {
  // ...
}
```

### React

- Use componentes funcionais
- Use hooks apropriadamente
- Mantenha componentes pequenos e focados
- Use TypeScript para props

```typescript
// ✅ Bom
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

### Estilização

- Use Tailwind CSS para estilos
- Use componentes shadcn/ui quando disponível
- Mantenha classes organizadas
- Use `cn()` para classes condicionais

```typescript
import { cn } from "@/lib/utils"

function Component({ variant }: { variant: "primary" | "secondary" }) {
  return (
    <div
      className={cn(
        "rounded-lg px-4 py-2",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-200 text-black"
      )}
    >
      Content
    </div>
  )
}
```

### Nomenclatura

- **Arquivos**: kebab-case (`user-profile.tsx`)
- **Componentes**: PascalCase (`UserProfile`)
- **Funções**: camelCase (`getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces/Types**: PascalCase (`UserProfile`)

### Estrutura de Pastas

```
src/
├── app/              # Next.js App Router
├── components/       # Componentes reutilizáveis
│   ├── ui/          # Componentes shadcn/ui
│   └── ...          # Outros componentes
├── lib/             # Utilitários e configurações
├── services/        # Camada de serviços
├── hooks/           # Custom hooks
└── types/           # Definições de tipos
```

## Testes

### Testes Unitários

```typescript
import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button", () => {
  it("renders with label", () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("calls onClick when clicked", () => {
    const onClick = vi.fn()
    render(<Button label="Click me" onClick={onClick} />)
    screen.getByText("Click me").click()
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

### Testes E2E

```typescript
import { test, expect } from "@playwright/test"

test("homepage displays correctly", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("h1")).toContainText("WellWave")
})
```

## Processo de Review

1. Aguarde a revisão de pelo menos um mantenedor
2. Responda aos comentários de forma construtiva
3. Faça alterações solicitadas
4. Mantenha o PR atualizado com a branch principal

## Dúvidas?

- Abra um issue com a tag `question`
- Entre em contato através dos [Issues](https://github.com/Wesley-codeDr/OficialFrontend/issues)

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Conventional Commits](https://www.conventionalcommits.org/)

Obrigado por contribuir! 🎉

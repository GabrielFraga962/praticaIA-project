# PráticaAI — Landing page

Landing page de pré-lançamento do **PráticaAI**: estude com IA sem recriar o contexto toda vez. A página apresenta o produto e captura leads para a lista de acesso antecipado (VIP), salvando-os no Supabase.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshot-dark.png">
  <img alt="Primeira dobra da landing page do PráticaAI" src="docs/screenshot-light.png">
</picture>

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Server Actions) + React 19
- TypeScript
- Tailwind CSS v4
- GSAP 3 (`@gsap/react`) e Motion para animações
- `next-themes` para tema claro/escuro
- Supabase (`@supabase/supabase-js`) para armazenar os leads
- Ícones: `lucide-react`

## Começando

Pré-requisitos: Node.js 20+ e npm.

```bash
npm install
```

Crie um arquivo `.env.local` na raiz de `pratica-ai/`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<sua-publishable-key>
```

Sem essas variáveis a aplicação lança um erro ao iniciar (ver [src/lib/supabase.ts](src/lib/supabase.ts)).

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando         | Descrição                          |
| --------------- | ---------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento        |
| `npm run build` | Build de produção                  |
| `npm run start` | Servidor de produção (após build)  |
| `npm run lint`  | ESLint                             |

## Banco de dados

Os leads vão para a tabela `leads` via a Server Action `submitLead` ([src/app/actions.ts](src/app/actions.ts)), que valida os campos antes de inserir:

| Coluna             | Valores aceitos                                                  |
| ------------------ | ---------------------------------------------------------------- |
| `email`            | e-mail válido, normalizado em minúsculas, **único**              |
| `perfil`           | `universitario`, `concurseiro`, `vestibulando`, `autodidata`     |
| `disposicao_pagar` | `sim`, `talvez`, `nao`                                           |

E-mail duplicado (erro `23505`) é tratado como "já está na lista". A tabela usa RLS permitindo apenas `INSERT` para o papel `anon` — a chave pública não consegue ler os leads.

## Estrutura

```
src/
├── app/
│   ├── actions.ts        # Server Action de captura de leads
│   ├── layout.tsx        # Metadados, fontes e ThemeProvider
│   ├── page.tsx          # Composição das seções da landing
│   └── globals.css       # Tokens de tema (cobalto, claro/escuro)
├── components/
│   ├── Hero.tsx, HeroApp.tsx, HeroEmail.tsx   # Primeira dobra
│   ├── ProblemSolution.tsx, Features.tsx       # Proposta de valor
│   ├── ComparisonTable.tsx, Testimonials.tsx
│   ├── VipSection.tsx, LeadForm.tsx            # Formulário de acesso antecipado
│   ├── Header.tsx, Footer.tsx, PageMotion.tsx
│   └── motion/            # Componentes animados (botões, input, select, popover, theme toggle)
└── lib/
    ├── supabase.ts        # Cliente Supabase
    ├── hooks/             # Hooks de interação (hover, tap, dismiss)
    └── ease.ts, touch.ts, utils.ts
```

O e-mail digitado no hero dispara o evento `pratica:prefill-email`, que preenche automaticamente o `LeadForm` da seção VIP.

## Tema

A paleta principal é cobalto (`#2457ff`), com modo claro e escuro. Um backup dos tokens está em [theme-backups/globals.cobalto.css](theme-backups/globals.cobalto.css).

## Deploy

Qualquer plataforma compatível com Next.js (ex.: Vercel). Configure as duas variáveis `NEXT_PUBLIC_SUPABASE_*` no ambiente de produção.

import { ArrowRight, Check, X } from "lucide-react";

const ROWS = [
  {
    before: "Explicar o contexto da matéria de novo, a cada conversa",
    title: "Configuração única",
    after: "Você define objetivo, banca e formato uma vez. A IA lembra em toda sessão.",
  },
  {
    before: "Colar anotações e materiais outra vez",
    title: "Acervo dinâmico",
    after: "Cada PDF, foto de caderno ou nota se soma ao seu acervo, que só cresce.",
  },
  {
    before: "Receber feedback genérico, sem saber o que você já estudou",
    title: "Feedback contextualizado",
    after: "A correção parte do seu material e aponta a página exata da fonte.",
  },
  {
    before: "Gastar a sessão configurando a IA em vez de praticar",
    title: "Foco em alta performance",
    after: "Menos tempo preparando, mais tempo resolvendo exercícios.",
  },
];

export function ProblemSolution() {
  return (
    <section
      id="como-funciona"
      className="mx-auto grid max-w-360 gap-12 px-5 py-24 sm:px-8 sm:py-36 lg:grid-cols-[minmax(0,25rem)_1fr] lg:gap-20 lg:px-30"
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-accent">COMO FUNCIONA</p>
        <h2 className="display mt-5 text-[clamp(2.1rem,3.4vw,2.75rem)] leading-[1.05]" data-split>
          Estudar com IA não deveria começar do zero toda vez.
        </h2>
        <p className="mt-6 text-pretty text-lg leading-[1.55] text-muted-foreground" data-split-text>
          Hoje, cada conversa com uma IA genérica esquece quem você é. A PráticaAI guarda seu
          contexto e transforma o tempo de configuração em tempo de prática.
        </p>
      </div>

      <ol className="border-t border-border">
        {ROWS.map((r, i) => (
          <li
            key={r.title}
            className="grid grid-cols-1 gap-y-3.5 border-b border-border py-6 sm:gap-y-5 sm:py-9 sm:grid-cols-[3.125rem_minmax(0,1fr)_4.25rem_minmax(0,1.3fr)]"
          >
            <span className="tabular pt-0.5 text-sm font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div data-before className="rounded-[14px] bg-muted px-3.5 py-3 sm:rounded-none sm:bg-transparent sm:p-0">
              <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                <X className="size-3.5" strokeWidth={2} aria-hidden />
                Hoje
              </p>
              <p className="mt-1.5 text-pretty text-sm sm:mt-2 sm:max-w-52 sm:text-[15px] leading-normal text-muted-foreground">
                {r.before}
              </p>
            </div>
            <span
              aria-hidden
              className="hidden size-9 items-center justify-center rounded-full bg-muted text-foreground sm:flex"
            >
              <ArrowRight className="size-4" strokeWidth={2} />
            </span>
            <div data-after className="pt-1 sm:pt-0">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-accent">
                <Check className="size-3.5" strokeWidth={2.5} aria-hidden data-check />
                Com a PráticaAI
              </p>
              <h3 className="display mt-2 text-xl sm:text-[22px] font-semibold tracking-[-0.02em]">{r.title}</h3>
              <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                {r.after}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

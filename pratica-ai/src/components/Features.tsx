import {
  Building2,
  FileText,
  Gauge,
  ListChecks,
  NotebookPen,
  Quote,
  StickyNote,
  Target,
  TrendingUp,
} from "lucide-react";

const STACK = [
  { icon: FileText, title: "Constitucional — Resumo.pdf", gain: "+312 trechos", tone: "bg-white/55 w-[49%] opacity-90" },
  { icon: NotebookPen, title: "Caderno p. 14–22 (foto)", gain: "+86 trechos", tone: "bg-white/80 w-[53%]" },
  { icon: StickyNote, title: "Anotações · aula 12", gain: "+24 trechos", tone: "bg-white w-[58%]" },
];

const CHIPS = [
  { icon: Target, label: "Objetivo", value: "OAB 1ª fase" },
  { icon: Building2, label: "Banca", value: "FGV" },
  { icon: ListChecks, label: "Formato", value: "Múltipla escolha" },
  { icon: Gauge, label: "Nível", value: "Intermediário" },
];

function DarkCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-feature-card className={`flex flex-col justify-between gap-10 rounded-[24px] border border-white/[0.06] bg-[#141b2b] p-7 sm:p-9 ${className}`}>
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section id="recursos" className="px-3 sm:px-6">
      <div data-nav-tone="dark" className="rounded-[28px] bg-[#0a0e17] px-5 py-20 text-white sm:rounded-[36px] sm:px-12 sm:py-28 lg:px-24 lg:py-[120px]">
        <div className="mx-auto max-w-[75rem]">
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#7b97ff]">RECURSOS</p>
              <h2
                className="display mt-5 max-w-[34rem] text-[clamp(2.25rem,4.2vw,3.25rem)] leading-[1.04]"
                data-split
              >
                Um parceiro de estudo com memória de longo prazo.
              </h2>
            </div>
            <p className="text-pretty text-lg leading-[1.55] text-white/55" data-split-text>
              Tudo o que você estuda vira contexto. Tudo o que você pratica volta corrigido com base
              nele.
            </p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.27fr_1fr]" data-features>
            <div
              data-feature-card
              className="flex flex-col justify-between overflow-hidden rounded-[24px] p-7 sm:p-9"
              style={{ background: "linear-gradient(180deg, #2457ff 0%, #1638c4 55%, #0e2280 100%)" }}
            >
              <div className="flex flex-col items-center gap-2.5 pb-14 pt-6 text-[#0b1220]">
                {STACK.map(({ icon: Icon, title, gain, tone }) => (
                  <div
                    key={title}
                    data-stack-item
                    className={`flex min-w-[17rem] items-center gap-3.5 rounded-xl px-4 py-3 shadow-[0_10px_30px_-12px_rgba(2,6,26,0.5)] ${tone}`}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2457ff]/10 text-[#2457ff]">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 truncate text-[13px] font-medium">{title}</span>
                    <span data-stack-gain className="tabular text-[11px] font-semibold text-[#12805c]">{gain}</span>
                  </div>
                ))}
                <span data-stack-total className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white">
                  <TrendingUp className="size-3.5" strokeWidth={2} />
                  Acervo: <span data-count="2340">2.340</span> trechos e crescendo
                </span>
              </div>
              <div>
                <h3 data-feature-text className="display text-[30px] font-semibold tracking-[-0.02em]">
                  Acervo pessoal e cumulativo
                </h3>
                <p data-feature-text className="mt-3 max-w-[34rem] text-pretty text-[17px] leading-normal text-white/75">
                  Seus PDFs, anotações e fotos de caderno somados em um só lugar — e lembrados em toda
                  sessão.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <DarkCard>
                <div className="flex flex-wrap gap-2.5">
                  {CHIPS.map(({ icon: Icon, label, value }) => (
                    <span
                      key={label}
                      data-chip
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[13px]"
                    >
                      <Icon className="size-3.5 text-[#7b97ff]" strokeWidth={1.75} />
                      <span className="text-white/55">{label}:</span>
                      <span className="font-semibold">{value}</span>
                    </span>
                  ))}
                </div>
                <div>
                  <h3 data-feature-text className="display text-2xl font-semibold tracking-[-0.02em]">Configuração única</h3>
                  <p data-feature-text className="mt-2.5 text-pretty text-[15px] leading-normal text-white/55">
                    Objetivo, banca e formato definidos uma vez. Nada de repetir prompts.
                  </p>
                </div>
              </DarkCard>

              <DarkCard>
                <p data-quote className="flex items-center gap-2.5 rounded-xl border-l-2 border-[#7b97ff] bg-[#1c2a5c]/70 px-4 py-3 text-[13px] text-white/85">
                  <Quote data-quote-icon className="size-4 shrink-0 text-[#7b97ff]" strokeWidth={1.75} />
                  “…efeitos apenas entre as partes.” — seu resumo, pág. 7
                </p>
                <div>
                  <h3 data-feature-text className="display text-2xl font-semibold tracking-[-0.02em]">Correção com fonte</h3>
                  <p data-feature-text className="mt-2.5 text-pretty text-[15px] leading-normal text-white/55">
                    Cada correção aponta o trecho exato do seu material.
                  </p>
                </div>
              </DarkCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

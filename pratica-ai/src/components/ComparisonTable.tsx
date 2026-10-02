import { Check, Minus, X } from "lucide-react";
import { Logomark } from "./Logomark";

type Level = "sim" | "parcial" | "nao";

const ROWS: { feature: string; pratica: Level; generica: Level; plataforma: Level }[] = [
  { feature: "Memória do seu contexto de estudo", pratica: "sim", generica: "nao", plataforma: "parcial" },
  { feature: "Acervo pessoal e cumulativo", pratica: "sim", generica: "nao", plataforma: "parcial" },
  { feature: "Configuração única, sem repetir prompts", pratica: "sim", generica: "nao", plataforma: "nao" },
  { feature: "Correção com fonte no seu próprio material", pratica: "sim", generica: "nao", plataforma: "nao" },
  { feature: "Exercícios gerados sob medida", pratica: "sim", generica: "parcial", plataforma: "sim" },
  { feature: "Feedback instantâneo e contextualizado", pratica: "sim", generica: "parcial", plataforma: "parcial" },
];

const LABEL: Record<Level, string> = { sim: "Sim", parcial: "Parcial", nao: "Não" };
const ICON = { sim: Check, parcial: Minus, nao: X };

function Cell({ level }: { level: Level }) {
  const Icon = ICON[level];
  return (
    <span className="inline-flex items-center justify-center">
      <Icon
        className={level === "sim" ? "size-4.5 text-foreground" : "size-4 text-muted-foreground/60"}
        strokeWidth={level === "sim" ? 2.25 : 1.75}
        aria-hidden
      />
      <span className="sr-only">{LABEL[level]}</span>
    </span>
  );
}

function BrandCell() {
  return (
    <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#2457ff] sm:size-7 text-white">
      <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
      <span className="sr-only">Sim</span>
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section id="comparativo" className="mx-auto max-w-[80rem] px-5 py-24 sm:px-8 sm:py-36">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent">COMPARATIVO</p>
        <h2
          className="display mx-auto mt-5 max-w-[36rem] text-[clamp(2.25rem,4.2vw,3.25rem)] leading-[1.04]"
          data-split
        >
          Nem IA genérica, nem plataforma de questões.
        </h2>
      </div>

      <div className="relative mt-12 sm:mx-auto sm:mt-14 sm:max-w-[65rem]" data-reveal>
        <table className="w-full table-fixed border-separate border-spacing-0 text-left">
          <caption className="sr-only">
            Comparativo entre a PráticaAI, IAs genéricas e plataformas de questões
          </caption>
          <thead>
            <tr className="align-bottom">
              <th scope="col" className="w-[43%] pb-3 pr-3 text-xs font-medium sm:pr-4 sm:text-[13px] text-muted-foreground">
                Recurso
              </th>
              <th scope="col" className="w-[19%] rounded-t-[14px] bg-[#2457ff] px-0.5 py-3 text-center sm:rounded-t-2xl sm:px-4 sm:py-5">
                <span className="inline-flex flex-col items-center gap-1.5 text-white sm:flex-row sm:gap-2">
                  <Logomark className="size-4 bg-white/25 sm:size-5" />
                  <span className="display text-xs font-semibold sm:text-lg">PráticaAI</span>
                </span>
              </th>
              <th scope="col" className="px-1 py-3.5 text-center text-[11px] leading-tight font-medium text-muted-foreground sm:px-4 sm:py-5 sm:text-sm">
                IA genérica
              </th>
              <th scope="col" className="px-1 py-3.5 text-center text-[11px] leading-tight font-medium text-muted-foreground sm:px-4 sm:py-5 sm:text-sm">
                <span className="sm:hidden">Plataf. de questões</span>
                <span className="hidden sm:inline">Plataforma de questões</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const last = i === ROWS.length - 1;
              return (
                <tr key={r.feature}>
                  <th scope="row" className="border-b border-border py-3.5 pr-3 text-sm leading-snug font-medium sm:py-5 sm:pr-4 sm:text-[15px]">
                    {r.feature}
                  </th>
                  <td className={`bg-accent-soft px-1 py-3.5 text-center sm:px-4 sm:py-5 ${last ? "rounded-b-[14px] sm:rounded-b-2xl" : ""}`}>
                    <BrandCell />
                  </td>
                  <td className="border-b border-border px-1 py-3.5 text-center sm:px-4 sm:py-5">
                    <Cell level={r.generica} />
                  </td>
                  <td className="border-b border-border px-1 py-3.5 text-center sm:px-4 sm:py-5">
                    <Cell level={r.plataforma} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="mt-10 flex justify-center gap-6 sm:mt-12 text-[13px] text-muted-foreground" aria-hidden>
        {(["sim", "parcial", "nao"] as const).map((l) => {
          const Icon = ICON[l];
          return (
            <li key={l} className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5" strokeWidth={1.75} />
              {LABEL[l]}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

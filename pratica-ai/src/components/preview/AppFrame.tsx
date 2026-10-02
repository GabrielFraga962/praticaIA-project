"use client";

import type { ReactNode } from "react";
import { BookMarked, FolderOpen, ListChecks, SlidersHorizontal } from "lucide-react";
import { Logomark } from "../Logomark";
import { DISCIPLINAS } from "./data";
import { usePreview, type ScreenKey } from "./PreviewContext";

const NAV: { key: ScreenKey; label: string; icon: typeof FolderOpen }[] = [
  { key: "acervo", label: "Acervo", icon: FolderOpen },
  { key: "setup", label: "Configuração", icon: SlidersHorizontal },
  { key: "correcao", label: "Sessões", icon: ListChecks },
];

const SECTION_LABEL: Record<ScreenKey, string> = {
  acervo: "Acervo",
  setup: "Configuração",
  correcao: "Sessão de exercícios",
};

/** Moldura do app (arte conceitual). Barra lateral e navegação respondem ao clique. */
export function AppFrame({ section, children }: { section: ScreenKey; children: ReactNode }) {
  const { discipline: picked, setDiscipline, extra, navigate } = usePreview();
  const pickable = section === "acervo";
  // Configuração e Sessões do exemplo pertencem a Direito Constitucional; só o Acervo troca de disciplina.
  const discipline = pickable ? picked : DISCIPLINAS[0].name;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <div className="flex h-12 items-center gap-3 border-b border-border px-4 text-[13px]">
        <Logomark className="size-5" />
        <span className="truncate text-muted-foreground">{discipline}</span>
        <span className="text-border-strong" aria-hidden>
          /
        </span>
        <span className="font-medium">{SECTION_LABEL[section]}</span>
        <span className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <BookMarked className="size-3.5" strokeWidth={1.75} aria-hidden />
          Concurso · Analista Judiciário
        </span>
      </div>

      <div className="grid min-h-[31rem] md:grid-cols-[13.5rem_minmax(0,1fr)]">
        <aside className="hidden flex-col gap-7 border-r border-border p-4 md:flex">
          <div>
            <p className="px-2 text-xs text-muted-foreground">Disciplinas</p>
            <ul className="mt-2 space-y-0.5 text-[13px]">
              {DISCIPLINAS.map((d) => {
                const active = d.name === discipline;
                const count = d.base.materiais + (extra[d.name]?.length ?? 0);
                const cls =
                  "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors " +
                  (active ? "bg-muted font-medium text-foreground" : "text-muted-foreground");
                return (
                  <li key={d.name}>
                    {pickable ? (
                      <button
                        type="button"
                        onClick={() => setDiscipline(d.name)}
                        aria-pressed={active}
                        className={cls + " hover:bg-muted hover:text-foreground"}
                      >
                        <span className="truncate">{d.name}</span>
                        <span className="tabular text-xs">{count}</span>
                      </button>
                    ) : (
                      <div className={cls}>
                        <span className="truncate">{d.name}</span>
                        <span className="tabular text-xs">{count}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="space-y-0.5 text-[13px]">
            {NAV.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => navigate(key)}
                  aria-current={key === section ? "page" : undefined}
                  className={
                    "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted hover:text-foreground " +
                    (key === section ? "bg-muted font-medium text-foreground" : "text-muted-foreground")
                  }
                >
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

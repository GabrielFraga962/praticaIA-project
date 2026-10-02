"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { CountUp } from "./CountUp";
import { DISCIPLINAS } from "./data";
import { usePreview } from "./PreviewContext";

export function AcervoScreen({ replay }: { replay: number }) {
  const { discipline, extra, addMaterial } = usePreview();
  const reduce = useReducedMotion();
  const d = DISCIPLINAS.find((x) => x.name === discipline) ?? DISCIPLINAS[0];
  const added = extra[discipline] ?? [];
  const items = [...added, ...d.recentes];

  const materiais = d.base.materiais + added.length;
  const paginas = d.base.paginas + added.reduce((s, m) => s + m.pages, 0);
  const topicos = d.base.topicos + added.length;

  return (
    <AppFrame section="acervo">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="display text-[1.75rem]">Acervo</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Tudo o que você já estudou, somado e pronto para virar exercício.
          </p>
        </div>
        <button
          type="button"
          onClick={addMaterial}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border-strong px-4 text-[13px] font-medium transition-colors hover:bg-muted active:scale-[0.97]"
        >
          <Plus className="size-3.5" strokeWidth={2} aria-hidden />
          <span className="hidden sm:inline">Adicionar material</span>
          <span className="sm:hidden">Adicionar</span>
        </button>
      </div>

      <p className="mt-6 text-[13px] text-muted-foreground" aria-live="polite">
        <span className="text-foreground">
          <CountUp value={materiais} replay={replay} /> materiais
        </span>{" "}
        · <CountUp value={paginas} replay={replay} /> páginas ·{" "}
        <CountUp value={topicos} replay={replay} /> tópicos reconhecidos
      </p>

      <motion.ul
        key={discipline}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 border-y border-border"
      >
        <AnimatePresence initial={false}>
          {items.map(({ id, icon: Icon, title, kind, meta, topics, indexing }) => (
            <motion.li
              key={id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-border last:border-b-0"
            >
              <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex min-w-0 flex-1 items-center gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">
                      {kind} · {meta}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:max-w-[16rem] sm:justify-end">
                  {topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  className={
                    "w-20 shrink-0 text-xs sm:text-right " +
                    (indexing ? "text-muted-foreground" : "text-success")
                  }
                >
                  {indexing ? "Indexando…" : "Indexado"}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <p className="mt-6 text-pretty text-sm text-muted-foreground">
        Cada novo material se soma ao que já está lá. A próxima sessão já considera tudo.
      </p>
    </AppFrame>
  );
}

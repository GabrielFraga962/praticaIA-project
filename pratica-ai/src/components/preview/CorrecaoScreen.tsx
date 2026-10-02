"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Button } from "@/components/motion/button/base";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/motion/popover";
import { AppFrame } from "./AppFrame";
import { QUESTOES, type Cite } from "./data";

function Citation({ n, cite }: { n: number; cite: Cite }) {
  return (
    <Popover side="bottom" align="start" sideOffset={10} panelRadius={14} gooStrength={6}>
      <PopoverTrigger>
        <button
          type="button"
          className="mx-0.5 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-border-strong px-2 align-baseline text-xs font-medium text-foreground transition-colors hover:bg-muted"
          aria-label={`Fonte ${n}: ${cite.source}, ${cite.page}`}
        >
          {n}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(21rem,calc(100vw-2.5rem))] p-4 text-left">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="size-3.5" strokeWidth={1.75} aria-hidden />
          {cite.source} · {cite.page}
        </p>
        <p className="mt-3 text-pretty text-sm leading-relaxed">
          {cite.quote}{" "}
          <span className="rounded-sm bg-accent/20 px-0.5">{cite.highlight}</span>
        </p>
        <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          Abrir no acervo <ArrowUpRight className="size-3" strokeWidth={2} aria-hidden />
        </p>
      </PopoverContent>
    </Popover>
  );
}

export function CorrecaoScreen() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, boolean>>({});

  const q = QUESTOES[index];
  const answered = index in respostas;
  const chosen = respostas[index];
  const acertou = answered && chosen === q.correct;
  const total = Object.keys(respostas).length;
  const acertos = Object.entries(respostas).filter(([i, r]) => QUESTOES[Number(i)].correct === r).length;

  const pill = (value: boolean, label: string) => {
    const isChosen = answered && chosen === value;
    const tone = !isChosen
      ? "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
      : acertou
        ? "border-success bg-success text-background"
        : "border-destructive bg-destructive text-background";
    return (
      <button
        type="button"
        disabled={answered}
        onClick={() => setRespostas((prev) => ({ ...prev, [index]: value }))}
        className={
          "inline-flex h-10 min-w-24 items-center justify-center rounded-full border px-5 text-[13px] font-medium transition-colors active:scale-[0.97] disabled:cursor-default " +
          tone
        }
      >
        {label}
      </button>
    );
  };

  return (
    <AppFrame section="correcao">
      <div className="flex items-center justify-between gap-4">
        <p className="tabular text-xs text-muted-foreground">
          Questão {index + 1} de {QUESTOES.length} · Certo ou errado
        </p>
        <p className="tabular text-xs text-muted-foreground" aria-live="polite">
          {total > 0 ? `${acertos} de ${total} corretas` : ""}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="display mt-3 max-w-[40rem] text-balance text-[1.5rem] leading-[1.2] sm:text-[1.75rem]">
            {q.statement}
          </p>

          <div className="mt-5 flex items-center gap-2">
            {pill(true, "Certo")}
            {pill(false, "Errado")}
            {!answered ? (
              <span className="ml-1 text-xs text-muted-foreground">Escolha uma resposta</span>
            ) : null}
          </div>

          <div className="mt-8 min-h-48 border-t border-border pt-6">
            {answered ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className={"text-sm font-medium " + (acertou ? "text-success" : "text-destructive")}>
                  {acertou ? "Correta" : "Incorreta"}
                </p>
                <div className="mt-3 max-w-[40rem] text-pretty text-[15px] leading-[2.1]">
                  {q.explicacao.map((parte, i) =>
                    typeof parte === "string" ? (
                      <span key={i}>{parte}</span>
                    ) : (
                      <Citation key={i} n={parte.cite} cite={q.fontes[parte.cite - 1]} />
                    ),
                  )}
                </div>
                <p className="mt-5 text-[13px] text-muted-foreground">
                  Toque em uma fonte para ver o trecho do seu material.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-10 px-4 text-[13px]"
                  onClick={() => setIndex((i) => (i + 1) % QUESTOES.length)}
                >
                  Próxima questão
                  <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
                </Button>
              </motion.div>
            ) : (
              <p className="max-w-[34rem] text-sm text-muted-foreground">
                Responda para ver a correção, com as fontes tiradas do seu próprio material.
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </AppFrame>
  );
}

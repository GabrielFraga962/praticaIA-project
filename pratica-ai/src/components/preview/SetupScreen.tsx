"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { AppFrame } from "./AppFrame";

const BANCAS = ["Cebraspe", "FGV", "VUNESP"];
const FORMATOS: { label: string; frase: string }[] = [
  { label: "Certo ou errado", frase: "de certo ou errado" },
  { label: "Múltipla escolha", frase: "de múltipla escolha" },
  { label: "Discursiva", frase: "discursivas" },
];
const FEEDBACKS: { label: string; frase: string }[] = [
  { label: "Direto ao ponto", frase: "de forma curta e direta" },
  { label: "Detalhado", frase: "de forma detalhada" },
];

function juntar(itens: string[]) {
  if (itens.length <= 1) return itens.join("");
  return itens.slice(0, -1).join(", ") + " e " + itens[itens.length - 1];
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors active:scale-[0.97] " +
        (on
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground")
      }
    >
      {on ? <Check className="size-3" strokeWidth={2.5} aria-hidden /> : null}
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

export function SetupScreen() {
  const reduce = useReducedMotion();
  const [banca, setBanca] = useState("Cebraspe");
  const [formatos, setFormatos] = useState<string[]>(["Certo ou errado", "Múltipla escolha"]);
  const [feedback, setFeedback] = useState("Detalhado");

  const toggleFormato = (label: string) =>
    setFormatos((prev) => {
      if (prev.includes(label)) return prev.length > 1 ? prev.filter((f) => f !== label) : prev;
      return FORMATOS.map((f) => f.label).filter((l) => l === label || prev.includes(l));
    });

  const formatoTxt = juntar(FORMATOS.filter((f) => formatos.includes(f.label)).map((f) => f.frase));
  const feedbackTxt = FEEDBACKS.find((f) => f.label === feedback)?.frase ?? "";
  const instrucoes = `Aja como meu tutor para o concurso de Analista Judiciário, banca ${banca}. Use somente o meu acervo. Gere questões ${formatoTxt} e corrija ${feedbackTxt}, citando a fonte.`;

  return (
    <AppFrame section="setup">
      <h3 className="display text-[1.75rem]">Configuração</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Você responde uma vez. Toda sessão nasce já sabendo disso.
      </p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="space-y-6">
          <Field label="Objetivo">
            <p className="text-sm font-medium">Concurso — Analista Judiciário</p>
          </Field>
          <Field label="Banca">
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Banca">
              {BANCAS.map((b) => (
                <Chip key={b} on={banca === b} onClick={() => setBanca(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </Field>
          <Field label="Formato dos exercícios">
            <div className="flex flex-wrap gap-1.5">
              {FORMATOS.map((f) => (
                <Chip key={f.label} on={formatos.includes(f.label)} onClick={() => toggleFormato(f.label)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </Field>
          <Field label="Feedback">
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Feedback">
              {FEEDBACKS.map((f) => (
                <Chip key={f.label} on={feedback === f.label} onClick={() => setFeedback(f.label)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-xs text-muted-foreground">Instruções salvas</p>
          <motion.p
            key={instrucoes}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 min-h-28 text-pretty text-sm leading-relaxed"
            aria-live="polite"
          >
            {instrucoes}
          </motion.p>

          <div className="mt-4 space-y-3 text-sm">
            <p className="text-muted-foreground">Antes: copiar e colar isso a cada nova conversa</p>
            <p className="inline-flex items-center gap-2 font-medium text-success">
              <Check className="size-4" strokeWidth={2.25} aria-hidden />
              Agora: aplicado a todas as sessões
            </p>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import gsap from "gsap";
import { AcervoScreen } from "./preview/AcervoScreen";
import { CorrecaoScreen } from "./preview/CorrecaoScreen";
import { PreviewProvider, type ScreenKey } from "./preview/PreviewContext";
import { SetupScreen } from "./preview/SetupScreen";

const ITEMS: { key: ScreenKey; title: string; text: string }[] = [
  {
    key: "acervo",
    title: "Acervo pessoal e cumulativo",
    text: "Seus PDFs, anotações e fotos de caderno somados em um só lugar.",
  },
  {
    key: "setup",
    title: "Configuração única",
    text: "Objetivo, banca e formato definidos uma vez e lembrados em toda sessão.",
  },
  {
    key: "correcao",
    title: "Correção contextualizada com fontes",
    text: "Cada correção aponta o trecho exato do seu material.",
  },
];

export function AppPreview() {
  const [active, setActive] = useState<ScreenKey>("acervo");
  const [visits, setVisits] = useState<Record<ScreenKey, number>>({ acervo: 0, setup: 0, correcao: 0 });
  const panels = useRef<Partial<Record<ScreenKey, HTMLDivElement | null>>>({});
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);

  const go = useCallback((key: ScreenKey) => {
    setActive(key);
    setVisits((v) => ({ ...v, [key]: v[key] + 1 }));
  }, []);

  // A tela que entra sobe e aparece (GSAP). As três ficam montadas: o estado de cada uma é preservado.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = panels.current[active];
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", clearProps: "opacity,transform" },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = ITEMS.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    go(ITEMS[next].key);
    tabs.current[next]?.focus();
  };

  const screens: Record<ScreenKey, ReactNode> = {
    acervo: <AcervoScreen replay={visits.acervo} />,
    setup: <SetupScreen />,
    correcao: <CorrecaoScreen />,
  };

  return (
    <section id="previa" className="bg-muted/60">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)]" data-split>
            Por dentro da PráticaAI
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground" data-reveal>
            Experimente você mesmo: adicione um material ao acervo, ajuste a configuração e responda
            uma questão. Depois, toque nas fontes para ver de onde vem cada correção.
          </p>
        </div>

        <PreviewProvider navigate={go}>
          <div className="mt-12 rounded-4xl bg-stage p-3 sm:p-8 lg:p-12" data-window>
            {ITEMS.map((item) => (
              <div
                key={item.key}
                ref={(el) => {
                  panels.current[item.key] = el;
                }}
                role="tabpanel"
                id={`panel-${item.key}`}
                aria-labelledby={`tab-${item.key}`}
                hidden={active !== item.key}
              >
                {screens[item.key]}
              </div>
            ))}
          </div>
        </PreviewProvider>

        <div role="tablist" aria-label="Telas do app" className="mt-4 grid gap-3 md:grid-cols-3">
          {ITEMS.map((item, i) => {
            const on = item.key === active;
            return (
              <button
                key={item.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`tab-${item.key}`}
                role="tab"
                type="button"
                data-tab-card
                aria-selected={on}
                aria-controls={`panel-${item.key}`}
                tabIndex={on ? 0 : -1}
                onClick={() => go(item.key)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={
                  "flex min-h-28 flex-col items-start rounded-2xl border p-5 text-left transition-colors " +
                  (on
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card hover:border-border-strong")
                }
              >
                <span className="display text-[1.125rem] leading-snug">{item.title}</span>
                <span
                  className={
                    "mt-2 text-sm leading-relaxed " +
                    (on ? "text-accent-foreground/85" : "text-muted-foreground")
                  }
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Arte conceitual com conteúdo ilustrativo. A interface final pode variar.
        </p>
      </div>
    </section>
  );
}

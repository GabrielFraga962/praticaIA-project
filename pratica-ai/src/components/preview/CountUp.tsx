"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Número que conta até o valor (GSAP). `replay` volta a contar do zero. */
export function CountUp({ value, replay = 0 }: { value: number; replay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const lastReplay = useRef(replay);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lastReplay.current !== replay) {
      lastReplay.current = replay;
      shown.current = 0;
    }
    if (reduce) {
      shown.current = value;
      el.textContent = value.toLocaleString("pt-BR");
      return;
    }
    const state = { n: shown.current };
    const tween = gsap.to(state, {
      n: value,
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => {
        shown.current = state.n;
        el.textContent = Math.round(state.n).toLocaleString("pt-BR");
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, replay]);

  return (
    <span ref={ref} className="tabular">
      {value.toLocaleString("pt-BR")}
    </span>
  );
}

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DISCIPLINAS, NOVOS, type Material } from "./data";

export type ScreenKey = "acervo" | "setup" | "correcao";

type Ctx = {
  discipline: string;
  setDiscipline: (name: string) => void;
  extra: Record<string, Material[]>;
  addMaterial: () => void;
  navigate: (key: ScreenKey) => void;
};

const PreviewCtx = createContext<Ctx | null>(null);

export function usePreview() {
  const ctx = useContext(PreviewCtx);
  if (!ctx) throw new Error("usePreview deve ser usado dentro de PreviewProvider");
  return ctx;
}

export function PreviewProvider({
  navigate,
  children,
}: {
  navigate: (key: ScreenKey) => void;
  children: ReactNode;
}) {
  const [discipline, setDiscipline] = useState(DISCIPLINAS[0].name);
  const [extra, setExtra] = useState<Record<string, Material[]>>({});
  const timers = useRef<number[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const addMaterial = useCallback(() => {
    const tpl = NOVOS[counter.current % NOVOS.length];
    const id = `novo-${counter.current++}`;
    const item: Material = { ...tpl, id, indexing: true };
    setExtra((prev) => ({ ...prev, [discipline]: [item, ...(prev[discipline] ?? [])] }));
    // Simula a indexação: depois de um instante o material passa a "Indexado".
    const timer = window.setTimeout(() => {
      setExtra((prev) => ({
        ...prev,
        [discipline]: (prev[discipline] ?? []).map((m) => (m.id === id ? { ...m, indexing: false } : m)),
      }));
    }, 1800);
    timers.current.push(timer);
  }, [discipline]);

  const value = useMemo(
    () => ({ discipline, setDiscipline, extra, addMaterial, navigate }),
    [discipline, extra, addMaterial, navigate],
  );

  return <PreviewCtx.Provider value={value}>{children}</PreviewCtx.Provider>;
}

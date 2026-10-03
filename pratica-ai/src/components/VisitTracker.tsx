"use client";

import { useEffect } from "react";
import { registrarVisita } from "@/app/actions";

const STORAGE_KEY = "pratica-ai:visita-registrada";

export function lerOrigem(): string {
  return new URLSearchParams(window.location.search).get("utm_source") ?? "direto";
}

// Registra uma visita por sessão, com a origem vinda de ?utm_source=
export function VisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sem sessionStorage: registra mesmo assim
    }
    registrarVisita(lerOrigem()).catch(() => {});
  }, []);

  return null;
}
